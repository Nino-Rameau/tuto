'use client';

import { useState } from 'react';
import { supprimerCategorie } from '@/actions/tuto.actions';

const BtnSuppCategorie = ({ id, nom }) => {
    const [enCours, setEnCours] = useState(false);
    const [erreur, setErreur] = useState('');

    const handleSupprimer = async () => {
        const confirme = window.confirm(`Supprimer la catégorie "${nom}" ? Les tutoriels liés ne seront pas supprimés.`);
        if (!confirme) return;

        setEnCours(true);
        setErreur('');

        const result = await supprimerCategorie(id);

        if (!result.success) {
            setErreur(result.error || 'Suppression impossible.');
            setEnCours(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleSupprimer}
                disabled={enCours}
                className="px-3 py-1 text-sm text-white bg-red-700 hover:bg-red-800 rounded-md disabled:opacity-50"
            >
                {enCours ? 'Suppression...' : 'Supprimer'}
            </button>
            {erreur && <p className="text-xs text-red-400">{erreur}</p>}
        </>
    );
};

export default BtnSuppCategorie;
