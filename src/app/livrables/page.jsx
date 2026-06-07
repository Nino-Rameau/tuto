import { FaBullhorn, FaMagnifyingGlass, FaFileLines, FaBookOpen, FaPalette, FaChartBar, FaSwatchbook, FaObjectGroup, FaPersonWalking } from "react-icons/fa6";
import CarteLivrable from "@/components/ui/CarteLivrable";

export const metadata = {
    title: "Livrables | NWS",
    description: "Découvrez les livrables disponibles pour ce projet.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://nws.nino-rameau.fr/livrables",
    },
};

const Livrables = () => {
    return (
        <div className="flex flex-col gap-16 mx-auto max-w-[90%] lg:max-w-full mt-10 mb-16">

            <div className="flex flex-col text-center gap-4">
                <h1>Livrables</h1>
                <p className="mx-auto text-white">
                    Retrouvez ici l&apos;ensemble des documents et pages dans le cadre du projet de semestre 2.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                <CarteLivrable
                    titre="Cahier des charges"
                    description="Document fixant les limites du projet : objectifs, contraintes techniques, arborescence, technologies..."
                    icone={<FaBookOpen className="text-3xl text-bleu-clair" />}
                    lien="/documents/cahier-des-charges.pdf"
                    externe
                    TexteBtn="Voir le cachier des charges"
                />

                <CarteLivrable
                    titre="Moodboard"
                    description="Planche d'ambiance visuelle du projet : couleurs, typographies, images..."
                    icone={<FaSwatchbook className="text-3xl text-bleu-clair" />}
                    lien="/documents/moodboard.pdf"
                    externe
                    TexteBtn="Voir le moodboard"
                />

                <CarteLivrable
                    titre="Zoning et Wireframe"
                    description="Représentation visuelle de la structure du site"
                    icone={<FaObjectGroup className="text-3xl text-bleu-clair" />}
                    lien="/livrables/zoning-et-wireframe"
                    TexteBtn="Voir les zoning et wireframe"
                />

                <CarteLivrable
                    titre="Logo"
                    description="Création du logo NWS : logo, déclinaisons, typographie..."
                    icone={<FaPalette className="text-3xl text-bleu-clair" />}
                    lien="/livrables/logo"
                    TexteBtn="Voir le logo"
                />  

                <CarteLivrable
                    titre="Parcours utilisateur"
                    description="Modélisation du parcours utilisateur type : étapes clés, points de friction et opportunités."
                    icone={<FaPersonWalking className="text-3xl text-bleu-clair" />}
                    lien="/documents/parcours-utilisateur.pdf"
                    externe
                    TexteBtn="Voir le parcours utilisateur"
                />

                <CarteLivrable
                    titre="Étude de cas site concurrent"
                    description="Analyse comparative d'un site concurrent : points forts, points faibles..."
                    icone={<FaChartBar className="text-3xl text-bleu-clair" />}
                    lien="/documents/etude-de-cas-concurent.pdf"
                    externe
                    TexteBtn="Voir l'étude de cas"
                />

                <CarteLivrable
                    titre="Support de communication"
                    description="Stratégie éditoriale : choix du réseau social, charte éditoriale et calendrier éditorial."
                    icone={<FaBullhorn className="text-3xl text-bleu-clair" />}
                    lien="/livrables/support-de-communication"
                    TexteBtn="Voir le support de communication"
                />

                <CarteLivrable
                    titre="Audit SEO"
                    description="Analyse complète du référencement naturel : mots-clés, performance technique..."
                    icone={<FaMagnifyingGlass className="text-3xl text-bleu-clair" />}
                    lien="/documents/audit-seo.pdf"
                    externe
                    TexteBtn="Voir l'audit SEO"
                />

                <CarteLivrable
                    titre="Rapport de tests"
                    description="Scénarios testés, bugs identifiés et corrections apportées."
                    icone={<FaFileLines className="text-3xl text-bleu-clair" />}
                    lien="/documents/rapport-de-test.pdf"
                    externe
                    TexteBtn="Voir le rapport de test"
                />


            </div>

        </div>
    );
};

export default Livrables;
