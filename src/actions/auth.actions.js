"use server";

import prisma from "@/lib/prisma";
import { signIn, signOut, auth } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/navigation";
import bcrypt from "bcrypt";
import { z } from "zod";
import { verifierRateLimit, obtenirIp } from "@/lib/rate-limit";
import { verifierConnecte } from "@/lib/auth-controle";

const schemaInscription = z.object({
    nom: z.string().min(3, "Le nom doit faire au moins 3 caractères.").max(50, "Le nom ne peut pas dépasser 50 caractères."),
    email: z.string().email("L'email doit être valide."),
    motDePasse: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères."),
});

export async function inscrireUtilisateur(etatPrecedent, formData) {
    const ip = await obtenirIp();
    const limite = verifierRateLimit(`inscription:${ip}`, { maxAppels: 5, fenetreMs: 60_000 });
    
    if (!limite.autorise) {
        return { erreur: `Trop de tentatives. Réessayez dans ${limite.attente}s.` };
    }

    const nom = formData.get("nom");
    const email = formData.get("email");
    const motDePasse = formData.get("motDePasse");
    const confirmationMotDePasse = formData.get("confirmationMotDePasse");
    const conditionsAcceptees = formData.get("conditions");

    const donneesSaisies = {
        nom: nom,
        email: email,
        motDePasse: motDePasse,
        confirmationMotDePasse: confirmationMotDePasse
    };

    if (motDePasse !== confirmationMotDePasse) {
        return { erreur: "Les mots de passe ne correspondent pas.", donnees: donneesSaisies };
    }

    if (!conditionsAcceptees) {
        return { erreur: "Vous devez accepter les RGPD.", donnees: donneesSaisies };
    }

    const validation = schemaInscription.safeParse({ nom, email, motDePasse });
    if (!validation.success) {
        return { erreur: validation.error?.issues?.[0]?.message || "Les données saisies sont invalides.", donnees: donneesSaisies };
    }

    try {
        const utilisateurExistant = await prisma.utilisateur.findUnique({
            where: { email: email },
            select: { id: true },
        });

        if (utilisateurExistant) {
            return { erreur: "Cet email est déjà utilisé.", donnees: donneesSaisies };
        }

        const motDePasseHache = await bcrypt.hash(motDePasse, 10);

        await prisma.utilisateur.create({
            data: {
                nom: nom,
                email: email,
                password: motDePasseHache,
            }
        });

        await signIn("credentials", {
            email,
            motDePasse,
            redirectTo: "/" 
        });

    } catch (erreur) {
        if (isRedirectError(erreur)) {
            throw erreur;
        }
        
        console.error("Vraie erreur serveur :", erreur);
        
        if (erreur instanceof AuthError) {
            return { erreur: "Compte créé, mais échec de la connexion automatique.", donnees: donneesSaisies };
        }
        
        throw erreur; 
    }
}

export async function changerNom(etatPrecedent, formData) {
    const erreurConnexion = await verifierConnecte();
    if (erreurConnexion) return { erreur: erreurConnexion.error };

    const session = await auth();

    const nouveauNom = formData.get("nouveauNom")?.trim();
    const motDePasse = formData.get("motDePasse");

    const validation = z.string().min(3, "Le nom doit faire au moins 3 caractères.").max(50, "Le nom ne peut pas dépasser 50 caractères.").safeParse(nouveauNom);
    if (!validation.success) {
        return { erreur: validation.error.issues[0].message };
    }

    const utilisateur = await prisma.utilisateur.findUnique({
        where: { email: session.user.email },
        select: { password: true },
    });

    if (!utilisateur) {
        return { erreur: "Utilisateur introuvable." };
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.password);
    if (!motDePasseValide) {
        return { erreur: "Mot de passe incorrect." };
    }

    await prisma.utilisateur.update({
        where: { email: session.user.email },
        data: { nom: nouveauNom },
    });

    return { succes: "Nom modifié avec succès. Il sera mis à jour à votre prochaine connexion." };
}

export async function changerMotDePasse(etatPrecedent, formData) {
    const erreurConnexion = await verifierConnecte();
    if (erreurConnexion) return { erreur: erreurConnexion.error };

    const session = await auth();

    const motDePasseActuel = formData.get("motDePasseActuel");
    const nouveauMotDePasse = formData.get("nouveauMotDePasse");
    const confirmationMotDePasse = formData.get("confirmationMotDePasse");

    if (nouveauMotDePasse !== confirmationMotDePasse) {
        return { erreur: "Les nouveaux mots de passe ne correspondent pas." };
    }

    const validation = z.string().min(6, "Le mot de passe doit faire au moins 6 caractères.").safeParse(nouveauMotDePasse);
    if (!validation.success) {
        return { erreur: validation.error.issues[0].message };
    }

    const utilisateur = await prisma.utilisateur.findUnique({
        where: { email: session.user.email },
        select: { password: true },
    });

    if (!utilisateur) {
        return { erreur: "Utilisateur introuvable." };
    }

    const motDePasseValide = await bcrypt.compare(motDePasseActuel, utilisateur.password);
    if (!motDePasseValide) {
        return { erreur: "Mot de passe actuel incorrect." };
    }

    const nouveauMotDePasseHache = await bcrypt.hash(nouveauMotDePasse, 10);

    await prisma.utilisateur.update({
        where: { email: session.user.email },
        data: { password: nouveauMotDePasseHache },
    });

    return { succes: "Mot de passe modifié avec succès." };
}

export async function supprimerCompte(etatPrecedent, formData) {
    const erreurConnexion = await verifierConnecte();
    if (erreurConnexion) return { erreur: erreurConnexion.error };

    const session = await auth();

    const motDePasse = formData.get("motDePasse");

    const utilisateur = await prisma.utilisateur.findUnique({
        where: { email: session.user.email },
        select: { id: true, password: true },
    });

    if (!utilisateur) {
        return { erreur: "Utilisateur introuvable." };
    }

    const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.password);
    if (!motDePasseValide) {
        return { erreur: "Mot de passe incorrect." };
    }

    await prisma.$transaction(async (tx) => {
        await tx.progression.deleteMany({ where: { user_id: utilisateur.id } });
        await tx.utilisateur.delete({ where: { id: utilisateur.id } });
    });

    await signOut({ redirectTo: "/" });
}

export async function connecterUtilisateur(etatPrecedent, formData) {
    const ip = await obtenirIp();
    const limite = verifierRateLimit(`login:${ip}`, { maxAppels: 5, fenetreMs: 60_000 });
    if (!limite.autorise) {
        return { erreur: `Trop de tentatives. Réessayez dans ${limite.attente}s.` };
    }

    const email = formData.get("email");
    const motDePasse = formData.get("motDePasse");

    try {
        await signIn("credentials", {
        email,
        motDePasse,
        redirectTo: "/" 
        });
    } catch (erreur) {
        if (erreur instanceof AuthError) {
        switch (erreur.type) {
            case "CredentialsSignin":
            return { erreur: "Email ou mot de passe incorrect." };
            default:
            return { erreur: "Une erreur inattendue est survenue." };
        }
        }
        throw erreur;
    }
}