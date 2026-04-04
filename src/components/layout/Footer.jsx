import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="text-white pt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-30 p-4 bg-bleu-fonce2">
                
                <div className="md:max-w-[40%]">
                    <Image src="/img/logo.svg" alt="Logo du site" width={200} height={50} className="mb-4" />
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, ipsa ipsam. Cumque ea similique, accusamus laudantium iure labore quasi rem at sed voluptatem. Molestiae amet, sequi officia eveniet dolorum suscipit.</p>
                </div>
                
                <div className="flex flex-col gap-4 md:gap-2">
                    <Link href="/" className="flex items-center gap-2">Accueil</Link>
                    <Link href="/tutoriel" className="flex items-center gap-2">Tutoriels</Link>
                    <Link href="/support-de-communication" className="flex items-center gap-2">Support de communication</Link>
                    <Link href="/mentions-legales" className="flex items-center gap-2">Mentions légales</Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row p-4 justify-around items-center bg-bleu-fonce gap-8 md:gap-0">
                <p>Réalisé par <a href="https://nino-rameau.fr" target="_blank" className="underline">Nino Rameau</a></p>
                
                <p>Copyright © {new Date().getFullYear()} nws.nino-rameau.fr</p>
                <p>Travail pédagogique sans objectifs commerciaux</p>
            </div>
        </footer>
    )
} 

export default Footer;