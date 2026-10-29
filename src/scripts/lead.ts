// Sends a form submission to the configured endpoint, or — when none is set —
// opens the visitor's email app with the request filled in, so nothing is lost.
export type LeadResult = 'sent' | 'mailto' | 'failed';
import { isSpanish } from './locale';

export function leadConfig() {
  const d = document.body.dataset;
  return { endpoint: d.leadEndpoint ?? '', email: d.leadEmail ?? '', phone: d.phone ?? '', tel: d.tel ?? '' };
}

export async function sendLead(kind: string, data: Record<string, string>): Promise<LeadResult> {
  const { endpoint, email } = leadConfig();
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ kind, page: location.href, ...data }),
      });
      return res.ok ? 'sent' : 'failed';
    } catch {
      return 'failed';
    }
  }
  const spanishLabels: Record<string, string> = { name: 'Nombre', email: 'Correo electrónico', phone: 'Teléfono', address: 'Dirección', request: 'Solicitud', issue: 'Problema', service: 'Servicio', notes: 'Comentarios' };
  const body = Object.entries(data)
    .map(([k, v]) => `${isSpanish() ? (spanishLabels[k] || k) : k.charAt(0).toUpperCase() + k.slice(1)}: ${v || '—'}`)
    .join('\n');
  location.href = `mailto:${email}?subject=${encodeURIComponent(kind + (data.address ? ` — ${data.address}` : ''))}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}

export function callLink() {
  const { phone, tel } = leadConfig();
  return `<a href="${tel}">${phone}</a>`;
}
