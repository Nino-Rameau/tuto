import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import Btn from '@/components/ui/Btn';
import Avantage from '@/components/ui/cardAvantage';

export const metadata = {
  title: "Accueil | tuto",
  description: "meta description de la page d'accueil",
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
        <Image src="/img/divers-site/accueil.png" alt="Image d'accueil" fill className="object-cover" />
        
        <div className="absolute inset-0 bg-bleu/60" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-24 text-center">
          <h1 className="text-5xl sm:text-8xl md:text-10xl">
            Apprenez, créez, progressez
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-4xl">
            Des tutoriels concrets sur le développement web.
          </p>

          <Btn lien="/tutoriels" taille="lg" arrondi='rounded-2xl'>
            Explorez les tutoriels
          </Btn>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-bleu">Nos derniers tutoriels :</h2>
        <div className="flex flex-col justify-center gap-6 md:flex-row">
          {derniersTutos.map((tuto) => (
            <Link
              key={tuto.slug}
              href={`/tutoriels/${tuto.slug}`}
              className="flex flex-col gap-3 overflow-hidden transition-colors duration-200 rounded-xl bg-bleu-fonce hover:bg-bleu md:w-1/3"
            >
              <Image
                src={tuto.image || "/img/placeholder-img.png"}
                alt={tuto.titre}
                width={500}
                height={200}
                className="object-cover w-full h-44"
              />
              <div className="flex flex-col gap-2 p-4">
                <h3 className="text-lg font-bold line-clamp-2">{tuto.titre}</h3>
                <p className="text-sm text-white/70 line-clamp-3">{tuto.chapo}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-center text-bleu">Pourquoi suivre nos tutoriels ?</h2>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avantage titre="Gratuit" texte="Des tutoriels gratuits pour apprendre sans effort." />
          <Avantage titre="Pensé pour les débutants" texte="Des explications claires et accessibles pour tous les niveaux." />
          <Avantage titre="Tutoriels concrets" texte="Des tutoriels pratiques et à jour pour progresser rapidement." />
          <Avantage titre="Nouveaux tutoriels" texte="De nouveaux contenus ajoutés régulièrement pour rester à jour." />
        </div>
      </div>
      
      <div className="relative w-screen ml-[calc(50%-50vw)] h-[35vh] overflow-hidden -mb-7 md:-mb-17 shadow-top-lg">
        <Image src="/img/divers-site/accueil.png" alt="Image d'accueil" fill className="object-cover" />
        
        <div className="absolute inset-0 bg-bleu-fonce/80" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 text-center">
          <h2 className="text-xl sm:text-3xl md:text-5xl">Prêt à commencer ?</h2>
          <p className='text-xl'>Rejoignez notre communauté et commencez votre parcours d&apos;apprentissage dès aujourd&apos;hui !</p>
          <Btn lien="/tutoriels" taille="lg" arrondi='rounded-2xl' className='self-center'>
            Découvrez tous nos tutoriels
          </Btn>
        </div>
      </div>

    </div>
  );
}

export default accueil;