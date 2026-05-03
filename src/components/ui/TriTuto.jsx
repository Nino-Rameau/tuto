"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TriTuto = ({ page }) => {
    const routeur = useRouter();
    const parametresRecherche = useSearchParams();
    
    const triActuel = parametresRecherche.get("tri") || "";

    const gererChangement = (e) => {
        const valeur = e.target.value;
        const params = new URLSearchParams(parametresRecherche.toString());

        if (valeur) {
            params.set("tri", valeur);
        } else {
            params.delete("tri");
        }

        const query = params.toString();
        routeur.push(`/${page}${query ? `?${query}` : ""}`);
    };

        if (page === "tutoriel") {
            return (
                <select
                    value={triActuel}
                    onChange={gererChangement}
                    className="border border-gray-300 rounded-md p-1 w-[80%] md:w-full max-w-40"
                >
                <option value="">Trier par</option>
                <option value="en_cours">Tutoriel en cours</option>
                <option value="termine">Tutoriel terminé</option>
                <option value="titre_az">Titre (A-Z)</option>
                <option value="titre_za">Titre (Z-A)</option>
                <option value="date_recent">Date (plus récent)</option>
                <option value="date_ancien">Date (plus ancien)</option>
            </select>
        );
    } else if (page === "profil") {
        return (
                <select
                    value={triActuel}
                    onChange={gererChangement}
                    className="border border-gray-300 rounded-md p-1 w-[80%] md:w-full max-w-40"
                >
                <option value="">Trier par</option>
                <option value="en_cours">Tutoriel en cours</option>
                <option value="termine">Tutoriel terminé</option>
                <option value="titre_az">Titre (A-Z)</option>
                <option value="titre_za">Titre (Z-A)</option>
            </select>
        );
    }
};

export default TriTuto;