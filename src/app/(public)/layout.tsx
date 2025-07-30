import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Farrukhnagar Realty",
  description: "Your trusted real estate partner",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Header />
        <main className="pt-32">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
