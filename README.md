## u09-Avancerad Javascript

# Appeggio
Appeggio är en plattform där musikintresserade kan hitta en musiklärare för att lära sig spela ett instrument.

## Introduktion och idé
Idén går ut på att skapa en plattform för musiker och musikintresserade som vill lära sig spela ett instrument. I dess enklaste form skulle detta kunna innebära en applikation där en användare kan registrera sig, logga in och sen registrera sig på en kurs. När eleven registrerat sig och betalat för kursen kan eleven ta del av kursmaterialet / kursplanen som ligger bakom en betalvägg.

**Skalbarhet**
På sikt skulle detta kunna utvecklas till en tjänst där både elever och lärare kan registrera sig.

Lärare ska kunna registrera sig som lärare, lägga upp kursmaterial bakom en betalvägg samt ta betalt via t.ex. paypal. Tjänsteleverantören tar då ut en viss avgift per elev.

Detta skulle därmed kunna fungera som en mötesplats för musikintresserade och musiker som vill lära ut.

## MIT License
Copyright (c) 2023 Appeggio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

### Grundläggande funktionalitet

**Publikt**
* Som besökare ska man kunna se ett utbud av plattformens tillgängliga kurser
* Man ska kunna registrera sig och logga in som elev
* Man ska kunna registrera sig och logga in som lärare

**Elever**
* Som inloggad elev ska man kunna ta del av information om tillgängliga kurser samt redigera sin elevprofil
* Som betalande elev ska man kunna ta del av kursmaterialet som ligger bakom betalvägg
* _Nice to have_ - Som elev ska man kunna betygsätta lärare
* _Nice to have_ - Som elev ska man kunna kontakta sin lärare genom att skicka ett meddelande

**Lärare**
* Som lärare ska man kunna hantera sitt kursmaterial (CRUD) samt redigera sin lärarprofil
* _Nice to have_ - Som lärare ska man kunna se registrerade elever / betalningar
* _Nice to have_ - Som lärare ska man kunna svara på meddelanden

**Administratör**
* Som administratör ska man kunna hantera användare (CRUD) samt allt innehåll på sidan (CRUD)
* _Nice to have_ - Som administratör ska man kunna kontakta en användare
* _Nice to have_ - Som administratör ska man kunna göra massutskick med information till alla användare

## Planering

### Teknisk information
* Databas: MongoDB
* Backend: Node / Express
* Frontend: React
* Design: Tailwind

**Versionshantering**
* Git - git flow

### Förarbete / UX
Första steget är ett genomföra ett utförligt förarbete. Syftet med detta är att skapa sig en förståelse för vilka som kan komma att använda applikationen samt skapa sig en bra uppfattning om användarnas behov.

1. Identifiera målgrup / användare
2. Genomför intervju (5 frågor) med 5 personer
3. Skapa personas
4. Skapa sitemap
5. Wireframes
6. Low-fi prototyp

## Utveckling steg 1
I detta steg planerar jag att skapa en mongodatabas samt sätta upp en backend med ett fungerande API.

1. Skapa databas
2. Sätt upp backend
3. Koppla backend till databasen
4. Testa backend

## Utveckling steg 2
I detta steg planerar jag att skapa en enkel frontend samt koppla ihop denna med backend.

1. Skapa enkel frontend
2. Koppla ihop frontend med backend
3. Utveckla funktionalitet
4. Testa funktionalitet

## Utveckling steg 3
I detta steg planerar jag att jobba med applikationens design.

1. Implemmentera Tailwind
2. Designa applikationen
3. Testa design / responsivitet

## Utveckling steg 4
I detta steg planerar jag att testa applikationen.

1. Testa grundläggande funktionalitet
2. Åtgärda eventuella problem / buggar
3. Deployment - Se till att applikationen fungerar live
4. Skriv klart dokumentation
5. Lämna in uppgiften

## Utveckling steg 5 - Nice to have
I detta steg planerar jag (om tid finns) att utveckla ytterligare funktionalitet (nice to have).

1. Prioritera och utveckla nice to have- funktion
2. Testa funktionalitet
3. Deployment - Uppdatera live-applikationen

### Länkar

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UfuEq6Ma)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11943082&assignment_repo_type=AssignmentRepo)
