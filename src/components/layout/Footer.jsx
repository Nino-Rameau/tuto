import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-16 p-4 bg-bleu-clair">
                
                <p>Copyright © {new Date().getFullYear()} tuto.nino-rameau.fr</p>
                <p>Réalisé par <a href="https://nino-rameau.fr" target="_blank" className="underline">Nino Rameau</a></p>
            </div>
        </footer>
    )
} 

export default Footer;