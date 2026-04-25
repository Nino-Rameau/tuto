import Link from "next/link";

export default function erreur() {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center gap-10">
            <h1>Erreur 404 - Page non trouvée</h1>
            <Link href="/" className="px-4 py-2 text-black rounded-full bg-bleu-clair hover:bg-bleu-fonce hover:text-white hover:scale-110 transition duration-300">
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}