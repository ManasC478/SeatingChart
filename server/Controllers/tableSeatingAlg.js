// you can change the name of this function "assignSeats"
// if you do:
// make sure to change router.get('/algorithm', assignSeats) in routes/algorithm.js to router.get('/algorithm', newName)
// and the name in the import in router/algorithm.js
const preferenceCount = 2;
let seatingChartScore;
module.exports.assignSeats = (req, res) => {
  console.log("-------Setting up Students and Tables---------------");
  let studentList = req.query.studentMap;
  let tableArray = req.query.tableMap;
  try {
    let parsedStudents = JSON.parse(studentList), students = [];
    Object.values(parsedStudents).forEach((studentObj) =>
      students.push(studentObj)
    );
    students.forEach((student) => {
      student.frontPreference = student.vPosition;
      student.sidePreference = student.hPosition;
      student.sitNextTo = [];
      if (student.preferredPartners != [])
        student.preferredPartners.forEach((otherIndex) => {
          otherIndex--;
          student.sitNextTo.push(students[otherIndex].first_name + " " + students[otherIndex].last_name)
        });
      student.doNotSitNextTo = [];
      if (student.notPreferredPartners.length != [])
        student.notPreferredPartners.forEach((otherIndex) => {
          otherIndex--;
          student.doNotSitNextTo.push(students[otherIndex].first_name + " " + students[otherIndex].last_name)
        });
      student.name = student.first_name + " " + student.last_name;
      student.happy = "";
      student.sad = "";
    });
    const newStudents = students.map((student) => {
      const { first_name, last_name, vPosition, hPosition, preferredPartners, notPreferredPartners, ...leftOver } = student;
      return leftOver
    })
    students = newStudents;
    let parsedTables = JSON.parse(tableArray), tables = [];
    for (const [key, value] of Object.entries(parsedTables)) tables.push({id: key, ...value});
    console.log("-------SETUP FINISHED---------------");
    console.log("-------Optimizing Seating...---------------");
    const newStudentsAndScore = findOptimalSeatingChart(students, tables);
    const bestSeatingChartScore = newStudentsAndScore[0];
    const bestSeatingChart = newStudentsAndScore[1];
    students = newStudentsAndScore[2];
    let bestSeatingChartDict = {};
    bestSeatingChart.forEach(({id, ...table}) => {
      bestSeatingChartDict[id] = table
    });
    console.log("-------OPTIMIZATION FINISHED---------------");
    console.log(bestSeatingChartDict);
    console.log(bestSeatingChartScore);
    res.status(200).json({ studentList: bestSeatingChartDict, bestSeatingChartScore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};
function countSeatingChartScore(students, tables) {
  let tempStudents = students.map(student => Object.assign({}, student));
  seatingChartScore = 0;
  let studentsInTables = [];
  let studentIndex = 0;
  tables.forEach((table) => {
    let area = table.rows * table.columns;
    let studentsLeft = students.length - studentIndex;
    let count = Math.min(studentsLeft, area);
    let studentsInTable = Array.from(
      { length: count},
      (_, i) => i + studentIndex
    );
    studentsInTable.forEach((index) => {
      let closeNames = studentsInTable.map((i) => tempStudents[i].name);
      tempStudents[index].happy = "";
      tempStudents[index].sad = "";
      for (let k = 0; k < closeNames.length; k++) {
        let closeName = closeNames[k];
        if (tempStudents[index].sitNextTo.includes(closeName)) {
          seatingChartScore += 100;
          tempStudents[index].happy += closeName.split(" ")[0] + ", ";
        } else if (tempStudents[index].doNotSitNextTo.includes(closeName)) {
          seatingChartScore -= 200;
          tempStudents[index].sad += closeName.split(" ")[0] + ", ";
        }
      }
      seatingChartScore += (table.vPosition == tempStudents[index].frontPreference ? 30 : -50);
      seatingChartScore += (table.hPosition == tempStudents[index].sidePreference ? 10 : -15);
    });
    table.students = studentsInTable;
    studentIndex += table.rows * table.columns;
    studentsInTables.push(table);
  });
  return [studentsInTables, tempStudents];
}
function findOptimalSeatingChart(students, tables) {
  const { performance } = require("perf_hooks");
  var t0 = performance.now();
  let iterations = 500000;
  let bestSeatingChart, bestSeatingChartScore = -10000;
  for (let i = 0; i < iterations; i++) {
    let currentStudentAndTableChart = countSeatingChartScore(shuffle1D(students), shuffle1D(tables));
    let currentTableChart = currentStudentAndTableChart[0];
    let currentStudentChart = currentStudentAndTableChart[1];
    if (seatingChartScore > bestSeatingChartScore) {
      bestSeatingChart = currentTableChart.map((x) => x);
      bestSeatingChartScore = seatingChartScore;
      students = currentStudentChart.map(student => Object.assign({}, student));
    }
  }
  bestSeatingChart.forEach((table) => {
    table.students.forEach((index) => {
      let happy_ = students[index].happy;
      let sad_ = students[index].sad;
      if (happy_.endsWith(", ")) students[index].happy = happy_.substring(0, happy_.length - 2);
      if (sad_.endsWith(", ")) students[index].sad = sad_.substring(0, sad_.length - 2);
      //or more succinctly: student.happy = happy_.replace(/(^[,\s]+)|([,\s]+$)/g, '');
    });
  });
  var t1 = performance.now();
  console.log("Optimizing seating took " + (t1 - t0)/1000 + " seconds.");
  return [bestSeatingChartScore, bestSeatingChart, students];
}
function shuffle1D(array) {
  let toShuffle = [];
  array.forEach((val) => toShuffle.push(Object.assign({}, val)));
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