import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import "./globals.css";

const display = localFont({
  src: "../public/fonts/mac-sans-regular.otf",
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const title = "Cirugía Estética Genital Femenina · Sistema FRAXX | Hands-On ADLIM Partners";
const description =
  "Técnicas avanzadas de cirugía estética genital femenina con el Sistema FRAXX. Dr. Marco Gaxiola C. Prácticas en vivo con pacientes. 12 de noviembre, Lima - Perú. Cupos limitados.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title,
  description,
  openGraph: {
    title,
    description,
    images: [{ url: "/og-event.png", width: 1200, height: 630 }],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-event.png"],
  },
};

const noFlashThemeScript = `
(function() {
  try {
    var stored = localStorage.getItem('fraxx-theme');
    var theme = stored || 'light';
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
      <body className="font-body">
        {/*
          THESIS: el evento se presenta como una masterclass real respaldada por dos
          autoridades verificables (Dr. Gaxiola, ADLIM Partners), no como una landing
          de curso genérica flotando sobre un gradiente decorativo.
          OWN-WORLD: paleta ADLIM Partners real (marino dominante; teal/naranja/
          magenta/oliva/ámbar como acentos por categoría), Mac Sans en títulos,
          Montserrat en texto, logo e iconografía reales, superficies planas
          (sin glass/blur), degradados de marca solo como fondo de sección.
          STORY: el médico entiende en el primer scroll qué es, quién lo dicta,
          por qué es único y cómo asegura su cupo.
          FIRST VIEWPORT: foto real del Dr. Gaxiola + headline directo (sin kicker)
          + formulario, tres columnas editoriales.
          FORM: mundo visual ya decidido por el manual de marca del organizador;
          se aplicó directo, sin ronda de conceptos.
          FINISH: unreviewed and undocumented is unfinished; this build ends with
          the finish review, the verdict, DESIGN.md, and every shipping raster
          carrying its provenance.
        */}
        {children}
      </body>
    </html>
  );
}
