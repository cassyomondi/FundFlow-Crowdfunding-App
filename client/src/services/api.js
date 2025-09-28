import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://fundflow-crowdfunding-app.onrender.com",
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

// Campaigns
export const fetchCampaigns = () => API.get("/campaigns");
export const fetchCampaignById = (id) => API.get(`/campaigns/${id}`);
export const createCampaign = (data, token) =>
  API.post("/campaigns", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
// Update an existing campaign
export const updateCampaign = (id, data, token) =>
  API.patch(`/campaigns/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// DELETE campaign
export const deleteCampaign = (id, token) => {
  return API.delete(`/campaigns/${id}`, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' // ensure JSON content type
    },
    data: {} // 👈 explicitly provide empty object to satisfy Axios/Flask
  });
};




// Donations
export const createDonation = (data) => API.post("/donations", data);

// Users
export const createUser = (data) => API.post("/users", data);
export const loginUser = (data) => API.post("/login", data);
export const fetchUser = (id) => API.get(`/users/${id}`);

export default API;
