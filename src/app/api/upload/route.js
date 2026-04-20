import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { verifierAdmin } from '@/lib/auth-controle';
import { verifierRateLimit } from '@/lib/rate-limit';

// ... x 1024 x 1024 permet de voir la valeur en Mo pour le type 
const TYPES_AUTORISES = {
    'image/jpeg':       { ext: ['.jpg', '.jpeg'],  maxOctets: 10 * 1024 * 1024 },
    'image/png':        { ext: ['.png'],           maxOctets: 10 * 1024 * 1024 },
    'image/webp':       { ext: ['.webp'],          maxOctets: 10 * 1024 * 1024 },
    'image/gif':        { ext: ['.gif'],           maxOctets: 10 * 1024 * 1024 },
    'image/avif':       { ext: ['.avif'],          maxOctets: 10 * 1024 * 1024 },
    'application/pdf':  { ext: ['.pdf'],           maxOctets: 20 * 1024 * 1024 },
    'video/mp4':        { ext: ['.mp4'],           maxOctets: 200 * 1024 * 1024 },
    'video/webm':       { ext: ['.webm'],          maxOctets: 200 * 1024 * 1024 },
    'video/ogg':        { ext: ['.ogg', '.ogv'],   maxOctets: 200 * 1024 * 1024 },
};

export async function POST(request) {
    const erreurConnexion = await verifierAdmin();
    if (erreurConnexion) return NextResponse.json({ error: erreurConnexion.error }, { status: 403 });

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim()
        ?? request.headers.get("x-real-ip")
        ?? "unknown";
    const limite = verifierRateLimit(`upload:${ip}`, { max: 20, fenetreMs: 60_000 });
    if (!limite.autorise) {
        return NextResponse.json({ error: `Trop de requêtes. Réessayez dans ${limite.attente}s.` }, { status: 429 });
    }

    const data = await request.formData();
    const fichier = data.get('upload');

    const slug = data.get('slug') || '';

    if (slug.includes('..')) {
        return NextResponse.json({ error: "Slug invalide." }, { status: 400 });
    }

    if (!fichier) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

    const typeAutorise = TYPES_AUTORISES[fichier.type];
    if (!typeAutorise) {
        return NextResponse.json({ error: "Type de fichier non autorisé. Formats acceptés : images, PDF, vidéos." }, { status: 400 });
    }

    const extensionFichier = path.extname(fichier.name).toLowerCase();
    if (!typeAutorise.ext.includes(extensionFichier)) {
        return NextResponse.json({ error: `Extension invalide pour ce type de fichier.` }, { status: 400 });
    }

    const bytes = await fichier.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length > typeAutorise.maxOctets) {
        const maxMo = typeAutorise.maxOctets / 1024 / 1024;
        return NextResponse.json({ error: `Fichier trop volumineux (max ${maxMo} Mo pour ce type).` }, { status: 413 });
    }

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