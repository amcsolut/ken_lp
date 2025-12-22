const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como engine de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Função auxiliar para renderizar com layout
async function renderWithLayout(res, layoutFile, contentFile, data = {}) {
  try {
    // Ler o conteúdo do arquivo
    const contentPath = path.join(__dirname, contentFile);
    const content = await fs.readFile(contentPath, 'utf8');
    
    // Renderizar o layout passando o conteúdo
    res.render(layoutFile, {
      ...data,
      content: content
    });
  } catch (error) {
    console.error(`Erro ao renderizar ${contentFile} com layout ${layoutFile}:`, error);
    res.status(500).send('Erro ao renderizar página');
  }
}

// Rota para API de eventos (mock data)
app.get('/api/eventos/listar_eventos_ativos', (req, res) => {
  // Dados mock para eventos
  const mockEventos = {
    query_conferencias: [
      {
        id: 1,
        titulo: "KEN Conference Orlando 2025",
        data_evento: "2025-03-15",
        descricao: "Transform Your Mindset - A conference to transform your business mindset",
        local: "Orlando, FL - USA",
        banner: "/assets/img/fundoken1.jpg",
        link: "/orlando2025"
      }
    ],
    query_eventos: [
      {
        id: 1,
        titulo: "Workshop de Empreendedorismo",
        data_evento: "2025-04-20",
        tipo: "Workshop",
        banner: "/assets/img/fundoken1.jpg",
        token: "workshop-001"
      },
      {
        id: 2,
        titulo: "Networking KEN",
        data_evento: "2025-05-10",
        tipo: "Networking",
        banner: "/assets/img/fundoken1.jpg",
        token: "networking-001"
      }
    ]
  };
  
  res.json({ data: mockEventos });
});

// Rota principal (inglês) - usa Layout_Site-EN.ejs
app.get('/', async (req, res) => {
  await renderWithLayout(res, 'Layout_Site-EN', 'index.ejs', {
    title: 'KEN - Kingdom Enterprise Network'
  });
});

// Rota para versão em português - renderiza diretamente (já é uma página completa)
app.get('/pt-br', (req, res) => {
  // pt-br.ejs é uma página completa, não precisa de layout
  res.render('pt-br', {
    title: 'KEN - Kingdom Enterprise Network'
  });
});

// Rota para orlando2025 - usa layout_hotsite.ejs
app.get('/orlando2025', async (req, res) => {
  await renderWithLayout(res, 'layout_hotsite', 'orlando2025.ejs', {
    title: 'KEN Conference Orlando 2025'
  });
});

// Rota para login (placeholder)
app.get('/login', (req, res) => {
  res.send(`
    <html>
      <head><title>Login - KEN</title></head>
      <body>
        <h1>Página de Login</h1>
        <p>Esta página será implementada em breve.</p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Rota para login de igrejas (placeholder)
app.get('/login_igrejas', (req, res) => {
  res.send(`
    <html>
      <head><title>Login Igrejas - KEN</title></head>
      <body>
        <h1>Login para Igrejas Afiliadas</h1>
        <p>Esta página será implementada em breve.</p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Rota para cadastro (placeholder)
app.get('/cadastro', (req, res) => {
  res.send(`
    <html>
      <head><title>Cadastro - KEN</title></head>
      <body>
        <h1>Cadastro na Comunidade KEN</h1>
        <p>Esta página será implementada em breve.</p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Rota para cadastro de igrejas (placeholder)
app.get('/cadastro_igrejas', (req, res) => {
  res.send(`
    <html>
      <head><title>Cadastro Igrejas - KEN</title></head>
      <body>
        <h1>Cadastro de Igrejas Afiliadas</h1>
        <p>Esta página será implementada em breve.</p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Rota para evento individual (placeholder)
app.get('/evento', (req, res) => {
  const eventoId = req.query.evento_id;
  res.send(`
    <html>
      <head><title>Evento - KEN</title></head>
      <body>
        <h1>Detalhes do Evento</h1>
        <p>ID do Evento: ${eventoId || 'N/A'}</p>
        <p>Esta página será implementada em breve.</p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Middleware para servir dmxAppConnect (se necessário)
app.use('/dmxAppConnect', express.static(path.join(__dirname, 'dmxAppConnect')));

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head><title>404 - Página não encontrada</title></head>
      <body>
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <a href="/">Voltar para a página inicial</a>
      </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📄 Página principal: http://localhost:${PORT}/`);
  console.log(`🇧🇷 Versão PT-BR: http://localhost:${PORT}/pt-br`);
});

