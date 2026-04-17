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
      <body className={`flex flex-col min-h-screen ${poppins.className}`}>
          <Header session={session}/>
          <main className="mx-auto grow"> {children} </main>
          <Footer />
      </body>
    </html>
  );
}
