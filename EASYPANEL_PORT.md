# ⚠️ CONFIGURAÇÃO DE PORTA NO EASYPANEL

## Problema
O serviço "lp" está em conflito com o serviço "frontend" - ambos tentando usar a porta 80.

## Solução

### Opção 1: Usar porta diferente (Recomendado)
No painel do Easypanel, configure o serviço "lp" para usar uma porta diferente:
- **Porta interna do container:** 3000 (já configurada no Dockerfile)
- **Porta externa/mapeamento:** Use uma porta diferente de 80, por exemplo:
  - 3001
  - 8080
  - 3000

### Opção 2: Configurar Proxy/Reverse Proxy
Se ambos precisam estar na porta 80:
- Configure um reverse proxy (nginx/traefik) no Easypanel
- O proxy redireciona para os serviços internos em portas diferentes

## Configuração no Easypanel

1. Acesse o serviço "lp" no Easypanel
2. Vá em **Settings** ou **Ports**
3. Configure:
   - **Container Port:** 3000
   - **Host Port:** (escolha uma porta diferente de 80, ex: 3001, 8080, etc)
4. Salve e reinicie o serviço

## Variáveis de Ambiente

Certifique-se de que a variável `PORT` está configurada:
- `PORT=3000` (porta interna do container)

O servidor está configurado para escutar em `0.0.0.0:3000` dentro do container.

