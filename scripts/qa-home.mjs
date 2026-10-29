import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { startServer } from './serve.mjs';

const require = createRequire(import.meta.url);
const axe = await readFile(require.resolve('axe-core/axe.min.js'), 'utf8');
const directory = 'qa-bilingual/home-refresh';
await mkdir(directory, { recursive: true });
const server = await startServer(4394, '127.0.0.1');
const browser = await chromium.launch();
const results = { errors: [], accessibility: [], flows: [], screenshots: [] };
const assert = (value, message) => { if (!value) throw Error(message); };
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  page.on('pageerror', error => results.errors.push(error.message));
  await page.route('mailto:*', route => route.abort());
  for (const language of ['en', 'es']) {
    const url = `http://127.0.0.1:4394/${language === 'es' ? 'es/' : ''}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { await document.fonts.ready; for (const image of document.images) { image.loading = 'eager'; await image.decode().catch(() => {}); } });
    assert((await page.locator('.homeowner-review blockquote').allTextContents()).join('|') === '“John and Manny were incredibly helpful from day one”|“the communication was great. He was very knowledgeable.”|“their integrity and transparency”', 'Review excerpts changed in '+language);
    assert(!await page.getByText('Your local crew.', { exact: false }).count(), 'Removed crew overlay remains');
    assert(await page.locator('.home-hero + .mini-credentials .credential-pop-row li').count()===4,'Compact credentials are not directly below the hero');
    assert(await page.locator('.mini-credentials + .yard-benefits .benefits-home').count()===1,'Houston home is not the next feature below credentials');
    assert((await page.locator('.header .brand .mark').getAttribute('src'))==='/assets/img/logo-mark.png','Original brand mark is missing');
    assert(await page.locator('.houston-fact').count()===4,'Houston facts missing');
    assert((await page.locator('.houston-facts-list').innerText()).includes('2017'),'Historical storm context missing');
    assert((await page.locator('.benefits-home a').last().getAttribute('href'))==='https://creativecommons.org/licenses/by-sa/3.0/','Houston home license attribution missing');
    const rainSummary=page.locator('.rain-data summary');
    await rainSummary.focus();await page.keyboard.press('Enter');
    assert(await page.locator('.rain-data table').isVisible(),'Monthly rainfall data cannot be opened by keyboard');
    const monthly=await page.locator('.rain-data tbody td').allTextContents();
    assert(monthly.length===12 && Math.abs(monthly.reduce((sum,v)=>sum+Number(v),0)-51.84)<.001,'Monthly rainfall differs from the annual normal');
    await page.keyboard.press('Enter');
    assert(!await page.locator('.rain-data table').isVisible(),'Monthly rainfall data cannot be closed by keyboard');
    await rainSummary.blur();
    assert(await page.locator('.houston-facts-next .btn').getAttribute('href')===(language==='es'?'/es/runoff-calculator/':'/runoff-calculator/'),'Runoff link leaves the selected language');
    for (const [width, height] of [[1789,873], [1440,1000], [1280,1000], [1081,900], [1024,900], [768,900], [414,844], [390,844], [375,844], [320,844]]) {
      await page.setViewportSize({ width, height });
      await page.evaluate(() => scrollTo(0,0));
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert(overflow <= 0, `${language} ${width}px has ${overflow}px overflow`);
      const path = `${directory}/hero-${language}-${width}.png`;
      await page.screenshot({ path }); results.screenshots.push(path);
      if ([1440,390].includes(width)) {
        await page.addScriptTag({ content: axe });
        const issues = await page.evaluate(async () => (await axe.run(document, { runOnly:{ type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa'] } })).violations.map(v => ({ id:v.id, nodes:v.nodes.map(n=>n.target) })));
        results.accessibility.push({ language, width, issues });
      }
    }
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:1000});
      for (const selector of ['.mini-credentials', '.yard-benefits', '#houston-facts', '.houston-facts-list', '#runoff', '#reviews', '#estimate']) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.locator(selector).evaluate(element => element.scrollIntoView({block:'start'}));
        const path = `${directory}/${selector.replace(/[.#]/g,'')}-${language}-${width}.png`;
        await page.screenshot({ path }); results.screenshots.push(path);
      }
      await page.locator('#houston-facts').screenshot({path:`${directory}/facts-complete-${language}-${width}.png`});
      await rainSummary.scrollIntoViewIfNeeded();
      for(const state of ['closed','open']){
        if(state==='open')await rainSummary.click();
        const issues=await page.evaluate(async()=> (await axe.run('#houston-facts',{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
        results.accessibility.push({language,width,state,issues});
      }
      await page.locator('.houston-rain-chart').screenshot({path:`${directory}/rainfall-expanded-${language}-${width}.png`});
      await rainSummary.click();await rainSummary.blur();
    }
    await page.locator('#runoff [data-rain="10"]').click();
    await page.waitForFunction(()=>document.querySelector('#gal').textContent==='14,952');
    results.flows.push(`${language}: light runoff calculator preserves the 14,952-gallon example`);
    const submit = page.locator('#estimateForm button[type=submit]');
    await submit.click();
    assert((await page.locator('#estimateErr').innerText()).startsWith(language==='es'?'Elige':'Choose'), 'Service validation language');
    await page.locator('#eService').selectOption('Yard drainage & French drains');
    await page.locator('#eAddress').fill('abc'); await submit.click();
    assert(await page.locator('#eAddress').getAttribute('aria-invalid')==='true', 'Missing address validation');
    await page.locator('#eAddress').fill('123 Main St, Houston, TX');
    await page.locator('#eName').fill('Preview Test');
    await page.locator('#eEmail').fill('invalid'); await submit.click();
    assert(await page.locator('#eEmail').getAttribute('aria-invalid')==='true', 'Missing email validation');
    await page.locator('#eEmail').fill('test@example.com');
    await page.locator('#ePhone').fill('123'); await submit.click();
    assert(await page.locator('#ePhone').getAttribute('aria-invalid')==='true', 'Missing phone validation');
    await page.locator('#ePhone').fill('2815550100'); await submit.click();
    assert(await page.locator('#eConsent').getAttribute('aria-invalid')==='true', 'Missing contact consent validation');
    await page.locator('#eConsent').check(); await submit.click();
    await page.locator('#estimateDone').waitFor();
    assert((await page.locator('#estimateDoneH').innerText())===(language==='es'?'Un último paso.':'One last step.'), 'Email-app fallback falsely claims receipt');
    results.flows.push(`${language}: validation and honest email-app fallback`);

    // Exercise the new UI's failure/retry state without sending data externally.
    await page.goto(url, { waitUntil:'networkidle' });
    await page.evaluate(() => { document.body.dataset.leadEndpoint='/qa-estimate'; });
    let fail = true; let payload;
    await page.route('**/qa-estimate', async route => { payload=route.request().postDataJSON(); await route.fulfill({status:fail?503:200,contentType:'application/json',body:'{}'}); });
    await page.locator('#eService').selectOption('Sump pumps');
    await page.locator('#eAddress').fill('123 Main St, Houston, TX');
    await page.locator('#eName').fill('Preview Test');
    await page.locator('#ePhone').fill('2815550100');
    await page.locator('#eConsent').check(); await submit.click();
    await page.locator('#estimateErr').waitFor();
    assert(await submit.isEnabled(),'Submit cannot retry after server failure');
    fail=false; await submit.click(); await page.locator('#estimateDone').waitFor();
    assert((await page.locator('#estimateDoneH').innerText())===(language==='es'?'Recibimos tu solicitud.':'Your request is in.'), 'Sent confirmation language');
    assert(payload.address==='123 Main St, Houston, TX' && payload.phone==='2815550100' && !!payload.consent,'Estimate payload incomplete');
    assert(payload.service===(await page.locator('#eService option:checked').textContent()).trim(),'Localized service label not submitted');
    await page.unroute('**/qa-estimate');
    results.flows.push(`${language}: server failure, retry and successful confirmation (mock endpoint)`);
  }
  await writeFile(`${directory}/results.json`,JSON.stringify(results,null,2));
  assert(!results.errors.length,'Console errors: '+results.errors.join('; '));
  assert(!results.accessibility.some(r=>r.issues.length),'Accessibility issues: '+JSON.stringify(results.accessibility.filter(r=>r.issues.length)));
  console.log('Home refresh passed: bilingual estimate flows, sourced Houston facts, keyboard rainfall table, photo attribution, ten widths and desktop/mobile accessibility.');
} finally { await browser.close(); server.close(); }
