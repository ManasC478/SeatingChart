// you can change the name of this function "assignSeats"
// if you do:
// make sure to change router.get('/algorithm', assignSeats) in routes/algorithm.js to router.get('/algorithm', newName)
// and the name in the import in router/algorithm.js
const gridWidth = 4;
const preferenceCount = 2;
let studentCount, gridHeight;
let seatingChartScore = 0;
module.exports.assignSeats = (req, res) => {
  let studentMap = req.query.studentList;
  try {
    let students = [];
    Object.values(studentMap).forEach((studentObj) => {
      students.push(JSON.parse(studentObj));
    });
    students.forEach((student) => {
      student.frontPreference = student.front;
      student.sitNextTo = student.preferredPartners;
      student.doNotSitNextTo = student.notPreferredPartners;
      student.name = student.first_name + " " + student.last_name;
      student.happy = "";
      student.sad = "";
      delete student.preferredPartners;
      delete student.notPreferredPartners;
      delete student.front;
    });
    studentCount = students.length;
    gridHeight = Math.ceil(studentCount / gridWidth);
    let students1D = [];
    students.forEach((student) => {
      students1D.push(Object.assign({}, student));
    });
    const tempStudents = [];
    while (students.length) tempStudents.push(students.splice(0, gridWidth));
    students = tempStudents;

    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < students[i].length; j++) {
        let student = students[i][j];
        // let indexes = studentPreferenceIndexes(preferenceCount, i, students);
        for (let k = 0; k < preferenceCount; k++) {
          if (student.sitNextTo[k] != null)
            student.sitNextTo[k] = students1D[student.sitNextTo[k] - 1].name;
          else student.sitNextTo[k] = "";

          if (student.doNotSitNextTo[k] != null)
            student.doNotSitNextTo[k] =
              students1D[student.doNotSitNextTo[k] - 1].name;
          else student.doNotSitNextTo[k] = "";
        }
      }
    }
    console.log("-------SET-UP FINISHED---------------");

    const newStudentsAndScore = findOptimalSeatingChart(students);
    const bestSeatingChartScore = newStudentsAndScore[0];
    students = newStudentsAndScore[1];
    printStudents(students);
    console.log("-------OPTIMIZATION FINISHED---------------");
    students = [].concat.apply([], students);
    res.status(200).json({ studentList: students, bestSeatingChartScore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};
// function makeDummyStudents() {
//   let dummyStudents = [];
//   for (let i = 0; i < studentCount; i++) {
//     let frontPref = Math.random();
//     let backPref;
//     let noPref = false;
//     if (frontPref < 0.5) {
//       frontPref = true;
//       backPref = false;
//     } else if (frontPref < 0.9) {
//       noPref = true;
//       frontPref = "idc";
//       backPref = "idc";
//     } else {
//       frontPref = false;
//       backPref = true;
//     }
//     let student = {
//       name: "Bob" + i,
//       frontPreference: frontPref,
//       backPreference: backPref,
//       noPreference: noPref,
//       sitNextTo: new Array(preferenceCount),
//       doNotSitNextTo: new Array(preferenceCount),
//       happy: "",
//       sad: "",
//     };
//     dummyStudents.push(student)
//     // dummyStudents.push(new Student("Bob" + i, sidePreference, !sidePreference, new Array(preferenceCount), new Array(preferenceCount)));
//   }
//   return dummyStudents;
// }
// function studentPreferenceIndexes(preferenceCount_, selfIndex, students) {
//   let indexes = [];
//   let indexesLengh = 2 * preferenceCount_;
//   let duplicates = false;
//   do {
//     duplicates = false;
//     indexes = [];
//     for (let j = 0; j < indexesLengh; j++) {
//       indexes.push(Math.trunc(Math.random() * students.length));
//     }
//     for (let j = 0; j < indexes.length; j++) {
//       for (let k = 0; k < indexes.length; k++) {
//         if (j != k && indexes[j] == indexes[k]) {
//           duplicates = true;
//           break;
//         }
//       }
//       if (indexes[j] == selfIndex) duplicates = true;
//     }
//   } while (duplicates);
//   return indexes;
// }
function countSeatingChartScore(students) {
  seatingChartScore = 0;

  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < students[i].length; j++) {
      // let left = i - 1;
      // let right = i + 1;
      // let inFront = i - gridWidth;
      // let behind = i + gridWidth;
      // let closeIndexes = [left, right, inFront, behind, inFront - 1, inFront + 1, behind - 1, behind + 1];
      // let closeNames = [];
      // for (let j = 0; j < closeIndexes.length; j++) {
      //   let pos = closeIndexes[j];
      //   if (pos < 0 || pos >= students.length) continue;
      //   if (pos == right && right % gridWidth == 0) continue;
      //   if (pos == left && i % gridWidth == 0) continue;
      //   closeNames.push(students[pos].name);
      // }
      let closeNames = [];
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (isInBounds(k, l, students) && !(k == i && l == j)) {
            closeNames.push(students[k][l].name);
          }
        }
      }
      students[i][j].happy = "";
      students[i][j].sad = "";
      for (let k = 0; k < closeNames.length; k++) {
        let closeName = closeNames[k];
        if (students[i][j].sitNextTo.includes(closeName)) {
          seatingChartScore += 100;
          students[i][j].happy =
            students[i][j].happy + closeName.split(" ")[0] + ", ";
        } else if (students[i][j].doNotSitNextTo.includes(closeName)) {
          seatingChartScore -= 200;
          students[i][j].sad =
            students[i][j].sad + closeName.split(" ")[0] + ", ";
        }
      }
      if (i == 0) {
        if (students[i][j].frontPreference == true) {
          seatingChartScore += 30;
        } else if (students[i][j].frontPreference == false) {
          seatingChartScore -= 50;
        }
      }
      if (i == students.length - 1) {
        if (students[i][j].backPreference == true) {
          seatingChartScore += 30;
        } else if (students[i][j].backPreference == false) {
          seatingChartScore -= 50;
        }
      }
    }
  }
  return students;
}
function isInBounds(row, col, students) {
  return (
    row >= 0 && row < students.length && col >= 0 && col < students[row].length
  );
}
function findOptimalSeatingChart(students) {
  const { performance } = require("perf_hooks");
  var t0 = performance.now();
  let iterations = 333333;
  let bestSeatingChart = students;
  let bestSeatingChartScore = 0;
  for (let i = 0; i < iterations; i++) {
    students = shuffle2DStudents(students);
    students = countSeatingChartScore(students);
    // console.log(students);
    let currentSeatingChart = students;
    for (let j = 0; j < students.length; j++) {
      for (let k = 0; k < students[j].length; k++) {
        currentSeatingChart[j][k] = Object.assign(
          currentSeatingChart[j][k],
          students[j][k]
        );
      }
    }
    // console.log(currentSeatingChart);
    if (seatingChartScore > bestSeatingChartScore) {
      for (let j = 0; j < students.length; j++) {
        for (let k = 0; k < students[j].length; k++) {
          bestSeatingChart[j][k] = Object.assign(
            bestSeatingChart[j][k],
            currentSeatingChart[j][k]
          );
        }
      }
      // console.log(bestSeatingChart);
      bestSeatingChartScore = seatingChartScore;
      console.log(bestSeatingChart[0][0].name + " " + bestSeatingChartScore);
    }
  }
  for (let i = 0; i < bestSeatingChart.length; i++) {
    for (let j = 0; j < bestSeatingChart[i].length; j++) {
      let happy_ = bestSeatingChart[i][j].happy;
      let sad_ = bestSeatingChart[i][j].sad;
      if (happy_.endsWith(", "))
        bestSeatingChart[i][j].happy = happy_.substring(0, happy_.length - 2);
      if (sad_.endsWith(", "))
        bestSeatingChart[i][j].sad = sad_.substring(0, sad_.length - 2);
    }
  }
  var t1 = performance.now();
  console.log("\nCall to doSomething took " + (t1 - t0) + " milliseconds. \n");
  return [bestSeatingChartScore, bestSeatingChart];
}
function printStudents(students) {
  let names = "",
    happy = "",
    frontPref = "",
    backPref = "",
    sitNextTo = "",
    doNotSitNextTo = "";
  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < students[i].length; j++) {
      const student = students[i][j];
      if (j == students[i].length - 1) {
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
  }
  console.log("PRINTING FINAL STUDENTS: ");
  console.log(names);
  console.log("----------------------------------");
  // console.log("Happy: " + happy);
  // console.log("Front pref: " + frontPref);
  // console.log("Back pref: " + backPref);
  // console.log("Sit Next To: " + sitNextTo);
  // console.log("Do Not Sit Next To: " + doNotSitNextTo);
}
function shuffle1DStudents(students) {
  let toShuffle = [];
  students.forEach((student) => {
    toShuffle.push(Object.assign({}, student));
  });

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
function shuffle2DStudents(students) {
  let oneDimStudents = students.reduce((a, b) => [...a, ...b], []);
  let shuffledStudents = shuffle1DStudents(oneDimStudents);
  let shuffled2DimArr = shuffledStudents.reduce(
    (acc, i) => {
      if (acc[acc.length - 1].length >= gridWidth) {
        acc.push([]);
      }
      acc[acc.length - 1].push(i);
      // for(let j = 0; j < acc.length; j++) console.log(acc[j].length);
      // console.log("-------------");
      return acc;
    },
    [[]]
  );
  return shuffled2DimArr;
}