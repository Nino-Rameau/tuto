'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { creerTutoriel, mettreAJourTutoriel, creerCategorie } from '@/actions/tuto.actions';
import Image from 'next/image';
import { AiOutlineUpload } from "react-icons/ai"; 
import Btn from '../ui/Btn';
import InfoInputFormTuto from '../ui/InfoInputFormTuto';

const Ckeditor = dynamic(() => import('@/components/layout/Ckeditor'), { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center w-full border rounded-md text-bleu-clair border-bleu-clair h-125 animate-pulse">Chargement de l&apos;éditeur...</div>
});

const FormTuto = ({ categories, initialData = null }) => {
    const isEditMode = Boolean(initialData?.id);
    const [contenu, setContenu] = useState(initialData?.contenu || '');
    const [slugNom, setslugNom] = useState(initialData?.slug || '');
    const [FormEnCours, setFormEnCours] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [imagePreview, setImagePreview] = useState(null);
    const [nomFichier, setNomFichier] = useState('');
    const imagePreviewRef = useRef(null);

    const ChangementImg = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (imagePreviewRef.current) URL.revokeObjectURL(imagePreviewRef.current);
        const url = URL.createObjectURL(file);
        imagePreviewRef.current = url;
        setImagePreview(url);
        setNomFichier(file.name);
    };

    useEffect(() => {
        return () => { if (imagePreviewRef.current) URL.revokeObjectURL(imagePreviewRef.current); };
    }, []);

    const [listeCategories, setlisteCategories] = useState(categories);
    const [categorieId, setCategorieId] = useState(String(initialData?.tuto_categories?.[0]?.categorie_id || ''));
    const [afficherFormNouvelleCategorie, setAfficherFormNouvelleCategorie] = useState(false);
    const [nomNouvelleCategorie, setNomNouvelleCategorie] = useState('');
    const [creerCatEnCours, setCreerCatEnCours] = useState(false);
    const [erreurCategorie, setErreurCategorie] = useState('');

    useEffect(() => {
        setContenu(initialData?.contenu || '');
    }, [initialData]);

    const handleCreerCategorie = async () => {
        if (!nomNouvelleCategorie.trim()) return;
        setCreerCatEnCours(true);
        setErreurCategorie('');

        const result = await creerCategorie(nomNouvelleCategorie.trim());

        if (!result.success) {
            setErreurCategorie(result.error);
            setCreerCatEnCours(false);
            return;
        }

        setlisteCategories(prev => [...prev, result.categorie]);
        setCategorieId(String(result.categorie.id)); // Sélectionne automatiquement la nouvelle catégorie
        setNomNouvelleCategorie('');
        setAfficherFormNouvelleCategorie(false);
        setCreerCatEnCours(false);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formulaire = e.currentTarget;
        setError('');
        setMessage('');
        setFormEnCours(true);

        try {
            const formData = new FormData(formulaire);
            const imageFile = formData.get('image');
            let imageUrl = formData.get('currentImage') || '/img/placeholder-img.png';

            if (imageFile instanceof File && imageFile.size > 0) {
                const uploadBody = new FormData();
                uploadBody.append('upload', imageFile);
                uploadBody.append('slug', formData.get('slug'));

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadBody,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Erreur pendant l upload de l image.');
                }

                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult?.url || '';
            }

            const data = {
                id: formData.get('id'),
                titre: formData.get('titre'),
                preRequis: formData.get('prerequis'),
                chapo: formData.get('chapo'),
                intro: formData.get('introduction'),
                slug: formData.get('slug'),
                categorieId: formData.get('categorie'),
                statut: formData.get('statut'),
                image: imageUrl,
                MetaTitle: formData.get('MetaTitle'),
                MetaDescription: formData.get('MetaDescription'),
                contenu: contenu,
            };

            const result = isEditMode ? await mettreAJourTutoriel(data) : await creerTutoriel(data);

            if (!result.success) {
                throw new Error(result.error || 'Impossible de créer le tutoriel.');
            }

            setMessage(isEditMode ? 'Tutoriel mis à jour avec succès.' : 'Tutoriel créé avec succès.');

            if (!isEditMode) {
                formulaire.reset();
                setContenu('');
                setImagePreview(null);
                setNomFichier('');
            }
        } catch (submitError) {
            setError(submitError.message || 'Une erreur est survenue.');
        } finally {
            setFormEnCours(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {isEditMode ? <input type="hidden" name="id" value={initialData.id} /> : null}
            {isEditMode ? <input type="hidden" name="currentImage" value={initialData.image || ''} /> : null}

            <div className="py-1 gap-8 max-w-[95%] items-center rounded-md md:py-8 bg-bleu-fonce">
                <h2 className='px-8 pb-4'>Contenu du tutoriel :</h2>
                <div className='flex flex-col p-1 border-t md:flex-row md:p-8 md:gap-8'>
                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="titre" className="mb-1 font-semibold">Titre :</label>
                            <input type="text" id="titre" name="titre" required defaultValue={initialData?.titre || ''} className="p-2 border rounded border-bleu-clair" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="slug" className="mb-1 font-semibold">Slug :</label>
                            <input type="text" id="slug" name="slug" required value={slugNom} onChange={(e) => setslugNom(e.target.value)} className="p-2 border rounded border-bleu-clair"/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="categorie" className="mb-1 font-semibold">Catégorie :</label>
                            <div className="flex gap-2">
                                
                                <select id="categorie" name="categorie" required value={categorieId}
                                    onChange={(e) => setCategorieId(e.target.value)}
                                    className="flex-1 p-2 border rounded border-bleu-clair"
                                >
                                    <option value="">Choisir une catégorie...</option>
                                    {listeCategories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nom}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => { setAfficherFormNouvelleCategorie(v => !v); setErreurCategorie(''); setNomNouvelleCategorie(''); }}
                                    className="px-3 py-1 text-sm border rounded border-bleu-clair hover:bg-bleu/50"
                                >
                                    Créer une catégorie
                                </button>
                            </div>

                            {afficherFormNouvelleCategorie && (
                                <div className="flex flex-col gap-1 mt-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={nomNouvelleCategorie}
                                            onChange={(e) => setNomNouvelleCategorie(e.target.value)}
                                            placeholder="Nom de la catégorie"
                                            className="flex-1 p-2 border rounded border-bleu-clair"
                                            autoFocus
                                        />

                                        <button
                                            type="button"
                                            onClick={handleCreerCategorie}
                                            disabled={creerCatEnCours}
                                            className="px-3 py-1 text-sm border rounded border-bleu-clair hover:bg-bleu/50 disabled:opacity-50"
                                        >
                                            {creerCatEnCours ? 'Création...' : 'Créer'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => { setAfficherFormNouvelleCategorie(false); setNomNouvelleCategorie(''); setErreurCategorie(''); }}
                                            className="px-3 py-1 text-sm border rounded border-bleu-clair hover:bg-red-500"
                                        >
                                            Annuler
                                        </button>
                                        
                                    </div>
                                    {erreurCategorie && <p className="text-sm text-red-600">{erreurCategorie}</p>}
                                </div>
                            )}
                        </div>

                        <label htmlFor="image" className="mb-1 font-semibold">Image :</label>
                        <div className="h-full min-w-min md:w-[50%] rounded-lg bg-gray-50 justify-center items-center">
                            <div className="relative flex flex-col items-center justify-center h-full gap-2 p-4">
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Aperçu" width={120} height={120} className="object-cover rounded" />
                                        <span className="text-sm font-semibold text-center text-green-700 break-all">{nomFichier}</span>
                                        <span className="text-xs text-bleu-fonce">Cliquer pour changer</span>
                                    </>
                                ) : isEditMode && initialData?.image ? (
                                    <>
                                        <AiOutlineUpload className='w-12 h-auto text-bleu-fonce'/>
                                        <span className="font-semibold text-center text-bleu-fonce">Cliquer pour changer l&apos;image</span>
                                        <div className='flex flex-row items-center gap-5'>
                                            <p className="mt-1 text-sm text-bleu-fonce">Image actuelle :</p>
                                            <Image src={initialData.image} alt="Image actuelle du tutoriel" width={75} height={75} className="object-cover mt-2 rounded" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <AiOutlineUpload className='w-12 h-auto text-bleu-fonce'/>
                                        <span className="font-semibold text-bleu-fonce">Cliquer pour ajouter une image</span>
                                        <span className="text-xs text-bleu-fonce">JPG, PNG, WEBP...</span>
                                    </div>
                                )}
                                <input type="file" name="image" id="image" accept='image/*' onChange={ChangementImg} className="absolute w-full h-full opacity-0 cursor-pointer" />
                            </div>
                        </div>
                        
                    </div>

                    <div className="flex flex-col flex-1 gap-4">
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2 pb-2">
                                <label htmlFor="prerequis" className="font-semibold">Prérequis :</label>
                                <InfoInputFormTuto texte="Ce champ est facultatif, saisis un prerequis par ligne, sans point ou tiret, il seront ajoutés automatiquement." />
                            </div>
                            <textarea
                                id="prerequis"
                                name="prerequis"
                                rows="4"
                                defaultValue={initialData?.pre_requis || ''}
                                className="p-2 border rounded border-bleu-clair"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2 pb-2">
                                <label htmlFor="chapo" className="font-semibold">Chapo :</label>
                                <InfoInputFormTuto texte="Affiché comme mini introduction pensée CTA. Doit faire max 200 caractères." />
                            </div>

                            <textarea id="chapo" name="chapo" rows="3" required defaultValue={initialData?.chapo || ''} className="p-2 border rounded border-bleu-clair"></textarea>
                        </div>
                        
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-2 pb-2">
                                <label htmlFor="introduction" className="font-semibold">Introduction :</label>
                                <InfoInputFormTuto texte="Introduction affiché sous le chapo sur la page du tutoriel. Plus détaillé que le chapo, visible uniquement sur la page du tutoriel." />
                            </div>
                            <textarea id="introduction" name="introduction" rows="7" required defaultValue={initialData?.intro || ''} className="p-2 border rounded border-bleu-clair"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-8 max-w-[95%] rounded-md bg-bleu-fonce'>
                <h2 className='px-8 pb-4'>Balise meta pour le SEO du tutoriel :</h2>
                <div className='flex flex-col justify-between gap-8 px-8 pt-4 border-t md:flex-row'>
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-row items-center gap-2 pb-2">
                            <label htmlFor="MetaTitle" className="font-semibold">Title :</label>
                            <InfoInputFormTuto texte="Doit contenir les mots-clés principaux du tutoriel et donner envie de cliquer. Doit faire environ 60 caractères." />
                        </div>
                        <input type="text" id="MetaTitle" name="MetaTitle" required defaultValue={initialData?.MetaTitle || ''} className="p-2 border rounded border-bleu-clair" />
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-row items-center gap-2 pb-2">
                            <label htmlFor="MetaDescription" className="font-semibold">Meta description :</label>
                            <InfoInputFormTuto texte="Résumé du contenu du tutoriel qui doit donner envie de cliquer. Doit faire environ 150 caractères." />
                        </div>
                        <textarea id="MetaDescription" name="MetaDescription" rows="2" required defaultValue={initialData?.MetaDescription || ''} className="p-2 border rounded border-bleu-clair"></textarea>
                    </div>
                </div>
            </div>

            <div className="flex max-w-[95%] flex-col mt-4">
                <label htmlFor="contenu" className="mb-1 font-semibold">Contenu :</label>
                <Ckeditor value={contenu} onChange={setContenu} slug={slugNom} />
            </div>
            
            <div className="flex flex-col max-w-75">
                <label htmlFor="statut" className="mb-1 font-semibold">Statut :</label>
                <select id="statut" name="statut" defaultValue={initialData?.statut || 'brouillon'} className="p-2 border rounded border-bleu-clair bg-bleu-fonce2">
                    <option value="brouillon">Brouillon</option>
                    <option value="en_ligne">En ligne</option>
                </select>
            </div>

            <div className='flex flex-col gap-12 md:flex-row'>
                <button type="submit" disabled={FormEnCours} className='p-2 text-center rounded-md bg-bleu-fonce hover:bg-bleu'>
                    {FormEnCours && (isEditMode ? 'Mise à jour en cours...' : 'Création en cours...')}
                    
                    {!FormEnCours && (isEditMode ? 'Mettre à jour le tutoriel' : 'Créer le tutoriel')}
                </button>

                {isEditMode && initialData?.slug ? (
                    <Btn lien={`/tutoriels/${initialData.slug}`} target='__blank' variante='secondaire'>
                        Voir le tutoriel
                    </Btn>
                ) : null}

                <Btn lien="/admin" variante='secondaire'>
                    Retour à la liste
                </Btn>
            </div>

            {error ? <p className="font-medium text-red-600">{error}</p> : null}
            {message ? <p className="font-medium text-green-700">{message}</p> : null}
        </form>
    );
};

export default FormTuto;