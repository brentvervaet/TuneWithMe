# Dossier

- Student: Brent Vervaet
- Studentennummer:  187068bv
- E-mailadres: <mailto:brent.vervaet@student.hogent.be>
- Demo: <https://hogent.cloud.panopto.eu/Panopto/Pages/Sessions/List.aspx?folderID=7048058e-60d5-472a-bd49-b24b012cbe27>
- GitHub-repository: <https://github.com/HOGENT-frontendweb/frontendweb-2425-BrentVervaet.git>
- Front-end Web Development
  - Online versie: <https://tunewithme.onrender.com>
- Web Services:
  - Online versie: <https://tunewithme-backend.onrender.com>

## Logingegevens

### Lokaal

- Gebruikersnaam/e-mailadres: <admin@email.com> (admin)
- Wachtwoord: 12345678

- Gebruikersnaam/e-mailadres: <user1@email.com> (user)
- Wachtwoord: 12345678

- Gebruikersnaam/e-mailadres: <brent.vervaet@icloud.com> (user)
- Wachtwoord: 12345678

### Online

- Gebruikersnaam/e-mailadres: <admin@hogent.be> (admin)
- Wachtwoord: 12345678

## Projectbeschrijving

TuneWithMe is een front-end webapplicatie die gebruikers de mogelijkheid biedt om muziekinstrumenten en hun bijbehorende tunings eenvoudig te beheren. De applicatie bevat functies zoals instrumentenbeheer, waarbij gebruikers een lijst van muziekinstrumenten kunnen bekijken, nieuwe instrumenten kunnen toevoegen, bestaande kunnen bewerken en verwijderen. Tuningsbeheer maakt het mogelijk om tunings voor instrumenten te bekijken, toevoegen, aanpassen en verwijderen. De applicatie heeft ook een tuner, waarmee gebruikers hun instrumenten kunnen stemmen.

![EERD](./images/tuner%20eerd.png)

## Screenshots

![Register](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.34.12.png)
![Register](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.34.27.png)
![Welcome](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.34.44.png)
![Account](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.34.50.png)
![Menu](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.34.57.png)
![Instruments](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.35.53.png)
![Instruments Details](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.36.00.png)
![Edit Instrument](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.36.13.png)
![Add Instrument](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.36.22.png)
![Tuner](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.37.10.png)
![Tuner](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.37.26.png)
![LightMode](./images/screenshot/Scherm­afbeelding%202024-12-19%20om%2021.37.39.png)

## API calls

Ik volg enkel front-end maar heb de api calls van mijn back-end toch voor het zekerste gekopieërd van vorig jaar.

### Instruments

- `GET /api/instruments`: alle instrumenten ophalen
- `GET /api/instruments/:id`: instrument met bepaald id ophalen
- `GET /api/instruments/:type`: instrumenten van bepaalde types ophalen
- `POST /api/instruments`: instrument aanmaken
- `PUT /api/instruemnts/:id`: instrument met bepaald id aanpassen
- `DELETE /apin/instruments/:id`: instrument met bepaald id verwijderen

### Notes

- `GET /api/notes`: alle notes ophalen
- `GET /api/notes/:id`: note met bepaald id ophalen
- `POST /api/notes`: note aanmaken
- `PUT /api/notes/:id`: note met bepaald id aanpassen
- `DELETE /api/notes/:id`: note met bepaald id verwijderen

### Tunings

- `GET /api/tunings`: alle tunings ophalen
- `GET /api/tunings/custom`: alle custom tunings ophalen
- `GET /api/tunings/:id`: tuning met bepaald id ophalen
- `POST /api/tunings`:  tuning aanmaken
- `PUT /api/tunings/:id`: tuning met bepaald id aanpassen
- `DELETE /api/tunings/:id`: tuning met bepaald id verwijderen

### Health

- `GET /api/health/ping`: ping ophalen
- `GET /api/health/version`: version ophalen

### Spotify

- `GET /api/home/spotify/track`: track ophalen uit de spotify-web-api

### Gebruikers

- `GET /api/users`: alle gebruikers ophalen
- `GET /api/users/:id`: gebruiker met een bepaald id ophalen

## Behaalde minimumvereisten

### Front-end Web Development

#### Componenten

- [x] heeft meerdere componenten - dom & slim (naast login/register)
- [x] applicatie is voldoende complex
- [x] definieert constanten (variabelen, functies en componenten) buiten de component
- [x] minstens één form met meerdere velden met validatie (naast login/register)
- [x] login systeem

#### Routing

- [x] heeft minstens 2 pagina's (naast login/register)
- [x] routes worden afgeschermd met authenticatie en autorisatie

#### State management

- [x] meerdere API calls (naast login/register)
- [x] degelijke foutmeldingen indien API-call faalt
- [x] gebruikt useState enkel voor lokale state
- [x] gebruikt gepast state management voor globale state - indien van toepassing

