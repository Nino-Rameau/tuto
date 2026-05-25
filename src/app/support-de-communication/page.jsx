import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import Btn from "@/components/ui/Btn";
import BlocIconeTexte from "@/components/ui/BlocIconeTexte";

export const metadata = {
    title: "Support de communication | NWS",
    description: "Découvrez pourquoi Instagram est notre principal canal de communication et téléchargez nos documents éditoriaux.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://nws.nino-rameau.fr/support-de-communication",
    },
};

const SupportDeCommunication = () => {
    return (
        <div className="flex flex-col gap-10 mx-auto max-w-[90%] lg:max-w-full mt-10">

            <h1 className="text-center"> Support de communication </h1>

            <div className="flex flex-col gap-5">
                <h2 className="text-bleu-clair"> Pourquoi Instagram ?</h2>

                <p>Pour ce projet, Instagram s&apos;est imposé comme le réseau de communication le plus pertinent pour toucher notre audience cible. Instagram est la plateforme sociale privilégiée des 18-30 ans, qui représentent la majorité des apprenants en formation professionnelle et technique. </p>

                <p> Le format visuel d&apos;Instagram est particulièrement adapté à la communication autour de tutoriels : les publications en carrousel permettent de présenter des étapes pas-à-pas, les Reels offrent la possibilité de montrer des démonstrations courtes et engageantes, tandis que les Stories servent à diffuser des annonces et maintenir un lien régulier avec la communauté. Ce triptyque de formats couvre l&apos;ensemble de nos besoins éditoriaux. </p>

                <p> Enfin, Instagram est gratuit, ne nécessite aucune infrastructure technique supplémentaire et s&apos;intègre naturellement dans les habitudes numériques de notre audience. Il constitue ainsi le meilleur compromis entre portée, coût et adéquation au public visé dans le contexte de ce projet scolaire. </p>
            </div>

            <div className="flex flex-col gap-5">
                <h2 className="text-bleu-clair"> Pourquoi pas un autre réseau social ?</h2>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <BlocIconeTexte
                        titre="Twitter/X"
                        texte="Les publications sont souvent trop courtes pour expliquer clairement un tutoriel ou détailler plusieurs étapes."
                        icone={<FaSquareXTwitter className="text-4xl text-white" />}
                    />
                    
                    <BlocIconeTexte
                        titre="TikTok"
                        texte="Le contenu vidéo demande plus de temps de production et le format est moins adapté à des explications détaillées."
                        icone={<AiFillTikTok className="text-4xl text-white" />}
                    />
                    
                    <BlocIconeTexte
                        titre="LinkedIn"
                        texte="Le réseau est davantage orienté vers le monde professionnel et correspond moins aux habitudes des étudiants et des débutants."
                        icone={<FaLinkedin className="text-4xl text-white" />}
                    />
                    
                    <BlocIconeTexte
                        titre="Youtube"
                        texte="La plateforme est adaptée aux tutoriels vidéo longs, mais demande une production plus importante pour publier régulièrement."
                        icone={<FaYoutube className="text-4xl text-white" />}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <h2 className="text-bleu-clair"> Documents à télécharger </h2>

                <p> Retrouvez ci-dessous les deux documents qui structurent notre stratégie éditoriale sur Instagram : </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Btn lien="/document/charte-editoriale.pdf" target="_blank">
                        Télécharger la charte éditoriale
                    </Btn>

                    <Btn lien="/document/calendrier-editorial.pdf" target="_blank">
                        Télécharger le calendrier éditorial
                    </Btn>
                </div>
            </div>

            <div>
                <h2 className="text-bleu-clair">Visuel des publications</h2>
            </div>
        </div>
    );
};

export default SupportDeCommunication;
