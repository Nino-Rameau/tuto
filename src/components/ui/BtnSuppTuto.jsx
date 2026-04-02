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
                className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded-xl text-center"
            >
                {enCours ? 'Suppression...' : 'Supprimer'}
            </button>
            {erreur && <p className="text-xs text-red-700">{erreur}</p>}
        </>
    );
};

export default BtnSuppTuto;