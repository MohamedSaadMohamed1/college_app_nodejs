class WebSockets {
    users = [];
    connection(client) {
        console.log(`${socket.id} has been connected`)

        client.on("identity", (collegeId) => {
            this.users.push({
                socketId: client.id,
                userId: collegeId,
            });
        });

        // event fired when the chat room is disconnected
        client.on("disconnect", () => {
            this.users = this.users.filter((user) => user.socketId !== client.id);
            console.log(`${socket.id} has been disconnected`);
        });

        // subscribe person to chat & other user as well
        client.on("subscribe", (roomId) => {
            client.join(roomId);
        });
        // mute a chat room
        client.on("unsubscribe", (roomId) => {
            client.leave(roomId);
        });
    }
}

function getUserById(userId) {
    const userSockets = this.users.filter(
        (user) => user.userId === userId,
    );
    userSockets.map((userInfo) => {
        return global.io.sockets.connected(userInfo.socketId);
    });
}

exports.WebSockets = new WebSockets();
exports.getUserById = getUserById;