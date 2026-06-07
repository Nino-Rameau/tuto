'use client';

import { useState } from 'react';
import { creerCategorie } from '@/actions/tuto.actions';

const FormAjoutCategorie = () => {
    const [nom, setNom] = useState('');
    const [enCours, setEnCours] = useState(false);
    const [erreur, setErreur] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnCours(true);
        setErreur('');
        setMessage('');

        const result = await creerCategorie(nom.trim());

        if (!result.success) {
            setErreur(result.error || 'Erreur lors de la création.');
        } else {
            setMessage(`Catégorie "${result.categorie.nom}" créée.`);
            setNom('');
        }

        setEnCours(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="nom-categorie" className="font-semibold">Nom de la catégorie :</label>
            <div className="flex gap-3">
                <input
                    id="nom-categorie"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="flex-1 p-2 bg-transparent border rounded border-bleu-clair"
                />
                <button
                    type="submit"
                    disabled={enCours}
                    className="px-4 py-2 text-white rounded-md hover:text-black bg-bleu hover:bg-bleu-clair disabled:opacity-50"
                >
                    {enCours ? 'Création...' : 'Ajouter'}
                </button>
            </div>
            {erreur && <p className="text-sm text-red-400">{erreur}</p>}
            {message && <p className="text-sm text-green-400">{message}</p>}
        </form>
    );
};

export default FormAjoutCategorie;
