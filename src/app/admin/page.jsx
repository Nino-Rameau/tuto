import Link from "next/link";
import TutoListe from "@/components/layout/CardListeTuto";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "Administration | tuto",
    description: "",
};

const administration = async () => {
    const tutos = await prisma.tuto.findMany({
        select: {
            id: true,
            titre: true,
            chapo: true,
            slug: true,
            image: true,
            statut: true,
            updated_at: true,
            created_at: true,
            tuto_categories: {
                select: {
                    categorie: { select: { nom: true } },
                },
            },
        },
        orderBy: { created_at: "desc" },
    });

    return (
        <>
            <h1 className="my-10 text-center">Gestion des tutoriels :</h1>
            
            <Link href="/admin/nouveau" className="px-4 py-2 font-bold text-white rounded bg-bleu hover:bg-bleu-fonce">
                Nouveau tutoriel
            </Link>
            
            <div className="my-5 space-y-5">
                {tutos.map((tuto) => (
                    <TutoListe 
                        key={tuto.id}
                        id={tuto.id}
                        titre={tuto.titre}
                        chapo={tuto.chapo}
                        tags={tuto.tuto_categories.map((item) => item.categorie.nom)}
                        dateMaj={new Date(tuto.updated_at).toLocaleDateString("fr-FR")}
                        dateCreation={new Date(tuto.created_at).toLocaleDateString("fr-FR")}
                        slug={tuto.slug}
                        image={tuto.image}
                        statut={tuto.statut.toLowerCase().replace("_", " ")}
                    />
                ))}
            </div>
        </>
    );
}

export default administration;