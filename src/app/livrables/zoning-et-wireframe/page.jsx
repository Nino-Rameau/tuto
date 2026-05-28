import Image from "next/image";

export const metadata = {
    title: "Zoning et Wireframe | NWS",
    description: "Découvrez les maquettes du site et l'organisation spatiale des pages.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://nws.nino-rameau.fr/livrables/zoning-et-wireframe",
    },
};

const pages = [
    {
        nom: "Accueil",
        zoning: "/documents/zoning-et-wireframe/zoning/accueil.JPG",
        wireframe: "/documents/zoning-et-wireframe/wireframe/accueil.png",
    },
    {
        nom: "Tutoriels",
        zoning: "/documents/zoning-et-wireframe/zoning/tutoriels.JPG",
        wireframe: "/documents/zoning-et-wireframe/wireframe/tutoriels.png",
    },
    {
        nom: "Contenu Tutoriel",
        zoning: "/documents/zoning-et-wireframe/zoning/tutoriels-slug.JPG",
        wireframe: "/documents/zoning-et-wireframe/wireframe/tutoriels-[slug].png",
    },
    {
        nom: "Admin",
        zoning: "/documents/zoning-et-wireframe/zoning/admin.JPG",
        wireframe: "/documents/zoning-et-wireframe/wireframe/admin.png",
    },
    {
        nom: "Admin - création de tutoriel",
        zoning: "/documents/zoning-et-wireframe/zoning/admin-nouveau-tuto.JPG",
        wireframe: "/documents/zoning-et-wireframe/wireframe/admin-nouveau.png",
    },
    {
        nom: "Profil",
        zoning: "/documents/zoning-et-wireframe/zoning/profil.JPG",
        wireframe: "/documents/zoning-et-wireframe/wireframe/profil.png",
    },
];

const ZoningEtWireframe = () => {
    return (
        <div className="flex flex-col gap-16 mx-auto max-w-[90%] lg:max-w-full mt-10 mb-16">

            <div className="flex flex-col gap-4 text-center">
                <h1>Zoning & Wireframe</h1>
                <p className="text-white mx-auto max-w-2xl">
                    Pour chaque page du site, retrouvez le zoning et le wireframe.
                </p>
                <p>Les pages sont :</p>
                <ul className="list-disc mx-auto text-left">
                    <li>Accueil</li>
                    <li>Tutoriels</li>
                    <li>Contenu Tutoriel</li>
                    <li>Admin</li>
                    <li>Admin - Création de tutoriel</li>
                    <li>Profil</li>
                </ul>
            </div>

            <div className="flex flex-col gap-20">
                {pages.map((page) => (
                    <section key={page.nom} className="flex flex-col items-center gap-6">

                        <h2 className="text-bleu-clair">{page.nom}</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-3">
                                <p className="uppercase text-white">Zoning</p>
                                <Image src={page.zoning} alt={`Zoning – ${page.nom}`} width={500} height={300} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <p className="uppercase text-white">Wireframe</p>
                                <Image src={page.wireframe} alt={`Wireframe – ${page.nom}`} width={500} height={300} />
                            </div>
                        </div>
                    </section>
                ))}
            </div>

        </div>
    );
};

export default ZoningEtWireframe;
