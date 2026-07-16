-- Habilita a geração de UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.usuarios_auth (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE public.categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT now()
);

CREATE TABLE public.usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID,
    criado_em TIMESTAMP DEFAULT now(),
    nome TEXT NOT NULL,
    status SMALLINT,
    desativo_em TIMESTAMP,
    codigo_ativa INTEGER,

    CONSTRAINT usuarios_auth_id_fkey
        FOREIGN KEY (auth_id)
        REFERENCES public.usuarios_auth(id)
);

CREATE TABLE public.categoria_pessoal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    auth_id UUID,
    nome TEXT,
    valor_max NUMERIC,

    CONSTRAINT categoria_pessoal_auth_id_fkey
        FOREIGN KEY (auth_id)
        REFERENCES public.usuarios_auth(id)
);

CREATE TABLE public.alertas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID,
    titulo TEXT NOT NULL,
    descricao TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT now(),
    data DATE NOT NULL,

    CONSTRAINT alertas_auth_id_fkey
        FOREIGN KEY (auth_id)
        REFERENCES public.usuarios_auth(id)
);

CREATE TABLE public.transacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID,

    tipo TEXT NOT NULL
        CHECK (tipo IN ('entrada', 'saida')),

    valor NUMERIC NOT NULL,
    descricao TEXT,

    categoria_id UUID,
    categoria_pessoal_id UUID,

    criado_em TIMESTAMP DEFAULT now(),
    data DATE,

    CONSTRAINT transacoes_auth_id_fkey
        FOREIGN KEY (auth_id)
        REFERENCES public.usuarios_auth(id),

    CONSTRAINT transacoes_categoria_id_fkey
        FOREIGN KEY (categoria_id)
        REFERENCES public.categorias(id),

    CONSTRAINT transacoes_categoria_pessoal_id_fkey
        FOREIGN KEY (categoria_pessoal_id)
        REFERENCES public.categoria_pessoal(id)
);