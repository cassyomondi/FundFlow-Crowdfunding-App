import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>FundFlow</h2>
      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/campaigns" style={styles.link}>Campaigns</Link></li>
        {user ? (
          <>
            <li><Link to="/create" style={styles.link}>Create Campaign</Link></li>
            <li><button onClick={logout} style={styles.logoutButton}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#1976d2",
    color: "white",
  },
  logo: { margin: 0 },
  links: { listStyle: "none", display: "flex", gap: "1rem", margin: 0, padding: 0 },
  link: { color: "white", textDecoration: "none", fontWeight: "bold" },
  logoutButton: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;
