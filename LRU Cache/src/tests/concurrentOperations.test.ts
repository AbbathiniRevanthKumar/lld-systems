import { LRUCache } from "../entities/LRUCache.js";

async function testConcurrentOperations() {
  const lruCache = new LRUCache<string, number>(3);

  await Promise.all([
    Promise.resolve().then(() => lruCache.put("A", 1)),
    Promise.resolve().then(() => lruCache.put("B", 2)),
    Promise.resolve().then(() => lruCache.put("C", 3)),
    Promise.resolve().then(() => lruCache.get("A")),
    Promise.resolve().then(() => lruCache.put("D", 4)),
    Promise.resolve().then(() => lruCache.put("D", 7)),
    Promise.resolve().then(() => lruCache.get("B")),
  ]);

  lruCache.printCache();

  console.log("A : ",lruCache.get("A"));
  console.log("B : ",lruCache.get("B"));
  console.log("C : ",lruCache.get("C"));
  console.log("D : ",lruCache.get("D"));

  console.log("Test completed");

}

testConcurrentOperations().catch(console.error)
