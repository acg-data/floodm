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
const results = { errors: [], accessibility: [], flows: [], screenshots: [], metrics: [] };
const assert = (value, message) => { if (!value) throw Error(message); };
// Measured before this approved simplification; no local QA artifact is required.
const baseline = [{width:1440,height:15536},{width:390,height:24921}];
async function accessibility(page, label) {
  await page.addScriptTag({content:axe});
  const issues=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
  results.accessibility.push({label,issues});
}
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  page.on('pageerror',error=>results.errors.push(error.message));
  await page.route('mailto:*',route=>route.abort());
  for(const language of ['en','es']){
    const prefix=language==='es'?'/es':'';
    const url='http://127.0.0.1:4394'+prefix+'/';
    await page.goto(url,{waitUntil:'networkidle'});
    await page.evaluate(async()=>{await document.fonts.ready;for(const image of document.images){image.loading='eager';await image.decode().catch(()=>{});}});
    assert(!await page.locator('#reports,#snapForm,#areas,.houston-coverage,#houston-facts,#runoff,#crew,#about,#credentials,.aftercare,.project-gallery,.res-grid,.trust').count(),'Removed home content remains');
    assert(!await page.locator('a[href*="/reports/"]').count(),'Home promotes remote reports');
    assert(await page.locator('.home-services .svc').count()===4,'Home must show four key services');
    assert(await page.locator('#faq details').count()===4,'Home must show four FAQs');
    assert(await page.locator('.home-hero + .mini-credentials .credential-pop-row li').count()===4,'Credentials are not directly below the hero');
    assert(await page.locator('.mini-credentials + .interactive-home').count()===1,'Interactive house is not the next feature');
    assert(await page.locator('[data-house-spot]').count()===6,'Six drainage spots missing');
    assert((await page.locator('.home-tour-photo img').getAttribute('src')).includes('houston-drainage-home-1600.webp'),'Edited house image missing');
    assert((await page.locator('.homeowner-review blockquote').allTextContents()).join('|')==='“John and Manny were incredibly helpful from day one”|“the communication was great. He was very knowledgeable.”|“their integrity and transparency”','Original review excerpts changed');
    assert(!await page.locator('.reviews-location').getAttribute('open'),'Google map should start collapsed');
    assert(await page.locator('iframe[data-google-business-map]').count()===1,'Google Business widget missing');
    assert(await page.locator('#dd-locations a').count()===18,'Locations dropdown missing communities');
    assert(!await page.locator('a').evaluateAll(a=>a.some(el=>getComputedStyle(el).textDecorationLine.includes('underline'))),'Link underlines returned');
    for(const width of [1789,1440,1280,1081,1024,768,414,390,375,320]){
      await page.setViewportSize({width,height:1000});
      for(let i=0;i<6;i++){
        await page.locator('[data-house-spot="'+i+'"]').click();
        assert(await page.locator('[data-house-panel="'+i+'"]').isVisible(),'Spot cannot be selected at '+width+'px');
        assert(await page.locator('[data-house-panel]:visible').count()===1,'Multiple explanations shown');
        const href=await page.locator('[data-house-panel="'+i+'"] a').getAttribute('href');
        assert(language==='es'?href.startsWith('/es/'):!href.startsWith('/es/'),'Hotspot link leaves selected language');
      }
      await page.locator('[data-house-spot="0"]').click();
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow at '+width+'px '+language);
      if([1440,390].includes(width)){
        await accessibility(page,language+' home '+width);
        const photo=directory+'/interactive-house-'+language+'-'+width+'.png';
        await page.locator('.interactive-home').screenshot({path:photo});results.screenshots.push(photo);
        const full=directory+'/short-home-'+language+'-'+width+'.png';
        await page.screenshot({path:full,fullPage:true});results.screenshots.push(full);
        const metrics=await page.evaluate(width=>({width,height:document.documentElement.scrollHeight,sections:document.querySelectorAll('main section').length,words:document.querySelector('main').innerText.split(/\s+/).length}),width);
        results.metrics.push({language,...metrics});
        assert(metrics.height<baseline.find(v=>v.width===width).height*.65,'Home is not substantially shorter');
      }
    }
    await page.setViewportSize({width:390,height:1000});
    await page.locator('[data-house-spot="0"]').focus();await page.keyboard.press('End');
    assert(await page.locator('[data-house-spot="5"]').getAttribute('aria-selected')==='true','End key failed');
    await page.keyboard.press('ArrowRight');
    assert(await page.locator('[data-house-spot="0"]').getAttribute('aria-selected')==='true','Arrow navigation did not wrap');
    await page.keyboard.press('Home');await page.keyboard.press('ArrowDown');
    assert(await page.locator('[data-house-spot="1"]').getAttribute('aria-selected')==='true','ArrowDown failed');
    await page.locator('[data-house-route-toggle]').click();
    assert(await page.locator('[data-house-route]').isVisible(),'Drainage route does not show');
    assert(await page.locator('[data-route-selected="true"]').count()===1,'Multiple route overlays shown');
    assert(await page.locator('.route-flow').first().evaluate(el=>getComputedStyle(el).animationName)==='none','Reduced motion ignored');
    await page.locator('[data-house-next]').click();
    assert(await page.locator('[data-house-spot="2"]').getAttribute('aria-selected')==='true','Next control failed');
    for(const width of [1440,390]){
      await page.setViewportSize({width,height:1000});
      await accessibility(page,language+' active route '+width);
      const path=directory+'/interactive-route-'+language+'-'+width+'.png';
      await page.locator('.interactive-home').screenshot({path});results.screenshots.push(path);
    }
    await page.locator('[data-house-route-toggle]').click();
    assert(await page.locator('[data-house-route]').isHidden(),'Drainage route does not hide');
    await page.locator('[data-house-prev]').click();
    assert(await page.locator('[data-house-spot="1"]').getAttribute('aria-selected')==='true','Previous control failed');
    await page.locator('.reviews-location summary').focus();await page.keyboard.press('Enter');
    assert(await page.locator('iframe[data-google-business-map]').isVisible(),'Google map cannot be opened with keyboard');
    await accessibility(page,language+' expanded Google widget');
    await page.locator('.reviews-location summary').click();
    for(const width of [1280,390]){
      await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));
      if(width===390)await page.locator('#menuBtn').click();
      await page.locator('[aria-controls="dd-locations"]').click();
      assert(await page.locator('#dd-locations').isVisible(),'Locations dropdown did not open');
      await page.keyboard.press('Escape');
      assert(await page.locator('#dd-locations').isHidden(),'Locations dropdown did not close');
      if(width===390)await page.keyboard.press('Escape');
    }
    results.flows.push(language+': six tappable spots at ten widths, localized links, keyboard, route toggle, reduced motion, Google map and Locations dropdown');
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
    await page.goto('http://127.0.0.1:4394'+prefix+'/resources/houston-rainfall-flood-facts/',{waitUntil:'networkidle'});
    assert(await page.locator('.houston-fact').count()===4,'Sourced rainfall facts were lost');
    const summary=page.locator('.rain-data summary');await summary.focus();await page.keyboard.press('Enter');
    assert(await page.locator('.rain-data table').isVisible(),'Rainfall table keyboard failed');
    const monthly=await page.locator('.rain-data tbody td').allTextContents();
    assert(monthly.length===12&&Math.abs(monthly.reduce((sum,v)=>sum+Number(v),0)-51.84)<.001,'Rainfall totals changed');
    await accessibility(page,language+' relocated rainfall facts');
    await page.goto('http://127.0.0.1:4394'+prefix+'/runoff-calculator/',{waitUntil:'networkidle'});
    await page.locator('[data-rain="10"]').click();
    assert(await page.locator('#gal').innerText()==='14,952','Calculator changed after relocation');
    results.flows.push(language+': rainfall facts, table and calculator preserved on dedicated pages');
    const fallback=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const noJs=await fallback.newPage();await noJs.goto(url);
    assert(await noJs.locator('[data-house-panel]:visible').count()===6,'No-JavaScript explanations missing');
    assert(await noJs.locator('[data-house-spot]').first().isHidden(),'Inert hotspots shown without JavaScript');
    await fallback.close();
  }
  await writeFile(directory+'/results.json',JSON.stringify(results,null,2));
  assert(!results.errors.length,'Page errors: '+results.errors.join('; '));
  assert(!results.accessibility.some(v=>v.issues.length),'Accessibility: '+JSON.stringify(results.accessibility.filter(v=>v.issues.length)));
  console.log('Short home passed: six interactive spots, routes, keyboard/touch-sized controls, ten widths, bilingual estimate flows, no-JavaScript fallback, Google widget, relocated facts/calculator and accessibility.');
  console.log(JSON.stringify(results.metrics));
}finally{await browser.close();server.close();}
