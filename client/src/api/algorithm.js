import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export const randomizeSeats = (studentMap, tableMap) =>
  axios.get(`${BASE_URL}/randomize`, {
    params: { studentMap, tableMap },
  });
export const optimizeSeats = (studentMap, tableMap) =>
  axios.get(`${BASE_URL}/optimize`, {
    params: { studentMap, tableMap },
  });
