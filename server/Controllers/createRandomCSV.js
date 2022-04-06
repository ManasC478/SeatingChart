const fs = require('fs');

const firstNamesList = fs.readFileSync('firstnames.txt').toString().split("\n");
const lastNamesList = fs.readFileSync('lastnames.txt').toString().split("\n");

let firstNames = firstNamesList.length;
let lastNames = lastNamesList.length;
const studentCount = 30;
for(let i = 0; i < studentCount; i++){
    let ID = i+1;
    let firstName = firstNamesList[Math.floor(Math.random()*firstNames)].trim();
    let lastName = lastNamesList[Math.floor(Math.random()*lastNames)].trim();
    let frontPrefRandom = Math.floor(Math.random()*3);
    let frontPref;
    if(frontPrefRandom == 0) frontPref = "front";
    else if(frontPrefRandom == 1) frontPref = "back";
    else frontPref = "middle";

    let sidePrefRandom = Math.floor(Math.random()*3);
    let sidePref;
    if(sidePrefRandom == 0) sidePref = "left";
    else if(sidePrefRandom == 1) sidePref = "right";
    else sidePref = "middle";

    let availablePreferences = Array.from({length: studentCount}, (_, i) => i + 1)
    let sitNextTo = "[";
    let sitNextToCount = Math.floor(Math.random()*3) + 1;
    for(let j = 0; j < sitNextToCount; j++){
        sitNextTo += availablePreferences[Math.floor(Math.random()*availablePreferences.length)];
        if(j < sitNextToCount - 1) sitNextTo += " ";
    }
    sitNextTo += "]";

    let doNotSitNextTo = "[";
    let doNotSitNextToCount = Math.floor(Math.random()*3) + 1;
    for(let j = 0; j < doNotSitNextToCount; j++){
        doNotSitNextTo += availablePreferences[Math.floor(Math.random()*availablePreferences.length)];
        if(j < doNotSitNextToCount - 1) doNotSitNextTo += " ";
    }
    doNotSitNextTo += "]";

    let line = `${ID}, ${firstName}, ${lastName}, ${frontPref}, ${sidePref}, ${sitNextTo}, ${doNotSitNextTo}`;
    console.log(line);
}