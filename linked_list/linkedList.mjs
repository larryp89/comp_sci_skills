class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Add to end of the list
  append(value) {
    const newNode = new Node(value);

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
  prepend(value) {
    const newNode = new Node(value);

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

  // Return number of nodes in the list
  size() {
    // If the the list is empty return 0
    if (this.head === null) return 0;

    let counter = 0;
    let currentNode = this.head;

    while (currentNode !== null) {
      counter += 1;
      currentNode = currentNode.nextNode;
    }
    return counter;
  }

  // Returns head
  getHead() {
    return {
      headValue: this.head ? this.head.value : null,
    };
  }

  // Returns tails
  getTail() {
    return {
      tailValue: this.tail ? this.tail.value : null,
    };
  }

  // Returns node at a given index
  at(index) {
    // Prevent accessing negative index
    if (index < 0) return null;

    // If there is no list, return false
    if (this.head === null) return null;

    // Otherwise iterate through
    let currentNode = this.head;
    let counter = 0;

    while (currentNode !== null) {
      // If the counter number equals the index, return the current node
      if (counter === index) return currentNode;
      //Otherwise increase the counter and go to next node
      currentNode = currentNode.nextNode;
      counter++;
    }
    return null;
  }

  // Remove last node in the list
  pop() {
    // If the list is empty return null
    if (this.head === null) return null;
    // If there is only one node, reset all to null
    if (this.head === this.tail) {
      const removedNode = this.head;
      this.head = null;
      this.tail = null;
      return removedNode;
    }

    let currentNode = this.head;
    // If the node after next is null, remove the next node
    while (currentNode.nextNode.nextNode != null) {
      currentNode = currentNode.nextNode;
    }

    // Remove the node pointing to null
    const removedNode = currentNode.nextNode;
    // Set current node as tail and set next node to null
    this.tail = currentNode;
    currentNode.nextNode = null;

    return removedNode;
  }

  // Return true if passed value passed is in the list, otherwise false
  contains(value) {
    if (this.head === null) return false;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }
}
