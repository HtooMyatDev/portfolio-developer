import type { Metadata } from "next";
import {
  Inter,
  Geist_Mono,
  JetBrains_Mono,
  Space_Grotesk,
  Doto,
  Pixelify_Sans,
} from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

const tharlon = localFont({
  src: [
    {
      path: "../../public/fonts/Tharlon-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tharlon-base",
  display: "swap",
});

const departureMono = localFont({
  src: [
    {
      path: "../../public/fonts/DepartureMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-departure-base",
});
const inter = Inter({
  variable: "--font-inter-base",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-base",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-base",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-developer-ten-pied.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rex — Software Engineer",
    template: "%s | Rex",
  },
  description: "Software engineer & web developer portfolio showcasing projects, notes, and interactive web experiences.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${pixelifySans.variable} ${doto.variable} ${jetBrainsMono.variable} ${tharlon.variable} ${departureMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <div className="min-h-full">
            <NavBar />
            <div className="px-4 sm:px-10 lg:px-32 xl:px-60 py-5 overflow-x-hidden">
              <Preloader />
              <ScrollToTop />
              <CustomCursor />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
