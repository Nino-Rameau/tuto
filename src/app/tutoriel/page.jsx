import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { auth } from "@/auth";
import TriTuto from "@/components/ui/TriTuto";

export const metadata = {
    title: "Tutoriels | tuto",
    description: "",
};

const tutoriel = async ({ searchParams }) => {
    const { tri } = await searchParams;
    const session = await auth();

    let tutos = [];

    if (tri === "en_cours" || tri === "termine") {
        if (!session?.user) {
            tutos = [];
        } else {
            const utilisateur = await prisma.utilisateur.findUnique({
                where: { email: session.user.email },
                select: { id: true },
            });

            const etat = tri === "en_cours" ? "en_cours" : "termine";

            const progressions = await prisma.progression.findMany({
                where: { user_id: utilisateur.id, etat },
                include: { tuto: true },
            });

            tutos = progressions
                .map((p) => p.tuto)
                .filter((t) => t.statut === "en_ligne");
        }
    } else {
        const orderBy =
            tri === "titre_az" ? { titre: "asc" }
            : tri === "titre_za" ? { titre: "desc" }
            : tri === "date_recent" ? { created_at: "asc" }
            : { created_at: "desc" };

        tutos = await prisma.tuto.findMany({
            where: { statut: "en_ligne" },
            orderBy,
        });
    }

    return (
        <div className="flex flex-col items-center md:p-5">

            <h1 className="text-2xl font-bold text-center">Tutoriels :</h1>

            <TriTuto />

            {(tri === "en_cours" || tri === "termine") && !session?.user && (
                <p className="mt-5 text-gray-500">Connectez-vous pour filtrer par progression.</p>
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-3">
                {tutos.map((item) => (
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
};

export default tutoriel;
