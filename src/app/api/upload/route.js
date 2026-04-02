import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
    const data = await request.formData();
    const fichier = data.get('upload'); 
    
    const slug = data.get('slug') || '';

    if (!fichier) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

    const estUneImage = fichier.type.startsWith('image/');
    const estUnPdf = fichier.type === 'application/pdf';

    if (!estUneImage && !estUnPdf) {
        return NextResponse.json({ error: "Seuls les images et les PDF sont autorisés" }, { status: 400 });
    }

    const bytes = await fichier.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cheminFichier = Date.now() + '-' + fichier.name.replaceAll(' ', '_');
    
    const dossierCible = path.join(process.cwd(), 'public/img', slug);

    try {
        await mkdir(dossierCible, { recursive: true });

        const filePath = path.join(dossierCible, cheminFichier);

        await writeFile(filePath, buffer);
        
        const urlFinale = slug ? `/img/${slug}/${cheminFichier}` : `/img/${cheminFichier}`;
        
        return NextResponse.json({ url: urlFinale });
        
    } catch (error) {
        console.error("Erreur d'écriture :", error);
        return NextResponse.json({ error: "Erreur serveur lors de la sauvegarde" }, { status: 500 });
    }
}