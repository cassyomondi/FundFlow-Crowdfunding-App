import { useEffect, useState } from "react";
import { fetchCampaigns } from "../services/api";
import CampaignCard from "../components/CampaignCard";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns()
      .then((response) => {
        setCampaigns(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Featured Campaigns</h2>

      {loading && <p>Loading campaigns...</p>}

      {!loading && campaigns.length === 0 && (
        <p>No campaigns available yet. Be the first to create one!</p>
      )}

      {campaigns.map((c) => (
        <CampaignCard
          key={c.id}
          // backend field is funding_goal
          title={c.title}
          description={c.description}
          goal={c.funding_goal}  
          // default 0 if not in DB
          raised={c.raised || 0}  
        />
      ))}
    </div>
  );
}

export default Home;
