import Btn from "@/components/ui/Btn";

export const metadata = {
    title: "Support de communication | tuto",
    description: "Découvrez pourquoi Instagram est notre principal canal de communication et téléchargez nos documents éditoriaux.",
    robots: {
        index: false,
        follow: false,
    },
};

const SupportDeCommunication = () => {
    return (
        <div className="flex flex-col mx-auto mt-10 gap-10">

            <h1 className="text-center"> Support de communication </h1>

            <div className="flex flex-col gap-5">
                <h2> Pourquoi Instagram ?</h2>

                <p> Dans le cadre de ce projet de formation, Instagram s&apos;est imposé comme le canal de communication le plus pertinent pour toucher notre audience cible. En France, Instagram est la plateforme sociale privilégiée des 18-30 ans, qui représentent la majorité des apprenants en formation professionnelle et technique. </p>

                <p> Le format visuel d&apos;Instagram est particulièrement adapté à la communication autour de tutoriels : les publications en carrousel permettent de présenter des étapes pas-à-pas, les Reels offrent la possibilité de montrer des démonstrations courtes et engageantes, tandis que les Stories servent à diffuser des annonces et maintenir un lien régulier avec la communauté. Ce triptyque de formats couvre l&apos;ensemble de nos besoins éditoriaux. </p>

                <p> Par rapport aux autres réseaux sociaux, Instagram présente un avantage concurrentiel notable : son algorithme favorise les créateurs de niche disposant d&apos;une communauté engagée, ce qui est idéal pour une plateforme spécialisée dans l&apos;apprentissage. Twitter/X et LinkedIn ciblent davantage les professionnels confirmés, tandis que TikTok, bien que pertinent en termes d&apos;âge, offre moins de contrôle sur la durabilité et l&apos;organisation du contenu. Instagram permet de conserver un fil éditorial cohérent, indexable et facilement partageable. </p>

                <p> Enfin, Instagram est gratuit, ne nécessite aucune infrastructure technique supplémentaire et s&apos;intègre naturellement dans les habitudes numériques de notre audience. Il constitue ainsi le meilleur compromis entre portée, coût et adéquation au public visé dans le contexte de ce projet scolaire. </p>
            </div>

            <div className="flex flex-col gap-5">
                <h2> Documents à télécharger </h2>

                <p> Retrouvez ci-dessous les deux documents qui structurent notre stratégie éditoriale sur Instagram : </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Btn lien="/document/charte-editoriale.pdf">
                        Télécharger la charte éditoriale
                    </Btn>

                    <Btn lien="/document/calendrier-editorial.pdf">
                        Télécharger le calendrier éditorial
                    </Btn>
                </div>
                
            </div>
        </div>
    );
};

export default SupportDeCommunication;
