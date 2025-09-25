import { useNavigate } from "react-router-dom";

function CampaignCard({ id, title, description, goal, raised }) {
  const navigate = useNavigate();
  const progress = Math.min((raised / goal) * 100, 100);

  const handleClick = () => {
    navigate(`/campaigns/${id}`);  // 👈 navigate directly
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: `${progress}%` }} />
      </div>
      <p>
        <strong>{raised}</strong> raised of {goal}
      </p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    cursor: "pointer", // 👈 shows it’s clickable
    transition: "transform 0.1s ease-in-out",
  },
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
};

export default CampaignCard;
