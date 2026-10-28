import { DLL } from "./DLL.js";
import { Node } from "./Node.js";

export class LRUCache<K, V> {
  private capacity: number;
  private map: Map<K, Node<K, V>>;
  private list: DLL<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();
    this.list = new DLL();
  }

  get(key: K): V | null {
    if (!this.map.has(key)) {
      return null;
    }

    const node = this.map.get(key)!;
    this.list.moveToFront(node);
    return node.value;
  }

  put(key: K, value: V) {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.value = value;

      this.list.moveToFront(node);
    } else {
      if (this.capacity === this.map.size) {
        const lru = this.list.removeLast();
        if (lru !== null) {
          this.map.delete(lru.key);
        }
      }
      const newNode = new Node(key, value);
      this.list.addFirstNode(newNode);
      this.map.set(key, newNode);
    }
  }

  printCache(){
    this.list.printList();
  }
}
