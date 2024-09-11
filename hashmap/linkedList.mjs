class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // update value;
  updateValue(key, value) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) {
        currentNode.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }
  }

  getValue(key) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) return currentNode.value;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  hasKey(key) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  removeNode(key) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.nextNode === null) return false;
      if (currentNode.nextNode.key === key) {
        // If the next node's key equals key
        // Point to the node after
        currentNode.nextNode = currentNode.nextNode.nextNode;
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  getKeys() {
    const keys = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      keys.push(currentNode.key);
      currentNode = currentNode.nextNode;
    }
    return keys;
  }

  getValues() {
    const values = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      values.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }
    return values;
  }

  getEntries() {
    const entries = [];
    let currentNode = this.head;
    while (currentNode !== null) {
      entries.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.nextNode;
    }
    return entries;
  }

  // Add to end of the list
  append(key, value) {
    const newNode = new Node(key, value);

    // If the head is null, the list is empty so set both
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    // Otherwise, the current tail is a node which needs to point to the new node
    this.tail.nextNode = newNode;
    // Set the new node as the tail
    this.tail = newNode;
    return;
  }

  // Add to the start of the list
  prepend(key, value) {
    const newNode = new Node(key, value);

    // If the head is null, the list is empty so set both
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }

    // Otherwise, the current head is a node which the newnode must point
    newNode.nextNode = this.head;
    // Set this node to head
    this.head = newNode;
    return;
  }

  // Return true if passed value passed is in the list, otherwise false
  containsKey(key) {
    if (this.head === null) return false;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
}

export { LinkedList };
