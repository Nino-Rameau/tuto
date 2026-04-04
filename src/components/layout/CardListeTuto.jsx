import Link from "next/link";
import Image from "next/image";
import BtnSuppTuto from "@/components/ui/BtnSuppTuto";

const EditListe = ({id, titre, chapo, tags, dateMaj, dateCreation, slug, image, statut}) => {
    return (
        <section className="flex flex-col md:flex-row bg-bleu-clair/30 rounded-xl gap-10 p-5 justify-between">
            
            <Image src={image || "/img/placeholder-img.png"} alt="Visuel d'un tutoriel" width={200} height={120} className="mx-auto rounded object-cover h-40 w-auto" />
            
            <div className="flex flex-col justify-between md:max-w-[50%] text-center md:text-left">
                <h2>{titre}</h2>
                <p>{chapo}</p>

                <ul className="flex flex-row gap-5">
                    {tags.map((tag, index) => (
                        <li key={index} className="border-black border-2 px-2 rounded-xl">
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
                <Link href={`/admin/${id}`} className="bg-bleu hover:bg-bleu-fonce text-white py-2 px-4 rounded-xl text-center">Editer</Link>
                <Link href={`/tutoriel/${slug}`} target="_blank" className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded-xl text-center">Afficher</Link>
                <BtnSuppTuto id={id} titre={titre} />
            </div>

        </section>
    )
} 

export default EditListe;