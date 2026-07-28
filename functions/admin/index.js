// GET /admin — o painel (protegido)
import { requireAuth } from '../_auth.js';
import { panelHtml } from '../_panel.js';
import { getLeads, getNews, getTeam, getSettings, getDeps } from '../_data.js';

export async function onRequestGet({ request, env }) {
  const auth = await requireAuth(request, env);
  if (!auth.ok) return auth.response;

  let data = { leads: [], news: [], team: [], settings: {}, depoimentos: [] };
  try {
    const [leads, news, team, settings, depoimentos] = await Promise.all([
      getLeads(env), getNews(env), getTeam(env), getSettings(env), getDeps(env)
    ]);
    data = { leads, news, team, settings, depoimentos };
  } catch (e) {
    // painel abre vazio em vez de estourar 500 — mesmo comportamento do server.js
  }

  const dataJson = JSON.stringify(data).replace(/</g, '\\u003c').replace(/-->/g, '--\\>');
  return new Response(panelHtml(dataJson), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, must-revalidate',
      'X-Robots-Tag': 'noindex'
    }
  });
}
