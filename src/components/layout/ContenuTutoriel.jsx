'use client';

import { useState } from 'react';
import { demarrerTutoriel, validerTutoriel } from '@/actions/progression.action';

export default function ContenuTutoriel({ tutoId, slug, contenuFormater, etatInitialTuto }) {
    
    const [etatTuto, setEtatTuto] = useState(etatInitialTuto || null);
    const [erreur, setErreur] = useState('');
    const [enChargement, setEnChargement] = useState(false);

    const estCommence = (etatTuto === 'en_cours') || (etatTuto === 'termine');
    const estTermine = etatTuto === 'termine';

    const demarrerTuto = async () => {
        setErreur('');
        setEnChargement(true);

        try {
            const result = await demarrerTutoriel(tutoId, slug);

            if (!result?.success) {
                setErreur(result?.error || 'Une erreur est survenue.');
            } else {
                setEtatTuto('en_cours');
            }
        } catch (err) {
            setErreur('Erreur inattendue.');
        } finally {
            setEnChargement(false);
        }
    };

    const TerminerTuto = async () => {
        setErreur('');
        setEnChargement(true);

        try {
            const result = await validerTutoriel(tutoId, slug);

            if (!result?.success) {
                setErreur(result?.error || 'Une erreur est survenue.');
            } else {
                setEtatTuto('termine');
            }
        } catch (err) {
            setErreur('Erreur inattendue.');
        } finally {
            setEnChargement(false);
        }
    };

    return (
        <>
            {!estCommence ? (
                <button
                    type="button"
                    onClick={demarrerTuto}
                    disabled={enChargement}
                    className="bg-bleu text-white p-3 rounded-full cursor-pointer hover:bg-bleu-fonce"
                >
                    {enChargement ? 'Démarrage...' : 'Démarrer le tutoriel'}
                </button>
            ) : null}


            {estCommence ? (
                <section dangerouslySetInnerHTML={{ __html: contenuFormater }} />
            ) : null}


            {estCommence && !estTermine ? (
                <button
                    type="button"
                    onClick={TerminerTuto}
                    disabled={enChargement}
                    className="bg-bleu text-white p-3 rounded-full cursor-pointer hover:bg-bleu-fonce"
                >
                    {enChargement ? 'Validation en cours...' : 'Terminer le tutoriel'}
                </button>
            ) : null}

            {estTermine ? (
                <p className="text-bleu-fonce font-semibold">Tutoriel terminé.</p>
            ) : null}

            {erreur ? <p className="text-red-600 font-medium">{erreur}</p> : null}
        </>
    );
}