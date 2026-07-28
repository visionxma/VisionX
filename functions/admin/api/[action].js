// POST /admin/api/:action — todas as ações de escrita do painel (protegidas).
// Mesmas rotas do server.js, num só arquivo porque as Pages Functions resolvem
// o segmento dinâmico [action].
import { requireAuth } from '../../_auth.js';
import { readBody, json } from '../../_supabase.js';
import {
  setLeadStatus, delLead, delNews,
  addTeam, updateTeam, delTeam, reorderTeam,
  addDep, updateDep, delDep, reorderDeps,
  setSettings, uploadImage
} from '../../_data.js';

const MB = 1024 * 1024;

export async function onRequestPost(ctx) {
  const { request, env, params } = ctx;
  const auth = await requireAuth(request, env);
  if (!auth.ok) return auth.response;

  const action = params.action;
  const b = await readBody(request);

  try {
    switch (action) {
      // ---- leads ----
      case 'lead-status': {
        if (['novo', 'andamento', 'fechado'].indexOf(b.status) < 0) return json({ ok: false }, 400);
        return (await setLeadStatus(env, b.id, b.status)) ? json({ ok: true }) : json({ ok: false }, 404);
      }
      case 'lead-delete':
        return (await delLead(env, b.id)) ? json({ ok: true }) : json({ ok: false }, 404);

      // ---- newsletter ----
      case 'news-delete':
        return json({ ok: true, removed: await delNews(env, b.id) });

      // ---- equipe ----
      case 'team-add':
        return json({ ok: true, membro: await addTeam(env, b) });
      case 'team-update':
        return (await updateTeam(env, b.id, b)) ? json({ ok: true }) : json({ ok: false }, 404);
      case 'team-delete':
        return (await delTeam(env, b.id)) ? json({ ok: true }) : json({ ok: false }, 404);
      case 'team-reorder':
        await reorderTeam(env, b.ordem || []);
        return json({ ok: true });

      // ---- depoimentos ----
      case 'dep-add':
        return json({ ok: true, item: await addDep(env, b) });
      case 'dep-update':
        return (await updateDep(env, b.id, b)) ? json({ ok: true }) : json({ ok: false }, 404);
      case 'dep-delete':
        return (await delDep(env, b.id)) ? json({ ok: true }) : json({ ok: false }, 404);
      case 'dep-reorder':
        await reorderDeps(env, b.ordem || []);
        return json({ ok: true });

      // ---- conteúdo do site ----
      case 'settings':
        await setSettings(env, b);
        return json({ ok: true });

      // ---- imagens (vão para o Supabase Storage; Workers não têm disco) ----
      case 'upload': {
        const r = await uploadImage(env, b.dataUrl, 'u', 3.5 * MB, true);
        return json(r, r.ok ? 200 : 400);
      }
      case 'team-photo': {
        const r = await uploadImage(env, b.dataUrl, 'm', 3 * MB, true);
        return json(r, r.ok ? 200 : 400);
      }

      default:
        return json({ ok: false, erro: 'ação desconhecida' }, 404);
    }
  } catch (e) {
    return json({ ok: false, erro: String(e.message || e).slice(0, 200) }, 500);
  }
}
