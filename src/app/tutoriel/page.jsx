import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { auth } from "@/auth";
import FiltreCategories from "@/components/ui/FiltreCategories";

export const metadata = {
    title: "Tutoriels | tuto",
    description: "",
};

const tutoSelect = {
    id: true,
    titre: true,
    slug: true,
    chapo: true,
    image: true,
    tuto_categories: {
        select: { categorie: { select: { nom: true } } },
    },
};

const tutoriel = async ({ searchParams }) => {
    const { tri, categorie } = await searchParams;
    const session = await auth();

    const categorieId = categorie ? Number(categorie) : null;
    const whereCategorie = categorieId ? { tuto_categories: { some: { categorie_id: categorieId } } } : {};

    let tutos = [];

    if (tri === "en_cours" || tri === "termine") {
        if (!session?.user) {
            tutos = [];
        } else {
            const etat = tri === "en_cours" ? "en_cours" : "termine";
            const progressions = await prisma.progression.findMany({
                where: {
                    user_id: Number(session.user.id),
                    etat,
                    tuto: { statut: "en_ligne", ...whereCategorie },
                },
                select: { tuto: { select: tutoSelect } },
            });
            tutos = progressions.map((p) => p.tuto);
        }
    } else {

        let orderBy = {};

        if (tri === "titre_az") {
            orderBy = { titre: "asc" };
        } else if (tri === "titre_za") {
            orderBy = { titre: "desc" };
        } else if (tri === "date_ancien") {
            orderBy = { created_at: "asc" };
        } else if (tri === "date_recent") {
            orderBy = { created_at: "desc" };
        }

        tutos = await prisma.tuto.findMany({
            where: { statut: "en_ligne", ...whereCategorie },
            select: tutoSelect,
            orderBy,
        });
    }

    const categories = await prisma.categorie.findMany({
        select: { id: true, nom: true },
        orderBy: { nom: "asc" },
    });

    return (
        <div className="flex flex-col items-center md:p-5">

            <div className="flex flex-col items-center justify-center my-5 mt-5 md:flex-row">
                <div className="md:max-w-[40%] flex flex-col gap-5">
                    <h1 className="font-bold text-center">Tous les <span className="text-[2rem] font-titre font-black text-bleu">tutoriels</span> :</h1>
                    <p>Apprends à référencer et déployer tes projets web efficacement.</p>
                    <p>Découvre des tutoriels concrets sur le SEO et le déploiement sur VPS, pensés pour passer rapidement de la théorie à la mise en ligne.</p>
                </div>
                <div className="md:max-w-[50%]">
                    <Image src="/img/divers-site/test.png" alt="Image d'illustration pour la page des tutoriels" width={600} height={500} />
                </div>

            </div>

            <FiltreCategories categories={categories}/>
            
            {(tri === "en_cours" || tri === "termine") && !session?.user && (
                <p className="mt-5 text-bleu-clair">Connectez-vous pour filtrer par progression.</p>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-5">
                {tutos.map((item) => (
                    <Link
                        key={item.id}
                        href={`/tutoriel/${item.slug}`}
                        className="w-[90%] relative md:w-full max-w-md flex flex-col items-center gap-4 pt-2 rounded-md bg-bleu hover:bg-bleu-fonce hover:text-bleu-clair! transform transition duration-300"
                    >
                        <h2 className="h-20 text-center line-clamp-2 text-bleu-fonce2">{item.titre}</h2>
                        <p className="px-2 line-clamp-3 h-19">{item.chapo}</p>
                        <div className="absolute flex flex-wrap justify-center gap-1 left-5 top-52">
                            {item.tuto_categories.map((tag, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs border border-bleu-fonce rounded-full text-bleu-fonce">
                                    {tag.categorie.nom}
                                </span>
                            ))}
                        </div>
                        <Image src={item.image || "/img/placeholder-img.png"} alt={`Image du tutoriel ${item.titre}`} width={500} height={200} className="rounded-md"/>
                    </Link>
                ))}
            </div>

            {tutos.length === 0 && (
                <p className="mt-10 text-bleu-clair">Aucun tutoriel trouvé dans cette catégorie.</p>
            )}

        </div>
    );
};

export default tutoriel;
