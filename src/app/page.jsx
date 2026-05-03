import prisma from '@/lib/prisma';

export const metadata = {
  title: "Accueil | tuto",
  description: "meta description de la page d'accueil",
};

const accueil = async () => {
  const categories = await prisma.categorie.findMany();

  return (
    <>
      
    </>
  );
}

export default accueil;