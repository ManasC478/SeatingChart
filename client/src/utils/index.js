export const validateRandomization = (studentMap, totalTables) => {
  if (Object.keys(studentMap).length <= 0) {
    throw {
      status: 400,
      message: "Please add students before generating the seating chart.",
    };
  } else if (Object.keys(studentMap).length > totalTables) {
    throw {
      status: 400,
      message:
        "Number of students is more than number of tables. Please add more tables.",
    };
  }
};
