IT2810 Prosjekt 4 - Gruppe 39
======

## Installering

_Forutsetter at du har installert Expo appen på din smarttelefon og din PC/Mac, samt at du er koblet til NTNU sitt nettverk, enten via Wifi eller VPN._

1. For å kjøre prosjektet må man først kjøre følgende kommando i terminal: 

    ```
    git clone git@gitlab.stud.idi.ntnu.no:IT2810-H19/teams/team-39/prosjekt_4.git  
    
    ```
2. Deretter må man navigere seg inn i mappen prosjekt_4.  
   På Linux/Mac gjøres dette med kommandoen `cd prosjekt_4`.
3. Skriv inn `npm install` i terminalen
4. Kjør kommandoen `expo start`
5. Det skal automatisk åpne en ny side i nettleseren din med URL localhost:19000
6. **For Android**: Åpne Expo appen på telefonen din, og scann QR-koden  
   **For iOS**: Scann QR-koden med valgfritt kamera, og trykk på “Åpne i Expo” når denne varslen dukker opp.




## Innhold og funksjonalitet

Prosjekt 4 er å lage en søkeapplikasjon med noenlunde lik funksjonalitet som i prosjekt 3; 
brukerbestemte søk med dynamisk lasting av treff, støtte for sortering og filtrering, 
listebasert visning av resultater med muligheter for detaljert visning av hvert listeelement. 
Vi har valgt å benytte oss av samme backend som i prosjekt 3, 
og har dermed gjenbrukt alt derfra uten å gjøre noen som helst endringer på koden.

Vi har forsøkt å lage appen så lik den tilhørende nettsiden som mulig. 
Vi har oppfylt alle kravene som oppgavebeskrivelsen gir, og har bevisst valgt å ikke implementere 
all funksjonalitet fra nettsiden. I hovedsak er det funksjonaliteten for å gi 
reviews av fag og avansert visning av karakterer vi har utelatt. 

Noe ny funksjonalitet som er i appen, men ikke på nettsiden 
er søkehistorikk som lagres persistent mellom bruk. Søkehistorikken - 
gitt at brukeren har brukt appen før og det eksisterer en historikk, presenteres 
for brukeren idet appen åpnes. Dersom man legger inn et tomt søk eller trykker på “Courses”-logoen 
vil det også vises. Her kan brukeren i tillegg trykke på et tidligere søk for å gjennomføre 
søket på nytt, eller velge slette all søkehistorikk.

## Bruk av teknologi

