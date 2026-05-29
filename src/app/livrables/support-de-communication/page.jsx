import { FaSquareXTwitter } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube, FaLinkedin } from "react-icons/fa";
import Btn from "@/components/ui/Btn";
import BlocIconeTexte from "@/components/ui/BlocIconeTexte";
import Image from "next/image";

export const metadata = {
    title: "Support de communication | NWS",
    description: "Découvrez pourquoi Instagram est notre principal canal de communication et téléchargez nos documents éditoriaux.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://nws.nino-rameau.fr/livrables/support-de-communication",
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
                    <Btn lien="/documents/charte-editoriale.pdf" target="_blank">
                        Télécharger la charte éditoriale
                    </Btn>

                    <Btn lien="/documents/calendrier-editorial.pdf" target="_blank">
                        Télécharger le calendrier éditorial
                    </Btn>
                </div>
            </div>

            <div>
                <h2 className="text-bleu-clair">Visuel des publications</h2>

                <div className="flex flex-col gap-20">
                    <div className="flex flex-col gap-4 min-w-4/5: items-center">
                        <h3 className="text-bleu-clair text-center">Publication longue : </h3>
                        <Image src="/documents/posts/publication-longue/post.png" alt="Visuel d'une publication longue." width={500} height={500} />
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <p className="text-bleu-clair">Justification avec la ligne éditoriale : </p>
                            <p>
                                Le format image unique avec description longue est adapté à ce sujet : le tableau visuel pose les bases, la description développe. Les concepts sont expliqués mais le mode opératoire reste sur le site pour générer du trafic. Le vouvoiement, le ton semi-formel et le CTA en fin de caption respectent la charte éditoriale.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-4 min-w-4/5: items-center">
                        <h3 className="text-bleu-clair text-center">Publication courte : </h3>
                        <Image src="/documents/posts/publication-courte/post.png" alt="Visuel d'une publication courte." width={500} height={500} />
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <p className="text-bleu-clair">Justification avec la ligne éditoriale : </p>
                            <p>Le format image unique avec caption courte est adapté à ce sujet simple et ciblé : le visuel illustre concrètement la balise en contexte Google, la caption va à l&apos;essentiel sans développer. L&apos;accroche visuelle simulation de résultat Google parle immédiatement à la cible. Le CTA renvoie vers le site pour approfondir, conformément à l&apos;objectif de trafic de la charte NWS.</p>
                        </div>
                    </div>
                        
                    <div className="flex flex-col gap-4 min-w-4/5: items-center">
                        <h3 className="text-bleu-clair text-center">Publication visuelle : </h3>
                        <div className="flex flex-col gap-4 md:flex-row">
                            <Image src="/documents/posts/publication-visuelle/1-4.png" alt="Visuel d'une publication visuelle." className="w-full h-auto md:w-1/4" width={350} height={500} />
                            <Image src="/documents/posts/publication-visuelle/2-4.png" alt="Visuel d'une publication visuelle." className="w-full h-auto md:w-1/4" width={350} height={500} />
                            <Image src="/documents/posts/publication-visuelle/3-4.png" alt="Visuel d'une publication visuelle." className="w-full h-auto md:w-1/4" width={350} height={500} />
                            <Image src="/documents/posts/publication-visuelle/4-4.png" alt="Visuel d'une publication visuelle." className="w-full h-auto md:w-1/4" width={350} height={500} />
                        </div>
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <p className="text-bleu-clair">Justification avec la ligne éditoriale : </p>
                            <p>Le format carrousel est adapté à ce sujet qui suit une progression logique en étapes. Chaque slide présente une idée distincte sans tout dévoiler, conformément à l&apos;objectif de renvoi vers le site. L&apos;accroche part d&apos;un problème concret vécu par la cible. Le vouvoiement, le ton semi-formel et le CTA en dernière slide respectent la charte éditoriale NWS.</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 min-w-4/5:">
                        <h3 className="text-bleu-clair text-center">Publication vidéo : </h3>
                        <video src="/documents/posts/publication-video/video.mp4" alt="Visuel d'une publication vidéo." className="w-full h-auto md:w-1/4" controls />
                        
                        <div className="flex flex-col gap-4 max-w-2xl">
                            <p className="text-bleu-clair">Description de la publication vidéo : </p>
                            <p>
                                Votre site est en ligne mais Google ne le trouve pas ? On vous explique comment poser les bases d&apos;un bon référencement naturel : les balises HTML essentielles, la hiérarchie des titres, l&apos;optimisation des images et l&apos;importance du responsive. Le tutoriel complet est gratuit sur le site - lien en bio.
                            </p>
                                <p>#seo #devweb #html #responsive #nws</p>

                            <p className="text-bleu-clair">Justification avec la ligne éditoriale : </p>
                            <p>Le format Reel est adapté à un contenu court et dynamique qui capte l&apos;attention rapidement. Le motion design permet de transmettre un message clair sans prise de vue, cohérent avec la ligne éditoriale NWS. Le sujet est volontairement survolé pour donner envie d&apos;aller consulter le tutoriel complet sur le site.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportDeCommunication;
