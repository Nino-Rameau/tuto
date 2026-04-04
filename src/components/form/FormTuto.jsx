'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { creerTutoriel, mettreAJourTutoriel } from '@/actions/tuto.actions';
import Image from 'next/image';
import { AiOutlineUpload } from "react-icons/ai"; 

const Ckeditor = dynamic(() => import('@/components/layout/Ckeditor'), { 
    ssr: false,
    loading: () => <div className="h-125 w-full bg-gray-100 animate-pulse rounded-md border border-gray-300 flex items-center justify-center text-gray-400">Chargement de l&#39;éditeur...</div>
});

const FormTuto = ({ categories, initialData = null }) => {
    const isEditMode = Boolean(initialData?.id);
    const [contenu, setContenu] = useState(initialData?.contenu || '');
    const [FormEnCours, setFormEnCours] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setContenu(initialData?.contenu || '');
    }, [initialData]);
    
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

            <div className="gap-8 py-1 md:py-8 bg-bleu-clair/30">
                <h2 className='px-8 pb-4'>Contenu du tutoriel :</h2>
                <div className='flex flex-col md:flex-row p-1 md:p-8 border-t md:gap-8'>
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex flex-col">
                            <label htmlFor="titre" className="font-semibold mb-1">Titre :</label>
                            <input type="text" id="titre" name="titre" required defaultValue={initialData?.titre || ''} className="border border-gray-400 p-2 rounded" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="slug" className="font-semibold mb-1">Slug :</label>
                            <input type="text" id="slug" name="slug" required defaultValue={initialData?.slug || ''} className="border border-gray-400 p-2 rounded"/>
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="categorie" className="font-semibold mb-1">Catégorie :</label>
                            <select id="categorie" name="categorie" required defaultValue={String(initialData?.tuto_categories?.[0]?.categorie_id || '')} className="border border-gray-400 p-2 rounded">
                                <option value="">Choisir une catégorie...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label htmlFor="image" className="font-semibold mb-1">Image :</label>
                        <div className="h-50 md:h-40 min-w-min md:w-[50%] rounded-lg border-2 border-bleu-fonce bg-gray-50 justify-center items-center">
                            <div className="flex flex-col items-center justify-center">
                                {isEditMode && initialData?.image ? (
                                    <>
                                        <AiOutlineUpload className='w-12 h-auto text-bleu-fonce'/>
                                        <span className="text-gray-500 font-semibold text-center">Ajouté ici pour changer l image</span>
                                        <div className='flex flex-row gap-5 items-center'>
                                            <p className="text-sm text-gray-600 mt-1">Image actuelle :</p>
                                            <Image src={initialData.image} alt="Image actuelle du tutoriel" width={75} height={75} className="mt-2 rounded object-cover" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineUpload className='w-12 h-auto text-bleu-fonce'/>
                                        <span className="text-gray-500 font-semibold">Ajouté l image ici</span>
                                    </>
                                )}
                            </div>
                            <input type="file" name="image" id="image" accept='image/*' className="opacity-0 cursor-pointer" />
                        </div>
                        
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <div className="flex flex-col">
                            <label htmlFor="prerequis" className="font-semibold mb-1">Prérequis :</label>
                            <textarea
                                id="prerequis"
                                name="prerequis"
                                rows="4"
                                defaultValue={initialData?.pre_requis || ''}
                                className="border border-gray-400 p-2 rounded"
                            />
                            <p className="text-xs text-gray-600 mt-1">Saisis un prerequis par ligne, sans point ou tiret, il seront ajooutés automatiquement.</p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="chapo" className="font-semibold mb-1">Chapo :</label>
                            <textarea id="chapo" name="chapo" rows="3" required defaultValue={initialData?.chapo || ''} className="border border-gray-400 p-2 rounded"></textarea>
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="introduction" className="font-semibold mb-1">Introduction :</label>
                            <textarea id="introduction" name="introduction" rows="5" required defaultValue={initialData?.intro || ''} className="border border-gray-400 p-2 rounded"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-8 bg-bleu-clair/30'>
                <h2 className='px-8 pb-4'>Balise meta pour le SEO du tutoriel :</h2>
                <div className='flex flex-col md:flex-row justify-between gap-8 border-t px-8 pt-4'>
                    <div className="flex flex-col flex-1">
                        <label htmlFor="MetaTitle" className="font-semibold mb-1">Title :</label>
                        <input type="text" id="MetaTitle" name="MetaTitle" required defaultValue={initialData?.MetaTitle || ''} className="border border-gray-400 p-2 rounded" />
                    </div>
                    
                    <div className="flex flex-col flex-1">
                        <label htmlFor="MetaDescription" className="font-semibold mb-1">Meta description :</label>
                        <textarea id="MetaDescription" name="MetaDescription" rows="2" required defaultValue={initialData?.MetaDescription || ''} className="border border-gray-400 p-2 rounded"></textarea>
                    </div>
                </div>
            </div>

            <div className="flex flex-col mt-4">
                <label htmlFor="contenu" className="font-semibold mb-1">Contenu :</label>
                <Ckeditor value={contenu} onChange={setContenu} />
            </div>
            
            <div className="flex flex-col max-w-75">
                <label htmlFor="statut" className="font-semibold mb-1">Statut :</label>
                <select id="statut" name="statut" defaultValue={initialData?.statut || 'brouillon'} className="border border-gray-400 p-2 rounded bg-white">
                    <option value="brouillon">Brouillon</option>
                    <option value="en_ligne">En ligne</option>
                </select>
            </div>

            <div className='flex flex-col md:flex-row gap-12'>
                <button type="submit" disabled={FormEnCours} className='bg-bleu-clair/30 text-black p-2 rounded-md hover:bg-bleu-fonce hover:text-white text-center'>
                    {FormEnCours && (isEditMode ? 'Mise à jour en cours...' : 'Création en cours...')}
                    
                    {!FormEnCours && (isEditMode ? 'Mettre à jour le tutoriel' : 'Créer le tutoriel')}
                </button>

                {isEditMode && initialData?.slug ? (
                    <Link href={`/tutoriel/${initialData.slug}`} target='__blank' className='bg-bleu-clair/30 text-black p-2 rounded-md hover:bg-bleu-fonce hover:text-white text-center'>
                        Voir le tutoriel
                    </Link>
                ) : null}

                <Link href="/admin" className='bg-bleu-clair/30 text-black p-2 rounded-md hover:bg-bleu-fonce hover:text-white text-center'>
                    Aller à la page liste
                </Link>
            </div>

            {error ? <p className="text-red-600 font-medium">{error}</p> : null}
            {message ? <p className="text-green-700 font-medium">{message}</p> : null}
        </form>
    );
};

export default FormTuto;