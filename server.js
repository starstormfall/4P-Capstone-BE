const cors = require("cors");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable express to parse JSON bodies of incoming POST requests
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
