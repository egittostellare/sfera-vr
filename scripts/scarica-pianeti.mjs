// LE FACCE DEI PIANETI — si scaricano, si riducono, e finiscono in pianeti/.
//
// Sulla volta un pianeta e' una pallina di due terzi di grado: alla grandezza vera bastano poche
// centinaia di pixel, e solo lo zoom (che ingrandisce i dischi come Stellarium) chiede di piu'.
// Percio' gli originali — che pesano megabyte — restano FUORI dal repo, in una cache, e qui dentro
// entrano le mappe ridotte a 1024×512, che sono ancora il doppio di quanto l'occhio possa vedere
// col massimo ingrandimento.
//
// Fonti, tutte libere:
//   · Solar System Scope (solarsystemscope.com/textures) — CC BY 4.0, da citare. E' una serie
//     sola, fatta con la stessa mano: i nove globi si somigliano come si somigliano in cielo.
//   · Plutone — NASA / Johns Hopkins APL / Southwest Research Institute, New Horizons 2015:
//     pubblico dominio. Solar System Scope non ce l'ha.
//
// Si lancia da qui:  npm run scarica-pianeti
// Serve la rete (una volta sola) e, per ridurre le immagini, Windows con System.Drawing — le
// immagini ridotte stanno nel repo, percio' su un'altra macchina non serve rilanciarlo.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const QUI = path.dirname(fileURLToPath(import.meta.url));
const RADICE = path.resolve(QUI, '..');
const FUORI = path.join(RADICE, 'pianeti');
const CACHE = path.join(os.tmpdir(), 'sfera-vr-pianeti');
const UA = 'SferaVR/1.0 (progetto astrologico; https://github.com/egittostellare/sfera-vr)';
const SSS = 'https://www.solarsystemscope.com/textures/download/';

// nome del file · dove si prende · quanto alto lo si vuole · che cos'e'
const MAPPE = [
  { n: 'mercurio', u: SSS + '2k_mercury.jpg',          h: 512, f: 'sss' },
  { n: 'venere',   u: SSS + '2k_venus_atmosphere.jpg', h: 512, f: 'sss', nota: 'le nubi: e’ quello che si vede' },
  { n: 'luna',     u: SSS + '2k_moon.jpg',             h: 512, f: 'sss' },
  { n: 'marte',    u: SSS + '2k_mars.jpg',             h: 512, f: 'sss' },
  { n: 'giove',    u: SSS + '2k_jupiter.jpg',          h: 512, f: 'sss' },
  { n: 'saturno',  u: SSS + '2k_saturn.jpg',           h: 512, f: 'sss' },
  { n: 'urano',    u: SSS + '2k_uranus.jpg',           h: 512, f: 'sss' },
  { n: 'nettuno',  u: SSS + '2k_neptune.jpg',          h: 512, f: 'sss' },
  { n: 'plutone',  u: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Pluto_color_mapmosaic.jpg',
    h: 512, f: 'nasa', nota: 'New Horizons, 2015' },
  { n: 'anello-saturno', u: SSS + '2k_saturn_ring_alpha.png', h: 128, f: 'sss', png: true,
    nota: 'con la trasparenza: e’ un nastro, non una mappa' },
];
const FONTI = {
  sss: { chi: 'Solar System Scope (solarsystemscope.com/textures)', lic: 'CC BY 4.0' },
  nasa: { chi: 'NASA / Johns Hopkins University APL / Southwest Research Institute', lic: 'pubblico dominio' },
};

fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(FUORI, { recursive: true });

// ---------- scarico ----------
for (const m of MAPPE) {
  const est = m.png ? '.png' : '.jpg';
  m.orig = path.join(CACHE, m.n + est);
  if (fs.existsSync(m.orig)) { console.log('  gia’ in cache: ' + m.n); continue; }
  process.stdout.write('  scarico ' + m.n + '… ');
  const r = await fetch(m.u, { headers: { 'User-Agent': UA } });
  if (!r.ok) { console.error('HTTP ' + r.status + ' su ' + m.u); process.exit(1); }
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(m.orig, buf);
  console.log((buf.length / 1024 / 1024).toFixed(2) + ' MB');
  await new Promise((r2) => setTimeout(r2, 800));   // a passo lento, come si deve
}

