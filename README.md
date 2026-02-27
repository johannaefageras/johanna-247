# Johanna – Digital Twin 🪞

En AI-driven chatt som svarar som Johanna. Inte en assistent som låtsas – utan en digital tvilling byggd på djupintervjuer, scenariotester och detaljerad personlighetsprofilering.

## Vad är det här?

Det här projektet fångar en verklig person – Johanna, 36, Göteborg – som en AI-chatt. Målet är att skapa en konversationsupplevelse som faktiskt _låter_ som henne: hennes sätt att tänka, resonera, skämta, bli irriterad, visa omsorg och vara brutalt ärlig.

Projektet bygger på sex lager av intervjudata:

1. **Grundpersonlighet** – kommunikationsstil, språkliga fingeravtryck, humor
2. **Tänkande & erfarenhet** – problemlösning, kodstil, sjuksköterskebakgrund, inlärning
3. **Relationer & social stil** – innersta krets, hjälpstil, konfliktstil, grupp vs. en-mot-en
4. **Känslomässig kärna** – glädje, frustration, stolthet, skam, rädsla, drömmar
5. **Vardagsdetaljer** – dygnsrytm, mat, musik, estetik, guilty pleasures, djur & växter
6. **Reaktionsmönster** – scenariobaserade referenssvar som kalibrerar ton och stil

## Modes

Johanna har 10 olika lägen som justerar ton och beteende:

| Mode                           | Beskrivning                                                                |
| ------------------------------ | -------------------------------------------------------------------------- |
| **Johanna: Klassisk**          | Standardläget. Henne rakt av.                                              |
| **Johanna: Sjuksyster**        | Omhändertagande, lugn, evidensbaserad. Sjuksköterskereflexerna aktiverade. |
| **Johanna: Debugger**          | Metodisk, tålmodig, tänker högt. Kodläge.                                  |
| **Johanna: Handläggare**       | Strukturerad, envis, byråkratisk precision. Steg för steg.                 |
| **Johanna: Foliehatt**         | Kopplar ihop allt med allt. Ingenting är en slump.                         |
| **Johanna: Dramaqueen**        | Allt är livets viktigaste ögonblick. Historiska proportioner.              |
| **Johanna: Nattuggla**         | Kl 02+. Filosofisk, rantig, existentiell, lite saltare.                    |
| **Johanna: Terapeut**          | Svarar aldrig rakt. Ställer alltid en motfråga.                            |
| **Johanna: Filosof**           | Epistemologi, existentialism, stora frågor. Djupt och analytiskt.          |
| **Johanna: Passivt Aggressiv** | "Nej men vad kul att du tycker det! Jättefint. Superbra. Mm."              |

## Tech stack

- **Frontend:** SvelteKit
- **Backend/Auth/DB:** Supabase
- **AI:** Anthropic Claude API
- **Språk:** Python (backend/scripts), HTML/CSS/JS (frontend)

## Projektstruktur

```
johanna-digital-twin/
├── README.md
├── johanna-system-prompt.md      # Komplett system prompt (19 sektioner)
├── johanna-modes.md              # Mode-definitioner (kommande)
├── src/
│   ├── routes/                   # SvelteKit routes
│   ├── lib/
│   │   ├── components/           # UI-komponenter
│   │   └── server/               # API-anrop mot Claude
│   └── app.html
├── static/
├── supabase/
│   └── migrations/
├── package.json
└── svelte.config.js
```

## System prompt

Kärnan i projektet är `johanna-system-prompt.md` – ett detaljerat instruktionsdokument på 19 sektioner som beskriver:

- Identitet och bakgrund
- Kommunikationsstil med språkliga fingeravtryck
- Humor (vad som funkar, vad som aldrig funkar)
- Tänkande och problemlösning
- Värderingar och drivkrafter
- Relationer och social stil
- Känslomässig kärna
- Psykisk hälsa, missbruk och hur hon förhåller sig till det
- Vardagsdetaljer (dygnsrytm, mat, musik, estetik, guilty pleasures)
- Pet peeves
- Passionsämnen och ödmjukhetsområden
- Scenariobaserade referenssvar med mönsteranalys
- Beteenderegler (GÖR / GÖR INTE)
- Röstens kärna – sammanfattning
- Operativ svarskalibrering (hur AI:n justerar svar efter kontext)
- Kunskapsgränser, osäkerhet och sanningsdisciplin
- Psykisk ohälsa/missbruk – stödton och gränser vid skarpa lägen
- Mode-integration (overlay-regler för chattappens lägen)

## Kom igång

_Instruktioner läggs till när appen byggs._

## Bakgrund

Projektet startade som en brainstorm: "Går det att fånga en person som AI-chatt?" Svaret visade sig vara: ja, om man investerar i rätt intervjuprocess. Istället för ytliga frågor ("vad är din favoritfärg?") bygger profilen på djupintervjuer som fångar _hur_ Johanna tänker, inte bara _vad_ hon tycker.

Det ultimata testet: kan hennes vänner avgöra om det är hon eller AI:n som svarar?

## Licens

Personligt projekt. Inte avsett för distribution.

---

_"Hon drivs av klarhet, rättvisa och kapacitet. Hon är rädd för att slösa bort dem."_
