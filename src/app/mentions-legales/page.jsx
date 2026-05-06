export const metadata = {
    title: "Mentions légales | Nino Web Success",
    description: "Mentions légales du site Nino Web Success.",
};

const MentionsLegales = () => {
    return (
        <div className="flex flex-col w-full py-10 mx-auto gap-8">
            <h1 className="text-center">Mentions légales</h1>

            <div className="flex flex-col gap-3">
                <h2>Éditeur du site</h2>
                <p>
                    Le site <strong>Nino Web Success</strong> (nws.nino-rameau.fr) est édité par <strong>Nino Rameau</strong>.
                </p>
                <p>
                    Contact : <a href="mailto:nrameau@normandiewebschool.fr" className="underline text-bleu-clair">nrameau@normandiewebschool.fr</a>
                </p>
                <p>
                    Ce site est un travail pédagogique sans objectifs commerciaux.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <h2>Hébergement</h2>
                <p>
                    Ce site est hébergé sur un serveur privé virtuel (VPS) fourni par <strong>OVH SAS</strong>.<br />
                    2 rue Kellermann — 59100 Roubaix, France<br />
                    Tél. : +33 9 72 10 10 07<br />
                    <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer" className="underline text-bleu-clair">https://www.ovhcloud.com</a>
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <h2>Propriété intellectuelle</h2>
                <p>
                    L&apos;ensemble du contenu présent sur ce site (textes, images, tutoriels, code source) est la propriété de Nino Rameau, sauf mention contraire.
                </p>
                <p>
                    Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <h2>Données personnelles</h2>
                <p className="text-wrap">
                    Lors de la création d&apos;un compte, les données suivantes sont collectées : nom d&apos;utilisateur, adresse e-mail et mot de passe (chiffré). Ces données sont utilisées uniquement pour le fonctionnement du site (authentification, suivi de progression).
                </p>
                <p className="text-wrap">
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez : <a href="mailto:nrameau@normandiewebschool.fr" className="underline text-bleu-clair">nrameau@normandiewebschool.fr</a>
                </p>
                <p>
                    Aucune donnée personnelle n&apos;est transmise à des tiers.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <h2>Cookies</h2>
                <p>
                    Ce site utilise uniquement des cookies de session nécessaires à l&apos;authentification (token JWT). Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <h2>Responsabilité</h2>
                <p>
                    Le contenu des tutoriels est fourni à titre informatif et pédagogique. L&apos;éditeur ne saurait être tenu responsable des erreurs ou omissions dans les contenus publiés, ni de l&apos;utilisation qui en est faite.
                </p>
            </div>
        </div>
    );
};

export default MentionsLegales;