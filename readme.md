# Landing — Curso Hands-On FRAXX - Hostinger

Landing de inscripción para el curso "Técnicas Avanzadas de Cirugía Estética Genital Femenina con el
Sistema FRAXX", Dr. Marco Gaxiola C., 12 de noviembre, Lima - Perú. 1er Hands-On por ADLIM Partners.

Next.js 14 (App Router), export estático (`output: 'export'`) para subir a cPanel. Supabase para guardar
inscritos + panel admin.

## Cómo funciona el registro

1. La persona completa el formulario (`components/RegisterForm.tsx`).
2. Los datos se guardan en la tabla `leads` de Supabase (ver `supabase/schema.sql`).
3. Al finalizar, se abre WhatsApp con un mensaje prellenado hacia el número de contacto para coordinar el
   pago (número configurado en `WHATSAPP_NUMBER` dentro de `RegisterForm.tsx`).
4. El equipo verifica el pago manualmente y actualiza el estado en `/admin/leads` (columna "Pago":
   pendiente / pagado).

## Setup

```bash
npm install
cp .env.example .env.local   # completar con las credenciales de Supabase
npm run dev
```

Ejecutar `supabase/schema.sql` en el SQL Editor de Supabase antes del primer uso. Si la tabla `leads`
ya existía, ejecutar también `supabase/migration_add_contact_fields.sql` para guardar ciudad,
teléfono opcional y fecha de adquisición del equipo RF. Crear los usuarios del
panel admin en Supabase Authentication.

## Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=      # obligatorio en producción: dominio real para previews OG/Twitter
NEXT_PUBLIC_WHATSAPP_NUMBER=  # opcional; por defecto 51914507338
```

## Build para cPanel (partners.adlim.com)

```bash
npm run build
```

El build usa `.env.production` (`NEXT_PUBLIC_SITE_URL=https://partners.adlim.com`)
para que los previews de WhatsApp/OG apunten al dominio real. Sube el contenido
de la carpeta `out/` a `public_html` (o subcarpeta) en cPanel. Ya está configurado
`output: 'export'` + `trailingSlash` + imágenes sin optimizar, que es lo que un
hosting Apache estático necesita.

## Estado del contenido

- Logo ADLIM Partners, foto del Dr. Marco Gaxiola y foto del equipo FRAXX ya integrados
  (`public/brand/`, `public/dr-marco-gaxiola*.jpg|png`, `public/fraxx-device-crop.jpg`).
- Favicon: `app/icon.png`.

## Pendiente de definir con el organizador

- Hueco de agenda entre las 12:30 y las 13:00 (el Lunch termina 12:30 y la práctica
  empieza 13:00): confirmar qué va en ese bloque antes de mostrarlo.
