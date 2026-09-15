# Landing — Curso Hands-On FRAXX

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

Ejecutar `supabase/schema.sql` en el SQL Editor de Supabase antes del primer uso. Crear los usuarios del
panel admin en Supabase Authentication.

## Build para cPanel

```bash
npm run build
```

Sube el contenido de la carpeta `out/` a `public_html` (o subcarpeta) en cPanel.

## Pendiente

- Reemplazar `public/icon.png` (favicon) por el logo real.
- Agregar foto real del Dr. Marco Gaxiola (hoy se muestra un avatar con iniciales "MG").
- Agregar logo real de ADLIM Partners (hoy se muestra como texto).
