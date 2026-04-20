import { auth } from "@/auth";

export async function verifierAdmin() {
    const session = await auth();

    if (!session?.user) {
        return { success: false, error: "Accès refusé : vous devez être connecté." };
    }

    if (session.user.profil !== "admin") {
        return { success: false, error: "Accès refusé : droits administrateur requis." };
    }

    return null;
}

export async function verifierConnecte() {
    const session = await auth();

    if (!session?.user) {
        return { success: false, error: "Accès refusé : vous devez être connecté." };
    }

    return null;
}
