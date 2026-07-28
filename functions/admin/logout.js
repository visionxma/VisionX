// GET /admin/logout — encerra a sessão
import { clearCookie, panelEnabled } from '../_auth.js';

export function onRequestGet({ request, env }) {
  if (!panelEnabled(env)) return new Response('Not found', { status: 404 });
  return new Response(null, {
    status: 302,
    headers: { Location: new URL('/admin/login', request.url).toString(), 'Set-Cookie': clearCookie }
  });
}
