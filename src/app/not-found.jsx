import Btn from "@/components/ui/Btn";

export const metadata = {
    title: "Page introuvable | NWS",
    robots: { 
        index: false, 
        follow: false,
    },
};

export default function erreur() {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center gap-10">
            <h1>Erreur 404 - Page non trouvée</h1>
            <Btn lien="/" variante="secondaire" taille="lg" arrondi="rounded-2xl">
                Retour à l&apos;accueil
            </Btn>
        </div>
    );
}