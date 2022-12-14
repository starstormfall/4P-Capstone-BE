const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();
const { auth } = require("express-oauth2-jwt-bearer");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER,
});

//set up Controllers here.

//set up Routers here.

const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());

// Enable CORS access to this server
app.use(cors());

// Enable express to parse JSON bodies of incoming POST requests
app.use(express.json());

//import routers
const chatsRouter = require("./routers/chatsRouter");
const friendsRouter = require("./routers/friendsRouter");
const mapsRouter = require("./routers/mapsRouter");
const postsRouter = require("./routers/postsRouter");
const usersRouters = require("./routers/usersRouter");
const infoRouter = require("./routers/infoRouter");
app.use("/chats", checkJwt, chatsRouter);
app.use("/friends", checkJwt, friendsRouter);
app.use("/maps", checkJwt, mapsRouter);
app.use("/users", checkJwt, usersRouters);
app.use("/posts", checkJwt, postsRouter);
app.use("/info", infoRouter);

const chatController = require("./controllers/chatsController");

//Enable Routers here.
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const httpServer = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express app listening on port ${PORT}!`);
});

const socketIo = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

require("./socket")(socketIo, chatController);
