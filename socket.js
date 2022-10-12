module.exports = (socketIo, chatController) => {
  socketIo.on("connection", (socket) => {
    socket.on("join_chatroom", async (data) => {
      console.log("room is joined");
      console.log(data.room);
      await socket.join(data.room);

      // get the data from the model.
      // need to use "includes";
      // getAllMessages becomes a function that returns data.
      //
      let messages = await chatController.getAllMessages(data.room);

      socket.emit("send_chatdata", messages);
      // respond using socket emit.

      //// just to be aware.
      // use reddis database to clear both sessions at the same time.
    });
    socket.on("send_message", async (data) => {
      console.log(data);
      //data.message

      // call the addMessage function in the chatsController. Adds data into database.
      let newMessages = await chatController.addMessage(data);

      socket.to(`${data.chatroomId}`).emit("received_message", newMessages);
    });

    socket.on("leave_disconnect", async (data) => {
      // console.log(data);

      const deletedUser = await chatController.deleteChatAccess(data);

      console.log(deletedUser);

      socket.disconnect();
      socket
        .to(`${data.chatroomId}`)
        .emit("received_admin_message", deletedUser);
    });

    socket.on("add_newUsers", async (data) => {
      // const { chatroomId, newUser } = data;

      // let friendsToAdd = [];

      // await newUser.forEach((user) => {
      //   const newObject = {
      //     chatroomId: chatroomId,
      //     userId: user.id,
      //   };

      //   friendsToAdd.push(newObject);
      // });

      const usersAdded = await chatController.addMembers(data);

      socket
        .to(`${data.chatroomId}`)
        .emit("received_admin_message", usersAdded);
    });

    socket.on("set_inactive", async (data) => {
      const deactivateChat = await chatController.editRoomDetails(data);

      socket
        .to(`${data.chatroomId}`)
        .emit("received_deactivation", deactivateChat);
    });

    console.log(`${socket.id} user just connected!`);
    socket.on("disconnect", () => {
      console.log(`${socket.id} user just disconnected!`);
    });
  });
};
