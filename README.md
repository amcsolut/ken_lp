# KEN - Kingdom Enterprise Network Landing Page

Landing page para o KEN (Kingdom Enterprise Network) desenvolvida com Node.js, Express e EJS.

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

## 🚀 Instalação

1. Clone ou navegue até o diretório do projeto:
```bash
cd /home/amcsolutions/@dev/@projetos/ken/lp
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```

### Modo Produção
```bash
npm start
```

O servidor estará rodando em: **http://localhost:3000**

## 📄 Rotas Disponíveis

- `/` - Página principal (inglês)
- `/pt-br` - Página principal (português)
- `/orlando2025` - Página do evento Orlando 2025
- `/api/eventos/listar_eventos_ativos` - API de eventos (mock data)

## 🛠️ Estrutura do Projeto

```
lp/
├── assets/           # Arquivos estáticos (CSS, JS, imagens)
│   ├── css/
│   ├── js/
│   └── img/
├── index.ejs         # Conteúdo da página principal (inglês)
├── pt-br.ejs         # Página completa em português
├── orlando2025.ejs   # Conteúdo da página do evento
├── Layout_Site-EN.ejs    # Layout para versão em inglês
├── Layout_Site-PT.ejs    # Layout para versão em português
├── layout_hotsite.ejs    # Layout para hotsite de eventos
├── server.js         # Servidor Express
└── package.json      # Dependências do projeto
```

## 🔧 Tecnologias Utilizadas

- **Express.js** - Framework web para Node.js
- **EJS** - Engine de templates
- **Bootstrap 5** - Framework CSS
- **Font Awesome** - Ícones
- **AOS** - Animações on scroll
- **Typed.js** - Efeito de digitação
- **jQuery** - Biblioteca JavaScript

## 📝 Notas

- A API de eventos (`/api/eventos/listar_eventos_ativos`) atualmente retorna dados mock. Você precisará conectar a uma API real quando disponível.
- Os arquivos `dmxAppConnect` referenciados nos templates são específicos do Wappler. Se necessário, você pode criar stubs vazios ou remover essas referências.

## 🐛 Solução de Problemas

### Porta já em uso
Se a porta 3000 estiver em uso, você pode alterar a porta definindo a variável de ambiente:
```bash
PORT=3001 npm start
```

### Erro ao renderizar templates
Certifique-se de que todos os arquivos `.ejs` estão no diretório raiz do projeto.

## 📞 Suporte

Para mais informações, consulte a documentação do Express.js e EJS.

