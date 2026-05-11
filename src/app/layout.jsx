import { auth } from "@/auth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","400","700","800"]
});


export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen bg-bleu-fonce2 text-white overflow-x-clip ${poppins.className}`}>
          <Header session={session}/>
          <main className="w-full mx-auto max-w-400 grow"> {children} </main>
          <Footer />
      </body>
    </html>
  );
}
