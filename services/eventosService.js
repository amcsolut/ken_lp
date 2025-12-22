const axios = require('axios');

// Base URL da API externa
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
// Base URL para arquivos estáticos (imagens)
const API_STATIC_URL = process.env.NEXT_PUBLIC_API_STATIC || '';

/**
 * Formata uma data para exibição
 */
function formatDate(dateString, locale = 'pt-BR') {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  } catch (error) {
    return dateString;
  }
}

/**
 * Constrói a URL completa da imagem do banner
 */
function getImageUrl(bannerPath) {
  if (!bannerPath) return '/assets/img/fundoken1.jpg'; // fallback
  // Se já é uma URL completa, retorna como está
  if (bannerPath.startsWith('http://') || bannerPath.startsWith('https://')) {
    return bannerPath;
  }
  // Se é um caminho relativo, usa a URL de arquivos estáticos
  if (API_STATIC_URL) {
    const cleanPath = bannerPath.startsWith('/') ? bannerPath : '/' + bannerPath;
    const baseUrl = API_STATIC_URL.endsWith('/') ? API_STATIC_URL.slice(0, -1) : API_STATIC_URL;
    const fullUrl = baseUrl + cleanPath;
    console.log(`🖼️  Construindo URL da imagem: ${bannerPath} -> ${fullUrl}`);
    return fullUrl;
  }
  // Fallback: se não houver API_STATIC_URL, usa API_BASE_URL
  const cleanPath = bannerPath.startsWith('/') ? bannerPath : '/' + bannerPath;
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return baseUrl + cleanPath;
}

/**
 * Busca conferências da API
 */
async function buscarConferencias() {
  try {
    if (!API_BASE_URL) {
      console.warn('⚠️ API_BASE_URL não configurada');
      return [];
    }

    const conferencesUrl = `${API_BASE_URL}/events/open/conferences`;
    console.log('📡 Buscando conferências:', conferencesUrl);
    
    const response = await axios.get(conferencesUrl);
    const eventos = response.data?.data || [];
    
    console.log('✅ Conferências recebidas:', eventos.length);
    
    return eventos.map(event => ({
      id: event.id,
      titulo: event.title || '',
      data_evento: formatDate(event.start_at),
      descricao: event.description || '',
      local: event.location || '',
      banner: getImageUrl(event.banner_path),
      link: event.online_url || `/evento?evento_id=${event.id}`
    }));
  } catch (error) {
    console.error('❌ Erro ao buscar conferências:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return [];
  }
}

/**
 * Busca eventos sem conferências da API
 */
async function buscarEventos() {
  try {
    if (!API_BASE_URL) {
      console.warn('⚠️ API_BASE_URL não configurada');
      return [];
    }

    const eventsUrl = `${API_BASE_URL}/events/open/without-conferences`;
    console.log('📡 Buscando eventos:', eventsUrl);
    
    const response = await axios.get(eventsUrl);
    const eventos = response.data?.data || [];
    
    console.log('✅ Eventos recebidos:', eventos.length);
    
    return eventos.map(event => ({
      id: event.id,
      titulo: event.title || '',
      data_evento: formatDate(event.start_at),
      tipo: event.event_type || 'Evento',
      banner: getImageUrl(event.banner_path),
      token: event.id
    }));
  } catch (error) {
    console.error('❌ Erro ao buscar eventos:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return [];
  }
}

/**
 * Busca um evento específico por ID
 */
async function buscarEventoPorId(eventoId) {
  try {
    if (!API_BASE_URL) {
      console.warn('⚠️ API_BASE_URL não configurada');
      return null;
    }

    if (!eventoId) {
      console.warn('⚠️ ID do evento não fornecido');
      return null;
    }

    const eventUrl = `${API_BASE_URL}/events/${eventoId}/details`;
    console.log('📡 Buscando evento por ID:', eventUrl);
    
    const response = await axios.get(eventUrl);
    // A API pode retornar { data: {...} } ou diretamente {...}
    let event = response.data;
    if (response.data && response.data.data) {
      event = response.data.data;
    }
    
    if (!event || !event.id) {
      console.warn('⚠️ Evento não encontrado');
      return null;
    }

    console.log('✅ Evento encontrado:', event.title);
    
    // Formatar data de início e fim
    const dataInicio = formatDate(event.start_at);
    const dataFim = formatDate(event.end_at);
    const horarioInicio = event.start_at ? new Date(event.start_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
    const horarioFim = event.end_at ? new Date(event.end_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '';
    
    return {
      id: event.id,
      titulo: event.title || '',
      data_evento: dataInicio,
      data_fim: dataFim,
      horario: horarioInicio && horarioFim ? `${horarioInicio} - ${horarioFim}` : horarioInicio || '',
      descricao: event.description || '',
      local: event.location || '',
      tipo: event.event_type || 'Evento',
      banner: getImageUrl(event.banner_path),
      online_url: event.online_url || '',
      is_free: event.is_free || false,
      price: event.price || 0,
      capacity: event.capacity || 0,
      start_at: event.start_at || '',
      end_at: event.end_at || ''
    };
  } catch (error) {
    console.error('❌ Erro ao buscar evento por ID:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    return null;
  }
}

/**
 * Busca todos os eventos (conferências + outros eventos)
 */
async function buscarTodosEventos() {
  try {
    const [conferencias, eventos] = await Promise.all([
      buscarConferencias(),
      buscarEventos()
    ]);

    return {
      query_conferencias: conferencias,
      query_eventos: eventos
    };
  } catch (error) {
    console.error('❌ Erro ao buscar todos os eventos:', error);
    return {
      query_conferencias: [],
      query_eventos: []
    };
  }
}

module.exports = {
  buscarConferencias,
  buscarEventos,
  buscarTodosEventos,
  buscarEventoPorId
};

