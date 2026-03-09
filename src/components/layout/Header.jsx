import { auth, signOut } from "@/auth";
import Link from "next/link";
import Image from "next/image";

const Header = async () => {
    const session = await auth();

    return (
        <header className="bg-bleu-clair sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-row justify-between items-center py-4">
                    
                    <Link href="/" className="block w-48 md:w-64">
                        {/* <Image src="/images/logo.webp" alt="Logo" width={300} height={100} className="w-full h-auto" /> */}
                        <p className="bg-gray-500 rounded-full p-5 max-w-min text-white">LOGO</p>
                    </Link>

                    <nav className="hidden lg:flex flex-row gap-30 items-center">
                        <div className="flex flex-row gap-10 items-center">

                            <Link href="/tutoriel"> Nos tutoriels </Link>

                            {!session && (
                                <Link href="/connexion"> Connexion </Link>
                            )}

                            {session && (
                                <>
                                    <Link href="/profil"> Profil </Link>

                                    {session.user?.profil === "admin" && (
                                        <Link href="/admin" className="font-bold text-yellow-600"> 
                                            Gestion 
                                        </Link>
                                    )}

                                    <form action={async () => {
                                        "use server";
                                        await signOut({ redirectTo: "/" });
                                    }}>
                                        <button type="submit" className="text-red-500 hover:underline">
                                            Déconnexion
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;