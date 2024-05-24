import * as fs from 'node:fs';
import * as path from 'node:path';


interface StoredData {
  value: string,
  expire?: {
    PX: number,
    id?: ReturnType<typeof setTimeout>
  }
}

class DataStorage {
  
  private store: Map<string, StoredData> = new Map();

  constructor() {
    this.load();
  }

  set(key: string, value: string, EX?: number): string {
    const data: StoredData = { value };
    this.store.set(key, data);
    if (EX !== undefined) this.expire(key, EX);
    return 'OK';
  }

  get(key: string): string | null {
    const data = this.store.get(key);
    return data !== undefined ? data.value : null;
  }

  del(...keys: string[]):string | number {
    let removed = 0;

    for (const key of keys) {
      if(this.store.has(key)) {
        this.store.delete(key);
        removed++;
      }
    }
    return removed === 1 ? 'OK' : removed;
  }

  expire(key: string, EX: number): number {
    const data = this.store.get(key);
    
    if(data){
      if(data.expire) clearTimeout(data.expire.id);
        data.expire = {PX: 0};
        data.expire.PX = Date.now() + EX * 1000;
        data.expire.id = setTimeout(() => this.del(key), EX * 1000);
      return 1;
    }
    return 0;
  }
   
  ttl(key: string):number {
    const data = this.store.get(key);
    if(data === undefined) return -2;
    return data.expire ? (data.expire.PX - Date.now()) / 1000 : -1;
  }

load(): void {
  'load method called.'
  const dataFile = path.resolve(__dirname, './data.json');

  if(!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '{}', 'utf8');
  }

  const data = fs.readFileSync(path.resolve(dataFile), 'utf8');

  if(data.length !== 0) {
    const dataArr: [string, StoredData][] = Object.entries(JSON.parse(data));

    for (const [key, value] of dataArr) {
      this.store.set(key, value)
    };
  }
}


  dump(): void {
    const serializedData = JSON.stringify(Object.fromEntries(this.store));
    fs.writeFile(path.resolve(__dirname, './data.json'), serializedData, (err) =>{
      if(err) console.error(err);
    })
  };
}


export default DataStorage;