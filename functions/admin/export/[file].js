// GET /admin/export/leads.csv e /admin/export/newsletter.csv (protegido)
import { requireAuth } from '../../_auth.js';
import { getLeads, getNews } from '../../_data.js';

export async function onRequestGet({ request, env, params }) {
  const auth = await requireAuth(request, env);
  if (!auth.ok) return auth.response;

  const tipo = String(params.file || '').replace(/\.csv$/i, '');
  if (tipo !== 'leads' && tipo !== 'newsletter') return new Response('Not found', { status: 404 });

  try {
    const isNews = tipo === 'newsletter';
    const rows = isNews ? await getNews(env) : await getLeads(env);
    const cols = isNews ? ['data', 'email'] : ['data', 'nome', 'email', 'mensagem', 'status', 'origem'];
    // neutraliza injeção de fórmula: =,+,-,@ no início viram fórmula no Excel/Sheets
    const cell = v => {
      let s = String(v == null ? '' : v);
      if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
      return '"' + s.replace(/"/g, '""') + '"';
    };
    const csv = [cols.join(',')].concat(rows.map(r => cols.map(c => cell(r[c])).join(','))).join('\n');
    return new Response('﻿' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${tipo}.csv"`,
        'Cache-Control': 'no-store'
      }
    });
  } catch (e) {
    return new Response('Falha ao exportar', { status: 500 });
  }
}
