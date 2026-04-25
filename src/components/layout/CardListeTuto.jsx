import Link from "next/link";
import Image from "next/image";
import BtnSuppTuto from "@/components/ui/BtnSuppTuto";

const EditListe = ({id, titre, chapo, tags, dateMaj, dateCreation, slug, image, statut}) => {
    return (
        <section className="flex flex-col justify-between gap-10 p-5 md:flex-row bg-bleu-clair/30 rounded-xl">
            
            <Image src={image || "/img/placeholder-img.png"} alt="Visuel d'un tutoriel" width={200} height={120} className="object-cover w-auto h-40 mx-auto rounded" />
            
            <div className="flex flex-col justify-between md:max-w-[50%] text-center md:text-left">
                <h2>{titre}</h2>
                <p>{chapo}</p>

                <ul className="flex flex-row gap-5">
                    {tags.map((tag, index) => (
                        <li key={index} className="px-2 border-2 border-black rounded-xl">
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-5">
                    <p>MAJ : {dateMaj}</p>
                    <p>Créé le : {dateCreation}</p>
                </div>
                <div>
                    <p>Statut : {statut}</p>
                </div>
            </div>

            <div className="flex flex-col justify-around gap-5">
                <Link href={`/admin/${id}`} className="px-4 py-2 text-center text-white bg-bleu hover:bg-bleu-fonce rounded-xl">Editer</Link>
                <Link href={`/tutoriel/${slug}`} target="_blank" className="px-4 py-2 text-center text-white bg-green-600 hover:bg-green-800 rounded-xl">Afficher</Link>
                <BtnSuppTuto id={id} titre={titre} />
            </div>

        </section>
    )
} 

export default EditListe;