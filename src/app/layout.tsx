import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ReactNode } from "react";
import RevealObserver from "../components/RevealObserver";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-franck-ep.vercel.app"),
  title: "Franck Echeverría Peñaloza — Data Engineer, Data & BI Analyst",
  description:
    "Data engineer and BI analyst in Barranquilla, Colombia. Azure Synapse, Fabric, Power BI and Power Apps, SQL, Python and .NET C#.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Franck Echeverría Peñaloza — Data Engineer",
    description:
      "I turn scattered data into platforms the business trusts to decide. Based in Barranquilla, Colombia.",
    images: ["/picture.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#edefee",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <head>
        {/* Marks the page as scripted so reveal animations only hide content when JS can show it again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
