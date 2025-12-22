# ⚠️ CONFIGURAÇÃO NECESSÁRIA NO EASYPANEL

## Problema
O Easypanel está tentando usar **Cloud Native Buildpacks** (`pack build`) mas o Docker client está desatualizado.

## Solução OBRIGATÓRIA no Painel Easypanel

Você **DEVE** configurar manualmente no painel do Easypanel:

### Passo a Passo:

1. **Acesse o projeto no Easypanel**
   - Vá para o projeto `frontend-ken/lp`

2. **Vá em Settings / Configuration / Build Settings**
   - Procure por "Build Method" ou "Build Type"
   - Ou "Buildpack vs Dockerfile"

3. **Altere para Dockerfile**
   - Mude de "Buildpacks" ou "Auto-detect" 
   - Para **"Dockerfile"** ou **"Docker"**

4. **Salve as configurações**

5. **Faça o deploy novamente**

## Alternativa: Atualizar Docker Client

Se não houver opção no painel, será necessário:
- Atualizar o Docker client no servidor do Easypanel
- Versão atual: 1.38
- Versão necessária: 1.44+

## Arquivos do Projeto

✅ **Dockerfile** - Pronto e otimizado
✅ **.dockerignore** - Configurado
✅ **Sem Procfile** - Removido para não forçar buildpacks
✅ **Sem .buildpacks** - Removido

## Variáveis de Ambiente

Configure no Easypanel:
- `NEXT_PUBLIC_API_BASE_URL` = `https://api.kenb2b.com/api/v1`
- `NEXT_PUBLIC_API_STATIC` = `https://api.kenb2b.com/`
- `PORT` = `3000`
- `NODE_ENV` = `production`

