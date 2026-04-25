import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import TriTutoriels from "@/components/ui/TriTuto";

export const metadata = {
    title: "Profil | tuto",
    description: "",
};

const profil = async ({ searchParams }) => {
    const { tri } = await searchParams;
    const session = await auth();

    const utilisateur = await prisma.utilisateur.findUnique({
        where: { email: session.user.email },
        select: { id: true },
    });

    const whereEtat =
        tri === "en_cours" ? { etat: "en_cours" }
        : tri === "termine" ? { etat: "termine" }
        : { etat: { in: ["en_cours", "termine"] } };

    const orderBy =
        tri === "titre_az" ? { tuto: { titre: "asc" } }
        : tri === "titre_za" ? { tuto: { titre: "desc" } }
        : tri === "date_ancien" ? { updated_at: "asc" }
        : { updated_at: "desc" };

    const progressions = utilisateur
        ? await prisma.progression.findMany({
                where: { user_id: utilisateur.id, ...whereEtat },
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
                orderBy,
            })
        : [];

    return (
        <>
            <div className="w-screen py-8 bg-gray-100">
                <h1 className="text-2xl font-bold text-center">Bienvenue sur votre profil, {session?.user?.nom || "utilisateur"} !</h1>
            </div>

            <div className="flex flex-col gap-10 md:flex-row">
                <div className="flex flex-col gap-5 py-5 pl-4 bg-gray-300 w-100 md:h-screen">
                    <a href="#profil" className="hover:bg-gray-200">Mon Profil</a>
                    <a href="#tutoriels" className="hover:bg-gray-200">Mes Tutoriels</a>
                    <a href="#securite" className="hover:bg-gray-200">Sécurité</a>
                </div>

                <div className="w-full">
                    <h2 id="profil">Mon Profil</h2>

                    <div className="flex flex-row gap-10 my-5">
                        <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md">
                            Tutoriel terminé : {progressions.filter(p => p.etat === "termine").length}
                        </div>
                        <div className="flex flex-col gap-2 p-4 border border-gray-300 rounded-md">
                            Tutoriel en cours : {progressions.filter(p => p.etat === "en_cours").length}
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between mb-3">
                        <h2 id="tutoriels">Mes tutoriels</h2>
                        <TriTutoriels page="profil" />
                    </div>

                    {progressions.length > 0 ? (
                        <div className="flex flex-col gap-5 my-5">
                            {progressions.map((progression) => (
                                <article key={progression.id} className="p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2>{progression.tuto.titre}</h2>
                                        <p className="px-3 py-1 text-sm capitalize bg-gray-100 rounded-full">
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

                    <h2 id="securite">Sécurité</h2>

                    <h3>Changer de pseudo :</h3>
                    <h3>Changer de mot de passe :</h3>
                    <h3>Supprimer le compte :</h3>

                </div>
            </div>
        </>
    );
}

export default profil;