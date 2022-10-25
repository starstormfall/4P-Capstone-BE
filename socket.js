module.exports = (socketIo, chatController) => {
  socketIo.on("connection", (socket) => {
    socket.on("join_chatroom", async (data) => {
      await socket.join(data.room);

      let messages = await chatController.getAllMessages(data.room);

      socket.emit("send_chatdata", messages);
    });
    socket.on("send_message", async (data) => {
      // call the addMessage function in the chatsController. Adds data into database.
      let newMessages = await chatController.addMessage(data);

      socket.to(`${data.chatroomId}`).emit("received_message", newMessages);
    });

    socket.on("leave_disconnect", async (data) => {
      const deletedUser = await chatController.deleteChatAccess(data);

      socket
        .to(`${data.chatroomId}`)
        .emit("received_admin_message", deletedUser);
    });

    socket.on("add_newUsers", async (data) => {
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
