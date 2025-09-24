import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend (once running)
});

// ========================
// Campaigns
// ========================
export const fetchCampaigns = () => API.get("/campaigns"); // GET all
export const fetchCampaignById = (id) => API.get(`/campaigns/${id}`); // GET single

export const createCampaign = (data) =>
  API.post("/campaigns", {
    title: data.title,
    description: data.description,
    funding_goal: data.funding_goal,
    user_id: data.user_id,   
  });


export const updateCampaign = (id, data) => API.put(`/campaigns/${id}`, data); // PUT update
export const deleteCampaign = (id) => API.delete(`/campaigns/${id}`); // DELETE

// ========================
// Donations
// ========================
export const createDonation = (data) => API.post("/donations", data); // POST donation
export const fetchDonationsByCampaign = (campaignId) =>
  API.get(`/campaigns/${campaignId}/donations`); // GET donations for a campaign

// ========================
// Users
// ========================
export const createUser = (data) => API.post("/users", data); // Register
export const fetchUser = (id) => API.get(`/users/${id}`); // Profile

export default API;
