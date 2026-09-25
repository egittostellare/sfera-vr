# Sfera VR — contesto per Claude

Planetario in **realtà virtuale** (WebXR) dell'autore: la sfera locale col cielo vero, da guardare
nel visore Meta Quest. È il **primo passo concreto verso il ★ PLANETARIO ASTROLOGICO** di Regulus —
ma è un **progetto a sé**, con un repo suo e una cartella sua.

L'autore è astrologo, **non programmatore**: definisce metodo, contenuti e grafica; Claude è il ponte
tecnico. Si comunica in **italiano**, chiaro e sintetico. Claude **non vede lo schermo** e **non ha il
visore**: quello che si vede dentro la VR lo può dire solo l'autore.

## ⚠ Questo repo è PUBBLICO
`github.com/egittostellare/sfera-vr` — chiunque può leggerlo. Quindi:
- **le note di sessione restano FUORI** (`NOTE-SESSIONE-*.md` è in `.git/info/exclude`): vivono solo
  su questa macchina, e non viaggiano;
- niente materiale d'autore non destinato al pubblico, niente chiavi, niente indirizzi privati.

## Regulus è un ALTRO progetto
Sta in una cartella **accanto a questa** (`../regulus`), ha il **suo** quaderno (`CLAUDE.md`, mezzo milione di caratteri di
diario) e **non si tocca lavorando qui**. Le sessioni sulla Sfera si aprono **da questa cartella**,
non da quella di Regulus: fino al 26 settembre 2026 si apriva di là, e ogni sessione caricava il
diario di Regulus **senza usarne una riga**.
- Quel che la Sfera **prende** da Regulus sono soltanto **file**, e solo quando si rigenerano i dati:
  `scripts/genera-cielo.mjs` vuole la cartella di Regulus accanto (usa le effemeridi `sweph`, i dati
  delle stelle, i glifi, la tavolozza). Il diario non serve mai.
- Se un lavoro tocca davvero Regulus, **lo si dice e si chiede**: sono due repo, e due storie.

## Com'è fatta
Un **unico file**, `index.html` (~220 KB): pagina, scena e logica insieme. **three.js r128** caricato
da rete come script classico — **nessuna compilazione, nessun passaggio di costruzione**. Accanto,
tre file di dati generati: `cielo-dati.js` (stelle e figure), `luoghi-dati.js` (le città),
`stelle-testi.js`. Che cosa c'è nel cielo e che cosa si può fare sta nel **README**, che è scritto per
chi arriva da fuori: da lì si parte, e non si duplica qui.

## Pubblicare — i tre gesti, in quest'ordine
1. **`cp index.html sfera_vr.html`** — sono due copie **identiche** (la seconda è il nome storico).
   Vanno riallineate **prima di ogni commit**, se no il visore apre la vecchia.
2. `git push` — GitHub Pages si ricostruisce da sé in **uno-tre minuti**.
3. Nel visore si apre l'indirizzo con una **coda finta**: `egittostellare.github.io/sfera-vr/?22`.
   La pagina ha `max-age=600`, quindi senza quella coda il Quest riserve la versione di dieci minuti
   prima. **Il numero in uso va detto all'autore a ogni giro, e cresce di uno.**

## Come si prova (i banchi)
Non c'è il visore, quindi si prova la **logica** e la **geometria**, non il «come si sente». I banchi
stanno nello scratchpad della sessione (non nel repo) e si lanciano **dalla cartella di Regulus**,
per il suo Electron:
```
env -u ELECTRON_RUN_AS_NODE node_modules/electron/dist/electron.exe <banco> ../sfera-vr/index.html <cartella>
```
La pagina si guida con `win.webContents.executeJavaScript`. Per le cose visive si leggono i pixel
(`readRenderTargetPixels`) o si fanno **fotografie dal centro della sfera**, da guardare davvero.

## Lezioni già pagate — non ripagarle
- **Una finestra che il sistema crede coperta congela le animazioni**: il cronometro mente e le prove
  escono piatte. Si provano i **dati calcolati**, non i secondi a parete.
- **L'heredoc della shell mangia le barre rovesciate e i backtick**: il codice si scrive con Write o
  Edit, o da uno script su file. Mai passato alla shell.
- **three.js r128 non passa la matrice di vista alle linee e alle scritte** (solo ai materiali «Mesh»):
  per deformare nello shader serve una matrice propria, messa in `onBeforeRender`.
- **Sul desktop la camera ORBITA** e il ciclo la riporta a novanta metri: per fotografare la consolle
  va rimessa al centro. Nel visore la camera è la testa, e il problema non esiste.
- **Le richieste percettive si chiedono, non si indovinano.** «Che l'orizzonte si allontani» è costato
  due tentativi a vuoto: quando la richiesta è su ciò che si *sente*, **prima si descrive a parole che
  cosa si vedrà** e si chiede conferma, poi si scrive il codice.

## Regole che valgono qui come in Regulus
- **Ricalco fedele**: i disegni e le misure dell'autore si riproducono **esatti**. Se un disegno pare
  incompleto, **si chiede** — non si colma di propria iniziativa.
- **I costi invisibili si dicono**, subito e **con la misura**: peso caricato per nulla, tempo
  d'attesa, lavoro rifatto. La soglia è: ricorrente, o grosso in una volta sola.
- **Quando la domanda è visiva, si guarda.** Il codice non dice se una cosa si vede; e si guarda **a
  grandezza vera**, non solo ingrandita.

## Dove sta il resto
- **`README.md`** — il cielo, i comandi, le fonti e le licenze (three.js MIT, astronomy-engine MIT,
  figure delle costellazioni di Marc van der Sluys **CC BY-SA 4.0**, città GeoNames **CC BY 4.0**).
- **`NOTE-SESSIONE-*.md`** — il diario del lavoro, **fuori dal repo**, su questa macchina. Contiene lo
  stato, i punti aperti e le ricognizioni già fatte: **si legge all'inizio di una sessione**, e si
  dice all'autore quale pezzo si è letto.
