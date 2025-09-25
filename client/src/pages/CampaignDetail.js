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
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ title: "", description: "", funding_goal: 0 });

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

  const openEditModal = () => {
    setEditData({
      title: campaign.title,
      description: campaign.description,
      funding_goal: campaign.funding_goal,
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { title, description, funding_goal } = editData;
    const goalNum = parseFloat(funding_goal);

    if (!title || !description || isNaN(goalNum) || goalNum <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    if (goalNum < (campaign.amount_raised || 0)) {
      alert(`Funding goal cannot be less than the current raised amount (${campaign.amount_raised}).`);
      return;
    }

    try {
      const response = await updateCampaign(
        campaign.id,
        { title, description, funding_goal: goalNum },
        token
      );
      setCampaign(response.data);
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update campaign");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return;

    try {
      await deleteCampaign(campaign.id, token);
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
          <button style={styles.button} onClick={openEditModal}>Edit</button>
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

      {isEditModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Edit Campaign</h3>
            <form onSubmit={handleEditSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Description"
              />
              <input
                type="number"
                value={editData.funding_goal}
                onChange={(e) => setEditData({ ...editData, funding_goal: e.target.value })}
                placeholder="Funding Goal"
                min={campaign.amount_raised || 1}
              />
              {parseFloat(editData.funding_goal) < (campaign.amount_raised || 0) && (
                <small style={{ color: "red" }}>
                  Goal cannot be less than current raised ({campaign.amount_raised})
                </small>
              )}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button type="submit" style={styles.button}>Save</button>
                <button
                  type="button"
                  style={{ ...styles.button, background: "#e53935" }}
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
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
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
};

export default CampaignDetail;
