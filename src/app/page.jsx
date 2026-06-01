import { TbCurrencyEuroOff, TbBook } from "react-icons/tb"; 
import { FaArrowUpRightDots, FaCode } from "react-icons/fa6";
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import Btn from '@/components/ui/Btn';
import Avantage from '@/components/ui/BlocIconeTexte';

export const metadata = {
  title: "Nino Web Success – Tutoriels gratuits de développement web",
  description: "Progressez en développement web avec des tutoriels gratuits et accessibles à tous. Créez, déployez et optimisez vos projets grâce à Nino Web Success.",
  alternates: {
    canonical: "https://nws.nino-rameau.fr",
  },
};

const accueil = async () => {
  const categories = await prisma.categorie.findMany();
  const derniersTutos = await prisma.tuto.findMany({
    where: { statut: "en_ligne" },
    select: { titre: true, chapo: true, slug: true, image: true },
    orderBy: { created_at: "desc" },
    take: 3,
  });

  return (
    <div className='flex flex-col gap-32'>
      
      <div className="relative w-screen ml-[calc(50%-50vw)] h-[80vh] overflow-hidden shadow-bottom-lg">
        <Image src="/img/divers-site/accueil.webp" alt="Image d'accueil" fill priority className="object-cover" />
        
        <div className="absolute inset-0 bg-bleu/60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-24 text-center">
          <h1 className="text-5xl sm:text-8xl md:text-10xl">
            Apprenez, créez, progressez
          </h1>
          
          <p className="font-semibold text-xl sm:text-2xl md:text-4xl">
            Des tutoriels concrets sur le développement web.
          </p>

          <Btn lien="/tutoriels" taille="lg" arrondi='rounded-2xl'>
            Explorez les tutoriels
          </Btn>
        </div>
      </div>
      
      <div className="flex flex-col gap-8">
        <h2 className="text-center text-bleu-clair">Nos derniers tutoriels :</h2>
        <div className="flex flex-col justify-center gap-6 m-4 md:m-0 md:flex-row">
          {derniersTutos.map((tuto) => (
            <Link
              key={tuto.slug}
              href={`/tutoriels/${tuto.slug}`}
              className="flex flex-col items-center gap-3 overflow-hidden transition-colors duration-200 rounded-xl bg-bleu-fonce hover:bg-bleu border-animee md:w-1/3"
            >
              <Image
                src={tuto.image || "/img/placeholder-img.png"}
                alt={tuto.titre}
                width={500}
                height={200}
                className="rounded-xl w-full h-48 object-cover"
              />
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-lg font-bold line-clamp-2">{tuto.titre}</h3>
                <p className="text-sm text-white/70 line-clamp-3">{tuto.chapo}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8 p-8 m-4 transition-transform duration-200 md:m-0 rounded-xl bg-radial border-animee from-bleu-clair via-bleu to-bleu-fonce">
        <h2 className="text-center text-bleu-clair">Pourquoi suivre nos tutoriels ?</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <Avantage icone={<TbCurrencyEuroOff className="w-16 h-auto"/>} titre="Gratuit" texte="Accédez gratuitement à tous les tutoriels du site." />
          <Avantage icone={<TbBook className="w-16 h-auto"/>} titre="Accessible aux débutants" texte="Apprenez facilement grâce à des explications simples et claires." />
          <Avantage icone={<FaCode className="w-16 h-auto"/>} titre="Des projets concrets" texte="Progressez avec des tutoriels pratiques et applicables rapidement." />
          <Avantage icone={<FaArrowUpRightDots className="w-16 h-auto"/>} titre="Du nouveau régulièrement" texte="Découvrez de nouveaux tutoriels ajoutés chaque semaine." />
        </div>
      </div>
      
      <div className="relative w-screen ml-[calc(50%-50vw)] h-[35vh] overflow-hidden -mb-7 md:-mb-17 shadow-top-lg">
        <Image src="/img/divers-site/accueil.webp" alt="Image d'accueil" fill className="object-cover" />
        
        <div className="absolute inset-0 bg-bleu-fonce/80" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 py-5 text-center md:py-0">
          <h2 className="text-xl sm:text-3xl md:text-5xl">Prêt à commencer ?</h2>
          <p className='text-xl'>Rejoignez notre communauté et commencez votre parcours d&apos;apprentissage dès aujourd&apos;hui !</p>
          <Btn lien="/tutoriels" taille="lg" arrondi='rounded-2xl'>
            Découvrez tous nos tutoriels
          </Btn>
        </div>
      </div>

    </div>
  );
}

export default accueil;