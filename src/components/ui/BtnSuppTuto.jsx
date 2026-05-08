'use client';

import { useState } from 'react';
import { supprimerTutoriel } from '@/actions/tuto.actions';

const BtnSuppTuto = ({ id, titre }) => {
    
    const [enCours, setEnCours] = useState(false);
    const [erreur, setErreur] = useState('');

    const SuppTuto = async () => {
        const confirme = window.confirm(`Confirmer la suppression du tutoriel "${titre}" ?`);
        if (!confirme) return;

        setEnCours(true);
        setErreur('');

        const result = await supprimerTutoriel(id);

        if (!result.success) {
            setErreur(result.error || 'Suppression impossible.');
            setEnCours(false); 
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={SuppTuto}
                disabled={enCours}
                className="px-4 py-2 text-center text-white bg-red-700 hover:bg-red-800 rounded-xl"
            >
                {enCours ? 'Suppression...' : 'Supprimer'}
            </button>
            {erreur && <p className="text-xs text-red-700">{erreur}</p>}
        </>
    );
};

export default BtnSuppTuto;