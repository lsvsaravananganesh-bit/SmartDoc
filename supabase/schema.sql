create extension if not exists pgcrypto;

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  subject text not null default '',
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.datasets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  row_count integer not null default 0,
  columns jsonb not null default '[]'::jsonb,
  rows jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references public.templates(id) on delete set null,
  dataset_id uuid references public.datasets(id) on delete set null,
  recipient_name text not null,
  recipient_email text not null default '',
  merged_content text not null,
  pdf_path text,
  status text not null default 'pending' check (status in ('pending','generated','sent','failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  subject text not null,
  message text not null,
  document_count integer not null default 0,
  sent_count integer not null default 0,
  failed_count integer not null default 0,
  status text not null default 'draft' check (status in ('draft','sending','completed','failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  recipient_email text not null,
  event text not null check (event in ('queued','sent','delivered','opened','clicked','bounced','failed')),
  provider_id text,
  created_at timestamptz not null default now()
);

alter table public.templates enable row level security;
alter table public.datasets enable row level security;
alter table public.documents enable row level security;
alter table public.campaigns enable row level security;
alter table public.email_events enable row level security;

create policy "users manage own templates" on public.templates for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "users manage own datasets" on public.datasets for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "users manage own documents" on public.documents for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "users manage own campaigns" on public.campaigns for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "users manage own email events" on public.email_events for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
