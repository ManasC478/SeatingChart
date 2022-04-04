module.exports.assignRandomSeats = (req, res) => {
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
    console.log("-------SETUP FINISHED---------------");
    console.log("-------Optimizing Seating...---------------");
    const seatingChart = createRandomSeatingChart(students, shuffle1DObjects(tables), IDs);
    const randomSeating = addHappySad(seatingChart, students, IDs);
    const randomSeatingChart = randomSeating[0];
    students = randomSeating[1];
    let randomSeatingChartDict = {};
    randomSeatingChart.forEach(({id, ...table}) => {
        randomSeatingChartDict[id] = table
    });
    console.log("-------OPTIMIZATION FINISHED---------------");
    console.log(randomSeatingChartDict);
    const score = 0;
    res.status(200).json({ studentList: randomSeatingChartDict, score });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Error" });
  }
};
function createRandomSeatingChart(students, tables, IDs) {
  let studentsInTables = [];
  let studentIndex = 0;
  let shuffledIds = shuffle1D([...IDs]);
  tables.forEach((table) => {
    let seatingCapacity = table.rows * table.columns;
    let studentsLeft = students.length - studentIndex;
    let seatingCount = Math.min(studentsLeft, seatingCapacity);
    let studentsInTable = Array.from(
      { length: seatingCount},
      (_, i) => shuffledIds[i + studentIndex]
    );
    for(let i = 0; i < seatingCapacity - seatingCount; i++) {
        studentsInTable = studentsInTable.concat([null]);
    }
    studentIndex += seatingCount;
    table.students = studentsInTable;
    studentsInTables.push(table);
  });
  return studentsInTables;
}
function addHappySad(seatingChart, students, IDs) {
  let randomSeatingChart = seatingChart.map((x) => x);
  randomSeatingChart.forEach((table) => {
    table.students.forEach((ID) => {
      if(ID != null){
        let index = IDI(IDs, ID);
        console.log(table.students);
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
  return [randomSeatingChart, students];
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
