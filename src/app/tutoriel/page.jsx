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
        <div className="flex flex-col items-center md:p-5">
            
            <h1 className="text-2xl font-bold text-center">Tutoriels :</h1>
            
            <select className="border border-gray-300 rounded-md p-2 mt-5 w-[80%] md:w-full max-w-100">
                <option value="">Trier par</option>
                <option value="date_maj_desc">Tutoriel en cours</option>
                <option value="date_maj_desc">Tutoriel terminé</option>
                <option value="titre_asc">Titre (A-Z)</option>
                <option value="titre_desc">Titre (Z-A)</option>
                <option value="date_crea_desc">Date de création (du plus récent au plus ancien)</option>
                <option value="date_crea_asc">Date de création (du plus ancien au plus récent)</option>
            </select>

            <div className="flex flex-wrap justify-center gap-4 mt-3">
                {tuto.map((item) => (
                    <Link
                        key={item.id} 
                        href={`/tutoriel/${item.slug}`}
                        className="w-[90%] md:w-full max-w-md flex flex-col items-center gap-4 p-2 rounded-md bg-bleu-clair/30 hover:bg-bleu-clair transform transition duration-300"
                    >
                        <h2 className="h-20 line-clamp-2 text-center text-bleu-fonce">{item.titre}</h2>
                        <p className="line-clamp-3 h-19 px-2">{item.chapo}</p>
                        <Image src={item.image || "/img/placeholder-img.png"} alt={`Image du tutoriel ${item.titre}`} width={300} height={200} className="mt-2 rounded object-cover" />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default tutoriel;