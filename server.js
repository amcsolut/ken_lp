// Carregar variáveis de ambiente apenas em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const eventosService = require('./services/eventosService');

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

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Função auxiliar para renderizar com layout
async function renderWithLayout(res, layoutFile, contentFile, data = {}) {
  try {
    // Renderizar o conteúdo do arquivo com as variáveis
    const contentPath = path.join(__dirname, contentFile);
    const ejs = require('ejs');
    const content = await ejs.renderFile(contentPath, data, {
      async: false
    });
    
    // Renderizar o layout passando o conteúdo renderizado
    res.render(layoutFile, {
      ...data,
      content: content
    });
  } catch (error) {
    console.error(`Erro ao renderizar ${contentFile} com layout ${layoutFile}:`, error);
    res.status(500).send('Erro ao renderizar página');
  }
}

// Rota para API de eventos (mantida para compatibilidade se necessário)
app.get('/api/eventos/listar_eventos_ativos', async (req, res) => {
  try {
    const eventos = await eventosService.buscarTodosEventos();
    res.setHeader('Content-Type', 'application/json');
    res.json({ data: eventos });
  } catch (error) {
    console.error('❌ Erro ao buscar eventos:', error);
    res.json({
      data: {
        query_conferencias: [],
        query_eventos: []
      }
    });
  }
});

// Rota principal (inglês) - usa Layout_Site-EN.ejs
app.get('/', async (req, res) => {
  try {
    const eventos = await eventosService.buscarTodosEventos();
    await renderWithLayout(res, 'Layout_Site-EN', 'index.ejs', {
      title: 'KEN - Kingdom Enterprise Network',
      eventos: eventos
    });
  } catch (error) {
    console.error('Erro ao renderizar página principal:', error);
    await renderWithLayout(res, 'Layout_Site-EN', 'index.ejs', {
      title: 'KEN - Kingdom Enterprise Network',
      eventos: {
        query_conferencias: [],
        query_eventos: []
      }
    });
  }
});

// Rota para versão em português - renderiza diretamente (já é uma página completa)
app.get('/pt-br', async (req, res) => {
  try {
    const eventos = await eventosService.buscarTodosEventos();
    res.render('pt-br', {
      title: 'KEN - Kingdom Enterprise Network',
      eventos: eventos
    });
  } catch (error) {
    console.error('Erro ao renderizar página pt-br:', error);
    res.render('pt-br', {
      title: 'KEN - Kingdom Enterprise Network',
      eventos: {
        query_conferencias: [],
        query_eventos: []
      }
    });
  }
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

// Rota para evento individual
app.get('/evento', async (req, res) => {
  try {
    const eventoId = req.query.evento_id;
    
    if (!eventoId) {
      return res.status(400).send(`
        <html>
          <head><title>Erro - KEN</title></head>
          <body>
            <h1>ID do evento não fornecido</h1>
            <p>Por favor, forneça um ID de evento válido.</p>
            <a href="/">Voltar para a página inicial</a>
          </body>
        </html>
      `);
    }

    const evento = await eventosService.buscarEventoPorId(eventoId);
    
    if (!evento) {
      return res.status(404).send(`
        <html>
          <head><title>Evento não encontrado - KEN</title></head>
          <body>
            <h1>Evento não encontrado</h1>
            <p>O evento solicitado não foi encontrado.</p>
            <a href="/">Voltar para a página inicial</a>
          </body>
        </html>
      `);
    }

    await renderWithLayout(res, 'Layout_Site-EN', 'evento.ejs', {
      title: `${evento.titulo} - KEN`,
      evento: evento
    });
  } catch (error) {
    console.error('Erro ao renderizar página de evento:', error);
    res.status(500).send(`
      <html>
        <head><title>Erro - KEN</title></head>
        <body>
          <h1>Erro ao carregar evento</h1>
          <p>Ocorreu um erro ao carregar os dados do evento.</p>
          <a href="/">Voltar para a página inicial</a>
        </body>
      </html>
    `);
  }
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

