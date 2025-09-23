import { useEffect, useState } from "react";
import { fetchCampaigns } from "../services/api";
import CampaignCard from "../components/CampaignCard";

function Campaigns() {
    
  // Uncomment this once backend /campaigns endpoint is live
  /*
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns()
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
