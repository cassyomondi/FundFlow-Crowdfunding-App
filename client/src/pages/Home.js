import { useEffect, useState } from "react";
import { fetchCampaigns } from "../services/api";
import CampaignCard from "../components/CampaignCard";

function Home() {
  
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
      <h2>Featured Campaigns</h2>

      {/* ✅ For now: static sample data */}
      <CampaignCard
        title="Save the Rainforest"
        description="Help us protect endangered ecosystems by supporting our conservation campaign."
        goal={5000}
        raised={2300}
      />
      <CampaignCard
        title="School Supplies for Kids"
        description="Providing books and uniforms to underprivileged children."
        goal={2000}
        raised={1200}
      />

      {/* ✅ Later: render from backend */}
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

export default Home;
