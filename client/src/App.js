import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/create" element={<CreateCampaign />} />
      </Routes>
    </Router>
  );
}

export default App;
