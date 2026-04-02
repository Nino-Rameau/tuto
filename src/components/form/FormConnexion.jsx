"use client";

import { useActionState, useState } from "react";
import { inscrireUtilisateur, connecterUtilisateur } from "@/actions/auth.actions";

const FormConnexion = () => {
  const [etatInscription, actionInscription, enAttenteInscription] = useActionState(inscrireUtilisateur, null);
  const [etatConnexion, actionConnexion, enAttenteConnexion] = useActionState(connecterUtilisateur, null);

  return (
    <div>
      <h1>Connexion</h1>

      <form action={actionConnexion} className="flex flex-col gap-6 items-start border border-gray-500 p-10">
        <h2>Formulaire de connexion :</h2>
        
        {etatConnexion?.erreur && <p className="text-red-600 font-bold bg-red-100 p-2">{etatConnexion.erreur}</p>}

        <label className="flex flex-col gap-1 w-full">
          Email
          <input type="email" name="email" className="bg-gray-300 p-1" />
        </label>

        <label className="flex flex-col gap-1 w-full">
          Mot de passe
          <input type="password" name="motDePasse" className="bg-gray-300 p-1"/>
        </label>

        <button type="submit" disabled={enAttenteConnexion} className="bg-blue-600 text-white px-4 py-2 mt-4">
          {enAttenteConnexion ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>


      <form action={actionInscription} className="flex flex-col gap-6 items-start border border-gray-500 mt-10 p-10">
        <h2>Formulaire d&apos;inscription :</h2>

        {etatInscription?.erreur && <p className="text-red-600 font-bold bg-red-100 p-2">{etatInscription.erreur}</p>}
        
        <label className="flex flex-col gap-1 w-full">
          Email
          <input type="email" name="email"  defaultValue={etatInscription?.donnees?.email || ""}  className="bg-gray-300 p-1" />
        </label>

        <label className="flex flex-col gap-1 w-full">
          Mot de passe
          <input type="password" name="motDePasse" defaultValue={etatInscription?.donnees?.motDePasse || ""} className="bg-gray-300 p-1" />
        </label>
        
        <label className="flex flex-col gap-1 w-full">
          Confirmer le mot de passe
          <input type="password" name="confirmationMotDePasse" defaultValue={etatInscription?.donnees?.confirmationMotDePasse || ""} className="bg-gray-300 p-1" />
        </label>
        
        <label className="flex flex-row items-center gap-2 cursor-pointer">
          <input type="checkbox" name="conditions" className="bg-gray-300 w-5 h-5"/>
          J&apos;accepte les RGPD
        </label>

        <button type="submit" disabled={enAttenteInscription} className="bg-blue-600 text-white px-4 py-2 mt-4">
          {enAttenteInscription ? "Création en cours..." : "S'inscrire"}
        </button>
      </form>

      <div>
        <p>acces utilisateur :</p>
        <p>test2@test.fr</p>
        <p>test1234</p>
      </div>
      <div>
        <p>acces admin :</p>
        <p>test@test.fr</p>
        <p>test1234</p>
      </div>
    </div>
  );
};

const BtnFormConnexion = () => {
  const [estOuvert, setEstOuvert] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setEstOuvert(true)} className="text-white">
        Connexion
      </button>

      {estOuvert && (
        <div
          className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center px-4"
          onClick={() => setEstOuvert(false)}
        >
          <div
            className="relative bg-white max-h-[90vh] overflow-y-auto w-full max-w-3xl rounded-md p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setEstOuvert(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-black"
            >
              X
            </button>

            <FormConnexion />
          </div>
        </div>
      )}
    </>
  );
};

export default BtnFormConnexion;