const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const socket = require('socket.io')
const cors = require('cors')

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = socket(server);

// connect user to a specific room
io.on('connection', socket => {
    // console.log("OK");
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://pedro:pedro@cluster0-0tscx.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
});

// pass the io to the global request
app.use((req, res, next) => {
    // io is the socket
    req.io = io;

    // continue request
    return next();
});

app.use(express.json());

// enable files upload
app.use(express.urlencoded({ extended: true }));

// serve static files directly (redirect)
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// import routes
app.use(require('./routes'));

// heroku automatically uses POST env var
server.listen(process.env.PORT || 3333);
