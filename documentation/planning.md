# Övergripande planering

## Projekt deadline

    Projekt: Appeggio
    Datum: 2023-11-10
    Tid: 23:59
    Förarbete: 1 vecka - 2023-09-19 - 2023-09-24
    Sprintar: 5 - 2023-09-25 - 2023-11-10

## Förarbete / UX

### Deadline

    Datum: 2023-09-24

### Mål

    Målet med första steget är ett genomföra ett utförligt förarbete. Syftet med detta är att skapa sig en förståelse för vilka som kan komma att använda applikationen samt skapa sig en bra uppfattning om användarnas behov.

    Arbetet pågår under perioden: 2023-09-19 - 2023-09-24

### Tasks

    1. Identifiera målgrup / användare
    2. Genomför intervju med 5 personer
    3. Skapa personas
    4. Skapa sitemap
    5. Wireframes
    6. Low-fi prototyp
    7. Userstories

### Progression

    Datum: 2023-09-19
    -----------------
    * Startat uppgiften
    * Klonat repository
    * Initierat git flow
    * Upprättat planering för tillvägagångssätt
    * Upprättat dokumentation för övergripande planering för projektet
    * Upprättat struktur för dokumentation av projektets genomförande
    * Skapat struktur för dokumentation av UX-arbete
    * Tagit fram mall med intervjufrågor
    * Genomfört en intervju (4/4)

    Datum: 2023-10-15
    -----------------
    * Gjort klart personas
    * Gjort klart user-stories
    * Gjort klart site-map
    * Gjort klart low-fi prototyper

**Övrigt**

_Under perioden 2023-09-20 - 2023-10-10 har jag på egen hand renoverat hemma. Jag har varit tvungen att prioritera detta eftersom_
_jag behöver sälja min lägenhet och flytta. Detta på grund av att det är för dyrt för mig att bo kvar här som student._
_Jag har därför varit tvungen att prioritera detta. Jag har även jobbat deltid under denna period vilket har gjort att_
_jag hamnat efter i planeringen. Jag ska nu se till att färdigställa projektet inom utsatt tidsram, och då helst utan_
_på bekostnad av kvalité._

## Utveckling - Sprint 1

### Deadline

    Datum: 2023-10-22

### Mål

    Under denna sprint sprinten planerar jag att skapa en mongodatabas samt sätta upp en backend med ett fungerande API.

    Sprinten pågår under perioden: 2023-10-16 - 2023-10-22

### Tasks

    1. Skapa databas
    2. Sätt upp backend
    3. Koppla backend till databasen
    4. Testa backend

### Progression

    Datum: 2023-10-20
    -----------------
    * Satt upp MongoDB
    * Satt upp backend / express
    * Skapat interfaces (users, auth, process.env)
    * Satt upp user-routes
    * Skapat user-controllers (CRUD)
    * Satt upp middleware för router
    * Skapat middleware för auth
    * Städat upp i strukturen

## Utveckling - Sprint 2

### Deadline

    Datum: 2023-10-29

### Mål

    Under denna sprint planerar jag att skapa en enkel frontend samt koppla ihop denna med backend.

    Sprinten pågår under perioden: 2023-10-23 - 2023-10-29

### Tasks

    1. Skapa courses (routes / controllers)
    2. Skapa enkel frontend
    3. Koppla ihop frontend med backend
    4. Utveckla funktionalitet
    5. Testa funktionalitet

### Progression

    Datum: 2023-10-27
    -----------------
    * Skapat routes / controllers / CRUD för courses
    * Skapat adminLock middleware
    * Skapat paywall middleware
    * Skapat searchCourse function
    * Testat funktionalitet i Thunder client
    * Backend klar
    * Kopplat ihop backend och frontend

## Utveckling - Sprint 3

### Deadline

    Datum: 2023-11-05

### Mål

    Under denna sprint planerar jag att jobba med applikationens design och funktionalitet i frontend.

    Sprinten pågår under perioden: 2023-10-30 - 2023-11-05

### Tasks

    1. Implemmentera Bootstrap
    2. Designa applikationen
    3. Ta fram componenter / funktioner för home, login, register, courses, course, about, disclaimer, search-result, user-dashboard, my-courses, course-lessons/lesson, purchase-course, logout, admin-dashboard
    4. Ordna PWA och deployment
    5. Om tid finns, ta även fram komponent för profile och settings
    6. Testa design / responsivitet

    Datum: 2023-11-01
    -----------------
    * Skapat componenter för home, login, register, about, disclaimer, user-dashboard, courses
    * Skapat mainTemplate och infoTemplate
    * Säkerställt responsivitet för skapade komponenter
    * Lagt på vissa designmoment på skapade komponenter
    * Skapat router / routes i frontend
    * Skapat service för fetchCourses

    Datum: 2023-11-05
    -----------------
    * Skapat componenter och services för authContext (context), logout, course, purchaseCourse, myCourses, 404
    * Patchat nav och course med funktion för att dölja / visa innehåll beroende på om man är inloggad eller ej
    * SKapa errorHandler i backend
    * patchat purchaseCourseController i backend
    * Styleat flera componenter

    Återstående tasks:
    * Courses/lessons/lesson component och service
    * Admin-routes + (CRUD)
    * Profile component och service för radera kontro
    * NewsFeed component och service (behöver även sättas up i backend)
    * PWA-setup
    * Depoloyment
    * Dokumentation
    * Inlämning

## Utveckling - Sprint 4

### Deadline

    Datum: 2023-11-10

### Mål

    Under denna sprint planerar jag att implementera "PWA" samt testa applikationen och färdigställa.

    Sprinten pågår under perioden: 2023-11-06 - 2023-11-10

### Tasks

    1. Testa grundläggande funktionalitet
    2. Åtgärda eventuella problem / buggar
    3. Deployment - Se till att applikationen fungerar live (online)
    4. Skriv klart dokumentation
    5. Lämna in uppgiften

    Datum: 2023-11-10
    -----------------
    * Appen färdigställd (utan nice to haves)
    * Tester - utfört
    * Koden städad - OK
    * Deployment - problematisk
