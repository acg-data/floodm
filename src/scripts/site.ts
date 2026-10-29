// Site-wide behaviour from the original page: sticky header shadow, mobile
// menu, booking dialog — plus the dropdown menus added for the full site.
import { sendLead, callLink } from './lead';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

// Header shadow on scroll
const hdr = $('#hdr');
const onScroll = () => hdr?.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const nav = $('#nav');
const mb = $<HTMLButtonElement>('#menuBtn');
const setMenu = (open: boolean) => {
  nav?.classList.toggle('open', open);
  mb?.setAttribute('aria-expanded', String(open));
  mb?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
mb?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
$$('#nav a, #nav button:not(.navtoggle)').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Dropdowns: hover on desktop (CSS), click/keyboard everywhere
const groups = $$('.nav-group');
const closeGroups = (except?: Element) =>
  groups.forEach((g) => {
    if (g === except) return;
    g.classList.remove('open');
    $('.navtoggle', g)?.setAttribute('aria-expanded', 'false');
  });
groups.forEach((g) => {
  const t = $<HTMLButtonElement>('.navtoggle', g)!;
  t.addEventListener('click', () => {
    const open = !g.classList.contains('open');
    closeGroups(g);
    g.classList.toggle('open', open);
    t.setAttribute('aria-expanded', String(open));
  });
  g.addEventListener('focusout', (e) => {
    if (window.matchMedia('(min-width: 1081px)').matches && !g.contains(e.relatedTarget as Node)) closeGroups();
  });
});
document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('.nav-group') && window.matchMedia('(min-width: 1081px)').matches) closeGroups();
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = groups.find((g) => g.classList.contains('open'));
  if (open) {
    closeGroups();
    open.classList.add('hover-off');
    open.addEventListener('mouseleave', () => open.classList.remove('hover-off'), { once: true });
    $<HTMLButtonElement>('.navtoggle', open)?.focus();
  } else if (nav?.classList.contains('open')) {
    setMenu(false);
    mb?.focus();
  }
});

// “Get my free Snapshot” buttons jump to the Snapshot form when the page has one.
$$<HTMLAnchorElement>('[data-focus-snap]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const form = $<HTMLFormElement>('#snapForm');
    if (!form) return; // follow the link to the Snapshot page
    e.preventDefault();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => {
      if (!form.hidden) $<HTMLInputElement>('#snapAddr')?.focus({ preventScroll: true });
    }, 450);
  }),
);

// Booking dialog
const dlg = $<HTMLDialogElement>('#book');
const bf = $<HTMLFormElement>('#bookForm');
const svcHint = $('#svcHint');
function openBook(kind: string | null, svc: string | null) {
  if (!dlg || !bf) return;
  $('#bookBody')!.hidden = false;
  $('#bookDone')!.hidden = true;
  $('#bookErr')!.hidden = true;
  const id = kind === 'intel' ? 'need-intel' : kind === 'install' ? 'need-install' : 'need-expert';
  $<HTMLInputElement>(`#${id}`)!.checked = true;
  if (svcHint) svcHint.textContent = svc || 'Drainage work';
  bf.dataset.svc = svc || '';
  if (typeof dlg.showModal === 'function') dlg.showModal();
  else dlg.setAttribute('open', '');
  setTimeout(() => $<HTMLInputElement>('#bName')?.focus(), 30);
}
$$('[data-book]').forEach((b) =>
  b.addEventListener('click', (e) => {
    e.preventDefault();
    openBook(b.getAttribute('data-book'), b.getAttribute('data-svc'));
  }),
);
const closeBook = () => (dlg?.close ? dlg.close() : dlg?.removeAttribute('open'));
$('#bookClose')?.addEventListener('click', closeBook);
$('#bookDoneClose')?.addEventListener('click', closeBook);
dlg?.addEventListener('click', (e) => {
  if (e.target === dlg) closeBook();
});
// Open the dialog straight away from links like /contact/#book or ?book=install&svc=…
const params = new URLSearchParams(location.search);
if (params.has('book')) openBook(params.get('book'), params.get('svc'));

bf?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const val = (s: string) => ($<HTMLInputElement>(s)?.value ?? '').trim();
  const name = val('#bName');
  const email = val('#bEmail');
  const a = val('#bAddr');
  const er = $('#bookErr')!;
  const miss: string[] = [];
  if (!name) miss.push('your name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) miss.push('a valid email');
  if (a.length < 6) miss.push('the property address');
  if (miss.length) {
    er.textContent = `Add ${miss.join(', ').replace(/, ([^,]*)$/, ' and $1')} so we can reply.`;
    er.hidden = false;
    return;
  }
  let need = bf.querySelector<HTMLInputElement>('input[name=need]:checked')?.value || 'Assessment';
  if (need === 'Drainage install quote' && bf.dataset.svc) need += ` (${bf.dataset.svc})`;
  const result = await sendLead('Assessment request', {
    name,
    email,
    phone: val('#bPhone'),
    address: a,
    request: need,
    issue: $<HTMLSelectElement>('#bIssue')?.value ?? '',
    notes: ($<HTMLTextAreaElement>('#bNotes')?.value ?? '').trim(),
  });
  if (result === 'failed') {
    er.innerHTML = `That didn’t go through. Call or text ${callLink()} and we’ll take it from there.`;
    er.hidden = false;
    return;
  }
  const first = name.split(' ')[0];
  const what = need.charAt(0).toLowerCase() + need.slice(1);
  $('#bookDoneText')!.textContent =
    result === 'mailto'
      ? `Thanks, ${first}. Your email app opened with your request for ${what} at ${a}. Hit send and we reply to ${email}.`
      : `Thanks, ${first}. Your request for ${what} at ${a} is in. We reply to ${email}.`;
  $('#bookBody')!.hidden = true;
  $('#bookDone')!.hidden = false;
  $<HTMLButtonElement>('#bookDoneClose')?.focus();
  bf.reset();
});
