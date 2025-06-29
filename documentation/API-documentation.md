# API-dokumentation

## Index

- Installation
- Översikt
- Routes
- Middleware
- Felhantering

## Installation

Följ dessa steg för att installera och starta API:et lokalt:

1. ### Förbered din arbetsmiljö:

   Se till att du har Node.js installerat på din dator. Du kan ladda ner det från Node.js officiella webbplats.
   Kontrollera att du har en kompatibel version av Node.js för detta API. Detta kan specificeras i dokumentationen eller package.json-filen.

2. ### Navigera till Projektets Mapp:

   Öppna terminalen eller kommandotolken på din dator.
   Använd kommandot cd för att navigera till mappen "server" i ditt projekt. Exempel:

   **cd server/**

3. ### Installera Beroenden:

   När du är inne i "server"-mappen, kör kommandot:

   **npm install**

   Detta installerar alla nödvändiga beroenden som definieras i package.json.

4. ### Starta Applikationen Lokalt:

   För att starta API:et i utvecklingsläge, kör:

   **npm run dev**

   Detta kommando kommer att starta servern lokalt på din dator. Du kan sedan komma åt API:et via URL http://localhost:3000.

5. Porten som servern kör på finns i .env-filen i server-mappen. I .env-filen finns även URL tilldatabaser och autensiering uppgifter till dessa.

## Översikt

    Detta API fungerar som en "backend" och hanterar förfrågningar och svar från en "client" samt hämtar och returnerar data från databaser. API bygger på TypeScript och Express / Node.js och korresponderar med en mongo-databas och en Redis-databas för server-cashe, samt JWT-tokens för autensiering.

    I API:ets katalogstruktur kan man hitta server.ts som är den övergripande knytpunkten för övriga metoder, middlewares och routes. API:ets metoder kan hittas i katalogen "controllers" där man kan hitta metoder som sköter inkommande förfrågningar från klienter och returnerar svar och data från databaserna. Dessa är uppdelade i två kategorier, users och courses.

    I katalogen routes finns API:ets "endpoints" som tar emot förfrågningarna från klienten. Om routen som tar emot en förfrågan har en så kallad "middleware", som till exempel "auth" som hanterar autensiering, så kommer förfrågan att hanteras av "auth" innan den släpps vidare till själva metoden som exempelvis loggar in en användare.

    I middleware katalogen finns API:ets olika middlewares så som auth, adminLock, paywall och errorHandler. Dessa kommer att förklaras närmare under avsnittet middleware.

    I katalogerna interfaces finns interface som syftar till att hålla API:et typsäkert och underlätta överföringen av data mellan olika endpoints. I katalogen models finns scheman som definierar hur datan som kommer från (eller sparas i) databasen ska se ut.

    I package.json filen kan man få en överblick av API:ets dependencies och olika funktionella scripts som kan köras, t.ex. npm run dev.

## Routes

API:ets user routes ser ut på följande sätt:

### Publika Användarroutes

Dessa POST-routes används för att hantera användarregistrering och inloggning. Båda routesna är offentligt tillgängliga och kräver inte att användaren är inloggad.

_POST /users/register - Registrera Användare_

Denna route möjliggör skapandet av nya användarkonton.

    * URL: /users/register
    * Metod: POST
    * Authentisering Krävs: Nej

**Förfrågansdata:**

Användare ska skicka registreringsdata i förfrågans body, inklusive användarnamn, e-post och lösenord.

**Svarsdetaljer:**
Lyckat Svar (200 OK): Användare registrerad framgångsrikt.
Fel Svar: Inkluderar 400 Bad Request för ogiltig data, 409 Conflict för redan existerande användare, och 500 Internal Server Error för serverfel.

_POST /users/login - Användarinloggning_

Denna route används för att autentisera befintliga användare och ge dem tillgång till deras konton.

    * URL: /users/login
    * Metod: POST
    * Authentisering Krävs: Nej

**Förfrågansdata:**

Användare ska skicka inloggningsuppgifter i förfrågans body, vanligtvis e-post och lösenord.

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Inloggning lyckades, ofta med returnering av en autentiseringstoken eller liknande.
    Fel Svar: Inkluderar 400 Bad Request för ogiltig data, 401 Unauthorized för ogiltiga inloggningsuppgifter, och 500 Internal Server Error för serverfel.

### Privata Användarroutes

Dessa routes är endast tillgängliga för autentiserade användare. Varje förfrågan måste innehålla giltiga autentiseringsuppgifter, i detta fall ett JWT-token. Dessa verifieras med hjälp av **auth** middleware som hanterar alla inkommande förfrågningar till dessa routes inna de antingen avvisas eller släpps vidare.

_POST /users/logout - Logga ut Användare_

Denna route används för att logga ut en användare från systemet.

    * URL: /users/logout
    * Metod: POST
    * Autentisering Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Användare framgångsrikt utloggad.
    Fel Svar: Kan inkludera 401 Unauthorized för ogiltiga autentiseringsuppgifter och 500 Internal Server Error för serverfel.

_GET /users/:id - Hämta Användarinformation_

Denna route används för att hämta information om en specifik användare.

    * URL: /users/:id (där :id är användarens unika ID)
    * Metod: GET
    * Autentisering Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar användarinformation.
    Fel Svar: Kan inkludera 401 Unauthorized, 404 Not Found för icke-existerande användare, och 500 Internal Server Error.

_PUT /users/update/:id - Uppdatera Användarinformation_

Denna route används för att uppdatera information för en specifik användare.

    * URL: /users/update/:id
    * Metod: PUT
    * Autentisering Krävs: Ja

**Förfrågansdata:**

Inkluderar de uppdaterade användaruppgifterna som ska sparas.

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Användaruppgifterna uppdaterade framgångsrikt.
    Fel Svar: Inkluderar 400 Bad Request, 401 Unauthorized, och 500 Internal Server Error.

_GET /users/:id/courses - Hämta Användarens Kurser_

Denna route används för att hämta en lista över kurser som ägs av en specifik användare.

    * URL: /users/:id/courses
    * Metod: GET
    * Autentisering Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar en lista över kurser.
    Fel Svar: Inkluderar 401 Unauthorized och 500 Internal Server Error.

_DELETE /users/delete/:id - Radera Användarkonto_

Denna route används för att permanent radera en användares konto.

    * URL: /users/delete/:id
    * Metod: DELETE
    * Autentisering Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Användarkonto raderat framgångsrikt.
    Fel Svar: Inkluderar 401 Unauthorized, 404 Not Found för icke-existerande användare, och 500 Internal Server Error.

### Admin-specifika Routes

Dessa routes är endast tillgängliga för användare med administratörsbehörighet (role === "admin"). Varje förfrågan måste innehålla giltiga autentiseringsuppgifter som verifierar användarens adminstatus.

_GET /admin/users - Hämta Alla Användare_

Denna route används av administratörer för att hämta en lista över alla registrerade användare.

    ' URL: /admin/users
    ' Metod: GET
    ' Adminbehörighet Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar en lista över alla användare.
    Fel Svar: Kan inkludera 401 Unauthorized om användaren inte har adminbehörighet, och 500 Internal Server Error för serverfel.

_GET /admin/users/:id - Hämta Specifik Användare_

Denna route används för att hämta detaljerad information om en specifik användare.

    * URL: /admin/users/:id (där :id är användarens unika ID)
    * Metod: GET
    * Adminbehörighet Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar detaljerad information om den specifika användaren.
    Fel Svar: Kan inkludera 401 Unauthorized, 404 Not Found för icke-existerande användare, och 500 Internal Server Error.

_PUT /admin/users/update/:id - Uppdatera Användare_

Denna route används för att uppdatera information för en specifik användare.

    * URL: /admin/users/update/:id
    * Metod: PUT
    * Adminbehörighet Krävs: Ja

**Förfrågansdata:**

Inkluderar de uppdaterade användaruppgifterna som ska sparas.

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Användaruppgifterna uppdaterade framgångsrikt.
    Fel Svar: Inkluderar 400 Bad Request, 401 Unauthorized, och 500 Internal Server Error.

_DELETE /admin/users/delete/:id - Radera Användarkonto_

Denna route används för att permane\*nt radera en användares konto.

    * URL: /admin/users/delete/:id
    * Metod: DELETE
    * Adminbehörighet Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Användarkonto raderat framgångsrikt.
    Fel Svar: Inkluderar 401 Unauthorized, 404 Not Found för icke-existerande användare, och 500 Internal Server Error.

### Courses Routes

Dessa routes ger tillgång till information om kurser och är offentligt tillgängliga för alla användare.

_GET /courses/:id - Hämta Specifik Kurs_

Denna route används för att hämta detaljerad information om en specifik kurs.

    * URL: /courses/:id (där :id är kursens unika ID)
    * Metod: GET
    * Authentisering Krävs: Nej

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar detaljerad information om den specifika kursen.
    Fel Svar: Kan inkludera 404 Not Found för en icke-existerande kurs och 500 Internal Server Error för serverfel.

_GET /courses - Hämta Alla Kurser_

Denna route används för att hämta en lista över alla tillgängliga kurser.

    * URL: /courses
    * Metod: GET
    * Authentisering Krävs: Nej

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar en lista över alla kurser.
    Fel Svar: Kan inkludera 500 Internal Server Error för serverfel.

_POST /courses/search - Sök efter Kurser_

Denna route används för att söka efter kurser baserat på specifika kriterier.

    * URL: /courses/search
    * Metod: POST
    * Authentisering Krävs: Nej

**Förfrågansdata:**

Användare ska skicka sökkriterier i förfrågans body, såsom kursnamn, ämne, eller instruktör.

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar en lista över kurser som matchar sökkriterierna.
    Fel Svar: Kan inkludera 400 Bad Request för ogiltiga sökkriterier och 500 Internal Server Error för serverfel.

### Private coursroute

För att dokumentera PUT /courses/:id/purchase-routen, som är privat och kräver autentisering, är det viktigt att ge en detaljerad beskrivning som inkluderar hur autentisering hanteras, vad routen gör, och hur den används. Här är ett exempel på hur du kan strukturera dokumentationen:
Privat Kursroute

Denna route är avsedd för att hantera köp av kurser och är endast tillgänglig för autentiserade användare.

_PUT /courses/:id/purchase - Köp Kurs_

Denna route används för att genomföra ett köp av en specifik kurs.

    * URL: /courses/:id/purchase (där :id är kursens unika ID)
    * Metod: PUT
    * Autentisering Krävs: Ja

**Förfrågansdetaljer:**

Användare måste vara autentiserade för att göra en förfrågan till denna route. Förfrågan kan inkludera ytterligare information som behövs för att genomföra köpet, beroende på hur ditt system är uppbyggt.
Svarsdetaljer:

    **Lyckat Svar (200 OK):**
        Beskrivning: Köpet av kursen genomfördes framgångsrikt.
        Eventuellt kan ytterligare information om köpet eller kursen inkluderas i svaret.

    **Fel Svar:**
        Felkoder som kan inkluderas:
            400 Bad Request: Om de skickade data inte uppfyller köpkraven.
            401 Unauthorized: Om användaren inte är autentiserad eller inte har rätt behörighet.
            404 Not Found: Om den specificerade kursen inte finns.
            500 Internal Server Error: För oförutsedda serverfel.

**Exempel på användning:**

Du kan inkludera ett exempel på hur man kan göra en köpförfrågan, antingen med ett exempel på en HTTP-förfrågan eller genom att visa hur man anropar denna endpoint med hjälp av ett API-testverktyg eller programmeringskod.

### Paywall-begränsade Kurser Routes

Dessa routes är avsedda för åtkomst till kursinnehåll som är begränsat bakom en betalvägg. De kräver autentisering och verifiering av användarens betalstatus. När användaren tilldelas ett JWT-token så kopplas divers information om användaren till själva token, där ibland en lista av ägda / köpta kurs IDn som hanteras av ett middleware "paywall". Paywall kollar om användarens kurs IDn finns i data basen och fattar därefter ett beslut om att bevilja förfrågan eller avvisa.

_GET /courses/:id/lessons - Hämta Lektioner för en Kurs_

Denna route används för att hämta en lista över alla lektioner i en specifik kurs.

    * URL: /courses/:id/lessons (där :id är kursens unika ID)
    * Metod: GET
    * Autentisering Krävs: Ja
    * Paywall-begränsning: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar en lista över lektioner för den specificerade kursen.
    Fel Svar: Kan inkludera 401 Unauthorized om användaren inte är autentiserad eller inte har betalat, 404 Not Found för en icke-existerande kurs, och 500 Internal Server Error för serverfel.

_GET /courses/:id/lessons/:\_id - Hämta Specifik Lektion_

Denna route används för att hämta en specifik lektion inom en kurs.

    * URL: /courses/:id/lessons/:_id (där :id är kursens ID och :_id är lektionens unika ID)
    * Metod: GET
    * Autentisering Krävs: Ja
    * Paywall-begränsning: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Returnerar detaljerad information om den specifika lektionen.
    Fel Svar: Kan inkludera 401 Unauthorized om användaren inte har rätt behörighet, 404 Not Found för en icke-existerande lektion, och 500 Internal Server Error för serverfel.

### Admin-specifika Kursroutes

Dessa routes är avsedda för administratörer för att skapa, uppdatera, och radera kurser. Varje förfrågan kräver administratörsbehörigheter, säkerställda genom adminLock.

_POST /admin/courses/create - Skapa Ny Kurs_

Denna route används för att skapa en ny kurs.

    * URL: /admin/courses/create
    * Metod: POST
    * Adminbehörighet Krävs: Ja

**Förfrågansdata:**

Administratörer måste skicka nödvändig kursinformation i förfrågans body, som kursnamn, beskrivning, och andra relevanta detaljer.

**Svarsdetaljer:**

    Lyckat Svar (201 Created): Kursen skapades framgångsrikt.
    Fel Svar: Kan inkludera 400 Bad Request för ogiltig eller ofullständig data, 401 Unauthorized om användaren inte har adminbehörighet, och 500 Internal Server Error för serverfel.

_PUT /admin/courses/update/:id - Uppdatera Kurs_

Denna route används för att uppdatera informationen för en specifik kurs.

    * URL: /admin/courses/update/:id (där :id är kursens unika ID)
    * Metod: PUT
    * Adminbehörighet Krävs: Ja

**Förfrågansdata:**

Inkluderar de uppdaterade kursuppgifterna som ska sparas.

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Kursinformation uppdaterad framgångsrikt.
    Fel Svar: Inkluderar 400 Bad Request, 401 Unauthorized, 404 Not Found för icke-existerande kurs, och 500 Internal Server Error.

_DELETE /admin/courses/delete/:id - Radera Kurs_

Denna route används för att permanent radera en kurs.

    * URL: /admin/courses/delete/:id
    * Metod: DELETE
    * Adminbehörighet Krävs: Ja

**Svarsdetaljer:**

    Lyckat Svar (200 OK): Kurs raderad framgångsrikt.
    Fel Svar: Inkluderar 401 Unauthorized, 404 Not Found för icke-existerande kurs, och 500 Internal Server Error.

## Middleware

### adminLock

Detta är ett middleware som verifierar huruvida en användare är administratör och i förlängningen har tillåtelse att utföra vissa specifica handlingar som kräver behörighet, så som till exempel radera en användare, skapa en kurs osv. När en förfrågan kommer in till en route som skyddas utav adminLock tar adminLock emot användarens JWT-token via header "authorization". Därefer kollar adminLock om token är gilltigt.

Om token är gilltigt avkodas detta detta och adminLock kollar då om användarens "role" är exakt samma sak som "admin". Om användaren är adming så släpper adminLock vidare förfrågan och metoden som är slutdestinationen för själva förfrågan.

Om användare inte är admin så får användaren ett svare om att behörighet saknas.

### auth

Detta är ett middleware som verfierar att en användare är inloggad. När en förfrågan tas emot på en route som skyddas av auth så tar auth emot ett token via förfrågans header. Därefter undersöks om token är gilltigt. Om token är gilltigt släpps användare igenom. I de fall då användaren saknar token eller om token blivit återkallat återkopplas detta till användaren som blir ombedd att logga in på nytt.

### paywall

Precis som med de tidigare två middleware så tar paywall emot ett token som valideras och sen avkodas. Token innehåller även en lista med information om vilka kurser en användare betalat för, i form av kurs ID. Denna lista stäms av mot den efterfrågade kursens id i databasen. Om det blir en matchning antas att användaren ägem kursen. I övriga fall så så återkopplas till kunden att denna inte äger kursen.

### errorHandler

Tanken med errorHandler att fånga upp errors och hantera dom på en och samma plats. Detta gör koden mer städad.

## Felhantering

Utöver errorHandler så använder API:et även try / catch block i samtliga funktioner som hanterar error. Dessa svarar även med varifrån felet uppstått som t.ex. "Controller: Error logging in" etc.
