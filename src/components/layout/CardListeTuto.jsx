import Image from "next/image";
import BtnSuppTuto from "@/components/ui/BtnSuppTuto";
import Btn from "../ui/Btn";

const EditListe = ({id, titre, chapo, tags, dateMaj, dateCreation, slug, image, statut}) => {
    return (
        <section className="flex flex-col justify-between gap-10 p-5 mx-5 md:mx-0 md:flex-row bg-bleu-fonce rounded-xl">
            
            <Image src={image || "/img/placeholder-img.png"} alt="Visuel d'un tutoriel" width={200} height={120} className="object-cover w-auto h-30 mx-auto rounded" />
            
            <div className="flex flex-col justify-between md:max-w-[50%] text-center md:text-left">
                <h2>{titre}</h2>
                <p>{chapo}</p>

                <ul className="flex flex-row gap-5">
                    {tags.map((tag, index) => (
                        <li key={index} className="px-2 border-2 border-bleu-clair rounded-xl">
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
                <Btn lien={`/admin/${id}`} variante='bleu2' className="rounded-xl">
                    Editer
                </Btn>
                <Btn lien={`/tutoriels/${slug}`} variante='vert' className="rounded-xl" target="_blank">
                    Afficher
                </Btn>

                <BtnSuppTuto id={id} titre={titre} />
            </div>

        </section>
    )
} 

export default EditListe;