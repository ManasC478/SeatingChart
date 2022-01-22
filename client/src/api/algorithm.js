import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const assignSeats = (studentMap, tableMap) =>
  axios.get(`${BASE_URL}/algorithm`, {
    params: { studentList, tableList },
  });