Beskrivelse av teknologien brukt backend er grundig dokumentert i [readme til forrige prosjekt](https://gitlab.stud.idi.ntnu.no/IT2810-H19/teams/team-39/prosjekt_3), og den er det ikke gjort noen endringer på i dette prosjektet. 
Kort oppsummert er at resultatet av spørringen spesifiseres mer og mer ved at flere spesifikasjoner legges til i slutten av URL-en. 
Denne URL-en er dannet som en kombinasjon av både brukerbestemt input i søkefeltet, samt valg av filter og sorteringsrekkefølge som brukeren kan bestemme med knapper. 

### React Native
Vi har benyttet React Native for å utvikle appen slik oppgavebeskrivelsen sier. 
Videre har vi benyttet Expo-verktøyet for å initiere prosjektet, og til å simulere appen i Android- og iOS-emulatorer. 

På dette prosjektet valgte vi å gå bort fra React Redux for state håndtering, da vi ikke så på det som hensiktsmessig i starten av prosjektet. 
Vi så for oss at vi kom til å ha færre globale states å håndtere denne gangen da vi kunne bruke Hooks på mange av komponentene, 
noe vi trodde man ikke kunne ved forrige prosjekt. Det endte opp med at det ble ganske mange states i komponenten øverst i hierarkiet likevel, 
som blir sendt ned som props i komponentene under den i hierarkiet. Det ble ikke særlig problematisk, 
så vi valgte å beholde det selv om det endte opp med mange states. 
 
En av de største jobbene har vært at vi måtte bytte ut nærmest alle komponentene våre, da disse i utgangspunktet (i forrige prosjekt) var BootStrap-komponenter. 
Nå måtte de tilpasses håndholdte enheter og React Native, og da har både utseendemessige og funksjonelle endringer vært nødvendige. 
Vi har i stor grad brukt komponenter fra React Native, men har også valgt å ta i bruk biblioteket React Native Elements 
for å gjøre jobben enklere for oss selv da komponentene fra dette biblioteket fungerer fint på tvers av plattformer. 
Mye av selve logikken og ikke minst stylingen fra forrige prosjekt er også gjenbrukt i dette prosjektet, 
men det har krevet litt forandringer grunnet annen form for håndtering av state i dette prosjektet. 


### AsyncStorage
Som nevnt er tillegget av funksjonalitet (fra prosjekt 3) at søkehistorikken til brukeren lagres. 
Dette oppfyller kravet om lagring av data mellom hver gang appen kjører (persistent lagring), og gjennomføres ved bruk av AsyncStorage. 
Søkehistorikken lagres og hentes ut fra AsyncStorage som en array, og mellomlagres i staten “searchHistory” hver gang, 
før det mappes til React Native-komponenter som er slik vi ønsker at det skal renderes i appen gjennom `showHistory()`. 

Historikken lagres ved metoden `storeSearch()` der det nyligste søket legges fremst i listen av gjennomførte søk (fra searchHistory-staten),
før det lagres med `AsyncStorage.setItem()`. Søkehistorikken hentes ut ved `retrieveHistory()` som bruker `AsyncStorage.getItem()`, 
og oppdaterer searchHistory-staten dersom det var noe historikk å hente. Funksjonaliteten for å fjerne all 
søkehistorikk gjøres ved `clearHistory()` som bruker `AsyncStorage.clear()`, og som oppdaterer relevante states til å slette historikk.

Søkehistorikken er presentert som en liste av knapper som ser ut som tekst. 
Dette er for å gjøre det ryddigere, da kantene rundt knappene gjorde at det ble utrolig mye støy på skjermen. 
Som sagt gjennomføres et søk på søkeordet én gang til, dersom det trykkes på. 
Vi valgte å implementere dette, da det er svært vanlig tilleggsfunksjonalitet hvis man først skal vise tidligere søkehistorikk. 
Funksjonalitetens synlighet er tilgjengelig ved ikonet (klokke med en pil som går “tilbake”) som står ved siden av knappens tekst.


## Bruk av git, kommentering av kode og kodekvalitet

### Styling
Når det kommer til styling har vi valgt å bruke både React Natives StyleSheet, 
samt inline i komponenter. Grunnen til dette er fordi vi ikke ville at 
koden skulle bli veldig lang med ekstensiv CSS. Derfor er det brukt 
StyleSheet på de komponentene der det blir brukt samme style, og inline styling på de 
komponentene som bare bruker egen styling og dermed ikke behøver gjenbrukt noen steder. 
Dette kan bli litt rotete noen steder, men vi så det som hensiktsmessig for å gjøre 
det enklere for oss selv når vi skulle style komponentene.


### Bruk av Git
Vi har aktivt brukt Git under dette prosjektet også. Vi brukte igjen branchen `dev` som en default branch, og tok utgangspunkt i denne når vi skulle merge. 
Andre brancher ble i starten litt vagt navngitt i forhold til oppgaven den skulle arbeide med, men dette ble mer og mer spesifisert etter hvert. De gangene det har vært hensiktsmessig har vi direkte navngitt dem etter issuenummeret den hører til.

I dette prosjektet har vi også forbedret oss til at vi nå tagger issue-nummeret som committen bidrar til i commit-meldingen. 
Dette gjelder i hovedsak commits der betydelige endringer har blitt gjort, så det er fortsatt en del commits som ikke inkluderer tag da det ikke nødvendigvis er knyttet opp med en spesifikk issue, men heller en liten bugfix eller liten endring som det blir overflødig å opprette en issue på.
Vi har også prøvd å close issues i commit-meldinger, men det har til tider blitt glemt å gjøre ved siste commit for et issue, og da har vi bare markert issuet som “Closed” manuelt i GitLab.


## Testing
For å simulere og teste Android har vi brukt ulike AVD-er (Android Virtual Devices) som er tilgjengelig på Android Studio, 
samt egne enheter ved scan av QR-kode. I Android Studio har vi i hovedsak brukt Pixel 2, og egen enhet er Huawei P20 Pro.

Det samme har vi gjort for iOS, bare med programmet Xcode og simulert på iPhone 11. Egne enheter her har vært iPhone 6 og X. Det ble også gjennomført brukertesting, der vi kjørte applikasjonen på en av gruppemedlemmenes iPhone X.

På både Android og iOS er all funksjonaliteten lik, men vi har lagt merke til at samme fargekode kan gi forskjellige fargenyanser i de to operativsystemene.

Vi har gjennomført manuelle ende-til-ende-tester ved å gjøre søk der vi vet hva resultatsettet skal være, 
og sjekke og kontrollere at riktige resultater kommer, og at korrekte endringer skjer ved oppdatering av søk. 



## Andre kilder
* https://react-native-elements.github.io/react-native-elements/  
* https://facebook.github.io/react-native/  
* https://medium.com/building-with-react-native/what-is-asyncstorage-in-react-native-and-how-you-to-use-it-with-app-state-manager-1x09-b8c636ce5f6e
* https://react-native-elements.github.io/react-native-elements/docs/icon.html

