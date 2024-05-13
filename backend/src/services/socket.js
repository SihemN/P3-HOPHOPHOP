/* eslint-disable camelcase */
const { Server } = require("socket.io");

function initializeSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  // On écoute quand un user se connecte
  io.on("connection", (socket) => {
    console.info("User connected");

    // Le user est ajouté à la room (numéro de room = id du group)
    socket.on("joinGroup", (groupId, token) => {
      console.info("joinGroup OK");
      socket.join(groupId);
      // on récupère les messages envoyés dans le chat
      const fetchMessagesOfGroup = async () => {
        try {
          const results = await fetch(
            `http://localhost:3310/api/messages/groups/${groupId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!results.ok) {
            const errorResponse = await results.json();
            throw new Error(
              errorResponse.message || "Echec pour récupérer les données"
            );
          }
          const { messages } = await results.json();
          // Ordonner les messages du plus ancien au plus récent et filtre les messages null
          const messagesStoredFiltered = messages
            .sort((a, b) => b.ug_id - a.ug_id)
            .filter(({ ug_message }) => ug_message && ug_message);
          // cet event est écouté côté Front pour récupérer le tableau de messages
          socket.emit("get_messages_of_group", messagesStoredFiltered);
          // console.log("messagesStoredFiltered", messagesStoredFiltered);
        } catch (error) {
          console.info("Erreur pour récupérer les messages:", error);
        }
      };
      fetchMessagesOfGroup();
    });

    // Quand un message est envoyé, on récupère ses données
    socket.on("sendMessage", async (data) => {
      const { ug_group_id, newMessage, token, currentUserId, currentUserName } =
        data;

      try {
        // Puis on l'envoie à tous les membres du chat du groupe (sender y compris)
        io.in(ug_group_id).emit("receive_message", {
          u_name: currentUserName,
          ug_user_id: currentUserId,
          ug_message: newMessage.message,
        });

        // Et on stocke le message dans la BDD
        const response = await fetch(
          `http://localhost:3310/api/messages/groups/${ug_group_id}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newMessage),
          }
        );
        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(
            errorMessage.message ||
              "Échec de l'enregistrement du message dans la base de données"
          );
        }
      } catch (error) {
        console.error("Erreur lors de la gestion du message :", error);
        // Envoyer un message d'erreur au client, par exemple en émettant un événement spécifique
        socket.emit("error_message", {
          message:
            "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.",
        });
      }
    });

    // Déconnecter le user de la room
    socket.on("disconnect", () => {
      console.info("User disconnected");
    });
  });
}

module.exports = initializeSocketServer;
