import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend (once running)
});

// Example functions
export const fetchCampaigns = () => API.get("/campaigns");
export const createCampaign = (data) => API.post("/campaigns", data);

export default API;
