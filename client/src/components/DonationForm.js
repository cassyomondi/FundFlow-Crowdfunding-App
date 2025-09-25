import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createDonation } from "../services/api";

function DonationForm({ campaignId, onNewDonation }) {
  const { token, user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    try {
      const response = await createDonation({ campaign_id: campaignId, amount }, token);
      onNewDonation(response.data);
      setSuccess("Donation successful!");
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.error || "Donation failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="number"
        placeholder="Enter donation amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Donate
      </button>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "1rem 0",
  },
  input: {
    flex: 1,
    padding: "0.5rem 0.75rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.55rem 1rem",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  error: {
    color: "#d32f2f",
    marginTop: "0.5rem",
  },
  success: {
    color: "#388e3c",
    marginTop: "0.5rem",
  },
};

export default DonationForm;
