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
}
