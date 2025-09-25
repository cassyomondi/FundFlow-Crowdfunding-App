import { Link } from "react-router-dom";
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
        <Link 
          key={c.id} 
          to={`/campaigns/${c.id}`} 
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CampaignCard
            id={c.id}
            title={c.title}
            description={c.description}
            goal={c.funding_goal}
            raised={c.amount_raised || 0} // ✅ use correct backend field
          />
        </Link>
      ))}
    </div>
  );
}

export default Home;
