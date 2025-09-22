import CampaignCard from "../components/CampaignCard";

function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Featured Campaigns</h2>
      <CampaignCard 
        title="Save the Rainforest"
        description="Help us protect endangered ecosystems by supporting our conservation campaign."
        goal={5000}
        raised={2300}
      />
      <CampaignCard 
        title="School Supplies for Kids"
        description="Providing books and uniforms to underprivileged children."
        goal={2000}
        raised={1200}
      />
    </div>
  );
}

export default Home;
