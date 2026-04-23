import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:3001/health")
      .then((res) => res.json())
      .then((data) => setMessage(`${data.service}: ${data.ok}`))
      .catch(() => setMessage("API request failed"));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Alaska Coastline Fishery Explorer</h1>
      <p>Backend status: {message}</p>
    </div>
  );
}

export default App;
