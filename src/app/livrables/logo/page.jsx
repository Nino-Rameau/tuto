import Image from "next/image";

export const metadata = {
    title: "Logo | NWS",
    description: "Découvrez le logo NWS et ses déclinaisons.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://nws.nino-rameau.fr/livrables/logo",
    },
};

const couleurs = [
    { nom: "Bleu clair",       hex: "#acddf6", texte: "text-white" },
    { nom: "Bleu principal",   hex: "#4269b1", texte: "text-white" },
    { nom: "Bleu foncé",       hex: "#28337e", texte: "text-white" },
    { nom: "Bleu très foncé",  hex: "#000716", texte: "text-white" },
];

const Logo = () => {
    return (
        <div className="flex flex-col gap-20 mx-auto mt-10 mb-16 max-w-[90%] lg:max-w-full">

            <div className="flex flex-col text-center gap-4">
                <h1>Logo</h1>
                <p className="max-w-2xl mx-auto text-white">
                    Identité visuelle du projet NWS : logo, icône, palette de couleurs et typographie.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-bleu-clair">Logo</h2>
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex flex-col gap-2">
                        <p className="text-white">Sur fond sombre</p>
                        <div className="flex items-center justify-center p-10 border rounded-xl bg-bleu-fonce2 border-bleu">
                            <Image src="/img/logo.svg" alt="Logo NWS sur fond sombre" width={400} height={148} className="w-full h-auto max-w-xs" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-white">Sur fond clair</p>
                        <div className="flex items-center justify-center p-10 bg-white rounded-xl">
                            <Image src="/img/logo.svg" alt="Logo NWS sur fond clair" width={400} height={148} className="w-full h-auto max-w-xs" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-bleu-clair">Icône</h2>
                <p className="text-white">L&apos;ampoule est l&apos;icône principale du projet, utilisée comme mascotte du site.</p>
                <div className="flex flex-col gap-6 md:flex-row">
                    
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-white">sur fond sombre</p>
                        <div className="flex items-center justify-center p-10 border rounded-xl bg-bleu-fonce2 border-bleu">
                            <Image src="/img/ampoule.svg" alt="Icône ampoule sur fond sombre" width={120} height={128} className="w-auto h-32" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <p className="text-white">Sur fond clair</p>
                        <div className="flex items-center justify-center p-10 bg-white rounded-xl">
                            <Image src="/img/ampoule.svg" alt="Icône ampoule sur fond clair" width={120} height={128} className="w-auto h-32" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-bleu-clair">Palette de couleurs</h2>
                <div className="flex flex-col flex-wrap gap-6 md:flex-row">
                    {couleurs.map((couleur) => (
                        <div key={couleur.hex} className="flex flex-col overflow-hidden border border-white rounded-xl min-w-1/5">
                            <div className="h-24" style={{ backgroundColor: couleur.hex }} />

                            <div className="flex flex-col p-3 bg-bleu-fonce">
                                <p className="text-bleu-clair">{couleur.nom}</p>
                                <p>{couleur.hex}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-bleu-clair">Typographie</h2>
                <div className="flex flex-col md:flex-row gap-6">

                    <div className="flex flex-col p-6 gap-4 rounded-xl bg-bleu-fonce min-w-1/3">
                        <h3>Titres</h3>
                        <p className="text-2xl font-titre text-bleu-clair">Typographie : Orbitron</p>
                        <p className="font-titre">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Utilisée pour les titres.</p>
                    </div>
                    
                    <div className="flex flex-col p-6 gap-4 rounded-xl bg-bleu-fonce min-w-1/3">
                        <h3>Corps de texte</h3>
                        <p className="text-2xl text-bleu-clair">Typographie : Poppins</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Utilisée pour tous les textes, boutons.</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Logo;
