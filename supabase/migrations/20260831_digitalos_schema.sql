-- DigitalOS: execute esta migração no projeto Supabase depois de configurar o ambiente.
-- Não há credenciais, URLs ou chaves neste repositório.
create extension if not exists "pgcrypto";

create type public.subscription_status as enum ('pending', 'active', 'cancelled', 'expired');
create type public.guide_status as enum ('draft', 'generating', 'completed', 'failed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.plans (id text primary key, name text not null, generation_limit integer not null check (generation_limit > 0), active boolean not null default true);
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null references public.plans(id), status public.subscription_status not null default 'pending',
  billing_provider text, provider_customer_id text, provider_subscription_id text, current_period_start timestamptz, current_period_end timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.guides (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  title text, status public.guide_status not null default 'draft', input jsonb not null default '{}'::jsonb, content jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.generation_usage (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  guide_id uuid references public.guides(id) on delete set null, usage_month date not null, created_at timestamptz not null default now(),
  unique (user_id, guide_id)
);
create table public.affiliates (id uuid primary key default gen_random_uuid(), code text not null unique, display_name text, created_at timestamptz not null default now());
create table public.sales (id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null, affiliate_id uuid references public.affiliates(id) on delete set null, subscription_id uuid references public.subscriptions(id) on delete set null, provider_sale_id text unique, created_at timestamptz not null default now());

alter table public.profiles enable row level security; alter table public.subscriptions enable row level security; alter table public.guides enable row level security; alter table public.generation_usage enable row level security; alter table public.plans enable row level security;
create policy "profiles are private" on public.profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy "subscriptions are private" on public.subscriptions for select using (user_id = auth.uid());
create policy "guides are private" on public.guides for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "usage is private" on public.generation_usage for select using (user_id = auth.uid());
create policy "plans are readable" on public.plans for select using (active = true);

-- Crie/atualize assinaturas e uso mensal somente em funções server-side (service role),
-- chamadas por webhook validado do gateway. Nunca exponha a service role no navegador.
