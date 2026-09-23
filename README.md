# Sfera locale VR

Esperienza WebXR della **sfera locale**, primo passo del planetario astrologico di Regulus:
orizzonte, meridiano, equatore celeste, eclittica, asse del mondo, il Sole col suo cerchio diurno,
i pianeti coi glifi dell'autore, le stelle di Regulus e le figure delle 88 costellazioni.
Il cielo è quello **vero**: di Milano, nell'istante in cui si apre la pagina.

**Aprila qui:** https://egittostellare.github.io/sfera-vr/

- **Desktop:** trascina per ruotare, scorri per lo zoom.
- **Meta Quest:** apri la pagina nel browser, premi *Entra in VR*, poi punta il raggio del
  controller sul pannello e premi il grilletto.

## Che cosa c'è nel cielo

Niente «cielo di sfondo»: solo le stelle che servono.

- le **121 stelle di Regulus** (quelle del tasto *Stelle*, ammassi compresi), con la tinta vera
  data dall'indice di colore B−V secondo la scala osservativa di Regulus;
- le **697 stelle che compongono le figure** delle 88 costellazioni, in una luce quasi bianca
  (98 sono anche fra le nostre). Il limite è la 5ª magnitudine; 23 stelle delle figure stanno fra
  la 5 e la 5,5 e sono tenute, altrimenti dodici figure si spezzerebbero e la Mensa sparirebbe;
- i **pianeti**, dalla Luna a Plutone, geocentrici e apparenti.

In tutto 720 stelle e 657 lati di figura.

## Che cosa si può fare

