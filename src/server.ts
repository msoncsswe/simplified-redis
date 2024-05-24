import * as net from 'node:net';
import DataStorage from './storage';
import handleQuery from './handleQuery';

const PORT = 3000;

const dataStorage = new DataStorage();

const server = net.createServer((socket) => {
  console.log(`Client connected: ${socket.remoteAddress}: ${socket.remotePort}`);

  dataStorage.load();

  socket.on('data', (data) => {
    console.log(`Received client query from ${socket.remoteAddress}: ${data}`);

    // Parse data to handle query
    const [command, ...args] = data.toString().trim().split(' ');
    const response = handleQuery(dataStorage, command, args);

    // '\n' ensures the end of response message
    socket.write(response + '\n');
  })

  socket.on('end', () => dataStorage.dump())

  socket.on('error', (err) => console.error(err));
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

export default dataStorage;