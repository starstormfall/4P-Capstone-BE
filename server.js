const cors = require("cors");
const express = require("express");
require("dotenv").config();
// const { auth } = require("express-oauth2-jwt-bearer");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

//import routers
const chatsRouter = require("./routers/chatsRouter");
const friendsRouter = require("./routers/friendsRouter");
const mapsRouter = require("./routers/mapsRouter");
const postsRouter = require("./routers/postsRouter");
const usersRouters = require("./routers/usersRouter");

//import controllers
const chatsController = require("./controllers/chatsController");
const friendsController = require("./controllers/friendsController");
const mapsController = require("./controllers/mapsController");
const postsController = require("./controllers/postsController");
const usersController = require("./controllers/usersController");

// import DB
const db = require("./db/models/index");

// decostruct models here
// const {} = db;

// const checkJwt = auth({
//   audience: process.env.AUDIENCE,
//   issuerBaseURL: process.env.ISSUER,
// });

//set up Controllers here.

//set up Routers here.

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());

// Enable CORS access to this server
app.use(cors());

// Enable express to parse JSON bodies of incoming POST requests
app.use(express.json());

//Enable Routers here.
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
