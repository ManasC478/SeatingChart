let tables = [];
module.exports.assignSeats = (req, res) => {
  let studentMap = req.query.studentList;
  let tableArray = req.query.tableList;
  try {
    let parsedStudents = JSON.parse(studentMap), students = [];
    Object.values(parsedStudents).forEach((studentObj) => students.push(studentObj));
    students.forEach((student) => {
      student.frontPreference = student.front;
      student.sitNextTo = ["", ""];
      if(student.preferredPartners != []) student.sitNextTo = student.preferredPartners.map(other => other.first_name + " " + other.last_name);
      student.doNotSitNextTo = ["", ""];
      if(student.notPreferredPartners.length != []) student.doNotSitNextTo = student.notPreferredPartners.map(other => other.first_name + " " + other.last_name);
      student.name = student.first_name + " " + student.last_name;
      student.happy = "";
      student.sad = "";
      delete student.preferredPartners, student.notPreferredPartners, student.front;
    });
    students.forEach((student) => {
      delete student.first_name, student.last_name;
    });
    Object.values(tableArray).forEach((table) => tables.push(JSON.parse(table))); 
    const seatingChartDict = Object.fromEntries(findRandomSeatingChart(students).map(([v, k]) => [v, k]));
    console.log("Final (Randomized) Table Layout: " + bestSeatingChartDict);
    res.status(200).json({ studentList: seatingChartDict, bestSeatingChartScore });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};
function filterStudentsIntoTables(students) {
    seatingChartScore = 0;
    let studentsInTables = [];
    let studentIndex = 0;
    tables.forEach(table => {
      let studentsInTable = Array.from({length: table.rows*table.columns}, (_, i) => i + studentIndex);
      studentsInTable.forEach(index => {
        let student = students[index];
        let closeNames = studentsInTable.map(i => students[i].name);
        student.happy = "";
        student.sad = "";
        for (let k = 0; k < closeNames.length; k++) {
          let closeName = closeNames[k];
          if (student.sitNextTo.includes(closeName)) {
            student.happy = student.happy + closeName.split(" ")[0] + ", ";
          } else if (student.doNotSitNextTo.includes(closeName)) {
            student.sad = student.sad + closeName.split(" ")[0] + ", ";
          }
        }
      });
      let tableAndStudents = [];
      tableAndStudents.push(table.id);
      tableAndStudents.push(studentsInTable);
  
      studentIndex += table.rows*table.columns;
      studentsInTables.push(tableAndStudents);
    });
    return studentsInTables;
}
function findRandomSeatingChart(students) {
  let seatingChart = filterStudentsIntoTables(shuffle1DStudents(students)).map((x) => x);
//   bestSeatingChart.forEach(table => {
//     let studentsInTable = table[1];
//     studentsInTable.forEach(index => {
//       let student = students[index];
//       let happy_ = student.happy;
//       let sad_ = student.sad;
//       if (happy_.endsWith(", ")) student.happy = happy_.substring(0, happy_.length - 2);
//       if (sad_.endsWith(", ")) student.sad = sad_.substring(0, sad_.length - 2);
//       //or more succinctly: student.happy = happy_.replace(/(^[,\s]+)|([,\s]+$)/g, '');
//     })
//   });
  return seatingChart;
}
function shuffle1DStudents(students) {
  let toShuffle = [];
  students.forEach(student => toShuffle.push(Object.assign({}, student)));
  var currentIndex = toShuffle.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [toShuffle[currentIndex], toShuffle[randomIndex]] = [toShuffle[randomIndex], toShuffle[currentIndex]];
  }
  return toShuffle;
}
