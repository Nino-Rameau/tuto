"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TriTuto from "@/components/ui/TriTuto";

const FiltreCategories = ({ categories }) => {
    const searchParams = useSearchParams();
    const categorieActuelle = searchParams.get("categorie") || "";
    const triActuel = searchParams.get("tri") || "";

    const construireUrl = (categorieId) => {
        const params = new URLSearchParams();
        if (triActuel) params.set("tri", triActuel);
        if (categorieId) params.set("categorie", categorieId);
        const query = params.toString();
        return `/tutoriels${query ? `?${query}` : ""}`;
    };

    const tabBase = "px-4 py-2 rounded-md transition-all duration-200";
    const tabActive = "bg-bleu-clair text-bleu-fonce2 font-bold shadow-md";
    const tabInactive = "text-bleu-clair/70 hover:bg-bleu-fonce hover:text-white";

    return (
        <div className="flex flex-col items-center justify-between w-full gap-5 px-4 py-3 my-5 border rounded-md md:gap-0 md:flex-row bg-bleu-fonce2 border-bleu">
            <div className="flex flex-wrap items-center gap-2">
                <Link
                    href={construireUrl("")}
                    scroll={false}
                    className={`${tabBase} ${categorieActuelle === "" ? tabActive : tabInactive}`}
                >
                    Tous
                </Link>

                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={construireUrl(String(cat.id))}
                        scroll={false}
                        className={`${tabBase} ${categorieActuelle === String(cat.id) ? tabActive : tabInactive}`}
                    >
                        {cat.nom}
                    </Link>
                ))}
            </div>
            <TriTuto page="tutoriels" />
        </div>
    );
};

export default FiltreCategories;
