import prisma from '@/lib/prisma';

export const metadata = {
  title: "Accueil | tuto",
  description: "meta description de la page d'accueil",
};

const accueil = async () => {
  const categories = await prisma.categorie.findMany();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Accueil</h1>
      
      <div className="mt-5">
        <h2 className="text-xl font-semibold">Nos thématiques :</h2>
        <div className="flex flex-wrap mt-3 gap-3">
          {categories.map((cat) => (
            <span 
              key={cat.id} 
              className="px-4 py-1.5 border border-gray-300 rounded-md"
            >
              {cat.nom}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default accueil;