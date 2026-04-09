import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata = {
    title: "Profil | tuto",
    description: "",
};

const profil = async () => {
    const session = await auth();

    const utilisateur = await prisma.utilisateur.findUnique({
        where: { email: session.user.email },
        select: { id: true },
    });

    const progressions = utilisateur
        ? await prisma.progression.findMany({
                where: {
                    user_id: utilisateur.id,
                    etat: {
                        in: ["en_cours", "termine"],
                    },
                },
                include: {
                    tuto: {
                        include: {
                            tuto_categories: {
                                include: {
                                    categorie: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    updated_at: "desc",
                },
            })
        : [];

    return (
        <>
            <h1 className="text-2xl font-bold">Profil</h1>

            {progressions.length > 0 ? (
                <div className="flex flex-col gap-5">
                    {progressions.map((progression) => (
                        <article key={progression.id} className="border border-gray-200 p-4">
                            <div className="flex justify-between items-center">
                                <h2>{progression.tuto.titre}</h2>
                                <p className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
                                    {progression.etat === "en_cours" ? "En cours" : "Terminé"}
                                </p>
                            </div>
                            <p>{progression.tuto.chapo}</p>
                            <p>
                                Catégories: {progression.tuto.tuto_categories.map((item) => item.categorie.nom).join(", ")}
                            </p>
                        </article>
                    ))}
                </div>
            ) : (
                <>
                    <p>Aucun tutoriel en cours ou terminé pour le moment.</p>
                    <Link href="/tutoriels">
                        Découvrez nos tutoriels
                    </Link>
                </>
            )}
        </>
    );
}

export default profil;