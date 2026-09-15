import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Cirugía Estética Genital Femenina · Sistema FRAXX | Hands-On ADLIM Partners",
  description:
    "Técnicas avanzadas de cirugía estética genital femenina con el Sistema FRAXX. Dr. Marco Gaxiola C. Prácticas en vivo con pacientes. 12 de noviembre, Lima - Perú. Cupos limitados.",
};

const noFlashThemeScript = `
(function() {
  try {
    var stored = localStorage.getItem('fraxx-theme');
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
