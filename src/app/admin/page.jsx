import TutoListe from "@/components/layout/CardListeTuto";
import prisma from "@/lib/prisma";
import TriTutoriels from "@/components/ui/TriTuto";
import Btn from "@/components/ui/Btn";

export const metadata = {
    title: "Administration | tuto",
    description: "",
};

const administration = async ({ searchParams }) => {
    const { tri } = await searchParams;

    let orderBy = { created_at: "desc" };
    if (tri === "titre_az") orderBy = { titre: "asc" };
    else if (tri === "titre_za") orderBy = { titre: "desc" };
    else if (tri === "date_ancien") orderBy = { created_at: "asc" };
    else if (tri === "date_recent") orderBy = { created_at: "desc" };

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
        orderBy,
    });

    return (
        <>
            <h1 className="my-10 text-center">Gestion des tutoriels :</h1>
            
            <Btn lien="/admin/nouveau" className="ml-4" variante="primaire">
                Nouveau tutoriel
            </Btn>

            <div className="flex justify-end">
                <TriTutoriels page="admin"/>
            </div>
            
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