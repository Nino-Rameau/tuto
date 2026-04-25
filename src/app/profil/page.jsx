import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import TriTutoriels from "@/components/ui/TriTuto";
import FormChangerNom from "@/components/form/FormChangerNom";
import FormChangerMotDePasse from "@/components/form/FormChangerMotDePasse";
import FormSupprimerCompte from "@/components/form/FormSupprimerCompte";

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
                <div className="w-full bg-gray-300 md:w-100">
                    <div className="sticky flex flex-col py-5 pl-10 gap-5 top-40">
                        <a href="#profil" className="cursor-pointer hover:text-bleu-fonce hover:font-semibold">Mon Profil</a>
                        <a href="#tutoriels" className="cursor-pointer hover:text-bleu-fonce hover:font-semibold">Mes Tutoriels</a>
                        <a href="#securite" className="cursor-pointer hover:text-bleu-fonce hover:font-semibold">Sécurité</a>
                    </div>
                </div>

                <div className="w-full">
                    <h2 id="profil" className="scroll-mt-40">Mon Profil</h2>

                    <div className="flex flex-row my-5 gap-10">
                        <div className="flex flex-col p-4 border border-gray-300 gap-2 rounded-md">
                            Tutoriel terminé : {progressions.filter(p => p.etat === "termine").length}
                        </div>
                        <div className="flex flex-col p-4 border border-gray-300 gap-2 rounded-md">
                            Tutoriel en cours : {progressions.filter(p => p.etat === "en_cours").length}
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between mb-3">
                        <h2 id="tutoriels" className="scroll-mt-40">Mes tutoriels</h2>

                        {progressions.length > 0 && <TriTutoriels page="profil" />}
                    </div>

                    {progressions.length > 0 ? (
                        <div className="flex flex-col my-5 gap-5">
                            {progressions.map((progression) => (
                                <div key={progression.id} className="flex flex-row justify-between p-3 border border-gray-200 rounded">
                                    <div className="flex flex-col gap-4">
                                        <h2>{progression.tuto.titre}</h2>
                                        <p>{progression.tuto.chapo}</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between gap-3">
                                        <p className="px-2 py-1 border-2 rounded text-[12px] border-bleu-fonce">
                                            {progression.etat === "en_cours" ? "En cours" : "Terminé"}
                                        </p>
                                        <Link href={`/tutoriel/${progression.tuto.slug}`} className="px-3 py-1 border-2 rounded border-bleu-fonce hover:border-bleu-clair">
                                            Voir le tutoriel
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p>Aucun tutoriel en cours ou terminé pour le moment.</p>
                        </>
                    )}

                    <div className="flex flex-col my-10 gap-5">
                        <h2 id="securite" className="scroll-mt-40">Sécurité</h2>

                        <h3>Changer de pseudo :</h3>
                        <FormChangerNom />

                        <h3>Changer de mot de passe :</h3>
                        <FormChangerMotDePasse />

                        <h3>Supprimer le compte :</h3>
                        <FormSupprimerCompte />
                    </div>

                </div>
            </div>
        </>
    );
}

export default profil;