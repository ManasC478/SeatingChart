// you can change the name of this function "assignSeats"
// if you do:
// make sure to change router.get('/algorithm', assignSeats) in routes/algorithm.js to router.get('/algorithm', newName)
// and the name in the import in router/algorithm.js
const gridHeight = 3;
const gridWidth = 4;
const studentCount = gridWidth * gridHeight;
const preferenceCount = 2;
let seatingChartScore = 0;
module.exports.assignSeats = (req, res) => {
  try {
    let students = [];
    // put your code in the try
    // you can have regular js function outside of the module.exports as helper functions
    // if an error occurs the code will automatically go to the catch
    for (let i = 0; i < studentCount; i++) {
      let frontPref = Math.random();
      let backPref;
      let noPref = false;
      if(frontPref < 0.5){
        frontPref = true;
        backPref = false;
      }else if(frontPref < 0.9){
        noPref = true;
        frontPref = "idc";
        backPref = "idc";
      }else{
        frontPref = false;
        backPref = true;
      }
      let student = {
          name: "Bob" + i,
          frontPreference: frontPref,
          backPreference: backPref,
          noPreference: noPref,
          sitNextTo: new Array(preferenceCount),
          doNotSitNextTo: new Array(preferenceCount),
          happy: "",
          sad: "",
      };
      students.push(student)
      // students.push(new Student("Bob" + i, sidePreference, !sidePreference, new Array(preferenceCount), new Array(preferenceCount)));
    }
    for (let i = 0; i < studentCount; i++) {
      let student = students[i];
      let indexes = studentPreferenceIndexes(preferenceCount, i, students);
      for (let j = 0; j < preferenceCount; j++) {
        student.sitNextTo[j] = students[indexes[j]].name;
        student.doNotSitNextTo[j] = students[indexes[j + preferenceCount]].name;
      }
    }
    // students = Object.values(hashMapStudents);
    shuffleStudents(students);
    countSeatingChartScore(students);
    const newStudentsAndScore = findOptimalSeatingChart(students);
    const bestSeatingChartScore = newStudentsAndScore[0];
    students = newStudentsAndScore[1];
    res.status(200).json({ studentList: students, bestSeatingChartScore});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Error' });
  }
}
function studentPreferenceIndexes(preferenceCount_, selfIndex, students) {
  let indexes = [];
  let indexesLengh = 2 * preferenceCount_;
  let duplicates = false;
  do {
    duplicates = false;
    indexes = [];
    for (let j = 0; j < indexesLengh; j++) {
      indexes.push(Math.trunc(Math.random() * students.length));
    }
    for (let j = 0; j < indexes.length; j++) {
      for (let k = 0; k < indexes.length; k++) {
        if (j != k && indexes[j] == indexes[k]) {
          duplicates = true;
          break;
        }
      }
      if (indexes[j] == selfIndex) duplicates = true;
    }
  } while (duplicates);
  return indexes;
}
function countSeatingChartScore(students) {
  seatingChartScore = 0;
  for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let left = i - 1;
    let right = i + 1;
    let inFront = i - gridWidth;
    let behind = i + gridWidth;
    let closeIndexes = [left, right, inFront, behind, inFront - 1, inFront + 1, behind - 1, behind + 1];
    let closeNames = [];
    for (let j = 0; j < closeIndexes.length; j++) {
      let pos = closeIndexes[j];
      if (pos < 0 || pos >= students.length) continue;
      if (pos == i + 1 && i + 1 % gridWidth == 0) continue;
      if (pos == i - 1 && i % gridWidth == 0) continue;
      closeNames.push(students[pos].name);
    }
    // let closeNamesTemp = [];
    // for (let j = 0; j < nameCount; j++)
    //   if (closeNames[j] != null)
    //     closeNamesTemp.push(closeNames[j]);
    // closeNames = closeNamesTemp;
    s.happy = "";
    s.sad = "";
    for (let j = 0; j < closeNames.length; j++) {
      let closeName = closeNames[j];
      if (s.sitNextTo.includes(closeName)) {
        seatingChartScore += 100;
        s.happy += closeName + ", ";  
      } else if (s.doNotSitNextTo.includes(closeName)) {
        seatingChartScore -= 200;
        s.sad += closeName + ", ";
      }
    }
    if(i < gridWidth){
      if(s.frontPreference == true){
        seatingChartScore += 30
      }else if(s.frontPreference == false){
        seatingChartScore -= 50
      }
    }
    if(students.length - i <= gridWidth){
      if(s.backPreference == true){
        seatingChartScore += 30
      }else if(s.backPreference == false){
        seatingChartScore -= 50
      }
    }
  }
}
function findOptimalSeatingChart(students) {
  // var t0 = performance.now()
  let iterations = 1E5;
  let bestSeatingChart = students;
  let bestSeatingChartScore = 0;
  for (let i = 0; i < iterations; i++) {
    shuffleStudents(students);
    countSeatingChartScore(students);
    let currentSeatingChart = [];
    for (let j = 0; j < students.length; j++) currentSeatingChart.push(Object.assign({}, students[j]))
    if (seatingChartScore > bestSeatingChartScore) {
      bestSeatingChart = currentSeatingChart;
      bestSeatingChartScore = seatingChartScore;
      console.log(bestSeatingChart[0].name + " " + bestSeatingChartScore)
    }
  }
  printStudents(bestSeatingChart)
  return [bestSeatingChartScore, bestSeatingChart];
  // var t1 = performance.now()
  // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
}
function printStudents(students_) {
  let names = "", happy = "", frontPref = "", backPref = "", sitNextTo = "", doNotSitNextTo = "";
  for (let i = 0; i < students_.length; i++) {
    let student = students_[i];
    if ((i + 1) % gridWidth == 0) {
      names += student.name + " \n";
    } else {
      names += student.name + ", ";
    }
    happy += (student.happy.length > 0) + ", ";
    frontPref += student.frontPreference + ", ";
    backPref += student.backPreference + ", ";
    sitNextTo += student.sitNextTo.toString() + ", ";
    doNotSitNextTo += student.doNotSitNextTo.toString() + ", ";
  }
  console.log("----------------------------------");
  console.log(names);
  // console.log("Happy: " + happy);
  // console.log("Front pref: " + frontPref);
  // console.log("Back pref: " + backPref);
  // console.log("Sit Next To: " + sitNextTo);
  // console.log("Do Not Sit Next To: " + doNotSitNextTo);
}
function shuffleStudents(students) {
  var currentIndex = students.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [students[currentIndex], students[randomIndex]] = [
      students[randomIndex], students[currentIndex]];
  }
}