import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';

const dossier = process.cwd() + '/public/img/img-tuto';

const MIME = {
    '.jpg': 'image/jpeg', 
    '.jpeg': 'image/jpeg', 
    '.png': 'image/png',
    '.webp': 'image/webp', 
    '.gif': 'image/gif', 
    '.avif': 'image/avif',
    '.pdf': 'application/pdf', 
    '.mp4': 'video/mp4', 
    '.webm': 'video/webm',
};

export async function GET(_, { params }) {
    const chemin = dossier + '/' + (await params.path).join('/');

    if (!chemin.startsWith(dossier)) return new NextResponse(null, { status: 403 });

    try {
        const fichier = await readFile(chemin);
        const extension = '.' + chemin.split('.').pop();
        return new NextResponse(fichier, {
            headers: { 'Content-Type': MIME[extension] ?? 'application/octet-stream' },
        });
    } catch {
        return new NextResponse(null, { status: 404 });
    }
}
