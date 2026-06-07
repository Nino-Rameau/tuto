import prisma from "@/lib/prisma";
import FormTuto from "@/components/form/FormTuto";

export const metadata = {
    title: "Nouveau tutoriel | tuto",
    description: "Création d'un nouveau tutoriel",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function NouveauTutorielPage() {
    const categories = await prisma.categorie.findMany();

    return (
        <div className="p-2 md:p-5">
            <h1 className="mb-6">Créer un <span className="text-[2rem] font-titre font-black text-bleu">nouveau tutoriel :</span></h1>
            <FormTuto categories={categories} />
        </div>
    );
}