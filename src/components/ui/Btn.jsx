"use client";

import Link from "next/link";

const varianteBtn = {
    primaire:   "bg-bleu hover:bg-bleu-fonce text-white",
    secondaire: "bg-bleu-fonce hover:bg-bleu text-white",
    contour:    "text-white border-2 border-bleu-fonce hover:border-bleu-clair",
    clair:      "bg-bleu-clair text-bleu-fonce2 hover:bg-bleu hover:text-white",
    vert:       "bg-green-800 hover:bg-green-900 text-white",
    bleu2:      "bg-bleu text-white hover:bg-bleu/50",
};

const tailleBtn = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
};

const Btn = ({ children, lien, variante = "primaire", taille = "md", arrondi = "rounded-md", onClick, target, className = "" }) => {
    const classes = [
        varianteBtn[variante],
        tailleBtn[taille],
        arrondi,
        "text-center transition-colors duration-200 cursor-pointer",
        className,
    ].filter(Boolean).join(" ");

    if (lien) {
        return (
            <Link href={lien} target={target} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={classes}>
            {children}
        </button>
    );
};

export default Btn;
