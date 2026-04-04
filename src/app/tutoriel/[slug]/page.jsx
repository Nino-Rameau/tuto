import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth} from "@/auth";

function extraireIdYoutube(urlVideo) {
    try {
        if (urlVideo.includes("youtube.com")) {
            return urlVideo.split("?v=")[1]; 
        }
        return null;
    } catch {
        return null;
    }
}

function formatContenu(html) {
    if (!html) return "";

    const oembedRegex = /<figure class="media">\s*<oembed url="([^"]+)"><\/oembed>\s*<\/figure>|<oembed url="([^"]+)"><\/oembed>/g;

    return html.replace(oembedRegex, (_, url1, url2) => {
        const url = url1 || url2;
        const videoId = extraireIdYoutube(url);

        if (!videoId) {
            return "";
        }

        return `
        <div class="aspect-video my-8 w-full">
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/${videoId}" 
                title="vidéo YouTube" 
                allowfullscreen
            </iframe>
        </div>
        `;
    });
}

function extrairePreRequis(texte) {
    if (!texte) {
        return [];
    }

    return texte.split("\n").filter(Boolean);
}

export async function generateStaticParams() {
    const tutos = await prisma.tuto.findMany({
        select: { slug: true },
        where: { statut: "en_ligne" },
    });
    return tutos.map((tuto) => ({ slug: tuto.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tuto = await prisma.tuto.findUnique({
        where: { slug },
        select: {
            MetaTitle: true,
            MetaDescription: true,
        },
    });

    if (!tuto) return { title: "Tutoriel introuvable" };

    return {
        title: tuto.MetaTitle || `${tuto.titre} | tuto`,
        description: tuto.MetaDescription || tuto.chapo,
    };
}

export default async function TutorielDetailPage({ params }) {
    const session = await auth();
    const { slug } = await params;

    const tuto = await prisma.tuto.findUnique({
        where: { slug },
        include: {
        tuto_categories: {
            include: {
            categorie: true,
            },
        },
        },
    });

    if (!tuto || tuto.statut !== "en_ligne") {
        notFound();
    }

    const contenuFormate = formatContenu(tuto.contenu);
    const preRequis = extrairePreRequis(tuto.pre_requis);

    return (
        <article className="max-w-7xl mx-auto p-5 space-y-4">
            <div className="flex flex-row justify-between">
                <div className="max-w-[70%]">
                    <h1>{tuto.titre}</h1>
                    <p className="text-gray-700 italic">{tuto.chapo}</p>
                    
                    <ul className="flex flex-wrap gap-2">
                        {tuto.tuto_categories.map((item) => (
                            <li key={item.categorie_id} className="bg-gray-100 border border-gray-300 rounded-full px-3 py-1">
                            {item.categorie.nom}
                        </li>
                        ))}
                    </ul>
                </div>

                {preRequis.length > 0 ? (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="mb-2">Prerequis :</p>
                        <ul className="list-disc pl-5">
                            {preRequis.map((item, index) => (
                                <li key={`${item}-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 my-6">
                <p>Introduction :</p>
                <p>{tuto.intro}</p>
            </div>

            {session ? (
                <>
                <section
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: contenuFormate }}
                />

                <button className="bg-gray-800 text-white p-3 rounded-full cursor-pointer hover:bg-gray-700">
                    Terminer le tutoriel
                </button>
                </>
            ) : (
                <div>
                    <p className="text-red-500 text-4xl bg-gray-500 p-5">Vous devez être connecté pour voir le contenu du tutoriel.</p>
                </div>
            )}

        </article>
    );
}