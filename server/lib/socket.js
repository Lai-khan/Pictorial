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

        socket.on('profileChange', async (name, roomCode, profile) => {
            console.log('socket.io room profileChange!');

            const change = await db.changeProfile(name, roomCode, profile);

            const result = await db.getUsersInRoom(roomCode);
            let userList = [];
            for(var i=0; i<result.length; i++) {
                userList.push(result[i].dataValues);
            }
            console.log('userData: ', userList);
            room.to(roomCode).emit('userData', { userList: userList });
        });

        socket.on('setGameStart', async (roomCode, start) => {
            console.log('socket.io room setGameStart!');

            const result = await db.setGameStart(roomCode, start);
            
            if(start === true) {
                room.to(roomCode).emit('gameStart', { text: 'Game Start!' });
            } else if(start === false) {
                room.to(roomCode).emit('gameFinish', { text: 'Game Finish!' });
            }
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

            const userNum = await db.getUsersInRoom(roomCode);
            console.log('userNum: ', userNum.length, ', readyUserNum: ', result.length);
            if(userNum.length <= result.length) {
                console.log('All Users are Ready!');
                room.to(roomCode).emit('allUserReady', { text: 'All Users are Ready!' });
            }
        });

        socket.on('imageDownload', async (name, roomCode) => {
            console.log('socket.io room imageDownload!');

            const down = await db.setUserimageDownload(name, roomCode, true);

            // down user
            const result = await db.getImageDownloadUsersInRoom(roomCode);
            const userNum = await db.getUsersInRoom(roomCode);
            console.log('userNum: ', userNum.length, ', downloadUserNum: ', result.length);
            if(userNum.length <= result.length) {
                console.log('All Users Download Images!');
                room.to(roomCode).emit('allUserDownload', { text: 'All Users Download Images!' });
            }
        });

        socket.on('roundReady', async (roomCode, callback) => {
            console.log('socket.io room roundReady!');

            const result = await db.getRoundStart(roomCode);

            if(result === false) {
                await db.setRoundStart(roomCode, true);
                console.log('roundStart set true!');

                // ready~ 3! 2! 1!
                let num = 3;
                async function countdown() {
                    console.log('countdown ', num);
                    room.to(roomCode).emit('countdown', { time: num });
                    num--;
                    if(num < 0) {
                        clearInterval(timer);
                        await db.setRoundStart(roomCode, false);
                        console.log('roundStart set false!');
                        console.log('countdown finish!');
                        callback();
                    }
                }
                var timer = setInterval(countdown, 1000);
            }
        });

        socket.on('roundStart', async (roomCode) => {
            console.log('socket.io room roundStart!');

            const time = await db.getRoomSetting(roomCode).dataValues.time;
            const result = await db.getRoundStart(roomCode);

            if(result === false) {
                await db.setRoundStart(roomCode, true);
                console.log('roundStart set true!');

                // timer
                let num = time;
                async function countdown() {
                    console.log('timer ', num);
                    room.to(roomCode).emit('timer', { time: num });
                    num--;
                    if(num < 0) {
                        clearInterval(timer);
                        await db.setRoundStart(roomCode, false);
                        console.log('roundStart set false!');
                        socket.emit('finish', roomCode);
                        room.to(roomCode).emit('roundFinish', {text: 'Round Finish!'});
                    }
                }
                var timer = setInterval(countdown, 1000);
            }
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

            if(roomCode !== undefined) {
                socket.leave(roomCode);
                console.log('leave room ', roomCode, '!');
    
                if(name !== undefined) {
                    const deleteUser = await db.deleteUser(name, roomCode);
                    console.log('delete user: ', name);
                }
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
            }
        }); 
    });
}