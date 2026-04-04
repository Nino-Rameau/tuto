import { auth, signOut } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import FormConnexion from "@/components/form/FormConnexion";

const Header = async () => {
    const session = await auth();

    return (
        <header className="bg-bleu-fonce2 sticky top-0 z-50 flex flex-row justify-between items-center px-4 py-4">
            
            <Link href="/" className="w-32 md:w-48 h-auto">
                <Image src="/img/logo.svg" alt="Logo" width={300} height={100} className="w-full h-auto" priority/>
            </Link>

            <nav className="flex flex-row gap-10 items-center pr-10">
                <Link href="/tutoriel" className="text-white"> Nos tutoriels </Link>

                {!session && (
                    <FormConnexion />
                )}

                {session && (
                    <>
                        <Link href="/profil" className="text-white"> Profil </Link>

                        {session.user?.profil === "admin" && (
                            <Link href="/admin" className="text-white"> 
                                Gestion des tutoriels 
                            </Link>
                        )}

                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/" });
                        }}>
                            <button type="submit" className="text-red-500">
                                Déconnexion
                            </button>
                        </form>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;