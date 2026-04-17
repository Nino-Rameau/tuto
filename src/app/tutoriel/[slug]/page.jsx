import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { auth} from "@/auth";
import FormConnexion from "@/components/form/FormConnexion";
import ContenuTutoriel from "@/components/layout/ContenuTutoriel";

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
        <div class="w-full my-8 aspect-video">
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

    let etatInitialTuto = null;

    if (session?.user?.email) {
        const progression = await prisma.progression.findFirst({
            where: {
                tuto_id: tuto.id,
                utilisateur: {
                    email: session.user.email,
                },
            },
            select: {
                etat: true,
            },
        });

        etatInitialTuto = progression?.etat || null;
    }

    const contenuFormater = formatContenu(tuto.contenu);
    const preRequis = extrairePreRequis(tuto.pre_requis);

    return (
        <article className="p-5 mx-auto space-y-4 max-w-7xl">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="md:max-w-[70%] flex flex-col gap-4">
                    <h1>{tuto.titre}</h1>
                    <p className="italic text-gray-700">{tuto.chapo}</p>
                    
                    <ul className="flex flex-wrap gap-2">
                        {tuto.tuto_categories.map((item) => (
                            <li key={item.categorie_id} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full">
                            {item.categorie.nom}
                        </li>
                        ))}
                    </ul>
                </div>

                {preRequis.length > 0 ? (
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="mb-2">Prerequis :</p>
                        <ul className="pl-5 list-disc">
                            {preRequis.map((item, index) => (
                                <li key={`${item}-${index}`}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="mb-2">Prerequis :</p>
                        <p>Aucun prérequis nécessaire pour ce tutoriel.</p>
                    </div>
                )}
            </div>

            <div className="p-4 my-6 border-l-4 border-blue-500 rounded-lg bg-blue-50">
                <p>Introduction :</p>
                <p>{tuto.intro}</p>
            </div>

            {session ? (
                <>
                    <ContenuTutoriel
                        tutoId={tuto.id}
                        slug={tuto.slug}
                        contenuFormater={contenuFormater}
                        etatInitialTuto={etatInitialTuto}
                    />
                </>
            ) : (
                <div className="flex flex-col gap-4">
                    <h2>Vous devez être connecté pour accéder au contenu du tutoriel.</h2>
                    <div>
                        <FormConnexion />
                    </div>
                </div>
            )}

        </article>
    );
}