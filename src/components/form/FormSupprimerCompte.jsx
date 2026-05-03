"use client";

import { useActionState } from "react";
import { supprimerCompte } from "@/actions/auth.actions";

const FormSupprimerCompte = () => {
    const [etat, action, enCours] = useActionState(supprimerCompte, null);

    return (

        // Popup de confirmation
        <form
            action={action}
            onSubmit={(e) => {
                if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
                    e.preventDefault();
                }
            }}
            className="flex flex-col gap-5 max-w-140"
        >

            {/* Form */}
            {etat?.erreur && (
                <p className="text-sm text-red-600">{etat.erreur}</p>
            )}

            <p className="text-sm text-gray-300">
                Cette action est irréversible. Toutes vos progressions seront supprimées.
            </p>

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
                className="px-4 py-2 text-white bg-red-800 w-[50%] m-auto rounded cursor-pointer hover:bg-red-900 disabled:opacity-50"
            >
                {enCours ? "Suppression..." : "Supprimer mon compte"}
            </button>
        </form>
    );
};

export default FormSupprimerCompte;
