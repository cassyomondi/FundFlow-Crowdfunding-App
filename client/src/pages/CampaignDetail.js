import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchCampaignById, updateCampaign, deleteCampaign } from "../services/api";
import DonationForm from "../components/DonationForm";
import { AuthContext } from "../context/AuthContext";

function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaignById(id)
      .then((res) => setCampaign(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleNewDonation = (donation) => {
    setCampaign((prev) => ({
      ...prev,
      donations: [...(prev.donations || []), donation],
      amount_raised: (prev.amount_raised || 0) + donation.amount,
    }));
  };

  const handleEdit = async () => {
    const newTitle = prompt("Enter new title", campaign.title);
    const newDescription = prompt("Enter new description", campaign.description);
    if (!newTitle || !newDescription) return;

    try {
      const response = await updateCampaign(
        campaign.id,
        { title: newTitle, description: newDescription },
        token // ✅ include token for authorization
      );
      setCampaign(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update campaign. Are you logged in?");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      await deleteCampaign(campaign.id, token); // ✅ include token
      alert("Campaign deleted");
      navigate("/campaigns");
    } catch (err) {
      console.error(err);
      alert("Failed to delete campaign. Are you logged in?");
    }
  };

  if (loading) return <p>Loading campaign details...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  const progress = Math.min(((campaign.amount_raised || 0) / campaign.funding_goal) * 100, 100);
  const isOwner = user?.id === campaign.user_id;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>{campaign.title}</h2>
      <p>{campaign.description}</p>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: `${progress}%` }} />
      </div>
      <p>
        <strong>{campaign.amount_raised || 0}</strong> raised of {campaign.funding_goal}
      </p>

      {isOwner && (
        <div style={{ margin: "1rem 0", display: "flex", gap: "0.5rem" }}>
          <button style={styles.button} onClick={handleEdit}>Edit</button>
          <button style={{ ...styles.button, background: "#e53935" }} onClick={handleDelete}>Delete</button>
        </div>
      )}

      <h3>Make a Donation</h3>
      <DonationForm campaignId={id} onNewDonation={handleNewDonation} />

      <h3>Donations</h3>
      {campaign.donations?.length > 0 ? (
        <ul style={{ paddingLeft: "1rem" }}>
          {campaign.donations.map((d, i) => (
            <li key={i}>
              <strong>{d.donor_name || "Anonymous"}</strong> donated {d.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations yet. Be the first to donate!</p>
      )}
    </div>
  );
}

const styles = {
  progressBar: {
    height: "10px",
    width: "100%",
    background: "#eee",
    borderRadius: "5px",
    overflow: "hidden",
    margin: "0.5rem 0",
  },
  progress: {
    height: "100%",
    background: "#1976d2",
  },
  button: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "5px",
    background: "#1976d2",
    color: "#fff",
    cursor: "pointer",
  },
};

export default CampaignDetail;
