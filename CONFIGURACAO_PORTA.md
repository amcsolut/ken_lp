# 🔧 Configuração de Porta - Serviço LP

## ⚠️ Problema
O serviço "lp" está em conflito com o serviço "frontend" - ambos tentando usar a porta 80.

## ✅ Solução no Easypanel

### Passo a Passo:

1. **Acesse o serviço "lp" no Easypanel**

2. **Vá em Settings / Ports / Networking**

3. **Configure as portas:**
   - **Container Port (Porta Interna):** `3000`
   - **Host Port (Porta Externa):** Escolha uma porta diferente de 80, por exemplo:
     - `3001`
     - `8080` 
     - `3000`
     - Ou qualquer outra porta disponível

4. **Salve as configurações**

5. **Reinicie o serviço**

## 📋 Configuração Atual do Código

- **Porta interna do container:** 3000 (definida no Dockerfile EXPOSE)
- **Servidor escuta em:** `0.0.0.0:3000` (aceita conexões externas)
- **Variável de ambiente:** `PORT=3000` (ou a porta que você configurar)

## 🔍 Verificação

Após configurar, verifique:
1. O serviço deve ficar verde (não amarelo)
2. Acesse a URL: `http://seu-dominio:PORTA_ESCOLHIDA/`
3. Verifique os logs do container para confirmar que está rodando

## 💡 Dica

Se você quiser que ambos os serviços sejam acessíveis na porta 80, você precisará:
- Configurar um reverse proxy (nginx/traefik) no Easypanel
- O proxy redireciona baseado no domínio ou path para cada serviço

