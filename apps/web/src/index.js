const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, service: "api" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
