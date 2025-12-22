# Instruções de Deploy no Easypanel

## ⚠️ Problema Atual

O Easypanel está tentando usar Cloud Native Buildpacks (pack build) mas o Docker client do servidor está desatualizado (versão 1.38, precisa de 1.44+).

## ✅ Solução

**Configure o Easypanel para usar Dockerfile diretamente ao invés de buildpacks:**

1. No painel do Easypanel, vá em **Settings** ou **Build Settings**
2. Altere o **Build Method** de "Buildpacks" para **"Dockerfile"**
3. Ou desabilite a detecção automática de buildpacks

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no Easypanel:

- `NEXT_PUBLIC_API_BASE_URL` = `https://api.kenb2b.com/api/v1`
- `NEXT_PUBLIC_API_STATIC` = `https://api.kenb2b.com/`
- `PORT` = `3000` (ou a porta desejada)
- `NODE_ENV` = `production`

## Estrutura do Projeto

- `Dockerfile` - Configuração Docker para build
- `server.js` - Servidor Express principal
- `services/eventosService.js` - Serviço de eventos
- Templates EJS em: `index.ejs`, `pt-br.ejs`, `evento.ejs`
- Assets estáticos em: `assets/`

## Build Local (para testar)

```bash
docker build -t ken-lp .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_BASE_URL=https://api.kenb2b.com/api/v1 \
  -e NEXT_PUBLIC_API_STATIC=https://api.kenb2b.com/ \
  -e NODE_ENV=production \
  ken-lp
```

## Nota Importante

Se o Easypanel continuar tentando usar buildpacks, você precisará:
1. Atualizar o Docker client no servidor do Easypanel, OU
2. Configurar manualmente no painel para usar Dockerfile
