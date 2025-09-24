import { useEffect, useState } from "react";
import { fetchCampaigns } from "../services/api";
import CampaignCard from "../components/CampaignCard";

function Campaigns() {
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
      <h2>All Campaigns</h2>

      {loading && <p>Loading campaigns...</p>}

      {!loading && campaigns.length === 0 && (
        <p>No campaigns found. Start by creating one!</p>
      )}

      {campaigns.map((c) => (
        <CampaignCard
          key={c.id}
          title={c.title}
          description={c.description}
          goal={c.funding_goal}
          raised={c.raised || 0}
        />
      ))}
    </div>
  );
}

export default Campaigns;
