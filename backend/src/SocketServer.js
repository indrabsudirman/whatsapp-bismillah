export default function (socket) {
  //user join or opens the application
  socket.on("join", (user) => {
    console.log("User has joined", user);
    socket.join(user);
  });

  //join conversation room
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
    console.log("User joined conversation : ", conversation);
  });

  //send recieved message
  socket.on("send message", (message) => {
    console.log("New Message received", message);
    let conversation = message.conversation;
    if (!conversation.user) return;
    conversation.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });
}
