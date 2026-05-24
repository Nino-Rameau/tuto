import Btn from "@/components/ui/Btn";
import Image from "next/image";

export const metadata = {
    title: "Page introuvable | NWS",
    robots: { 
        index: false, 
        follow: false,
    },
};

export default function erreur() {
    return (
        <div className="flex flex-col items-center justify-center mt-10 gap-10">
            <p className="text-3xl font-bold text-bleu-clair">Erreur 404 </p>
            <p className="text-3xl font-bold text-bleu-clair">Page non trouvée</p>
            <Image
                src="/img/ampoule-404.svg"
                alt="Page non trouvée"
                width={200}
                height={150}
            />
            <Btn lien="/" variante="secondaire" taille="lg" arrondi="rounded-2xl">
                Retour à l&apos;accueil
            </Btn>
        </div>
    );
}