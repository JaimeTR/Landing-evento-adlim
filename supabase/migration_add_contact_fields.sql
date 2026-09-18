-- Migración: guardar los campos de contacto que el formulario ya recoge
-- (ciudad, teléfono opcional y fecha de adquisición del equipo RF) pero que
-- hoy no tienen columna en la tabla. Ejecutar en Supabase SQL Editor.
-- Es idempotente y no rompe el código previo: insertLead() reintenta sin
-- estas columnas si aún no existen.

alter table public.leads
  add column if not exists ciudad text,
  add column if not exists telefono_opcional text,
  add column if not exists fecha_adquisicion_rf text;
