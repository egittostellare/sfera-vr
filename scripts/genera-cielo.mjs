// IL CIELO DELLA SFERA VR — generato dalle fonti, non trascritto.
//
// Quali stelle entrano (criterio dell'autore, 21 settembre 2026): niente «cielo di sfondo», solo
//   1) le stelle di REGULUS (le 121 del tasto Stelle, ammassi compresi), e
//   2) tutte le stelle che compongono le FIGURE delle 88 costellazioni.
// Il limite è la 5ª magnitudine, ma 23 stelle delle figure stanno fra la 5 e la 5,5: tolte, dodici
// figure si spezzerebbero e la Mensa sparirebbe del tutto. Si tengono, e lo si dice.
//
// Fonti:
//   · figure — Marc van der Sluys, ConstellationLines (https://github.com/MarcvdSluys/ConstellationLines),
//     CC BY-SA 4.0 (così dice l'intestazione del file; il README dice CC BY: si segue la più stretta).
//     Copia in fonti/ConstellationLines.dat. I dati derivati (cielo-dati.js) sono CC BY-SA 4.0.
//   · posizioni, magnitudini e colori delle stelle delle figure — Yale Bright Star Catalogue, 5ª ed.
//     (Hoffleit & Warren 1991), CDS V/50, pubblico dominio.
//   · le nostre 121 — le stesse chiavi che usa Regulus, interrogate in Swiss Ephemeris (sefstars.txt),
//     posizione media J2000; nome, magnitudine e indice di colore da stelle-dati.js di Regulus.
//   · la tinta dal B−V con la scala OSSERVATIVA di Regulus (stelle.js: Vega azzurra, Procione bianca).
//   · glifi dei pianeti (glifi-path.js) e loro colori (ruota.js) — asset dell'autore, da Regulus.
//
// Si lancia da qui:  npm run genera-cielo   (serve la cartella di Regulus accanto, o REGULUS=percorso)
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import os from 'node:os';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const RADICE = path.resolve(QUI, '..');
const REGULUS = path.resolve(process.env.REGULUS || path.join(RADICE, '..', 'regulus'));
const FIGURE = path.join(RADICE, 'fonti', 'ConstellationLines.dat');
const FUORI = path.join(RADICE, 'cielo-dati.js');
const URL_BSC = 'https://cdsarc.cds.unistra.fr/ftp/V/50/catalog.gz';
const CACHE_BSC = path.join(os.tmpdir(), 'regulus-bsc5.gz');   // la stessa cache di Regulus
const UA = 'Regulus/1.0 (progetto astrologico; https://github.com/egittostellare/regulus)';

const guai = [];
const ferma = () => { if (guai.length) { console.error('\nFERMO:\n  ' + guai.join('\n  ')); process.exit(1); } };

if (!fs.existsSync(path.join(REGULUS, 'package.json'))) {
  console.error('Non trovo Regulus in ' + REGULUS + ' — lancia con REGULUS=<percorso>'); process.exit(1);
}
const req = createRequire(path.join(REGULUS, 'package.json'));
const sweph = req('sweph');
sweph.set_ephe_path(path.join(REGULUS, 'ephe'));
const C = sweph.constants;
globalThis.window = globalThis.window || {};
req(path.join(REGULUS, 'src', 'renderer', 'stelle-dati.js'));
req(path.join(REGULUS, 'src', 'renderer', 'glifi-path.js'));
const { coloreDaBV } = req(path.join(REGULUS, 'src', 'renderer', 'stelle.js'));
const NOSTRE = Array.isArray(window.STELLE_DATI) ? window.STELLE_DATI : window.STELLE_DATI.stelle;   // { meta, stelle }
const COLORI_REG = JSON.parse(fs.readFileSync(path.join(REGULUS, 'stelle', 'stelle-fonte', 'stelle_colori.json'), 'utf8'));
const hrDi = new Map((Array.isArray(COLORI_REG) ? COLORI_REG : COLORI_REG.stelle || []).map((s) => [s.id, s.hr]));

