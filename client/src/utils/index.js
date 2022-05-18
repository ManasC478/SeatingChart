export const validateRandomization = (totalStudents, totalTables) => {
  if (totalStudents <= 0) {
    throw {
      status: 400,
      message: "Please add students before generating the seating chart.",
    };
  } else if (totalStudents > totalTables) {
    throw {
      status: 400,
      message:
        "Number of students is more than number of tables. Please add more tables.",
    };
  }
};
