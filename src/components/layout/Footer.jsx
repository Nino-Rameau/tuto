import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="mt-10 md:mt-20 shadow-top-lg">
            <div className="flex flex-col items-center justify-center p-4 gap-5 md:flex-row md:gap-30">
                
                <div className="md:max-w-[40%]">
                    <Image src="/img/logo.svg" alt="Logo du site" width={200} height={50} className="mb-4" />
                    <p> Bienvenue chez Nino Web Success, une plateforme de tutoriels dédiée à l&apos;apprentissage du développement web. Retrouvez ici des ressources pédagogiques pour progresser à votre rythme.</p>
                </div>
                
                <div className="flex flex-col gap-4 md:gap-2">
                    <Link href="/" className="items-center gap-2 link-animated max-w-max">Accueil</Link>
                    <Link href="/tutoriel" className="items-center gap-2 link-animated max-w-max">Tutoriels</Link>
                    <Link href="/support-de-communication" className="items-center gap-2 link-animated max-w-max">Support de communication</Link>
                    <Link href="/mentions-legales" className="items-center gap-2 link-animated max-w-max">Mentions légales</Link>
                </div>
            </div>

            <div className="flex flex-col justify-around p-4 gap-8 md:items-center md:flex-row md:gap-0 bg-bleu-fonce2">
                <p>Réalisé par <a href="https://nino-rameau.fr" target="_blank" className="underline">Nino Rameau</a></p>
                
                <p>Copyright © {new Date().getFullYear()} nws.nino-rameau.fr</p>
                <p>Travail pédagogique sans objectifs commerciaux</p>
            </div>
        </footer>
    )
} 

export default Footer;