const socketio = require('socket.io');
const db = require('./db');

module.exports = (server, app, sessionMiddleware) => {
    const io = socketio(server);

    app.set('io', io);
    const room = io.of('/room');
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    room.on('connect', (socket) => {
        console.log('socket.io room connected!');
        const req = socket.request;

        socket.on('join', async (name, code) => {
            console.log('socket.io room join!');
            
            socket.emit('message', { text: `Welcome to the room ${code}!`});
            socket.broadcast.to(code).emit('message', { text: `${name}, has joined!`});

            socket.join(code);

            req.session.userName = name;
            req.session.roomCode = code;
            console.log("username: ", req.session.userName, ", roomCode: ", req.session.roomCode);

            // socket - userList return
            const result = await db.getUsersInRoom(code);
            let userList = [];
            for(var i=0; i<result.length; i++) {
                userList.push(result[i].dataValues);
            }
            console.log('userData: ', userList);
            room.to(code).emit('userData', { userList: userList });
            
            const data = await db.getRoomSetting(code);
            console.log('roomData: ', data.dataValues);
            room.to(code).emit('roomData', { roomData: data.dataValues });
        });

        socket.on('setRoom', async (roomCode, round, time) => {
            console.log('socket.io room setRoom!');

            const result = await db.setRoom(roomCode, round, time);
            const data = await db.getRoomSetting(roomCode);

            console.log('roomData: ', data.dataValues);
            room.to(roomCode).emit('roomData', { roomData: data.dataValues });
        });

        socket.on('setGameStart', async (roomCode, start) => {
            console.log('socket.io room setGameStart!');

            const result = await db.setGameStart(roomCode, start);
            const data = await db.getRoomSetting(roomCode);

            console.log('roomData: ', data.dataValues);
            room.to(roomCode).emit('roomData', { roomData: data.dataValues });
        });

        socket.on('ready', async (name, roomCode) => {
            console.log('socket.io room ready!');

            // DB
            const ready = await db.setUserReady(name, roomCode, true);

            // ready userList
            const result = await db.getReadyUsersInRoom(roomCode);
            let userList = [];
            for(var i=0; i<result.length; i++) {
                userList.push(result[i].dataValues);
            }
            console.log('readyUserData: ', userList);
            room.to(roomCode).emit('readyUserData', { userList: userList });
        });

        socket.on('score', async (name, roomCode, isCorrect, sec) => {
            console.log('socket.io room score!');

            // calculate score
            let score;
            if(isCorrect) {
                const room = await db.getRoomSetting(roomCode);
                const time = room.dataValues.time;
                score = (10-sec)*50;
                if(time === 3) {
                    score += 30;
                } else if(time === 5) {
                    score += 10;
                }
            } else {
                score = -50;
            }
            console.log('result score: ', score);

            // DB
            const user = await db.getUserScore(name, roomCode);
            const originalScore = user.dataValues.score;
            const updateScore = await db.setUserScore(name, roomCode, originalScore+score);

            // socket - updateScore return
            const result = await db.getUsersInRoom(roomCode);
            let userList = [];
            for(var i=0; i<result.length; i++) {
                userList.push(result[i].dataValues);
            }
            console.log('updateScore userData: ', userList);
            room.to(roomCode).emit('updateScore', { userList: userList });
        });

        socket.on('disconnect', async () => {
            console.log('socket.io room disconnected!');
            // DB 처리
            const name = req.session.userName;
            const roomCode = req.session.roomCode;

            socket.leave(roomCode);
            console.log('leave room ', roomCode, '!');

            const deleteUser = await db.deleteUser(name, roomCode);
            console.log('delete user: ', name);
            const result = await db.getUsersInRoom(roomCode);
            if(result.length === 0) {
                const deleteRoom = await db.deleteRoom(roomCode);
                console.log('delete room: ', roomCode);
            } else {
                let userList = [];
                for(var i=0; i<result.length; i++) {
                    userList.push(result[i].dataValues);
                }
                console.log('userData: ', userList);
                room.to(roomCode).emit('userData', { userList: userList });
            }
        }); 
    });
}