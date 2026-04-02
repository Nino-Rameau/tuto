import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import FormTuto from "@/components/form/FormTuto";

export async function generateMetadata({ params }) {
    const { id } = await params;
    return {
        title: `Edition | ${id}`,
        description: "Edition d'un tutoriel",
    };
}

export default async function EditTutoPage({ params }) {
    const { id } = await params;
    const idNumerique = Number(id);

    if (!Number.isInteger(idNumerique) || idNumerique <= 0) {
        notFound();
    }

    const [categories, tuto] = await Promise.all([
        prisma.categorie.findMany({ orderBy: { nom: "asc" } }),
        prisma.tuto.findUnique({
            where: { id: idNumerique },
            include: {
                tuto_categories: true,
            },
        }),
    ]);

    if (!tuto) {
        notFound();
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-6">Editer le tutoriel</h1>
            <FormTuto categories={categories} initialData={tuto} />
        </div>
    );
}