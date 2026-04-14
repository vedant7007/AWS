import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CloudTransition from "@/components/layout/CloudTransition";
import CloudCursor from "@/components/cursor/CloudCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AWS Cloud Club VJIT — Build. Learn. Deploy. On the Cloud.",
  description:
    "Official AWS Cloud Club at Vidya Jyothi Institute of Technology, Hyderabad. Student-led cloud community for workshops, hackathons, certifications, and career growth.",
  keywords: [
    "AWS",
    "Cloud Club",
    "VJIT",
    "Hyderabad",
    "AWS Cloud Club",
    "Cloud Computing",
    "Student Community",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScroll>
            <Preloader />
            <ScrollProgress />
            <Navbar />
            <CloudTransition />
            <main>{children}</main>
            <Footer />
            <CloudCursor />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
