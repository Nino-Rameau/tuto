import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const url = req.nextUrl.pathname;
  const estConnecte = req.auth != null;
  const profil = req.auth?.user?.profil;

  if (url.startsWith("/admin")) {
    if (profil !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (url.startsWith("/profil")) {
    if (!estConnecte) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};