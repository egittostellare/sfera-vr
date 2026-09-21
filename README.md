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

- **Il luogo**: tasto in alto a destra, si cerca una città (12.859 luoghi dal database di Regulus:
  il mondo fino ai capoluoghi, l'Italia sopra i 5.000 abitanti) o si scrivono le coordinate.
  Il luogo viaggia nell'indirizzo: `?nome=Sydney&lat=-33.8688&lng=151.2093&tz=Australia/Sydney`
  (e con `&t=2026-09-21T20:48:00Z` anche l'istante).
- **Il moto diurno** è tempo che scorre, a quattro velocità: 1 ora di cielo al minuto, in 20 s,
  in 7,5 s, in 3 s (da 0,25° a 5° al secondo). Sole e pianeti si ricollocano man mano.
- **L'orizzonte reale**: quello che non è ancora sorto non si vede (orizzonte geometrico).
- **Puntare**: col raggio del controller (o col mouse) compare il nome della stella o del pianeta;
  col grilletto (o col clic) lo si seleziona, con un anello e la sua scheda.
- Interruttori per equatore, eclittica, orizzonte, asse, Sole, pianeti, stelle di Regulus,
  stelle delle costellazioni e **linee delle costellazioni**, ognuno per conto suo.

## Fonti e licenze

| cosa | fonte | licenza |
|---|---|---|
| figure delle costellazioni | Marc van der Sluys, [ConstellationLines](https://github.com/MarcvdSluys/ConstellationLines) | CC BY-SA 4.0 |
| posizioni, magnitudini e colori delle stelle delle figure | Yale Bright Star Catalogue, 5ª ed. (Hoffleit & Warren 1991), CDS V/50 | pubblico dominio |
| le 121 stelle di Regulus | Swiss Ephemeris (`sefstars.txt`), posizione media J2000 | — |
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
