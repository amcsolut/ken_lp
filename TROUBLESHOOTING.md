# 🔍 Troubleshooting - Serviço em Amarelo

## ✅ Melhorias Aplicadas

1. **Rota de Health Check** (`/health`)
   - Endpoint simples que retorna status OK
   - Health check do Docker atualizado para usar `/health`

2. **Logs de Debug**
   - Logs de inicialização mostrando variáveis de ambiente
   - Tratamento de erros melhorado

3. **Servidor escutando em 0.0.0.0**
   - Aceita conexões externas corretamente

## 🔍 Como Diagnosticar

### 1. Verificar Logs do Container
No Easypanel, acesse:
- **Logs** do serviço "lp"
- Procure por mensagens de erro
- Verifique se aparece: `🚀 Servidor rodando em http://0.0.0.0:PORT`

### 2. Testar Health Check
Acesse: `http://seu-dominio:PORTA/health`
- Deve retornar: `{"status":"ok","timestamp":"...","port":3000,"nodeEnv":"production"}`

### 3. Verificar Variáveis de Ambiente
No Easypanel, confirme que estão configuradas:
- `PORT=3000` (ou a porta configurada)
- `NODE_ENV=production`
- `NEXT_PUBLIC_API_BASE_URL=https://api.kenb2b.com/api/v1`
- `NEXT_PUBLIC_API_STATIC=https://api.kenb2b.com/`

### 4. Verificar Porta
- **Container Port:** 3000
- **Host Port:** Diferente de 80 (ex: 3001, 8080, etc)

### 5. Possíveis Problemas

#### Problema: Servidor não inicia
**Solução:** Verifique os logs para erros de sintaxe ou dependências faltando

#### Problema: Health check falha
**Solução:** 
- Acesse `/health` manualmente
- Verifique se o servidor está respondendo

#### Problema: Porta em conflito
**Solução:** Configure uma porta externa diferente de 80

#### Problema: Erro ao buscar eventos da API
**Solução:** 
- Verifique se `NEXT_PUBLIC_API_BASE_URL` está correto
- A API deve estar acessível do servidor
- O servidor continuará funcionando mesmo se a API falhar (retorna arrays vazios)

## 📝 Próximos Passos

1. Faça commit e push das alterações
2. Faça deploy novamente
3. Verifique os logs do container
4. Teste o endpoint `/health`
5. Se ainda estiver amarelo, compartilhe os logs para análise

