"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const FiltreCategories = ({ categories }) => {
    const searchParams = useSearchParams();
    const categorieActuelle = searchParams.get("categorie") || "";
    const triActuel = searchParams.get("tri") || "";

    const construireUrl = (categorieId) => {
        const params = new URLSearchParams();
        if (triActuel) params.set("tri", triActuel);
        if (categorieId) params.set("categorie", categorieId);
        const query = params.toString();
        return `/tutoriel${query ? `?${query}` : ""}`;
    };

    return (
        <div className="flex flex-wrap justify-center gap-2">
            <Link
                href={construireUrl("")}
                className={`px-2 py-1 border rounded-full ${!categorieActuelle ? "bg-bleu-fonce text-white border-bleu-fonce" : "border-gray-300 hover:border-bleu-fonce hover:text-bleu-fonce"}`}
            >
                Tous
            </Link>
            {categories.map((cat) => (
                <Link
                    key={cat.id}
                    href={construireUrl(String(cat.id))}
                    className={`px-2 py-1 border rounded-full ${categorieActuelle === String(cat.id) ? "bg-bleu-fonce text-white border-bleu-fonce" : "border-gray-300 hover:border-bleu-fonce hover:text-bleu-fonce"}`}
                >
                    {cat.nom}
                </Link>
            ))}
        </div>
    );
};

export default FiltreCategories;
