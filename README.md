## Simplified Redis

### Overview:

In-memory data storage for key-value pairs👩🏻‍💻

Leverages Node.js' native [net](https://nodejs.org/api/net.html) module to create TCP server. Data will also persist in `data.json` file and will reload on server start.

#### Supported Commands:

- `SET key value EX?`: Stores the key-value pair in the database with option to set expiration in seconds.
  - _returns_: `'OK'` upon data entry
- `GET key`: Retrieves the value associated with the key.
  - _returns_: value of the associated key or `null` if key does not exist
- `DEL key/s`: Deletes single or multiple key-value pair from the database.
  - _returns_: `0` if key does not exist, `1` if a single key-value pair is deleted, or the number of key-value pairs that has been deleted
  - _note_: Per Redis' [forum](https://forum.redis.io/t/del-command-does-not-entirely-remove-the-document-from-index/1388), the DEL command does not "delete" the document. This implementation is a mix of FT.DEL command that deletes the entire document and DEL command that allows multiple key deletion.
- `EXPIRE key seconds`: Sets a timeout on the specified key. After the timeout has expired, the key will be deleted.
  - _returns_: `0` if key does not exist or `1` if the timeout was set
- `TTL key`: Returns the remaining time to live of a key that has an expiration set, in seconds.
  - _returns_: `-2` if key does not exist, `-1` if the expiration is not set, or the remaining time in seconds

**_Note:_** _the return values are set to mimic Redis as closely as possible_

#### Instructions:

1.  `git clone `
2.  Run `npm install`
3.  Write desired commands in `client.ts`
4.  Run `npm run server`
5.  In a separate terminal, run `npm run client`

Results will logged to the console.

To check the current state of DataStorage, see `data.json` file. Data will only be updated to `data.json` on server close to keep state management in `DatatStorage`.
