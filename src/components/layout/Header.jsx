"use client";

import { signOut } from "next-auth/react"; // Vérifie bien cet import
import Link from "next/link";
import Image from "next/image";
import FormConnexion from "@/components/form/FormConnexion";
import { useState } from "react";
import { CgClose } from "react-icons/cg"; 
import { CiMenuBurger } from "react-icons/ci"; 

const Header = ({session}) => {

    const [MenuBruger, setMenuBurger] = useState(false);

    return (
        <header className="bg-bleu-fonce2 sticky top-0 z-50 flex flex-row justify-around items-center px-4 py-4">
            
            <Link href="/" className="w-32 md:w-48 h-auto flex flex-col items-center">
                <Image src="/img/logo.svg" alt="Logo" width={300} height={100} className="w-full h-auto" priority/>
                <p className="text-xl font-titre text-nowrap text-transparent bg-clip-text bg-linear-to-r from-bleu-clair via-bleu to-bleu-fonce">Nino Web Succes</p>
            </Link>

            <div>
                <button onClick={() => setMenuBurger(!MenuBruger)}>
                    {MenuBruger ? 
                        <CgClose className="text-white w-12 h-auto md:hidden"/>
                    : 
                        <CiMenuBurger className="text-white w-12 h-auto md:hidden"/>
                    }
                </button>
            </div>

            <nav className={`
                    md:flex flex-col absolute md:relative md:flex-row 
                    top-24 md:top-0 left-0 md:gap-10 
                    bg-bleu-fonce2 w-full md:w-auto h-auto items-center
                    ${MenuBruger ? 'flex' : 'hidden'}`
                }>
                <Link href="/tutoriel" className="text-white py-4 md:py-0" onClick={() => setMenuBurger(!MenuBruger)}> Nos tutoriels </Link>

                {!session && (
                    <FormConnexion />
                )}

                {session && (
                    <>
                        <Link href="/profil" className="text-white py-4 md:py-0" onClick={() => setMenuBurger(!MenuBruger)}> Profil </Link>

                        {session.user?.profil === "admin" && (
                            <Link href="/admin" className="text-white py-4 md:py-0" onClick={() => setMenuBurger(!MenuBruger)}> 
                                Gestion des tutoriels 
                            </Link>
                        )}

                        <button 
                            onClick={() => {
                                signOut({ callbackUrl: "/" });
                                setMenuBurger(!MenuBruger);
                            }}
                            className="text-white py-4 md:py-0"
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