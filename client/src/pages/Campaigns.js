// import { useEffect, useState } from "react";
// import axios from "axios";
// import CampaignCard from "../components/CampaignCard";

function Campaigns() {
  // For later, when backend is ready
  /*
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/campaigns")
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
      });
  }, []);
  */

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Campaigns</h2>

      {/*For now: placeholder message */}
      <p>This page will list all campaigns fetched from the backend.</p>

      {/* Later: render from backend */}
      {/*
      {campaigns.map((c) => (
        <CampaignCard
          key={c.id}
          title={c.title}
          description={c.description}
          goal={c.goal}
          raised={c.raised}
        />
      ))}
      */}
    </div>
  );
}

export default Campaigns;
