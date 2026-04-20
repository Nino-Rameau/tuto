import { headers } from "next/headers";

const historiqueIP = new Map();

export function verifierRateLimit(adresseIP, { maxAppels, fenetreMs }) {
    const maintenant = Date.now();
    
    let infoIP = historiqueIP.get(adresseIP);

    // Si la fiche existe mais que le temps est écoulé, on la jette pour repartir à zéro
    if (infoIP && maintenant > infoIP.dateExpiration) {
        historiqueIP.delete(adresseIP);
        infoIP = null;
    }

    // SI NOUVEAU (OU RÉINITIALISÉ)
    if (!infoIP) {
        const nouvelleFiche = {
            compteur: 1,
            dateExpiration: maintenant + fenetreMs
        };
        historiqueIP.set(adresseIP, nouvelleFiche);
        return { autorise: true };
    }

    // SI LIMITE ATTEINTE
    if (infoIP.compteur >= maxAppels) {
        //math.ceil pour arrondir à l'entier supérieur
        const secondesRestantes = Math.ceil((infoIP.dateExpiration - maintenant) / 1000);
        return { autorise: false, attente: secondesRestantes };
    }

    infoIP.compteur++;
    return { autorise: true };
}


export async function obtenirIp() {
    const h = await headers();
    
    return (
        h.get("x-forwarded-for")?.split(",")[0].trim() ?? 
        h.get("x-real-ip") ?? 
        "unknown"
    );
}