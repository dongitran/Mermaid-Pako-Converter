const express = require("express");
const cors = require("cors");
const mermaidRoutes = require("./routes/mermaid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mermaidRoutes);

app.get("/", (req, res) => {
  res.send(
    "Mermaid to Pako API is running! Use POST /api/convert endpoint to convert Mermaid code."
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