// ---------- riduco ----------
// Un solo lancio di PowerShell per tutte: lanciarlo una volta per file costerebbe secondi di avvio
// ciascuno (e' la lezione delle tavole botaniche di Regulus).
const righe = MAPPE.map((m) => {
  const est = m.png ? '.png' : '.jpg';
  const fuori = path.join(FUORI, m.n + est).replace(/\\/g, '\\\\');
  const dentro = m.orig.replace(/\\/g, '\\\\');
  return `Riduci '${dentro}' '${fuori}' ${m.h} ${m.png ? '$true' : '$false'}`;
});
const PS = `
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Drawing
function Riduci($dentro,$fuori,$alto,$png){
  $img=[System.Drawing.Image]::FromFile($dentro)
  $h=[Math]::Min($alto,$img.Height); $w=[int][Math]::Round($img.Width*$h/$img.Height)
  $b=New-Object System.Drawing.Bitmap($w,$h)
  $g=[System.Drawing.Graphics]::FromImage($b)
  $g.InterpolationMode='HighQualityBicubic'; $g.PixelOffsetMode='HighQuality'; $g.SmoothingMode='HighQuality'
  $g.DrawImage($img,0,0,$w,$h)
  if($png){ $b.Save($fuori,[System.Drawing.Imaging.ImageFormat]::Png) }
  else {
    $enc=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|Where-Object {$_.MimeType -eq 'image/jpeg'}
    $pr=New-Object System.Drawing.Imaging.EncoderParameters(1)
    $pr.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[int64]82)
    $b.Save($fuori,$enc,$pr)
  }
  $g.Dispose(); $b.Dispose(); $img.Dispose()
  Write-Output ("$fuori $w $h")
}
${righe.join('\n')}
`;
const uscita = execFileSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', PS], { encoding: 'utf8' });
const misure = new Map();
for (const r of uscita.trim().split(/\r?\n/)) {
  const p = r.trim().split(' ');
  misure.set(path.basename(p[0]), p.slice(1).join('×'));
}

// ---------- i crediti ----------
let tot = 0;
const elenco = MAPPE.map((m) => {
  const est = m.png ? '.png' : '.jpg';
  const f = path.join(FUORI, m.n + est);
  const kb = fs.statSync(f).size / 1024; tot += kb;
  return '- **' + m.n + est + '** — ' + misure.get(m.n + est) + ' px, ' + kb.toFixed(0) + ' KB · ' +
    FONTI[m.f].chi + ' · *' + FONTI[m.f].lic + '*' + (m.nota ? ' · ' + m.nota : '') + '  \n  <' + m.u + '>';
});
fs.writeFileSync(path.join(FUORI, 'CREDITI.md'),
  '# Le facce dei pianeti\n\n' +
  'Mappe della superficie (equirettangolari) avvolte sui globi della Sfera VR. Le ha scaricate e\n' +
  'ridotte `scripts/scarica-pianeti.mjs` (`npm run scarica-pianeti`): gli originali, che pesano\n' +
  'megabyte, restano fuori dal repo — sulla volta un pianeta e’ una pallina di due terzi di grado.\n\n' +
  elenco.join('\n') + '\n\n' +
  'In tutto ' + (tot / 1024).toFixed(2) + ' MB.\n\n' +
  '**Attribuzione.** Le mappe di Solar System Scope sono sotto **CC BY 4.0**: vanno citate ovunque\n' +
  'la pagina si mostri (e infatti stanno nei crediti in fondo alla pagina). Quella di Plutone e’\n' +
  'di NASA / JHU APL / SwRI ed e’ di pubblico dominio.\n');

console.log('\nscritte in pianeti/:');
for (const m of MAPPE) { const est = m.png ? '.png' : '.jpg'; console.log('  ' + m.n + est + '  ' + misure.get(m.n + est)); }
console.log('in tutto ' + (tot / 1024).toFixed(2) + ' MB · crediti in pianeti/CREDITI.md');
