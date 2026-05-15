"use client";

import { useActionState, useState } from "react";
import { usePathname } from "next/navigation";
import { inscrireUtilisateur, connecterUtilisateur } from "@/actions/auth.actions";
import { CgClose } from "react-icons/cg";
import Btn from "@/components/ui/Btn";

const inputClass = "w-full px-3 py-2 rounded-md bg-bleu-fonce border border-bleu text-white placeholder-gray-400 focus:outline-none focus:border-bleu-clair transition-colors duration-200";
const labelClass = "flex flex-col gap-2 text-bleu-clair";
const erreurClass = "px-3 py-2 text-red-400 rounded-md bg-red-900/50";
const btnValiderClass = "w-full py-2 font-bold rounded-md bg-bleu-clair text-bleu-fonce2 hover:bg-bleu hover:text-white transition-all duration-200 disabled:opacity-50 cursor-pointer";
const btnChangementFormClass = "text-bleu-clair underline decoration-bleu-clair/40 underline-offset-2 hover:decoration-bleu-clair transition-colors duration-200";

const FormConnexion = ({ onSwitch, redirectTo }) => {
  const [etat, action, enAttente] = useActionState(connecterUtilisateur, null);

  return (
    <form action={action} className="flex flex-col h-full gap-5">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      
      <h2 className="text-center text-bleu-clair">Connexion</h2>
      
      {etat?.erreur && <p className={erreurClass}>{etat.erreur}</p>}
      
      <label className={labelClass}>
        Email
        <input type="email" name="email" required className={inputClass}  />
      </label>
      
      <label className={labelClass}>
        Mot de passe
        <input type="password" name="motDePasse" required className={inputClass} />
      </label>
      
      <button type="submit" disabled={enAttente} className={btnValiderClass}>
        {enAttente ? "Connexion..." : "Se connecter"}
      </button>
      
      <p className="pt-4 mt-auto text-sm text-center text-white/50">
        {"Pas encore de compte ? "}
        <button type="button" onClick={onSwitch} className={btnChangementFormClass}>S&apos;inscrire</button>
      </p>
    </form>
  );
};

const FormInscription = ({ onSwitch, redirectTo }) => {
  const [etat, action, enAttente] = useActionState(inscrireUtilisateur, null);

  return (
    <form action={action} className="flex flex-col h-full gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      
      <h2 className="text-center text-bleu-clair">Créer un compte</h2>
      
      {etat?.erreur && <p className={erreurClass}>{etat.erreur}</p>}
      
      <label className={labelClass}>
        Nom ou pseudo
        <input type="text" name="nom" required defaultValue={etat?.donnees?.nom || ""} className={inputClass} />
      </label>
      
      <label className={labelClass}>
        Email
        <input type="email" name="email" required defaultValue={etat?.donnees?.email || ""} className={inputClass} />
      </label>
      
      <label className={labelClass}>
        Mot de passe
        <input type="password" name="motDePasse" required defaultValue={etat?.donnees?.motDePasse || ""} className={inputClass} />
      </label>
      
      <label className={labelClass}>
        Confirmer le mot de passe
        <input type="password" name="confirmationMotDePasse" required defaultValue={etat?.donnees?.confirmationMotDePasse || ""} className={inputClass} />
      </label>
      
      <label className="flex items-center text-sm cursor-pointer gap-2 text-white/70">
        <input type="checkbox" name="conditions" className="w-4 h-4 accent-bleu-clair" />
        J&apos;accepte les conditions RGPD
      </label>
      
      <button type="submit" disabled={enAttente} className={btnValiderClass}>
        {enAttente ? "Création..." : "S'inscrire"}
      </button>
      
      <p className="mt-auto text-sm text-center text-white/50">
        {"Déjà un compte ? "}
        <button type="button" onClick={onSwitch} className={btnChangementFormClass}>Se connecter</button>
      </p>
    
    </form>
  );
};

const BtnFormConnexion = () => {
  const [estOuvert, setEstOuvert] = useState(false);
  const [estRetourne, setEstRetourne] = useState(false);
  const pathname = usePathname();

  const fermer = () => {
    setEstOuvert(false);
    setEstRetourne(false);
  };

  return (
    <>
      <Btn onClick={() => setEstOuvert(true)} className="my-4 md:my-0">
        Connexion
      </Btn>

      {estOuvert && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-60 bg-black/70 backdrop-blur-sm" onClick={fermer}>
          <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>

            <div style={{ perspective: "1200px" }}>
              <div style={{
                position: "relative",
                height: "680px",
                transition: "transform 0.65s ease",
                transformStyle: "preserve-3d",
                transform: estRetourne ? "rotateY(180deg)" : "rotateY(0deg)",
              }}>
                
                {/* recto — connexion */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 p-8 overflow-y-auto border rounded-xl bg-bleu-fonce2 border-bleu"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-linear-to-r from-bleu via-bleu-clair to-bleu" />
                  <button type="button" onClick={fermer} className="absolute transition-colors top-4 right-4 text-bleu-clair/60 hover:text-bleu-clair">
                    <CgClose className="w-5 h-5" />
                  </button>
                  <FormConnexion onSwitch={() => setEstRetourne(true)} redirectTo={pathname} />
                </div>

                {/* verso — inscription */}
                <div
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  className="absolute inset-0 p-8 overflow-y-auto border rounded-xl bg-bleu-fonce2 border-bleu"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-linear-to-r from-bleu via-bleu-clair to-bleu" />
                  <button type="button" onClick={fermer} className="absolute transition-colors top-4 right-4 text-bleu-clair/60 hover:text-bleu-clair">
                    <CgClose className="w-5 h-5" />
                  </button>
                  <FormInscription onSwitch={() => setEstRetourne(false)} redirectTo={pathname} />
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BtnFormConnexion;
