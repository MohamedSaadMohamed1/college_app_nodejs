const { io: s } = require('socket.io-client');
const url = 'http://localhost:3000';
const socket = s(url);

socket.on('connect', () => {
    console.log(`${socket.id} has been connected from ${url}`)
});

socket.on('disconnect', () => {
    console.log(`${url} has been disconnected`)
});