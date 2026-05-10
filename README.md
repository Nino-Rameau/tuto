# Tuto — Site de tutoriels Nino Web Success (NWS)

Site de tutoriels dédiée au développement web. Les utilisateurs peuvent consulter des tutoriels, suivre leur progression, et les administrateurs peuvent créer et gérer le contenu via un back-office intégré.

Le projet est conteneurisé avec Docker et est déployé sur un VPS.

## Sommaire

1. [Aperçu](#aperçu)
2. [Technologies utilisées](#technologies-utilisées)
3. [Architecture](#architecture)
4. [Installation locale (sans Docker)](#installation-locale-sans-docker)
5. [Variables d'environnement](#variables-denvironnement)
6. [Docker](#docker)
7. [Auteur](#auteur)
8. [Licence](#licence)

---

## Aperçu

| Page | Description |
|------|-------------|
| `/` | Accueil |
| `/tutoriels` | Liste des tutoriels publiés |
| `/tutoriels/[slug]` | Contenu d'un tutoriel |
| `/profil` | Profil utilisateur + historique de progression |
| `/admin` | Back-office — liste & gestion des tutoriels (admin) |
| `/admin/nouveau` | Créer un tutoriel (admin) |
| `/admin/[id]` | Modifier un tutoriel (admin) |

![Page d'accueil](public/img/accueil.png)

---

## Technologies utilisées

- **[Next.js 16](https://nextjs.org/)** — App Router, React Server Components, Server Actions
- **[React 19](https://react.dev/)** — UI
- **[Prisma 7](https://www.prisma.io/)** — ORM avec adaptateur MariaDB
- **[MariaDB](https://mariadb.org/)** — Base de données relationnelle
- **[NextAuth 5 beta](https://authjs.dev/)** — Authentification JWT (credentials)
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Styles utilitaires
- **[CKEditor 5](https://ckeditor.com/)** — Éditeur WYSIWYG pour le contenu des tutoriels
- **[Zod](https://zod.dev/)** — Validation des formulaires côté serveur
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** — Hachage des mots de passe

---

## Architecture

### Modèle de données

5 modèles Prisma :

| Modèle | Rôle |
|--------|------|
| `Utilisateur` | Compte utilisateur (`profil`: `user` \| `admin`) |
| `Tuto` | Tutoriel (`statut`: `brouillon` \| `en_ligne`) |
| `Categorie` | Catégorie de tutoriel |
| `TutoCategorie` | Table de jonction tutoriel ↔ catégorie |
| `Progression` | Suivi par utilisateur (`en_cours` \| `terminé`) |

### Server Actions

Toutes les mutations passent par des Server Actions (pas de routes API) :

| Fichier | Responsabilité |
|---------|---------------|
| `src/actions/tuto.actions.js` | CRUD tutoriels |
| `src/actions/auth.actions.js` | Inscription & connexion |
| `src/actions/progression.action.js` | Démarrer & valider un tutoriel |

---

## Installation locale (sans Docker)

### Prérequis

- Node.js ≥ 20
- MariaDB (ou MySQL) en local
- Git

### Étapes

1. **Cloner le dépôt**
```bash
git clone https://github.com/Nino-Rameau/tuto.git
cd tuto
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```
Remplir le fichier `.env` (voir [Variables d'environnement](#variables-denvironnement)).

4. **Appliquer les migrations Prisma**
```bash
npx prisma migrate deploy
```

5. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application est accessible sur : http://localhost:3000

### Commandes utiles

```bash
npm run dev      # Serveur de développement (localhost:3000)
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linter ESLint
npx prisma studio          # Interface visuelle de la base de données
npx prisma migrate dev     # Créer et appliquer une migration
```

---

## Variables d'environnement

Copier `.env.example` en `.env` et renseigner les valeurs :

```env
DATABASE_URL=""         # URL complète de connexion Prisma (ex: mysql://user:pass@localhost:3306/db)
DATABASE_USER=""        # Utilisateur MariaDB
DATABASE_PASSWORD=""    # Mot de passe MariaDB
DATABASE_NAME=""        # Nom de la base de données
DATABASE_HOST=""        # Hôte (ex: localhost)
DATABASE_PORT=          # Port (ex: 3306)

AUTH_SECRET=            # Clé secrète NextAuth (générer avec: npx auth secret)
NODE_ENV=""             # "dev" ou "prod"
```

---

## Docker

Le projet est conteneurisé et déployé sur un VPS avec l'architecture suivante :

- **Next.js** dans un conteneur Node.js
- **MariaDB** dans un conteneur dédié
- **Traefik** comme reverse proxy (gestion SSL + routage)

---

## Auteur

**[Nino Rameau](https://nino-rameau.fr)** — [LinkedIn](https://www.linkedin.com/in/nino-rameau-1a0636332) — [GitHub](https://github.com/Nino-Rameau)

## Licence

Réalisé dans le cadre scolaire de avril à juin 2026.
