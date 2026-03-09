"use server";

import prisma from "@/lib/prisma";
import { signIn } from "@/auth"; 
import { AuthError } from "next-auth";
import { isRedirectError } from "next/navigation";
import bcrypt from "bcrypt";
import { z } from "zod";

const schemaInscription = z.object({
    email: z.string().email("L'email doit être valide."),
    motDePasse: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères."),
});

export async function inscrireUtilisateur(etatPrecedent, formData) {
    const email = formData.get("email"); 
    const motDePasse = formData.get("motDePasse");
    const confirmationMotDePasse = formData.get("confirmationMotDePasse");
    const conditionsAcceptees = formData.get("conditions");

    const donneesSaisies = {
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

    const validation = schemaInscription.safeParse({ email, motDePasse });
    if (!validation.success) {
        return { erreur: validation.error?.issues?.[0]?.message || "Les données saisies sont invalides.", donnees: donneesSaisies };
    }

    try {
    const utilisateurExistant = await prisma.utilisateur.findUnique({
      where: { email: email }
    });

    if (utilisateurExistant) {
      return { erreur: "Cet email est déjà utilisé.", donnees: donneesSaisies };
    }

    const motDePasseHache = await bcrypt.hash(motDePasse, 10);

    await prisma.utilisateur.create({
      data: {
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

export async function connecterUtilisateur(etatPrecedent, formData) {
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