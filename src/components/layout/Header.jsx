"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import FormConnexion from "@/components/form/FormConnexion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";

const Header = ({session}) => {

    const [MenuBruger, setMenuBurger] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 flex flex-row items-center justify-around px-4 py-4 shadow-bottom-lg bg-bleu-fonce2">
            
            <Link href="/" className="flex flex-col items-center w-32 h-auto md:w-48">
                <Image src="/img/logo.svg" alt="Logo du site" width={300} height={100} className="w-full h-auto" priority/>
                <p className="text-xl text-transparent font-titre text-nowrap bg-clip-text bg-linear-to-r from-bleu-clair via-bleu to-bleu-fonce">Nino Web Success</p>
            </Link>

            <div>
                <button onClick={() => setMenuBurger(!MenuBruger)} title="Ouvrir / fermer le menu burger">
                    {MenuBruger ? 
                        <CgClose className="w-12 h-auto text-white md:hidden"/>
                    : 
                        <CiMenuBurger className="w-12 h-auto text-white md:hidden"/>
                    }
                </button>
            </div>

            <nav className={`
                    md:flex flex-col absolute md:relative md:flex-row 
                    top-24 md:top-0 left-0 md:gap-10 
                    bg-bleu-fonce2 w-full md:w-auto h-auto items-center md:shadow-none!
                    ${MenuBruger ? 'flex shadow-bottom-lg' : 'hidden'}`
                }>
                <Link href="/tutoriels" className={`py-4 text-white md:py-0 ${pathname.startsWith("/tutoriels") ? "nav-active" : "link-animated"}`} onClick={() => setMenuBurger(!MenuBruger)}> Nos tutoriels </Link>

                {!session && (
                    <FormConnexion />
                )}

                {session && (
                    <>
                        <Link href="/profil" className={`py-4 text-white md:py-0 ${pathname === "/profil" ? "nav-active" : "link-animated"}`} onClick={() => setMenuBurger(!MenuBruger)}> Profil </Link>

                        {session.user?.profil === "admin" && (
                            <Link href="/admin" className={`py-4 text-white md:py-0 ${pathname.startsWith("/admin") ? "nav-active" : "link-animated"}`} onClick={() => setMenuBurger(!MenuBruger)}>
                                Gestion des tutoriels
                            </Link>
                        )}

                        <button
                            onClick={() => {
                                signOut({ callbackUrl: "/" });
                                setMenuBurger(!MenuBruger);
                            }}
                            className="py-4 text-white link-animated md:py-0"
                        >
                            Déconnexion
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;