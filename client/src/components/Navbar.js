import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/campaigns">Campaigns</Link>
      <Link to="/create">Create Campaign</Link>
    </nav>
  );
}
