"use client";

import { useActionState } from "react";
import { changerNom } from "@/actions/auth.actions";

const FormChangerNom = () => {
    const [etat, action, enCours] = useActionState(changerNom, null);

    return (
        <form action={action} className="flex flex-col gap-5 max-w-140">
            
            {etat?.erreur && (
                <p className="text-sm text-red-600 ">{etat.erreur}</p>
            )}
            {etat?.succes && (
                <p className="text-sm text-green-600">{etat.succes}</p>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="nouveauNom">Nouveau nom</label>
                <input
                    id="nouveauNom" name="nouveauNom" type="text" required placeholder="Votre nouveau nom"
                    className="px-3 py-2 border border-gray-300 rounded"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="motDePasse">Mot de passe</label>
                <input 
                    id="motDePasse" name="motDePasse" type="password" required placeholder="Confirmez avec votre mot de passe"
                    className="px-3 py-2 border border-gray-300 rounded"
                />
            </div>
            
            <button
                type="submit"
                disabled={enCours}
                className="px-4 py-2 text-white rounded cursor-pointer bg-bleu-fonce hover:bg-bleu-fonce2 disabled:opacity-50"
            >
                {enCours ? "Enregistrement..." : "Valider"}
            </button>
        </form>
    );
};

export default FormChangerNom;
