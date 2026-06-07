import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import FormTuto from "@/components/form/FormTuto";

export async function generateMetadata({ params }) {
    const { id } = await params;
    return {
        title: `Edition | ${id}`,
        description: "Edition d'un tutoriel",
        robots: {
            index: false,
            follow: false,
        },
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
        <div className="p-2 md:p-5">
            <h1 className="mb-6">Editer le <span className="text-[2rem] font-titre font-black text-bleu">tutoriel</span></h1>
            <FormTuto categories={categories} initialData={tuto} />
        </div>
    );
}