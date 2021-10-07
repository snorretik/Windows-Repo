// Ik heb dus in feite maar heel weinig nodig. Een array voor jaren, arrays voor maanden daarin, een array voor de dagen. En dan eigenlijk ook nog op tijden. Maar misschien hoeft dat niet opgeslagen te worden. In een extra array in ieder geval niet.

let month = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

// Ik kan hier ook allemaal lege arrays van maken, en dan de benummering behouden +1.
// Tot aan 30 uiteraard (of "31", in dat geval).
// Of ze toevoegen inderdaad al in het begin. Nee. Hij moet ze onthouden, eigenlijk.
// Dat is wel een vereiste.

let year = ["Januari", "Februari", "March", "April", "May", "June", "Juli", "August", "September", "October", "November", "December"];

// Dit kan fungeren als maand-naam ten opzichte van getal. Want getMonth() werkt met getallen van 0 t/m 11.

let recentYearNumbers = ["2020", "2021", "2022", "2023", "2024", "2025"];

// let year1 = {
//     yearNumber: 2020,
    
// };

// Oke ik zit nou te denken, misschien moet ik er objecten van maken? Want, ik moet ze deze types inhoud geven, maar wel onder verschillende namen. Om uit te komen op de array waar ik de blogentries in opsla. Onder de dagen, gesorteerd op tijd als laatste nog.

// Nou ja, is even de vraag.

// Hmmm, ik weet het toch niet zeker. Array in arrays?? Ja, zou nog lang geen problemen moeten geven. Ik begon even te twijfelen, maar ik moet het toch op de een of andere manier allemaal toch registreren. De blog entries per jaar, per maand, per dag. That's it. Meer is het ook niet. Dus het is nog redelijk behapbaar. Zeer redelijk, waarschijnlijk. Met gemak misschien wel.

(function () {
    
})();

// Ik kan één functie die uitgaat van een begin zonder al gemaakte blogentries.
// Ik kan ook uitgaan van een systeem waarin ik er al 1 ga toevoegen, sowieso.
// Ik kan het echter ook beide doen in geval dat.

function mainFunctionality() {
}

// Oh ja, en ik kan al de labels gaan vervangen met deze months en years array namen.

// Laatste idee wat ik nou heb is om deze arrays al met factory functions te gaan doen. In plaats daarvan dus.