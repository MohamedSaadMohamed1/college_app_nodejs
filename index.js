const { WebSockets } = require('./utils/webSockets');
const home = require('./routes/home');
const me = require('./routes/me');
const rooms = require('./routes/rooms')
const login = require('./routes/login')
const admins = require('./routes/admins');
const courses = require('./routes/courses')
const messages = require('./routes/messages');
const announcements = require('./routes/announcements');


const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const config = require('config');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

if (!config.get("jwtPrivateKey")) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((ex) => console.error('Could not connect to MongoDB', ex))

app.use(express.json());
app.use('/', home);
app.use('/api/me', me);
app.use('/api/rooms', rooms);
app.use('/api/login', login);
app.use('/api/users', admins);
app.use('/api/courses', courses);
app.use('/api/messages', messages);
app.use('/api/announcements', announcements);

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

const server = http.createServer(app);
global.io = socketio(server); /** Create socket connection */
server.listen(PORT); /** Listen on provided port, on all network interfaces. */
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${PORT}/`)
}); /** Event listener for HTTP server "listening" event. */


/** sockets **/
global.io.on('connection', WebSockets.connection)


//set chat_jwtPrivateKey=mySecureKey