-- VisionX — schema do banco de dados
-- Rode isto no Supabase → SQL Editor (uma vez).

-- Tabela de leads (formulário de contato)
create table if not exists public.leads (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  nome        text,
  email       text not null,
  mensagem    text,
  origem      text,
  status      text not null default 'novo'
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Tabela de inscritos na newsletter
create table if not exists public.newsletter (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  email       text not null
);
create index if not exists newsletter_created_at_idx on public.newsletter (created_at desc);

-- Segurança: o site fala com o banco SÓ pelo servidor (usando a service_role key,
-- que ignora o RLS). Habilitamos o RLS e NÃO criamos policies públicas, então
-- ninguém consegue ler/gravar usando a chave anônima (anon). Os dados ficam privados.
alter table public.leads      enable row level security;
alter table public.newsletter enable row level security;

-- Tabela da equipe (gerenciada pelo painel admin, exibida na página Sobre)
create table if not exists public.team (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  nome        text not null,
  cargo       text,
  foto        text,
  ordem       int  not null default 0,
  ativo       boolean not null default true
);
create index if not exists team_ordem_idx on public.team (ordem asc);
alter table public.team enable row level security;

-- Configurações/conteúdo do site (chave-valor) — gerenciado pelo painel (aba Conteúdo)
create table if not exists public.settings (
  chave      text primary key,
  valor      text,
  updated_at timestamptz not null default now()
);
alter table public.settings enable row level security;

-- Depoimentos (gerenciados pelo painel, exibidos na página inicial)
create table if not exists public.depoimentos (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  texto       text not null,
  autor       text,
  foto        text,
  ordem       int  not null default 0,
  ativo       boolean not null default true
);
create index if not exists depoimentos_ordem_idx on public.depoimentos (ordem asc);
alter table public.depoimentos enable row level security;
