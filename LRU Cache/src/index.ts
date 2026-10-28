import { LRUCache } from "./entities/LRUCache.js";

console.log("=== LRU Cache Demo ===\n");

const cache = new LRUCache<string, number>(3);

cache.put("a",1);
cache.printCache();
cache.put("a",2);
cache.printCache();
cache.put("a",3);
cache.printCache();
cache.put("a",4);
cache.printCache();
cache.put("b",6);
cache.printCache();
cache.put("c",1);
cache.printCache();
cache.put("d",2);
cache.printCache();
cache.put("a",4);

console.log("value : ", cache.get("a"));