import DataStorage from "./storage";

const handleQuery = (dataStorage: DataStorage, command: string, args : string[]) => {

  command = command.toUpperCase();

  switch(command) {
    case 'SET':
      return dataStorage.set(args[0], args[1], args[2] ? parseInt(args[2]) : undefined)
    case 'GET':
      return dataStorage.get(args[0]);
    case 'DEL':
      return dataStorage.del(args[0]);
    case 'EXPIRE':
      return dataStorage.expire(args[0], parseInt(args[1]));
    case 'TTL':
      return dataStorage.ttl(args[0]);
    default:
      return 'ERROR: unknown command';
  }
};

export default handleQuery;