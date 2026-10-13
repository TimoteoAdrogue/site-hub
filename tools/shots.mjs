import { chromium } from '/Users/adroguetimoteo/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
const P = '/Users/adroguetimoteo/Documents/PROJECTS';
const sites = {
  'cobalt-v3': 'https://timoteoadrogue.github.io/cobalt-creation-site-v3/',
  'cobalt-v2': 'https://timoteoadrogue.github.io/cobalt-creation-site-v2/',
  'cobalt-v1': 'https://timoteoadrogue.github.io/cobalt-creation-site/',
  'elysium': 'https://timoteoadrogue.github.io/elysium-website/',
  'letsmed': 'https://timoteoadrogue.github.io/letsmed-redesign/',
  'hecpro': 'https://timoteoadrogue.github.io/hecpro-redesign/',
  'beauvent': 'https://timoteoadrogue.github.io/domaine-de-beauvent/',
  'carac': 'https://timoteoadrogue.github.io/maison-du-carac/',
  'afbarber': 'https://timoteoadrogue.github.io/af-barber-website/',
  'chute': 'https://chute-libre-prepa.netlify.app/',
  'dailydesk': 'https://dailydesk.ch/',
  'hone': `file://${P}/hone/site/index.html`,
};
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'fr-CH' });
await Promise.all(Object.entries(sites).map(async ([k, u]) => {
  const p = await ctx.newPage();
  await p.addInitScript(() => addEventListener('load', () => document.head.insertAdjacentHTML('beforeend', '<style>[id^=shopify-pc]{display:none!important}</style>')));
  try {
    await p.goto(u, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
    await p.waitForTimeout(5000);
    await p.screenshot({ path: `${P}/site-hub/shots/${k}.png` });
    console.log('ok', k, await p.title());
  } catch (e) { console.log('FAIL', k, e.message); }
}));
await b.close();

// Then: cd shots && for f in *.png; do sips -s format jpeg -s formatOptions 72 -Z 1200 "$f" --out "${f%.png}.jpg" && rm "$f"; done
