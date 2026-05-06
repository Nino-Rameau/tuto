'use client';

import { useState, useEffect } from 'react';
import { demarrerTutoriel, validerTutoriel } from '@/actions/progression.action';

export default function ContenuTutoriel({ tutoId, slug, contenuFormater, etatInitialTuto }) {
    
    const [etatTuto, setEtatTuto] = useState(etatInitialTuto || null);

    useEffect(() => {
        const pres = document.querySelectorAll('.tutoriel-contenu pre');
        pres.forEach((pre) => {
            if (pre.querySelector('.copy-btn')) return;
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.textContent = 'Copier';
            btn.addEventListener('click', async () => {
                const texte = pre.querySelector('code')?.textContent ?? pre.textContent;
                await navigator.clipboard.writeText(texte);
                btn.textContent = 'Copié !';
                setTimeout(() => { btn.textContent = 'Copier'; }, 2000);
            });
            pre.appendChild(btn);
        });
    }, [etatTuto]);
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
                    className="p-3 text-white rounded-full cursor-pointer bg-bleu hover:bg-bleu-fonce"
                >
                    {enChargement ? 'Démarrage...' : 'Démarrer le tutoriel'}
                </button>
            ) : null}


            {estCommence ? (
                <section className="tutoriel-contenu" dangerouslySetInnerHTML={{ __html: contenuFormater }} />
            ) : null}


            {estCommence && !estTermine ? (
                <button
                    type="button"
                    onClick={TerminerTuto}
                    disabled={enChargement}
                    className="p-3 text-white rounded-full cursor-pointer bg-bleu hover:bg-bleu-fonce"
                >
                    {enChargement ? 'Validation en cours...' : 'Terminer le tutoriel'}
                </button>
            ) : null}

            {estTermine ? (
                <p className="font-semibold text-bleu-fonce">Tutoriel terminé.</p>
            ) : null}

            {erreur ? <p className="font-medium text-red-600">{erreur}</p> : null}
        </>
    );
}