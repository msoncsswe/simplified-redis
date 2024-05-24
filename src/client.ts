import * as net from 'net';

const client = new net.Socket();

client.connect(3000, "localhost", () => {
  console.log(`Connected to server.`)

  /**
   * Write commmand here! Example:
   * client.write('SET testing 123')
   * client.write('GET testing')
   */

  client.on('data', (data) => {
    console.log(data.toString());
  });

  client.on('close', () => {
    console.log('Connection closed.')
  });

  client.on('error', (err) => console.error(err))
});