- **Il luogo**, anche **dentro il visore**: il tasto *Luogo* del pannello apre una tastiera nel cielo,
  da premere col raggio; i risultati sono tasti anch'essi, e due numeri separati da uno spazio
  valgono come coordinate. Sulla pagina c'è il box in alto a destra. Le città sono 12.859, dal
  database di Regulus (il mondo fino ai capoluoghi, l'Italia sopra i 5.000 abitanti). Il cielo si
  riorienta subito, senza ricaricare la pagina e senza uscire dalla VR: è costruito in coordinate
  equatoriali, e il luogo e l'ora sono una sola rotazione della volta.
  Il luogo viaggia nell'indirizzo: `?nome=Sydney&lat=-33.8688&lng=151.2093&tz=Australia/Sydney`
  (e con `&t=2026-09-21T20:48:00Z` anche l'istante).
- **Girare il planetario**: entrando si guarda a nord. Per scegliere l'orientamento si punta il raggio
  nel vuoto, si stringe il **tasto laterale** del controller e si trascina a destra o a sinistra: il
  planetario intero (orizzonte, cardinali, cielo) segue il raggio, e rilasciato il tasto resta lì.
  Il cielo resta giusto rispetto al suo orizzonte; pannello e tastiera restano con chi guarda.
- **Il mare**: nel visore, col tasto **«Mare»** (acceso di partenza), si sta in piedi su un mare calmo
  che arriva fino all'orizzonte. L'occhio misura la distanza dell'orizzonte dal suolo che ci arriva,
  non dal cielo: il vecchio disco verde, liscio e finito a 32 metri, si leggeva come una piattaforma
  rotonda. Il mare ha **increspature** nette vicino e sempre più minute lontano, un **riflesso** che a
  sguardo radente si accende (Fresnel) e rimanda il chiarore basso del cielo, e la **foschia** che
  mangia i chilometri. La volta va dietro il suo orizzonte, a 6 km, con tutto ciò che porta: **stesse
  proporzioni, nessun astro spostato**, la Polare dov'è. Con l'orizzonte reale il mare è acqua vera e
  nasconde ciò che non è sorto; senza, è un vetro scuro attraverso cui il cielo di sotto si vede.
  Sul desktop il mare non c'è: la sfera si guarda da fuori.
- **Il grandangolo**, con la **levetta** in avanti (indietro si torna alla vista naturale; la misura
  scelta la ricorda il visore). Nel visore si vede un campo di un centinaio di gradi, dove l'occhio
  nudo ne vede quasi duecento, e le lenti tengono la messa a fuoco ferma a un metro e mezzo: per
  questo tutto sembra più vicino che all'aperto. Il grandangolo stringe gli angoli attorno alla
  direzione in cui si guarda — come allargare la maschera — e nella vista entra più cielo: tutto
  sembra più lontano. È l'**unico** rimpicciolimento che non storce il cielo: rimpicciolire gli
  angoli tenendo il cielo fermo non si può (una sfera non si restringe dentro se stessa, e se le
  stelle davanti si stringono quelle dietro devono venire avanti — è lo zoom, che porta la Polare
  sopra la testa). La lente invece **segue lo sguardo**: le proporzioni restano, l'orizzonte resta
  dritto, e la Polare resta dietro — per vederla ci si gira, e quando la si guarda è al suo posto.
  Il prezzo: girando la testa il cielo scorre un po' più piano di lei. Da 1× a 0,40×.
- **I due modi della lente**, col tasto **«Lente»** del cruscotto — *normale* (come si parte: nessuna
  lente, e la levetta in avanti non fa nulla) e *solo periferia*, dove il centro della vista (26°)
  resta **esatto e immobile** e si stringe solo l'anello esterno: quello che si fissa non si deforma
  mai, e ai bordi entra più cielo. È l'idea degli occhiali per la vista a cannocchiale, che mettono
  l'espansione in periferia per non confondere la visione centrale. Fuori dal cono le rette si
  incurvano un poco: è il prezzo, e non si può evitare (una lente che non tocca il centro non può
  essere lineare). Gli altri tre modi provati — *cede girando*, *segue lo sguardo*, *ancorata nel
  cielo* — l'autore li ha guardati nel visore e scartati.
- **Il bordo del mare** con la levetta **di traverso**: a destra si allontana, a sinistra si
  avvicina, da 30 metri all'orizzonte vero della quota. Il cielo non si muove. Le due misure
  compaiono accanto all'ora.
- **L'onda lunga e la quota**, due tasti che cambiano la *scala* del mare senza toccare nessun angolo:
  - *Onda lunga*: sotto le increspature (da 65 cm a 5 m) corre l'onda del mare aperto, **28, 60 e
    110 metri**, bassissima. Senza di lei il cervello legge «stagno», e l'orizzonte di uno stagno è
    vicino per definizione, qualunque cosa si faccia con gli angoli.
  - *Quota*: l'altezza dell'occhio sul mare — **battigia 1,6 m · terrazza 10 m · ponte di nave 30 m** —
    e con essa la distanza dell'orizzonte, che è 3570·√h: **4,5 · 11,3 · 19,6 km**. Più in alto si sta,
    più la fascia di mare si allarga e il suo digradare si legge.
- **Lo zoom, come la rotella di Stellarium**, col tasto **«Zoom con la levetta»** acceso: in avanti il cielo
  attorno a quello che il raggio indica si ingrandisce (fino a 16×); indietro si restringe e nel
  visore entra più cielo di quanto il Quest ne mostri (fino a 0,35×: la metà di cielo che si ha davanti sta entro
  39° dal centro). Tornando verso la vista naturale c'è uno **scatto a 1×**: ci si ferma lì, e si
  riparte lasciando la levetta e puntando altrove. L'ingrandimento compare accanto all'ora.
  La deformazione è la proiezione stereografica di Stellarium portata sulla volta: attorno al
  centro gli angoli si moltiplicano, all'opposto si dividono, e **ogni cerchio resta un cerchio**
  (orizzonte, equatore, eclittica); nessuna stella passa dall'altra parte dell'orizzonte. La volta
  deformata resta ferma nel mondo, così girando la testa ci si guarda attorno senza che il cielo
  scivoli davanti agli occhi. Le stelle si spostano ma non si gonfiano; nomi e glifi restano
  attaccati al loro astro. Lo zoom sposta le direzioni (la Polare può finire sopra la testa): per
  questo sta dietro un tasto. Spegnendo il tasto, o con *Ricentra*, lo zoom si toglie. Mentre c'è
  lo zoom il mare si toglie: il cielo si deforma, il mare no.
- **Cambiando luogo** la vista si oscura, il cielo si gira nel buio e poi si riaccende.
- **Il moto diurno** è tempo che scorre, a quattro velocità: 1 ora di cielo al minuto, in 20 s,
  in 7,5 s, in 3 s (da 0,25° a 5° al secondo). Sole e pianeti si ricollocano man mano.
- **L'orizzonte reale**: quello che non è ancora sorto non si vede (orizzonte geometrico).
- **Puntare**: col raggio del controller (o col mouse) compare il nome della stella o del pianeta;
  col grilletto (o col clic) lo si seleziona, con un anello e la sua scheda. Nel visore il raggio
  arriva **fino alla volta** e ci posa un **mirino**, un cerchietto vuoto sempre largo un grado: col
  grandangolo si posa dove la stella **si vede**, non dove sta.
- **Le ghiere del cielo**, quattro tasti nuovi: **Azimut** gradua l'orizzonte come la rosa di una
  bussola (un grado, cinque, dieci, e il numero ogni trenta, contato da nord verso est); **Meridiano**
  mostra il cerchio che passa per nord, zenit, sud e nadir, dove ogni astro culmina; **Zodiaco**
  divide l'eclittica nei dodici segni, la gradua e mette il glifo di ciascuno al suo grado di mezzo,
  nel colore del suo elemento; **Latitudini** traccia i diciannove fili delle latitudini eclittiche,
  da −9° a +9° (nove bastano: la più larga escursione è quella di Venere, poco più di otto gradi).
- **Gli elementi celesti**, col tasto **«Elementi ›»** accanto a *Pianeti*: si apre a destra l'ala del
  banco, con **tutti** quelli che Regulus mette in *Settaggi › Elementi Celesti* — i dieci pianeti uno
  per uno, i **nodi** e le **absidi** della Luna (veri e medi), i quattro **angoli** col **Vertex**, le
  quattro **Sorti** e le cinque **parti planetarie**. Sono gradi dello zodiaco, e un grado dello
  zodiaco è un posto del cielo come un altro: compaiono sull'eclittica, ciascuno col suo glifo o la
  sua sigla. L'**Ascendente** è quello che si capisce meglio vedendolo: sta appeso all'orizzonte a
  oriente e lì resta mentre tutto il cielo gira sopra di lui.
  I conti sono quelli di Regulus rifatti con astronomy-engine e **riscontrati con Swiss Ephemeris**:
  le formule degli angoli e del Vertex combaciano al millesimo di primo su 390 casi (dall'equatore
  agli ottanta gradi, a sei istanti), e il nodo vero pure. Quel che resta è la precisione della Luna
  di astronomy-engine — 0,06′ — che la geometria amplifica: 0,7′ sul nodo (l'inclinazione è 5°) e
  4,5′ sull'apogeo (l'eccentricità è 0,055). Sulla volta sono millimetri. *Chirone* c'è nell'elenco
  ma è spento, e il tasto dice perché: astronomy-engine non ha la sua effemeride.
- **La consolle**: non è più un pannello appeso davanti alla faccia ma un **banco** — basso, largo e
  curvo, a portata di mani come una tastiera sul tavolo, inclinato verso chi guarda come un tavolo da
  disegno. La superficie è un pezzo di cono attorno all'osservatore, perciò ogni tasto sta alla stessa
  distanza (70 cm) e guarda dritto verso di lui. In fondo il quadro con l'ora e il diario di bordo,
  davanti le file dei tasti col nome della sezione a sinistra. Si gira **solo di traverso**, quanto ti
  sei girato tu: un tavolo resta un tavolo, e non si corica quando alzi la testa. Il **tasto B** del
  controller destro lo manda via e lo richiama.
  (Misure e colori sono provvisori: la pulsantiera definitiva la disegna l'autore.)
- Interruttori per equatore, eclittica, orizzonte, asse, Sole, pianeti, stelle di Regulus,
  stelle delle costellazioni e **linee delle costellazioni**, ognuno per conto suo.

## Fonti e licenze

| cosa | fonte | licenza |
|---|---|---|
| figure delle costellazioni | Marc van der Sluys, [ConstellationLines](https://github.com/MarcvdSluys/ConstellationLines) | CC BY-SA 4.0 |
| posizioni, magnitudini e colori delle stelle delle figure | Yale Bright Star Catalogue, 5ª ed. (Hoffleit & Warren 1991), CDS V/50 | pubblico dominio |
| le 121 stelle di Regulus | Swiss Ephemeris (`sefstars.txt`), posizione media J2000 | — |
| glifi dei pianeti e dei dodici segni, colori dei quattro elementi | Regulus (`glifi-path.js`, `ruota.js`) | dell'autore |
| pianeti e tempo siderale, nel browser | [astronomy-engine](https://github.com/cosinekitty/astronomy) di Don Cross | MIT |
| grafica 3D | [three.js](https://threejs.org) r128 | MIT |

Il file dei dati `cielo-dati.js`, derivato dalle figure, è distribuito con la stessa licenza
**CC BY-SA 4.0**. (L'intestazione del file delle figure dice CC BY-SA, il README di quel progetto
CC BY: si segue la più stretta.)

**astronomy-engine è stata confrontata col motore di Regulus (Swiss Ephemeris)** su tre istanti:
il peggior scarto sui pianeti è 0,28′ (diciassette secondi d'arco), sul tempo siderale un quarto
di secondo. Dentro la sfera i due motori sono indistinguibili.

## Rigenerare i dati

`cielo-dati.js` non si scrive a mano: lo prepara `scripts/genera-cielo.mjs` dalle fonti, e si
ferma con un errore se qualcosa non torna (una stella delle figure assente dal catalogo, una
nostra stella che Swiss non trova, o che non combacia col catalogo Yale entro 1,5′).

```
npm run genera-cielo
```

Serve la cartella di **Regulus** accanto a questa (o `REGULUS=<percorso>`): il generatore usa
il suo Swiss Ephemeris, i dati delle stelle, i glifi e la tavolozza dei pianeti.
