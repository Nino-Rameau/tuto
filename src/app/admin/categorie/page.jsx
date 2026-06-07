import prisma from "@/lib/prisma";
import Btn from "@/components/ui/Btn";
import BtnSuppCategorie from "@/components/ui/BtnSuppCategorie";
import FormAjoutCategorie from "@/components/ui/FormAjoutCategorie";

export const metadata = {
    title: "Gestion des catégories | Admin",
    robots: { index: false, follow: false },
};

const PageCategories = async () => {
    const categories = await prisma.categorie.findMany({
        orderBy: { nom: "asc" },
        include: {
            _count: { select: { tuto_categories: true } },
        },
    });

    return (
        <div className="flex flex-col max-w-2xl mx-auto my-10 gap-8">
            <div className="flex items-center justify-between">
                <h1>Gestion des <span className="text-[2rem] font-titre font-black text-bleu">catégories</span></h1>
                <Btn lien="/admin" variante="secondaire">Retour</Btn>
            </div>

            <div className="p-6 rounded-md bg-bleu-fonce">
                <FormAjoutCategorie />
            </div>

            <div className="p-6 rounded-md bg-bleu-fonce">
                <h2 className="mb-4 font-semibold">Catégories existantes <span className="text-xs text-bleu-clair">({categories.length})</span></h2>
                {categories.length === 0 ? (
                    <p className="text-bleu-clair">Aucune catégorie pour le moment.</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {categories.map((cat) => (
                            <div key={cat.id} className="flex items-center justify-between p-3 border rounded gap-4 border-bleu-clair">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{cat.nom}</p>
                                    <span className="ml-3 text-xs text-bleu-clair">
                                        {cat._count.tuto_categories} tutoriels
                                    </span>
                                </div>
                                <BtnSuppCategorie id={cat.id} nom={cat.nom} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PageCategories;
