const express = require('express');
const nanoid = require('nanoid');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const uiPath = __dirname + '/tuizzer-ui/dist';

global.players = [];
global.buzzers = [];

app.use(express.static(uiPath));

app.get('/', (req, res) => {
    res.sendFile(uiPath + '/index.html');
});

function broadcast(event, payload) {
    console.log('emitting ', event, ' => ', payload);
    io.emit(event, payload);
}

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.handshake.query);
    const id = nanoid();

    if (socket.handshake.query.role === 'player' && !socket.handshake.query.id) {
        console.log('generated new id: ', id);
        global.players.push({ id, username: socket.handshake.query.username, score: 0 });
        socket.emit('playerId', id);
    } else if (socket.handshake.query.id) {
        const pl = global.players.find(p => p.id === socket.handshake.query.id);
        if (pl) {
            pl.disconnected = false;
            console.log('player reconnected: ', pl);
            return;
        } else {
            socket.emit('playerId', socket.handshake.query.id);
        }
    }
    

    socket.on('disconnect', () => {
        console.log('user disconnected');
        const pl = global.players.find(p => p.id === id);
        if (pl) {
            pl.disconnected = true;
        }
    });

    socket.on('buzz', (id) => {
        if (!global.buzzers.some(b => b.id === id)) {
            global.buzzers.push({id, time: Date.now()})
            broadcast('buzzed', buzzers);
        }
    });

    socket.on('reset', () => {
        global.buzzers = [];
        broadcast('buzzed', buzzers);
        broadcast('reset');
    });

    socket.on('next', () => {
        global.buzzers.shift();
        broadcast('buzzed', buzzers);
    });

});

http.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});
