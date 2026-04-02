import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";

export const metadata = {
    title: "Tutoriels | tuto",
    description: "",
};

const tutoriel = async () => {
    const tuto = await prisma.tuto.findMany({ where: { statut: "en_ligne", },
    });

    return (
        <div className="p-5">
            
            <h1 className="text-2xl font-bold text-center">Tutoriels :</h1>
            
            <select className="border border-gray-300 rounded-md p-2 mt-5">
                <option value="">Trier par</option>
                <option value="date_maj_desc">Date de mise à jour (du plus récent au plus ancien)</option>
                <option value="date_maj_asc">Date de mise à jour (du plus ancien au plus récent)</option>
                <option value="date_crea_desc">Date de création (du plus récent au plus ancien)</option>
                <option value="date_crea_asc">Date de création (du plus ancien au plus récent)</option>
                <option value="titre_asc">Titre (A-Z)</option>
                <option value="titre_desc">Titre (Z-A)</option>
            </select>

            <div className="flex flex-wrap gap-3 mt-3">
                {tuto.map((item) => (
                    <Link
                        key={item.id} 
                        href={`/tutoriel/${item.slug}`}
                        className="px-4 py-3 border border-gray-300 rounded-md w-full max-w-lg hover:bg-gray-50 flex flex-col items-center gap-4"
                    >
                        <h2 className="text-center">{item.titre}</h2>
                        <p>{item.chapo}</p>
                        <Image src={item.image || "/img/placeholder-img.png"} alt={`Image du tutoriel ${item.titre}`} width={400} height={200} className="mt-2 rounded object-cover" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default tutoriel;