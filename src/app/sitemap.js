import prisma from "@/lib/prisma";

export default async function sitemap() {
    const tutos = await prisma.tuto.findMany({
        where: { statut: "en_ligne" },
        select: { 
            slug: true, 
            updated_at: true 
        },
    });

    const pages = [
        { 
            url: "https://nws.nino-rameau.fr", 
            changeFrequency: "weekly", 
            priority: 1 
        },
        { 
            url: "https://nws.nino-rameau.fr/tutoriels", 
            changeFrequency: "weekly", 
            priority: 0.9 
        },
    ];

    for (const tuto of tutos) {
        pages.push({
            url: `https://nws.nino-rameau.fr/tutoriels/${tuto.slug}`,
            lastModified: tuto.updated_at,
            changeFrequency: "monthly",
            priority: 0.8,
        });
    }

    return pages;
}
