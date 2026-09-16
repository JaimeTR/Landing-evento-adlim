# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 14 (App Router), export estático (`output: 'export'`), Tailwind CSS, Supabase (datos +
auth del panel admin). Ya existente en el repo, no es decisión nueva.

## Users

Médicos especialistas (ginecología estética/regenerativa y afines) con consultorio propio en
LatAm, evaluando inscribirse a un curso pago de capacitación práctica en una técnica/tecnología
específica (Sistema FRAXX). Deciden bajo poco tiempo y con criterio alto — comparan si vale la
pena la inversión y si la práctica es real (no solo teoría).

*(Inferido del copy ya existente en el landing — especialidad, precios en USD, cupos limitados —
más el perfil de audiencia que describe el manual de marca de ADLIM Partners: "médico
independiente con consultorio propio, emprendedor del sector salud, que decide bajo presión de
tiempo, con recursos acotados". No se confirmó con el usuario directamente — preguntó dos veces
y no contestó, así que sigue como inferencia etiquetada.)*

## Product Purpose

Landing de inscripción a un evento puntual: "Técnicas Avanzadas de Cirugía Estética Genital
Femenina con el Sistema FRAXX", 1er Hands-On de ADLIM Partners, con el Dr. Marco Gaxiola C.,
12 de noviembre 2026, Lima - Perú. Éxito = que el médico complete el formulario y continúe la
conversación de pago por WhatsApp.

## Positioning

Único Hands-On con práctica quirúrgica en vivo con pacientes reales (no solo simulación),
cupos limitados, dictado por un instructor reconocido en la técnica del Sistema FRAXX.
Organizado por ADLIM Partners, que se posiciona como "el aliado que entiende el día a día del
médico independiente" (acompañamiento cercano + crecimiento profesional + innovación
accesible), según su manual de marca corporativo.

## Operating Context

- Registro en 3 pasos (datos, participación, contacto) → guarda en Supabase (tabla `leads`) →
  abre WhatsApp con mensaje prellenado para coordinar el pago manualmente.
- Precio escalonado por fecha de inscripción (lanzamiento/preventa/regular) + precio especial
  para usuarios de equipos de radiofrecuencia (RF).
- Dos modalidades: Hands-On (práctica quirúrgica) o Live Observer (transmisión audiovisual).
- Panel admin (`/admin/leads`) para que el equipo marque manualmente el estado de pago.

## Capabilities and Constraints

- Export estático para subir a cPanel — sin server-side rendering ni API routes propias.
- Supabase solo para leads + auth admin, RLS ya configurado (anon solo inserta).
- Sin pasarela de pago integrada — el pago se coordina por WhatsApp manualmente.
- Marca organizadora (ADLIM Partners) tiene manual de marca propio y separado del contenido
  específico del curso/instructor.

## Brand Commitments

- Marca organizadora: **ADLIM Partners** — manual de marca completo disponible
  ([brand-color-reference.md](brand-color-reference.md)): logo real (`public/brand/`), paleta
  de 13 colores exactos, tipografía (Mac Sans + Montserrat, archivo de Mac Sans en
  `public/fonts/`), degradados, iconografía propia, tono de voz (cercano, directo, médico a
  médico, sin tecnicismos excesivos).
- Instructor: Dr. Marco Antonio Gaxiola Cueto (México), ginecología estética y regenerativa.
  Foto real disponible (`public/dr-marco-gaxiola.jpg` y versión sin fondo).
- Tecnología del curso: Sistema FRAXX — foto real del equipo disponible
  (`public/fraxx-device-crop.jpg`).
- Nombre del curso, fecha, sede, precios y agenda ya están definidos y no deben inventarse ni
  cambiarse sin pedirlo el usuario (ver [Agenda.tsx](components/Agenda.tsx),
  [Pricing.tsx](components/Pricing.tsx)).

## Evidence on Hand

- Logo ADLIM Partners real (isotipo + wordmark + versión completa), extraído del manual de
  marca en `public/brand/`.
- Foto real del Dr. Gaxiola (con y sin fondo) en `public/`.
- Foto real del equipo FRAXX en uso, `public/fraxx-device-crop.jpg`.
- Manual de marca completo (24 págs.) ya leído y documentado en `brand-color-reference.md`.
- Sin testimonios, certificaciones ni ediciones anteriores del curso — es la 1ª edición
  ("1er Hands-On"). No inventar prueba social que no existe.

## Product Principles

1. El registro tiene que sentirse rápido y de bajo esfuerzo — el médico decide con poco tiempo.
2. La marca ADLIM Partners y la autoridad del Dr. Gaxiola son el respaldo de confianza; usarlos
   con fuerza visual real (logo y foto reales, no genéricos).
3. Precio y fechas son información crítica de decisión — deben verse claras, no escondidas.
4. Sin pasarela de pago propia: todo camino termina en WhatsApp, eso no cambia con el rediseño.
5. Cupos limitados y exclusividad (única con práctica real) son el gancho central del mensaje.

## Accessibility & Inclusion

Sin requisito específico confirmado. Mantener buen contraste de texto (ver matriz de
combinaciones fondo/texto del manual de marca) y tamaños de toque accesibles en el formulario
multi-step, ya existente.
