"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

function FormatterIdTuto(idTuto) {
    const tutoId = Number(idTuto);
    return Number.isInteger(tutoId) && tutoId > 0 ? tutoId : null;
}

async function RecupererIdUtilisateur() {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
        return null;
    }

    const utilisateur = await prisma.utilisateur.findUnique({
        where: { email },
        select: { id: true },
    });

    return utilisateur?.id ?? null;
}

export async function AjouterProgressionTuto(idTuto, idUser) {
    await prisma.progression.create({
        data: {
            tuto_id: idTuto,
            user_id: idUser,
        },
    });
}

export async function demarrerTutoriel(idTuto, slug) {
    const tutoId = FormatterIdTuto(idTuto);

    if (!tutoId) {
        return { success: false, error: "Identifiant de tutoriel invalide." };
    }

    const userId = await RecupererIdUtilisateur();

    if (!userId) {
        return { success: false, error: "Vous devez être connecté." };
    }

    try {
        await prisma.progression.upsert({
            where: {
                user_id_tuto_id: {
                    user_id: userId,
                    tuto_id: tutoId,
                },
            },
            create: {
                user_id: userId,
                tuto_id: tutoId,
                etat: "en_cours",
            },
            update: {
                etat: "en_cours",
            },
        });

        revalidatePath(`/tutoriel/${slug}`);

        return { success: true };
    } catch (error) {
        console.error("Erreur demarrage tutoriel:", error);
        return { success: false, error: "Impossible de démarrer ce tutoriel." };
    }
}

export async function validerTutoriel(idTuto, slug) {
    const tutoId = FormatterIdTuto(idTuto);

    if (!tutoId) {
        return { success: false, error: "Identifiant de tutoriel invalide." };
    }

    const userId = await RecupererIdUtilisateur();

    if (!userId) {
        return { success: false, error: "Vous devez être connecté." };
    }

    try {
        await prisma.progression.upsert({
            where: {
                user_id_tuto_id: {
                    user_id: userId,
                    tuto_id: tutoId,
                },
            },
            create: {
                user_id: userId,
                tuto_id: tutoId,
                etat: "termine",
            },
            update: {
                etat: "termine",
            },
        });

        revalidatePath(`/tutoriel/${slug}`);

        return { success: true };
    } catch (error) {
        console.error("Erreur validation tutoriel:", error);
        return { success: false, error: "Impossible de valider ce tutoriel." };
    }
}
