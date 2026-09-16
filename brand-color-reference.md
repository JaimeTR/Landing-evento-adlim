# Referencia de marca — ADLIM Partners

Fuente: `Manual de marca ADLIM partners_compressed.pdf` (24 págs., 2026), leído completo.
Todos los hex de abajo están confirmados por muestreo de píxel directo sobre el logo vectorial
y los íconos exportados del PDF (no son estimaciones).

## Logo

Archivos ya extraídos y listos para usar en `public/brand/`:
- `adlim-logo.png` — isotipo + wordmark completo, fondo transparente
- `adlim-isotipo.png` — solo el isotipo (círculo), fondo transparente, para favicon/marca de agua
- `adlim-wordmark.png` — solo el texto "ADLIM partners", fondo transparente

Construcción: "ADLIM" en marino sólido bold + "partners" en gradiente multicolor (teal → lavanda → magenta → naranja) minúscula. Isotipo: círculo con bandas onduladas marino/teal/rosa/naranja.

## Paleta — HEX exactos confirmados

| Color | Hex | Uso visto en el manual |
|---|---|---|
| Marino (color dominante) | `#22386F` | Wordmark "ADLIM", isotipo, ícono "Guión" |
| Teal (logo) | `#86C0CE` | Isotipo, ícono "Salud/Clínicas/Hospitales" |
| Teal saturado (paleta principal) | `#0497BA` | Acento de paleta, fondos |
| Naranja | `#FF7826` | Isotipo, ícono "Flecha" |
| Ámbar | `#FBB03B` | Ícono "Congresos/Alianzas" (distinto del naranja) |
| Magenta / rosa fuerte | `#FE9DFE` | Isotipo, ícono "Salud femenina" |
| Rosa claro (fondo) | `#FAC0FB` | Variante de fondo del logo |
| Oliva pastel | `#D5DD75` | Ícono "Clientes", degradados |
| Oliva saturado | `#93BB21` | Paleta principal |
| Gris claro / blanco humo | `#EEEDED` | Fondos neutros, paleta secundaria |
| Teal pastel (degradado) | `#C8E6EC` | Degradados |
| Lavanda (solo gradiente) | `#C5C3E3` | Punto medio del degradado del wordmark "partners", no es color plano |
| Negro (rich black) | `#1D1D1B` | Fondos negativos |

## Matriz fondo → textos válidos (pág. 21 del manual)

- Naranja → gris claro, marino, negro, rosa claro
- Magenta → gris claro, marino, negro
- Gris claro → teal, naranja, marino, negro, ámbar
- Marino → teal, magenta, gris claro, ámbar, rosa claro, oliva
- Negro → teal, naranja, magenta, gris claro, ámbar, rosa claro, oliva
- Ámbar → gris claro, marino, negro
- Rosa claro → naranja, marino, negro
- Oliva → gris claro, marino, negro
- Teal → gris claro, marino, negro

Regla general: fondo saturado → texto en neutro oscuro (gris claro / marino / negro).
Fondo oscuro (marino, negro) → admite más colores vivos encima.

## Tipografía

- Títulos: **Mac Sans**. Archivo en `public/fonts/mac-sans-regular.otf` (solo peso Regular, no vino
  Bold). Cargar con `next/font/local`. Para títulos que necesiten más peso visual, usar
  `font-weight` sintético o compensar con tamaño/tracking, ya que no hay archivo Bold real.
- Textos: **Montserrat** (Light, Regular, Semibold). Google Fonts, fácil de instalar.
- Reemplaza la config actual en [layout.tsx](app/layout.tsx) (hoy usa Space Grotesk + Plus Jakarta Sans).

## Degradados de marca

1. Rosa claro `#FAC0FB` → lavanda `#C5C3E3` → teal `#0497BA` (horizontal, fondo hero)
2. Oliva pastel `#D5DD75` → gris claro `#EEEDED`, con acento teal pastel `#C8E6EC` (radial, formas orgánicas)
3. Blanco/gris → naranja `#FF7826` (radial, foco inferior)

Uso: fondos de sección amplios, no para texto ni botones chicos. Página 24 del manual muestra
versiones con textura decorativa (cápsulas/blobs semi-transparentes) encima de estos degradados.

## Elementos gráficos (iconografía de marca)

- Clientes → 3 columnas redondeadas, oliva pastel `#D5DD75`
- Salud / Clínicas / Hospitales → cruz orgánica, teal `#86C0CE`
- Flecha → chevron orgánico, naranja `#FF7826`
- Congresos / Alianzas → forma "x"/trébol con rombo hueco al centro, ámbar `#FBB03B`
- Salud femenina → flor de 5 pétalos, magenta `#FE9DFE`
- Guión → forma tipo ala/cinta, marino `#22386F`

## Concepto y posicionamiento (extraído del manual, útil para copy)

- **Qué es ADLIM Partners:** el aliado del médico independiente que quiere hacer crecer su
  práctica con tecnología que marca la diferencia. Entiende que el médico con consultorio
  propio es un emprendedor del sector salud que decide bajo presión de tiempo y recursos
  acotados, con doble expectativa: que el equipo funcione y que lo haga ver bien frente a
  sus pacientes.
- **Ejes de comunicación:** Acompañamiento cercano (capacitación, soporte, atención sin
  esperas) · Crecimiento profesional (equipos que atraen pacientes y dan confianza) ·
  Innovación accesible (tecnología de punta a escala de consultorio independiente).
- **Tono de voz:** cercano e inspirador, médico a médico. Directo, ágil, concreto. No abruma
  con tecnicismos pero tampoco simplifica en exceso. Sabe que el médico tiene poco tiempo y
  mucho criterio.
- **Aspiración de marca:** ser el referente del médico, como alguien que entiende su mundo.

Esto aplica al landing del Hands-On FRAXX como evidencia de tono/posicionamiento de la marca
organizadora (ADLIM Partners), aunque el público específico del evento es más acotado:
médicos ginecólogos/especialistas en estética genital que evalúan capacitarse en la técnica.
