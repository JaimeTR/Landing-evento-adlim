-- Ejecutar en Supabase: Dashboard > SQL Editor > New query > pegar todo > Run.

create extension if not exists "pgcrypto";

create type lead_status as enum ('nuevo', 'contactado', 'confirmado', 'descartado');
create type tipo_participacion as enum ('hands-on', 'live-observer');
create type estado_pago as enum ('pendiente', 'pagado');

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombres text not null,
  apellido text not null,
  especialidad text not null,
  pais text not null,
  telefono text not null,
  email text not null,
  tipo_participacion tipo_participacion not null default 'hands-on',
  usa_rf boolean not null default false,
  estado_pago estado_pago not null default 'pendiente',
  origen text not null default 'landing-webinar-fraxx',
  status lead_status not null default 'nuevo'
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_estado_pago_idx on public.leads (estado_pago);

alter table public.leads enable row level security;

-- El formulario público (rol "anon") solo puede insertar, nunca leer/editar/borrar.
create policy "Público puede registrarse al curso"
  on public.leads for insert
  to anon
  with check (true);

-- Solo usuarios autenticados (equipo ADLIM Partners) pueden ver y administrar los leads,
-- incluido marcar manualmente el estado_pago tras verificar el pago por WhatsApp.
create policy "Autenticados pueden ver leads"
  on public.leads for select
  to authenticated
  using (true);

create policy "Autenticados pueden actualizar leads"
  on public.leads for update
  to authenticated
  using (true)
  with check (true);

create policy "Autenticados pueden borrar leads"
  on public.leads for delete
  to authenticated
  using (true);

-- RLS solo filtra FILAS; Postgres además exige el permiso base de TABLA
-- (GRANT) para el rol. Sin esto, el INSERT falla con 42501 aunque la
-- política de arriba exista.
grant usage on schema public to anon, authenticated;
grant insert on public.leads to anon;
grant select, update, delete on public.leads to authenticated;

-- Crea aquí los usuarios del panel admin (Authentication > Users > Add user)
-- con su email y contraseña; no necesitan una fila adicional en esta tabla.