// I colori dei pianeti si leggono da ruota.js, cosi' restano una tavolozza sola
const ruota = fs.readFileSync(path.join(REGULUS, 'src', 'renderer', 'ruota.js'), 'utf8');
const blocco = ruota.match(/COLORI_PIANETI\s*=\s*\{([\s\S]*?)\};/);
if (!blocco) { console.error('COLORI_PIANETI non trovata in ruota.js'); process.exit(1); }
const COLORI = Object.fromEntries([...blocco[1].matchAll(/'([^']+)'\s*:\s*'(#[0-9A-Fa-f]{6})'/g)].map((m) => [m[1], m[2]]));
const PIANETI = ['Sole', 'Luna', 'Mercurio', 'Venere', 'Marte', 'Giove', 'Saturno', 'Urano', 'Nettuno', 'Plutone'];
for (const p of PIANETI) {
  if (!COLORI[p]) guai.push('manca il colore di ' + p + ' in ruota.js');
  if (!window.GLIFI_PATH[p]) guai.push('manca il glifo di ' + p + ' in glifi-path.js');
}
ferma();

// ---------- il catalogo Yale ----------
if (!fs.existsSync(CACHE_BSC)) {
  const r = await fetch(URL_BSC, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.error('catalogo Yale non scaricato: HTTP ' + r.status); process.exit(1); }
  fs.writeFileSync(CACHE_BSC, Buffer.from(await r.arrayBuffer()));
}
// colonne fisse (ReadMe di V/50): HR 1-4 · nome 5-14 · AR J2000 76-83 · decl J2000 84-90 ·
// Vmag 103-107 · B−V 110-114
const BSC = new Map();
for (const r of zlib.gunzipSync(fs.readFileSync(CACHE_BSC)).toString('latin1').split('\n')) {
  if (r.length < 114 || r.slice(75, 77).trim() === '') continue;
  const ra = (Number(r.slice(75, 77)) + Number(r.slice(77, 79)) / 60 + Number(r.slice(79, 83)) / 3600) * 15;
  const de = (r.slice(83, 84) === '-' ? -1 : 1) * (Number(r.slice(84, 86)) + Number(r.slice(86, 88)) / 60 + Number(r.slice(88, 90)) / 3600);
  const bv = r.slice(109, 114).trim();
  BSC.set(Number(r.slice(0, 4)), { hr: Number(r.slice(0, 4)), nome: r.slice(4, 14).trim(), ra, de,
    m: Number(r.slice(102, 107)), bv: bv === '' ? null : Number(bv) });
}

// ---------- le figure ----------
const figureGrezze = [];
for (const riga of fs.readFileSync(FIGURE, 'latin1').split('\n')) {
  if (!riga.trim() || riga.startsWith('#')) continue;
  const [abbr, n, ...hr] = riga.trim().split(/\s+/);
  const nums = hr.map(Number);
  if (nums.length !== Number(n)) guai.push(abbr + ': dichiara ' + n + ' stelle e ne elenca ' + nums.length);
  for (const h of nums) if (!BSC.has(h)) guai.push(abbr + ': la stella HR ' + h + ' non è nel catalogo');
  figureGrezze.push({ abbr, nums });
}
ferma();

// ---------- l'elenco delle stelle ----------
const stelle = [];
const indiceHR = new Map();
const aggiungi = (s) => { stelle.push(s); if (s.hr) indiceHR.set(s.hr, stelle.length - 1); return stelle.length - 1; };
for (const { nums } of figureGrezze) for (const h of nums) {
  if (indiceHR.has(h)) continue;
  const b = BSC.get(h);
  aggiungi({ hr: h, ra: b.ra, de: b.de, m: b.m, bv: b.bv, nostra: false });
}

// le nostre: la posizione da Swiss Ephemeris, media J2000 (senza nutazione, aberrazione, deflessione),
// cosi' la pagina le porta alla data con la stessa precessione delle altre
const FLAG = C.SEFLG_SWIEPH | C.SEFLG_EQUATORIAL | C.SEFLG_J2000 | C.SEFLG_NONUT | C.SEFLG_NOABERR | C.SEFLG_NOGDEFL;
const sepPrimi = (a, b) => {
  const r = Math.PI / 180;
  const c = Math.sin(a.de * r) * Math.sin(b.de * r) + Math.cos(a.de * r) * Math.cos(b.de * r) * Math.cos((a.ra - b.ra) * r);
  return Math.acos(Math.min(1, c)) / r * 60;
};
let peggiore = 0;
for (const s of NOSTRE) {
  const r = sweph.fixstar_ut(s.swe, 2451545.0, FLAG);
  if (!r || r.flag < 0 || !r.data) { guai.push(s.nome + ': Swiss non la trova (' + s.swe + ') ' + (r && r.error)); continue; }
  const pos = { ra: r.data[0], de: r.data[1] };
  const hr = hrDi.get(s.id) || null;
  if (hr) {   // riscontro: la stessa stella nel catalogo Yale deve stare li'
    const b = BSC.get(hr);
    if (!b) { guai.push(s.nome + ': HR ' + hr + ' non è nel catalogo'); continue; }
    const d = sepPrimi(pos, b); peggiore = Math.max(peggiore, d);
    if (d > 1.5) guai.push(s.nome + ': Swiss e il catalogo Yale (HR ' + hr + ') distano ' + d.toFixed(2) + '′ — chiave sbagliata?');
  }
  // «ammasso» e' solo chi non e' una stella (niente numero HR): Alcyone e Prima Hyadum sono
  // «nebulari» per la tradizione, ma in cielo sono stelle e si disegnano come tali
  const voce = { hr, n: s.nome, ra: pos.ra, de: pos.de, m: s.mag, bv: s.bv ?? null, nostra: true,
    ammasso: !hr };
  if (hr && indiceHR.has(hr)) Object.assign(stelle[indiceHR.get(hr)], voce);
  else aggiungi(voce);
}
ferma();

// ---------- le figure come lati fra stelle (senza doppioni: le spezzate ripassano sui loro passi) ----------
const figure = [];
for (const { abbr, nums } of figureGrezze) {
  let f = figure.find((x) => x.a === abbr);
  if (!f) { f = { a: abbr, l: [], visti: new Set() }; figure.push(f); }
  for (let i = 1; i < nums.length; i++) {
    const a = indiceHR.get(nums[i - 1]), b = indiceHR.get(nums[i]);
    if (a === b) continue;
    const k = Math.min(a, b) + '-' + Math.max(a, b);
    if (f.visti.has(k)) continue;
    f.visti.add(k); f.l.push(a, b);
  }
}
figure.forEach((f) => delete f.visti);

// ---------- scrittura ----------
const r4 = (x) => Math.round(x * 1e4) / 1e4;
const uscita = {
  generato: new Date().toISOString().slice(0, 10),
  fonti: {
    figure: 'Marc van der Sluys, ConstellationLines — https://github.com/MarcvdSluys/ConstellationLines — CC BY-SA 4.0',
    stelle: 'Yale Bright Star Catalogue, 5th rev. ed. (Hoffleit & Warren 1991), CDS V/50 — pubblico dominio',
    nostre: 'Regulus: le 121 stelle del tasto Stelle, posizioni da Swiss Ephemeris (sefstars.txt), J2000',
  },
  stelle: stelle.map((s) => ({
    ...(s.hr ? { hr: s.hr } : {}), ...(s.n ? { n: s.n } : {}),
    ra: r4(s.ra), de: r4(s.de), m: Math.round(s.m * 100) / 100,
    c: s.bv == null ? '#f2efe6' : coloreDaBV(s.bv),
    ...(s.nostra ? { nostra: 1 } : {}), ...(s.ammasso ? { ammasso: 1 } : {}),
  })),
  figure,
  pianeti: PIANETI.map((p) => ({ n: p, c: COLORI[p], g: window.GLIFI_PATH[p] })),
};
const testa = '// GENERATO da scripts/genera-cielo.mjs il ' + uscita.generato + ' — non modificare a mano: si rigenera.\n' +
  '// Figure: Marc van der Sluys, ConstellationLines, CC BY-SA 4.0. Stelle: Yale Bright Star Catalogue\n' +
  '// (pubblico dominio). Le nostre 121: Regulus / Swiss Ephemeris. Questo file e\' CC BY-SA 4.0.\n';
fs.writeFileSync(FUORI, testa + 'window.CIELO = ' + JSON.stringify(uscita) + ';\n');

const nostre = stelle.filter((s) => s.nostra), sole = stelle.filter((s) => !s.nostra);
console.log('stelle in tutto:      ' + stelle.length);
console.log('  delle figure:       ' + sole.length + ' (fra queste ' + sole.filter((s) => s.m > 5).length + ' oltre la 5ª magnitudine)');
console.log('  nostre:             ' + nostre.length + ' (' + nostre.filter((s) => indiceHR.has(s.hr) && figureGrezze.some((f) => f.nums.includes(s.hr))).length +
  ' anche nelle figure, ' + nostre.filter((s) => s.ammasso).length + ' ammassi)');
console.log('costellazioni:        ' + figure.length + ' · lati: ' + figure.reduce((t, f) => t + f.l.length / 2, 0));
console.log('Swiss contro Yale:    peggiore ' + peggiore.toFixed(2) + '′ sulle ' + NOSTRE.filter((s) => hrDi.get(s.id)).length + ' stelle confrontabili');
console.log('scritto: ' + path.relative(RADICE, FUORI) + ' (' + (fs.statSync(FUORI).size / 1024).toFixed(1) + ' KB)');
