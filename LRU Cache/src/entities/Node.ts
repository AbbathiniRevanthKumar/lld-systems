export class Node<K, V> {
  private _key: K;
  private _value: V;
  private _prev: Node<K, V> | null;
  private _next: Node<K, V> | null;

  constructor(k: K, v: V) {
    this._key = k;
    this._value = v;
    this._prev = null;
    this._next = null;
  }

  get next(): Node<K, V> | null {
    return this._next;
  }

  get prev(): Node<K, V> | null {
    return this._prev;
  }

  set next(node: Node<K, V> | null) {
    this._next = node;
  }
  set prev(node: Node<K, V> | null) {
    this._prev = node;
  }

  get key():K{
    return this._key;
  }

  get value():V{
    return this._value;
  }

  set value(value:V){
    this._value = value;
  }
}
