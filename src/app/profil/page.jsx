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

    const orderBy =
        tri === "titre_az" ? { tuto: { titre: "asc" } }
        : tri === "titre_za" ? { tuto: { titre: "desc" } }
        : tri === "date_ancien" ? { updated_at: "asc" }
        : { updated_at: "desc" };

    const progressions = await prisma.progression.findMany({
        where: { user_id: Number(session.user.id) },
        select: {
            id: true,
            etat: true,
            updated_at: true,
            tuto: {
                select: { titre: true, chapo: true, slug: true },
            },
        },
        orderBy,
    });

    const progressionsAffichees =
        tri === "en_cours" ? progressions.filter(p => p.etat === "en_cours")
        : tri === "termine" ? progressions.filter(p => p.etat === "termine")
        : progressions;

    return (
        <>
            <div className="w-full py-8">
                <h1 className="text-center text-bleu-clair">Bienvenue sur votre profil, {session?.user?.nom || "utilisateur"} !</h1>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="w-full bg-linear-to-l from-bleu-clair via-bleu to-bleu-fonce md:w-100">
                    <div className="sticky flex flex-col gap-5 py-5 pl-10 top-40">
                        <a href="#tutoriels" className="cursor-pointer hover:text-bleu-clair hover:font-semibold">Mes Tutoriels</a>
                        <a href="#securite" className="cursor-pointer hover:text-bleu-clair hover:font-semibold">Sécurité</a>
                        <a href="#changer-pseudo" className="ml-2 cursor-pointer hover:text-bleu-clair hover:font-semibold">Changer de pseudo</a>
                        <a href="#changer-mdp" className="ml-2 cursor-pointer hover:text-bleu-clair hover:font-semibold">Changer de mot de passe</a>
                        <a href="#supprimer-compte" className="ml-2 cursor-pointer hover:text-bleu-clair hover:font-semibold">Supprimer mon compte</a>
                    </div>
                </div>

                <div className="flex flex-col w-full mx-10 mt-5 gap-15">
                                                <h2 id="tutoriels" className="scroll-mt-40 text-bleu-clair">Mes tutoriels</h2>


                    <div className="flex flex-row gap-10">
                        
                        <Link href="/profil" className="flex flex-col gap-2 p-4 border-2 rounded-md border-bleu-fonce hover:border-bleu-clair">
                            Tous mes tutoriels : {progressions.length}
                        </Link>
                        <Link href="?tri=en_cours" className="flex flex-col gap-2 p-4 border-2 rounded-md border-bleu-fonce hover:border-bleu-clair">
                            Tutoriel terminé : {progressions.filter(p => p.etat === "termine").length}
                        </Link>
                        <Link href="?tri=termine" className="flex flex-col gap-2 p-4 border-2 rounded-md border-bleu-fonce hover:border-bleu-clair">
                            Tutoriel en cours : {progressions.filter(p => p.etat === "en_cours").length}
                        </Link>
                    </div>

                    <div>
                        <div className="flex flex-row justify-end">
                            {progressions.length > 0 && <TriTutoriels page="profil" />}
                        </div>

                        {progressionsAffichees.length > 0 ? (
                            <div className="flex flex-col gap-5 my-5">
                                {progressionsAffichees.map((progression) => (
                                    <div key={progression.id} className="flex flex-row justify-between p-3 border-2 rounded border-bleu-fonce">
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
                            <p>Aucun tutoriel en cours ou terminé pour le moment.</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-10">
                        <h2 id="securite" className="scroll-mt-40 text-bleu-clair">Sécurité</h2>

                        <div className="flex flex-col gap-4 p-4 border-2 rounded-md border-bleu-fonce">
                            <h3 id="changer-pseudo" className="scroll-mt-40 text-bleu-clair">Changer de pseudo :</h3>
                            <FormChangerNom />
                        </div>

                        <div className="flex flex-col gap-4 p-4 border-2 rounded-md border-bleu-fonce">
                            <h3 id="changer-mdp" className="scroll-mt-40 text-bleu-clair">Changer de mot de passe :</h3>
                            <FormChangerMotDePasse />
                        </div>
                        
                        <div className="flex flex-col gap-4 p-4 border-2 rounded-md border-bleu-fonce">  
                            <h3 id="supprimer-compte" className="scroll-mt-40 text-bleu-clair">Supprimer le compte :</h3>
                            <FormSupprimerCompte />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default profil;