#### Hooks

- [x] gebruikt de hooks op de juiste manier

#### Algemeen

- [x] een aantal niet-triviale én werkende e2e testen
- [x] minstens één extra technologie
- [x] node_modules, .env, productiecredentials... werden niet gepushed op GitHub
- [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
- [x] de applicatie start zonder problemen op gebruikmakend van de instructies in de README
- [x] de applicatie draait online
- [x] duidelijke en volledige README.md
- [x] er werden voldoende (kleine) commits gemaakt
- [x] volledig en tijdig ingediend dossier

## Projectstructuur

### Front-end Web Development

- `application-frontend`
  - `cypress`: E2E test configuratie.
    - `e2e`: testen
    - `fixtures`: mocks
    - `support`: Login en logout test commands
  - `images`: bevat de screenshots en EERD voor in het dossier.md
  - `public`: favicon.ico
  - `src`: Bron code.
    - `api`: API code.
      - `index.js`: API calls.
    - `components`: React componententen.
      - `instruments`
        - `Instrument.jsx`
        - `InstrumentForm.jsx`
        - `InstrumentsTable.jsx`
        - `InstrumentTuningsTable.jsx`
      - `tunings`: Tunings componenten.
        - `Tuning.jsx`
        - `TuningTable.jsx`
    - `contexts`: Contextprovider voor authorisatie.
    - `Auth.context.jsx`: Context te creëren voor authenticatie
    - `auth.js`: Creeërt een useAuth() (custom hook)
    - `pages`: Pagina-componenten voor verschillende routes.
      - `about`: About pagina.
        - `About.jsx`
        - `History.jsx`
        - `Location.jsx`
        - `Services.jsx`
      - `auth`: Autorisatie en authenticatie paginas.
        - `Login.jsx`
        - `Logout.jsx`
        - `Register.jsx`
      - `instruments`: Instrumenten pagina.
        - `InstrumentsList.jsx`
        - `InstrumentDetail.jsx`
        - `AddOrEditInstrument.jsx`
      - `notes`
        - `NotesList.jsx`
      - `tuner`: Tuner pagina.
        - `Tuner.jsx`
      - `tunings`: Tuning pagina.
        - `TuningsList.jsx`
      - `Home.jsx`
      - `Layout.jsx`
      - `NotFound.jsx`
    - `main.jsx`: Startpunt voor de applicatie, stelt routing in en rendert app.

## Extra technologie

### Front-end Web Development

- `pnpm` : Pnpm focust meer op efficiente opslag van packages en gebruikt een niet-plat *node_modules* structuur. Persoonlijk ook meer fan van pnpm. <https://www.npmjs.com/package/pnpm>
- `Material UI`: Maakt het simpeler om moderne & responsive UI te maken voor een react applicatie a.d.h.v aanpasbare componenten en tools. Handig om snelle UI te verkrijgen zonder veel meer codeer werk. Creeërt ook een *sleek* en consante UI look. <https://www.npmjs.com/package/@mui/material> <https://www.npmjs.com/package/@mui/icons-material> <https://www.npmjs.com/package/@fontsource/roboto>
- `zxcvbn`: Een wachtwoord sterkte schatter. Schat de sterkte door te checken hoesnel een wachtwoord gehackt kan worden. Gebruikt ook patroon herkenning om veel voorkomende wachtwoorden (azerty,123456789 etc...) te identificeren. <https://www.npmjs.com/package/@fontsource/roboto>
- `pitchy`: De tuner gebruikt de package *pitchy* om audio te analyseren en frequentie te detecteren. <https://www.npmjs.com/package/pitchy>
- `spotify-web-api-node`: Maakt gebruik van spotfiy-web-api om track/albums/playlists... van spotify te krijgen. De home page maakt hier gebruik van om dagelijks een *Song of the day* te verkrijgen en op te slaan in de localstorage. <https://www.npmjs.com/package/spotify-web-api-node>

## Gekende bugs

### Front-end Web Development

Geen gekende bugs zo ver ik weet.

## Reflectie

Ik vond het een heel leuk project. Het is een toffe ervaring om eens je eigen idee tot realisatie te brengen. In het begin is het wel wat moeilijk om aan de slag te gaan. Je moet eerst een passen idee vinden dat voor dit project werkt, maar uiteindelijk ging de rest van het project wel vlot.

In het algemeen vond ik de cursus wel goed in elkaar gestoken. Ik zelf heb niet echt direct commentaar over de cursus dus zou ook niet direct iets aanpassen of toevoegen. Misschien wat meer specifiekere uitleg bij sommige delen voor als je niet in de les aanwezig was, maar daar kan dan natuurlijk misbruik van gemaakt worden.
