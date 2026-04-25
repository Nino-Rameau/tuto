import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      
      credentials: {
        email: { label: "Email", type: "email" },
        motDePasse: { label: "Mot de passe", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.motDePasse) return null;

        const utilisateur = await prisma.utilisateur.findUnique({
          where: { email: credentials.email }
        });

        if (!utilisateur) return null; 

        const motsDePasseCorrespondent = await bcrypt.compare(
          credentials.motDePasse, 
          utilisateur.password
        );

        if (!motsDePasseCorrespondent) return null; 

        return {
          id: utilisateur.id.toString(),
          nom: utilisateur.nom,
          email: utilisateur.email,
          profil: utilisateur.profil
        };
      }

    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 6, // token valable 6h
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.nom = user.nom;
        token.profil = user.profil;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.nom = token.nom;
        session.user.profil = token.profil;
      }
      return session;
    }
  }
});