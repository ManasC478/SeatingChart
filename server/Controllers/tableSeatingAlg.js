const { table } = require("console");

let seatingChartScore;
module.exports.assignTableSeats = (req, res) => {
  console.log("-------Setting up Students and Tables---------------");
  let studentList = req.query.studentMap;
  let tableArray = req.query.tableMap;
  try {
    let parsedStudents = JSON.parse(studentList), students = [];
    Object.values(parsedStudents).forEach((studentObj) =>
      students.push(studentObj)
    );
    let IDs = Object.keys(parsedStudents);
    students.forEach((student) => {
      student.frontPreference = student.vPosition;
      student.sidePreference = student.hPosition;

      student.sitNextTo = [];
      student.preferredPartners.forEach((otherID) => {
        let otherIndex = IDI(IDs, otherID);
        if(students[otherIndex] != undefined) {
          student.sitNextTo.push(students[otherIndex].first_name + " " + students[otherIndex].last_name)
        }
      });

      student.doNotSitNextTo = [];
      student.notPreferredPartners.forEach((otherID) => {
        let otherIndex = IDI(IDs, otherID);
        if(students[otherIndex] != undefined) {
          student.doNotSitNextTo.push(students[otherIndex].first_name + " " + students[otherIndex].last_name)
        }
      }); 

      student.name = student.first_name + " " + student.last_name;
      student.happyWith = "";
      student.sadWith = "";
    });
    const newStudents = students.map((student) => {
      const { first_name, last_name, vPosition, hPosition, preferredPartners, notPreferredPartners, ...leftOver } = student;
      return leftOver
    })
    students = newStudents;
    let parsedTables = JSON.parse(tableArray), tables = [];
    for (const [key, value] of Object.entries(parsedTables)) tables.push({id: key, ...value});
    tables.forEach((table) => table.students = []);
    console.log("-------SETUP FINISHED---------------");
    console.log("-------Optimizing Seating...---------------");
    const newStudentsAndScore = findOptimalSeatingChart(students, tables, IDs);
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
function countSeatingChartScore(students, tables, IDs) {
  seatingChartScore = 0;
  let shuffledIds = shuffle1D([...IDs]);
  let tablesCopy = [];
  let tablesCopy2 = JSON.parse(JSON.stringify(tables));
  shuffledIds.forEach((ID) => { 
    let openTable = null;
    let randomTableIndex;
    while(openTable == null){
      randomTableIndex = Math.floor(Math.random() * tablesCopy2.length);
      let table = tablesCopy2[randomTableIndex];
      if(table.students.length < table.rows * table.columns){
        openTable = table;
      }
    }
    openTable.students.push(ID);
    if(openTable.students.length == openTable.rows * openTable.columns){
      tablesCopy.push(JSON.parse(JSON.stringify(openTable)))
      tablesCopy2.splice(randomTableIndex, 1);
    }
  });
  tablesCopy2.forEach((table) => {
    tablesCopy.push(JSON.parse(JSON.stringify(table)))
  });
  tablesCopy.forEach((table) => {
    let seatingCapacity = table.rows * table.columns;
    let studentsInTable = table.students.length;
    for(let i = 0; i < seatingCapacity - studentsInTable; i++) table.students.push(null);
    table.students.forEach((ID) => {
      if(ID != null){
        let student = students[IDI(IDs, ID)];
        let tableGroup = table.students.map((id) => id == null ? "" : students[IDI(IDs, id)].name);
        for (let k = 0; k < tableGroup.length; k++) {
          let nextTo = tableGroup[k];
          if (student.sitNextTo.includes(nextTo)) {
            seatingChartScore += 100;
          } else if (student.doNotSitNextTo.includes(nextTo)) {
            seatingChartScore -= 200;
          }
        }
        seatingChartScore += (table.vPosition == student.frontPreference ? 30 : -50);
        seatingChartScore += (table.hPosition == student.sidePreference ? 10 : -15);
      }
    });
  });
  return tablesCopy;
}
function findOptimalSeatingChart(students, tables, IDs) {
  const { performance } = require("perf_hooks");
  let start = performance.now();
  let iterations = 100000;
  let bestSeatingChart, bestSeatingChartScore = -1000000;
  for (let i = 0; i < iterations; i++) {
    let seatingChart = countSeatingChartScore(students, shuffle1DObjects(tables), IDs);
    if (seatingChartScore > bestSeatingChartScore) {
      bestSeatingChart = seatingChart.map((x) => x);
      bestSeatingChartScore = seatingChartScore;
    }
  }
  bestSeatingChart.forEach((table) => {
    table.students.forEach((ID) => {
      if(ID != null){
        let index = IDI(IDs, ID);
        let closeNames = table.students.map((id) => id == null ? "" : students[IDI(IDs, id)].name);
        closeNames.forEach(closeName => {
          let more = closeName.split(" ")[0] + ", ";
          if (students[index].sitNextTo.includes(closeName)) {
            students[index].happyWith += more;
          } else if (students[index].doNotSitNextTo.includes(closeName)) {
            students[index].sadWith += more;
          }
        });

        let happyWith_ = students[index].happyWith;
        let sadWith_ = students[index].sadWith;
        if (happyWith_.endsWith(", ")) students[index].happyWith = happyWith_.substring(0, happyWith_.length - 2);
        if (sadWith_.endsWith(", ")) students[index].sadWith = sadWith_.substring(0, sadWith_.length - 2);
        //or more succinctly: student.happyWith = happyWith_.replace(/(^[,\s]+)|([,\s]+$)/g, '');
      }
    }); 
  });
  let end = performance.now();
  console.log("Optimizing seating took " + (end - start)/1000 + " seconds.");
  return [bestSeatingChartScore, bestSeatingChart, students];
}
function shuffle1DObjects(array) {
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
function shuffle1D(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
function IDI(IDs, ID) {
  return studentIDtoIndex(IDs, ID);
}
function studentIDtoIndex(studentIDs, ID){
  for(let i = 0; i < studentIDs.length; i++){
    if(studentIDs[i] == ID) return i;
  }
  return -1;
}