"use client";

import { useActionState, useState } from "react";
import { inscrireUtilisateur, connecterUtilisateur } from "@/actions/auth.actions";

const FormConnexion = () => {
  const [etatInscription, actionInscription, enAttenteInscription] = useActionState(inscrireUtilisateur, null);
  const [etatConnexion, actionConnexion, enAttenteConnexion] = useActionState(connecterUtilisateur, null);

  return (
    <div>
      <h1>Connexion</h1>

      <form action={actionConnexion} className="flex flex-col items-start p-10 border border-gray-500 gap-6">
        <h2>Formulaire de connexion :</h2>
        
        {etatConnexion?.erreur && <p className="p-2 font-bold text-red-600 bg-red-100">{etatConnexion.erreur}</p>}

        <label className="flex flex-col w-full gap-1">
          Email
          <input type="email" name="email" className="p-1 bg-gray-300" />
        </label>

        <label className="flex flex-col w-full gap-1">
          Mot de passe
          <input type="password" name="motDePasse" className="p-1 bg-gray-300"/>
        </label>

        <button type="submit" disabled={enAttenteConnexion} className="px-4 py-2 mt-4 text-white bg-blue-600">
          {enAttenteConnexion ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>


      <form action={actionInscription} className="flex flex-col items-start p-10 mt-10 border border-gray-500 gap-6">
        <h2>Formulaire d&apos;inscription :</h2>

        {etatInscription?.erreur && <p className="p-2 font-bold text-red-600 bg-red-100">{etatInscription.erreur}</p>}
        
        <label className="flex flex-col w-full gap-1">
          Nom ou pseudo
          <input type="text" name="nom" defaultValue={etatInscription?.donnees?.nom || ""} className="p-1 bg-gray-300" />
        </label>

        <label className="flex flex-col w-full gap-1">
          Email
          <input type="email" name="email" defaultValue={etatInscription?.donnees?.email || ""} className="p-1 bg-gray-300" />
        </label>

        <label className="flex flex-col w-full gap-1">
          Mot de passe
          <input type="password" name="motDePasse" defaultValue={etatInscription?.donnees?.motDePasse || ""} className="p-1 bg-gray-300" />
        </label>
        
        <label className="flex flex-col w-full gap-1">
          Confirmer le mot de passe
          <input type="password" name="confirmationMotDePasse" defaultValue={etatInscription?.donnees?.confirmationMotDePasse || ""} className="p-1 bg-gray-300" />
        </label>
        
        <label className="flex flex-row items-center cursor-pointer gap-2">
          <input type="checkbox" name="conditions" className="w-5 h-5 bg-gray-300"/>
          J&apos;accepte les RGPD
        </label>

        <button type="submit" disabled={enAttenteInscription} className="px-4 py-2 mt-4 text-white bg-blue-600">
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
      <button type="button" onClick={() => setEstOuvert(true)} className="p-4 text-white cursor-pointer bg-bleu-fonce2 rounded-xl">
        Connexion
      </button>

      {estOuvert && (
        <div
          className="fixed inset-0 flex items-center justify-center px-4 z-60 bg-black/60"
          onClick={() => setEstOuvert(false)}
        >
          <div
            className="relative bg-white max-h-[90vh] overflow-y-auto w-full max-w-3xl rounded-md p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setEstOuvert(false)}
              className="absolute text-gray-700 top-3 right-3 hover:text-black"
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