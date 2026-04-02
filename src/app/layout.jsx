import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200","400","700","800"]
});


export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`flex flex-col min-h-screen ${poppins.className}`}>
          <Header />
          <main className="grow mx-auto"> {children} </main>
          <Footer />
      </body>
    </html>
  );
}
