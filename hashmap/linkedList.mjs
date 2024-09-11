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
  containsKey(key) {
    if (this.head === null) return false;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  // Returns index of node containing value, or null if not found
  find(value) {
    if (this.head === null) return false;
    let currentNode = this.head;
    let index = 0;
    while (currentNode !== null) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    if (this.head === null) return "The list is empty";
    let currentNode = this.head;
    let printedString = "";
    while (currentNode !== null) {
      printedString += `${currentNode.value} -> `;
      currentNode = currentNode.nextNode;
    }
    printedString += "null";
    return printedString;
  }

  // Insert new node with value at index
  insertAt(value, index) {
    if (this.head === null) return "Invalid Index";

    // If inserting at the head
    if (index === 0) {
      this.prepend(value);
      return;
    }

    let currentNode = this.head;
    let counter = 0;
    const newNode = new Node(value);

    while (currentNode !== null) {
      // Insert the new node when we reach index - 1
      if (counter === index - 1) {
        newNode.nextNode = currentNode.nextNode;
        currentNode.nextNode = newNode;

        // Check if the new node is now the last node (update tail if needed)
        if (newNode.nextNode === null) {
          this.tail = newNode;
        }
        return;
      }

      currentNode = currentNode.nextNode;
      counter++;
    }

    // If index is greater than the length of the list
    return "Invalid Index";
  }

  // Remove node at index
  removeAt(index) {
    if (this.head === null) return null; // List is empty

    if (index === 0) {
      // Removing the head
      const removedNode = this.head;
      this.head = this.head.nextNode;

      // If the list becomes empty, reset the tail
      if (this.head === null) {
        this.tail = null;
      }
      return removedNode;
    }

    let currentNode = this.head;
    let counter = 0;

    while (currentNode !== null) {
      if (counter === index - 1) {
        if (currentNode.nextNode === null) {
          return "Invalid Index"; // Since the subsequent node is removed, null means at end of the list
        }

        const removedNode = currentNode.nextNode;
        currentNode.nextNode = removedNode.nextNode;

        // If the node removed was the tail, update the tail
        if (removedNode.nextNode === null) {
          this.tail = currentNode;
        }

        return removedNode;
      }

      currentNode = currentNode.nextNode;
      counter++;
    }

    // If the index is greater than the length of the list (However, thsi will enver execute as index will be out of range first)
    return "Invalid Index";
  }
}

export { LinkedList };
