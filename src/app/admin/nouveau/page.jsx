import prisma from "@/lib/prisma";
import FormTuto from "@/components/form/FormTuto";

export const metadata = {
    title: "Nouveau tutoriel | tuto",
    description: "Création d'un nouveau tutoriel",
};

export default async function NouveauTutorielPage() {
    const categories = await prisma.categorie.findMany();

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">Créer un tutoriel :</h1>
            <FormTuto categories={categories} />
        </div>
    );
}