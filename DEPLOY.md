# Instruções de Deploy

## Variáveis de Ambiente Necessárias

Configure as seguintes variáveis de ambiente no Easypanel:

- `NEXT_PUBLIC_API_BASE_URL` - URL base da API (ex: `https://api.kenb2b.com/api/v1`)
- `NEXT_PUBLIC_API_STATIC` - URL para arquivos estáticos/imagens (ex: `https://api.kenb2b.com/`)
- `PORT` - Porta do servidor (padrão: 3000)
- `NODE_ENV` - Ambiente (deve ser `production` em produção)

## Deploy no Easypanel

1. O projeto usa Dockerfile direto (não buildpacks)
2. Certifique-se de que as variáveis de ambiente estão configuradas
3. O servidor iniciará automaticamente na porta especificada

## Estrutura do Projeto

- `server.js` - Servidor Express principal
- `services/eventosService.js` - Serviço de eventos
- Templates EJS em: `index.ejs`, `pt-br.ejs`, `evento.ejs`
- Assets estáticos em: `assets/`

## Porta

O servidor usa a porta definida na variável `PORT` ou 3000 por padrão.

