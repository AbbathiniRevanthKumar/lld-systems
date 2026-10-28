import { Node } from "./Node.js";

export class DLL<K, V> {
  private head: Node<K, V>;
  private tail: Node<K, V>;
  constructor() {
    this.head = new Node<K, V>(null as unknown as K, null as unknown as V);
    this.tail = new Node<K, V>(null as unknown as K, null as unknown as V);

    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.head.prev = new Node<K, V>(null as unknown as K, null as unknown as V);
    this.tail.next = new Node<K, V>(null as unknown as K, null as unknown as V);
  }
  addFirstNode(node: Node<K, V>) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }
  moveToFront(node: Node<K, V>) {
    this.remove(node);
    this.addFirstNode(node);
  }
  remove(node: Node<K, V>) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }
  removeLast():Node<K,V> | null{
    if(this.tail.prev === this.head){
        return null;
    }

    const last = this.tail.prev!;
    this.remove(last);
    return last;
  }

  printList():void{
    let temp = this.head;
    let listStr = '';
    while(temp.next !== null){
        listStr += ` | ${temp.key} :  ${temp.value} | <-> `;
        temp = temp.next;
    }

    console.log(listStr);
    
  }
}
