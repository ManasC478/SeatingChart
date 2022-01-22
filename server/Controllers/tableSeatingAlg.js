// you can change the name of this function "assignSeats"
// if you do:
// make sure to change router.get('/algorithm', assignSeats) in routes/algorithm.js to router.get('/algorithm', newName)
// and the name in the import in router/algorithm.js
const preferenceCount = 2;
let seatingChartScore,
  tables = [];
module.exports.assignSeats = (req, res) => {
  console.log("-------Setting Up Students and Tables...---------------");
  let studentMap = req.query.studentList;
  let tableArray = req.query.tableList;
  try {
    let parsedStudents = JSON.parse(studentMap),
      students = [];
    Object.values(parsedStudents).forEach((studentObj) =>
      students.push(studentObj)
    );
    students.forEach((student) => {
      student.frontPreference = student.front;
      student.sitNextTo = ["", ""];
      if (student.preferredPartners != [])
        student.sitNextTo = student.preferredPartners.map(
          (other) => other.first_name + " " + other.last_name
        );
      student.doNotSitNextTo = ["", ""];
      if (student.notPreferredPartners.length != [])
        student.doNotSitNextTo = student.notPreferredPartners.map(
          (other) => other.first_name + " " + other.last_name
        );
      student.name = student.first_name + " " + student.last_name;
      student.happy = "";
      student.sad = "";
      delete student.preferredPartners,
        student.notPreferredPartners,
        student.front;
    });
    students.forEach((student) => {
      delete student.first_name, student.last_name;
    });
    Object.values(tableArray).forEach((table) =>
      tables.push(JSON.parse(table))
    );
    console.log("-------SETUP FINISHED---------------");
    console.log("-------Optimizing Seating...---------------");
    const newStudentsAndScore = findOptimalSeatingChart(students);
    const bestSeatingChartScore = newStudentsAndScore[0];
    const bestSeatingChart = newStudentsAndScore[1];
    // printStudents(bestSeatingChart, students);
    console.log("-------OPTIMIZATION FINISHED---------------");
    console.log(bestSeatingChart);
    res
      .status(200)
      .json({ studentList: bestSeatingChart, bestSeatingChartScore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};
function countSeatingChartScore(students) {
  seatingChartScore = 0;
  let studentsInTables = [];
  let studentIndex = 0;
  tables.forEach((table) => {
    let studentsInTable = Array.from(
      { length: table.rows * table.columns },
      (_, i) => i + studentIndex
    );
    studentsInTable.forEach((index) => {
      let student = students[index];
      let closeNames = studentsInTable.map((i) => students[i].name);
      student.happy = "";
      student.sad = "";
      for (let k = 0; k < closeNames.length; k++) {
        let closeName = closeNames[k];
        if (student.sitNextTo.includes(closeName)) {
          seatingChartScore += 100;
          student.happy = student.happy + closeName.split(" ")[0] + ", ";
        } else if (student.doNotSitNextTo.includes(closeName)) {
          seatingChartScore -= 200;
          student.sad = student.sad + closeName.split(" ")[0] + ", ";
        }
      }
      if (table.vPosition == "front") {
        if (student.frontPreference == true) seatingChartScore += 30;
        else if (student.frontPreference == false) seatingChartScore -= 50;
      } else if (table.vPosition == "back") {
        if (student.backPreference == true) seatingChartScore += 30;
        else if (student.backPreference == false) seatingChartScore -= 50;
      }
    });
    table.tableStudents = studentsInTable;
    studentIndex += table.rows * table.columns;
    studentsInTables.push(table);
  });
  return studentsInTables;
}
function findOptimalSeatingChart(students) {
  const { performance } = require("perf_hooks");
  var t0 = performance.now();
  let iterations = 99999;
  let bestSeatingChart, bestSeatingChartScore = -10000;
  for (let i = 0; i < iterations; i++) {
    let currentSeatingChart = countSeatingChartScore(
      shuffle1DStudents(students)
    );
    if (seatingChartScore > bestSeatingChartScore) {
      bestSeatingChart = currentSeatingChart.map((x) => x);
      bestSeatingChartScore = seatingChartScore;
    }
  }
  bestSeatingChart.forEach((table) => {
    table.tableStudents.forEach((index) => {
      let student = students[index];
      let happy_ = student.happy;
      let sad_ = student.sad;
      if (happy_.endsWith(", "))
        student.happy = happy_.substring(0, happy_.length - 2);
      if (sad_.endsWith(", ")) student.sad = sad_.substring(0, sad_.length - 2);
      //or more succinctly: student.happy = happy_.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    });
  });
  var t1 = performance.now();
  console.log("\nCall to doSomething took " + (t1 - t0) + " milliseconds. \n");
  return [bestSeatingChartScore, bestSeatingChart];
}
function shuffle1DStudents(students) {
  let toShuffle = [];
  students.forEach((student) => toShuffle.push(Object.assign({}, student)));
  var currentIndex = toShuffle.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [toShuffle[currentIndex], toShuffle[randomIndex]] = [
      toShuffle[randomIndex],
      toShuffle[currentIndex],
    ];
  }
  return toShuffle;
}
function printStudents(bestSeatingChart, students) {
  let names = "",
    happy = "",
    frontPref = "",
    backPref = "",
    sitNextTo = "",
    doNotSitNextTo = "";
  bestSeatingChart.forEach((table) => {
    let studentsInTable = table[1];
    studentsInTable.forEach((i) => {
      let student = students[i];
      names += student.name + ", ";
      happy += (student.happy.length > 0) + ", ";
      frontPref += student.frontPreference + ", ";
      backPref += student.backPreference + ", ";
      sitNextTo += student.sitNextTo.toString() + ", ";
      doNotSitNextTo += student.doNotSitNextTo.toString() + ", ";
    });
  });
  console.log("PRINTING FINAL STUDENTS: ");
  console.log(names);
  console.log("----------------------------------");
  // console.log("Happy: " + happy);
  // console.log("Front pref: " + frontPref);
  // console.log("Back pref: " + backPref);
  // console.log("Sit Next To: " + sitNextTo);
  // console.log("Do Not Sit Next To: " + doNotSitNextTo);
}
