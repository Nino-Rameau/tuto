"use client";

import { useActionState } from "react";
import { changerMotDePasse } from "@/actions/auth.actions";

const FormChangerMotDePasse = () => {
    const [etat, action, enCours] = useActionState(changerMotDePasse, null);

    return (
        <form action={action} className="flex flex-col gap-5 max-w-140">

            {etat?.erreur && (
                <p className="text-sm text-red-600">{etat.erreur}</p>
            )}
            {etat?.succes && (
                <p className="text-sm text-green-600">{etat.succes}</p>
            )}

            <div className="flex flex-col gap-1">
                <label htmlFor="motDePasseActuel">Mot de passe actuel</label>
                <input
                    id="motDePasseActuel" name="motDePasseActuel" type="password" required placeholder="Votre mot de passe actuel"
                    className="px-3 py-2 border rounded border-bleu-clair"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="nouveauMotDePasse">Nouveau mot de passe</label>
                <input
                    id="nouveauMotDePasse" name="nouveauMotDePasse" type="password" required placeholder="Votre nouveau mot de passe"
                    className="px-3 py-2 border rounded border-bleu-clair"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="confirmationMotDePasse">Confirmer le nouveau mot de passe</label>
                <input
                    id="confirmationMotDePasse" name="confirmationMotDePasse" type="password" required placeholder="Confirmez votre nouveau mot de passe"
                    className="px-3 py-2 border rounded border-bleu-clair"
                />
            </div>

            <button
                type="submit"
                disabled={enCours}
                className="px-4 py-2 text-white w-[50%] m-auto rounded cursor-pointer bg-bleu hover:bg-bleu-fonce disabled:opacity-50"
            >
                {enCours ? "Enregistrement..." : "Valider"}
            </button>
        </form>
    );
};

export default FormChangerMotDePasse;
