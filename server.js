const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
require("dotenv").config();
// const { auth } = require("express-oauth2-jwt-bearer");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

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

//import routers
const chatsRouter = require("./routers/chatsRouter");
const friendsRouter = require("./routers/friendsRouter");
// const mapsRouter = require("./routers/mapsRouter");
const postsRouter = require("./routers/postsRouter");
const usersRouters = require("./routers/usersRouter");
app.use("/chats", chatsRouter);
app.use("/friends", friendsRouter);
// app.use("/maps", mapsRouter);
app.use("/users", usersRouters);
app.use("/posts", postsRouter);

//Enable Routers here.
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const httpServer = app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});

const socketIo = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {
  // once backend receives a "join_room" message, then join (data.room), i.e. lobbyId
  socket.on("join_chatroom", async (data) => {
    console.log("room is joined");
    console.log(data.room);
    await socket.join(data.room);
    socket.emit("room joined", data.room);
  });

  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("received_message", data);
  // });

  // socket.on("join_question", (data) => {
  //   socket.join(data.question);
  // });
  // socket.on("send_question_message", (data) => {
  //   console.log(data);
  //   socket.to(data.questionId).emit("received_question_message", data);
  // });

  // socket.on("update_lobby_number", (data) => {
  //   socket.to(data.room).emit("received_update_request", data);
  // });

  // socket.on("something_has_updated", (data) => {
  //   socket.to(data.room).emit("update_the_frontend", data);
  // });

  socket.on("reply", () => console.log("replied"));
  console.log(`${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log(`${socket.id} user just disconnected!`);
  });
});
