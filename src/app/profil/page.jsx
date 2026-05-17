import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import TriTutoriels from "@/components/ui/TriTuto";
import FormChangerNom from "@/components/form/FormChangerNom";
import FormChangerMotDePasse from "@/components/form/FormChangerMotDePasse";
import FormSupprimerCompte from "@/components/form/FormSupprimerCompte";
import Btn from "@/components/ui/Btn";
import BtnHaut from "@/components/ui/BtnHautPage";

export const metadata = {
    title: "Profil | tuto",
    description: "",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://nws.nino-rameau.fr/profil",
    },
};

const profil = async ({ searchParams }) => {
    const { tri } = await searchParams;
    const session = await auth();
    if (!session) redirect("/");

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
            <BtnHaut />

            <div className="w-full py-8">
                <h1 className="text-center text-bleu-clair">Bienvenue sur votre profil, <span className="text-[2rem] font-titre font-black text-bleu">{session?.user?.nom || "utilisateur"}</span> !</h1>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="w-full bg-linear-to-l from-bleu-clair via-bleu to-bleu-fonce md:w-100">
                    <div className="sticky flex flex-col gap-5 py-5 pl-5 top-40">
                        <a href="#tutoriels" className="cursor-pointer hover:text-bleu-clair hover:font-semibold">Mes Tutoriels</a>
                        <a href="#securite" className="cursor-pointer hover:text-bleu-clair hover:font-semibold">Sécurité</a>
                        <a href="#changer-pseudo" className="ml-2 cursor-pointer hover:text-bleu-clair hover:font-semibold">Changer de pseudo</a>
                        <a href="#changer-mdp" className="ml-2 cursor-pointer hover:text-bleu-clair hover:font-semibold">Changer de mot de passe</a>
                        <a href="#supprimer-compte" className="ml-2 cursor-pointer hover:text-bleu-clair hover:font-semibold">Supprimer mon compte</a>
                    </div>
                </div>

                <div className="flex flex-col w-full mx-3 mt-5 md:mx-10 gap-15">

                    <div className="flex flex-col gap-10">
                        <h2 id="tutoriels" className="scroll-mt-40 text-bleu-clair">Mes tutoriels</h2>
                        <div className="flex flex-row flex-wrap items-center justify-center md:justify-start gap-4">
                            <Btn lien="/profil" variante="contour">
                                Tous mes tutoriels : {progressions.length}
                            </Btn>

                            <Btn lien="?tri=en_cours" variante="contour">
                                Tutoriels en cours : {progressions.filter(p => p.etat === "en_cours").length}
                            </Btn>
                            
                            <Btn lien="?tri=termine" variante="contour">
                                Tutoriels terminés : {progressions.filter(p => p.etat === "termine").length}
                            </Btn>
                        </div>

                        <div>
                            <div className="flex flex-row justify-center md:justify-end">
                                {progressions.length > 0 && <TriTutoriels page="profil" />}
                            </div>

                            {progressionsAffichees.length > 0 ? (
                                <div className="flex flex-col justify-center gap-5 my-5">
                                    {progressionsAffichees.map((progression) => (
                                        <div key={progression.id} className="flex flex-col justify-center gap-6 p-3 border-2 rounded md:gap-0 md:justify-between md:flex-row border-bleu-fonce max-w-[90%]">
                                            <div className="flex flex-col gap-4 md:max-w-[80%]">
                                                <h2>{progression.tuto.titre}</h2>
                                                <p>{progression.tuto.chapo}</p>
                                            </div>
                                            <div className="flex flex-col items-start justify-between gap-3 md:items-end">
                                                <p className="px-2 py-1 border-2 rounded text-[12px] border-bleu-fonce">
                                                    {progression.etat === "en_cours" ? "En cours" : "Terminé"}
                                                </p>
                                                <Btn lien={`/tutoriels/${progression.tuto.slug}`} variante="contour">
                                                    Voir le tutoriel
                                                </Btn>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>
                                    {tri === "en_cours" ? "Aucun tutoriel en cours."
                                    : tri === "termine" ? "Aucun tutoriel terminé."
                                    : "Aucun tutoriel trouvé."}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <h2 id="securite" className="scroll-mt-40 text-bleu-clair">Sécurité</h2>

                        <div className="flex flex-col gap-4 p-2 border-2 max-w-[90%] rounded-md md:p-4 border-bleu-fonce">
                            <h3 id="changer-pseudo" className="scroll-mt-40 text-bleu-clair">Changer de pseudo :</h3>
                            <FormChangerNom />
                        </div>

                        <div className="flex flex-col gap-4 p-2 border-2 max-w-[90%] rounded-md md:p-4 border-bleu-fonce">
                            <h3 id="changer-mdp" className="scroll-mt-40 text-bleu-clair">Changer de mot de passe :</h3>
                            <FormChangerMotDePasse />
                        </div>
                        
                        <div className="flex flex-col gap-4 p-2 border-2 max-w-[90%] rounded-md md:p-4 border-bleu-fonce">  
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