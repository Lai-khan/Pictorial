import io from 'socket.io-client';

const END_POINT = 'https://pictorial.ga/room';

export default function socketConnection() {
  const socket = io(END_POINT);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
