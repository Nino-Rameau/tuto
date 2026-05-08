"use client";

import { LiaArrowUpSolid } from "react-icons/lia";

const BtnHaut = () => {
  return (
    <button
      className="fixed z-50 px-1 py-3 text-xl text-white rounded-full bottom-4 right-4 bg-bleu-clair hover:scale-125"
      title="Retour en haut de la page"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
    <LiaArrowUpSolid className="text-3xl text-black"/>
    </button>
  );
};

export default BtnHaut;