"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifierAdmin } from "@/lib/auth-controle";

const schemaCreationTuto = z.object({
    titre: z.string().trim().min(5, "Le titre doit faire au moins 5 caractères.").max(100, "Le titre doit faire au maximum 100 caractères."),
    slug: z.string().trim().min(3, "Le slug doit faire au moins 3 caractères.").max(100, "Le slug doit faire au maximum 100 caractères."),
    preRequis: z.string().trim().optional(),
    chapo: z.string().trim().min(20, "Le chapo est requis.").max(200, "Le chapo doit faire au maximum 200 caractères."),
    intro: z.string().trim().min(100, "L'introduction est requise.").max(500, "L'introduction doit faire au maximum 500 caractères."),
    contenu: z.string().trim().min(50, "Le contenu est requis."),
    image: z.string().trim().optional(),
    statut: z.enum(["brouillon", "en_ligne"]),
    categorieId: z.number().int().positive("La catégorie est requise."),
    MetaTitle: z.string().trim().min(50, "Le title doit faire au moins 50 caractères.").max(70, "Le title doit faire au maximum 70 caractères."),
    MetaDescription: z.string().trim().min(130, "La meta description doit faire au moins 130 caractères.").max(190, "La meta description doit faire au maximum 190 caractères."),

});

function slugify(texte) {
    return texte
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function formaterPreRequisEnListe(texte) {
    if (!texte || typeof texte !== "string") {
        return null;
    }

    const lignes = texte.split("\n").filter(Boolean);

    if (lignes.length === 0) {
        return null;
    }

    return lignes.map((ligne) => `${ligne}`).join("\n");
}



export async function creerTutoriel(dataTuto) {
    const erreurConnexion = await verifierAdmin();
    if (erreurConnexion) return erreurConnexion;

    const slugNettoye = slugify(dataTuto.slug);

    const donneesValidees = schemaCreationTuto.safeParse({
        titre: dataTuto.titre,
        preRequis: dataTuto.preRequis,
        chapo: dataTuto.chapo,
        intro: dataTuto.intro,
        contenu: dataTuto.contenu,
        image: dataTuto.image,
        statut: dataTuto.statut,
        slug: slugNettoye,
        categorieId: Number(dataTuto.categorieId),
        MetaTitle: dataTuto.MetaTitle,
        MetaDescription: dataTuto.MetaDescription,
    });

    if (!donneesValidees.success) {
        return {
            success: false,
            error: donneesValidees.error.issues[0]?.message || "Données invalides.",
        };
    }

    const data = donneesValidees.data;
    const preRequisFormates = formaterPreRequisEnListe(data.preRequis);

    try {
        await prisma.tuto.create({
            data: {
                titre: data.titre,
                slug: data.slug,
                pre_requis: preRequisFormates,
                chapo: data.chapo,
                intro: data.intro,
                contenu: data.contenu,
                image: data.image || "/img/placeholder-img.png",
                statut: data.statut,
                MetaTitle: data.MetaTitle,
                MetaDescription: data.MetaDescription,
                tuto_categories: {
                    create: {
                        categorie_id: data.categorieId,
                    },
                },
            },
        });

        revalidatePath("/admin");
        revalidatePath("/tutoriels");
        revalidatePath("/");

        return { success: true };

    } catch (error) {
        console.error("Erreur création tutoriel:", error);
        if (error?.code === "P2002") {
            const field = error?.meta?.target?.includes("slug") ? "slug" : "titre";
            return {
                success: false,
                error: `Un tutoriel avec ce ${field} existe déjà.`,
            };
        }
        return {
            success: false,
            error: "Erreur serveur lors de la création du tutoriel.",
        };
    }
}



export async function mettreAJourTutoriel(donneesRecues) {
    const erreurConnexion = await verifierAdmin();
    if (erreurConnexion) return erreurConnexion;

    const slugNettoye = slugify(donneesRecues.slug);

    const donneesValidees = schemaCreationTuto.safeParse({
        titre: donneesRecues.titre,
        preRequis: donneesRecues.preRequis,
        chapo: donneesRecues.chapo,
        intro: donneesRecues.intro,
        contenu: donneesRecues.contenu,
        image: donneesRecues.image,
        statut: donneesRecues.statut,
        slug: slugNettoye,
        categorieId: Number(donneesRecues.categorieId),
        MetaTitle: donneesRecues.MetaTitle,
        MetaDescription: donneesRecues.MetaDescription,
    });

    if (!donneesValidees.success) {
        return {
            success: false,
            error: donneesValidees.error.issues[0]?.message || "Données invalides.",
        };
    }

    const data = donneesValidees.data;
    const tutoId = Number(donneesRecues.id);
    const preRequisFormates = formaterPreRequisEnListe(data.preRequis);

    if (!Number.isInteger(tutoId) || tutoId <= 0) {
        return { success: false, error: "Identifiant de tutoriel invalide." };
    }

    try {
        await prisma.$transaction(async (tx) => {
            await tx.tuto.update({
                where: { id: tutoId },
                data: {
                    titre: data.titre,
                    slug: data.slug,
                    pre_requis: preRequisFormates,
                    chapo: data.chapo,
                    intro: data.intro,
                    contenu: data.contenu,
                    image: data.image || "/img/placeholder-img.png",
                    statut: data.statut,
                    MetaTitle: data.MetaTitle,
                    MetaDescription: data.MetaDescription,
                },
            });

            await tx.tutoCategorie.deleteMany({
                where: { tuto_id: tutoId },
            });

            await tx.tutoCategorie.create({
                data: {
                    tuto_id: tutoId,
                    categorie_id: data.categorieId,
                },
            });
        });

        revalidatePath("/admin");
        revalidatePath("/tutoriels");
        revalidatePath("/");
        
        return { success: true };

    } catch (error) {
        console.error("Erreur mise a jour tutoriel:", error);
        return {
            success: false,
            error: "Erreur serveur lors de la mise à jour du tutoriel.",
        };
    }
}



export async function creerCategorie(nom) {
    const erreurConnexion = await verifierAdmin();
    if (erreurConnexion) return erreurConnexion;

    const nomNettoye = nom?.trim();
    if (!nomNettoye || nomNettoye.length < 2) {
        return { success: false, error: "Le nom doit faire au moins 2 caractères." };
    }

    try {
        const categorie = await prisma.categorie.create({
            data: { nom: nomNettoye },
        });

        revalidatePath("/admin");
        revalidatePath("/admin/nouveau");

        return { success: true, categorie };
    } catch (error) {
        console.error("Erreur création catégorie:", error);
        return { success: false, error: "Erreur serveur lors de la création de la catégorie." };
    }
}



export async function supprimerTutoriel(id) {
    const erreurConnexion = await verifierAdmin();
    if (erreurConnexion) return erreurConnexion;

    const tutoId = Number(id);

    if (!Number.isInteger(tutoId) || tutoId <= 0) {
        return { success: false, error: "Identifiant de tutoriel invalide." };
    }

    try {
        await prisma.$transaction(async (tx) => {
            await tx.tutoCategorie.deleteMany({
                where: { tuto_id: tutoId },
            });

            await tx.progression.deleteMany({
                where: { tuto_id: tutoId },
            });

            await tx.tuto.delete({
                where: { id: tutoId },
            });
        });

        revalidatePath("/admin");
        revalidatePath("/tutoriels");
        revalidatePath("/");

        return { success: true };
    
    } catch (error) {
        console.error("Erreur suppression tutoriel:", error);
        return {
            success: false,
            error: "Erreur serveur lors de la suppression du tutoriel.",
        };
    }
}