class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    constructor(array) {
      const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b); // Sort array first and spread into new array
      this.root = this.buildTree(sortedUniqueArray);
    }
  }

  buildTree(array) {
    // Step 1: Take an unsorted array and build a search tree

    // Set the root node as the first element in the array
    let root = new Node(array[0]); // Use this.array instead of array

    for (let i = 1; i < array.length; i++) {
      this.insertNode(root, array[i]); // Insert each element starting from root
    }

    // Step 2: in-order traversal to get data from each node
    let sortedArray = this.inOrderTraversal(root);
    sortedArray.filter((item, index) => sortedArray.indexOf(item) === index);

    // Step 3: Build balanced binary tree from sorted array
    let start = 0;
    let end = sortedArray.length - 1;
    root = this.buildBalancedTree(sortedArray, start, end);

    return root;
  }

  // Insert a node at its correct position at the end of the tree
  insertNode(node, value) {
    if (node === null) return new Node(value);

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      // Handle values greater than the current node
      node.right = this.insertNode(node.right, value);
    }
    return node; // Return the updated node to preserve tree structure
  }

  insert(value) {
    this.insertNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) return null;

    // If value is less than the node data, moveto the left node
    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Value = node.data so node to be deleted has been found

      // Case 1: no children
      if (node.left === null && node.right === null) return null; // Null returned to previous call of node(4).left which is sets to null

      // Case 2: one child is null (set non-null child as parent node's left/right)
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Case 3: Two children
      // Step 1: Find the in-order successor (smallest node in the right subtree)
      let successor = this.findMin(node.right);

      // Step 2: Replace the node's value with the successor's value
      node.data = successor.data;

      // Step 3: Delete the in-order successor
      node.right = this.deleteNode(node.right, successor.data);
    }

    return node; // Return the (possibly updated) node to maintain the tree structure
  }

  // Helper function to find the smallest node in the subtree
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  deleteItem(value) {
    this.deleteNode(this.root, value);
  }

  inOrderTraversal(node, array = []) {
    if (node === null) return;

    // If the node isn't null, go to the  left node
    this.inOrderTraversal(node.left, array);
    // Process the data
    array.push(node.data);
    // Go to the right node
    this.inOrderTraversal(node.right, array);
    return array;
  }

  // start is index 0 and end is e.g. index 6
  buildBalancedTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    // Set middle of array as root
    let root = new Node(array[mid]);
    // Set middle of smaller array to root.left & right respectively
    root.left = this.buildBalancedTree(array, start, mid - 1);
    root.right = this.buildBalancedTree(array, mid + 1, end);

    return root;
  }

  // Returns node with a given value
  find(value) {
    let root = this.root;
    while (root !== null) {
      if (value === root.data) return root;
      if (value < root.data) {
        root = root.left;
      } else if (value > root.data) {
        root = root.right;
      }
    }
    return false;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }

    let root = this.root;
    const queue = [];
    queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }

    const inOrderHelper = (node) => {
      if (node === null) return;
      inOrderHelper(node.left);
      callback(node);
      inOrderHelper(node.right);
    };

    inOrderHelper(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }

    const preOrderHelper = (node) => {
      if (node === null) return;
      callback(node);
      preOrderHelper(node.left);
      preOrderHelper(node.right);
    };
    preOrderHelper(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function required");
    }

    const postOrderHelper = (node) => {
      if (node === null) return;
      postOrderHelper(node.left);
      postOrderHelper(node.right);
      callback(node);
    };
    postOrderHelper(this.root);
  }

  height(node) {
    if (node === null) return -1;

    // Recursively get the height of the left and right subtrees
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    // The height of the current node is the max height of its subtrees + 1
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Find how deep in a tree the node is
  depth(node) {
    const depthHelper = (currentNode, depthCount = 0) => {
      if (currentNode === null) return -1; // Node not found, return -1
      if (node.data === currentNode.data) {
        return depthCount; // Node is found, return depth
      }
      if (node.data < currentNode.data) {
        return depthHelper(currentNode.left, depthCount + 1); // Go to left subtree
      } else {
        return depthHelper(currentNode.right, depthCount + 1); // Go to right subtree
      }
    };
    return depthHelper(this.root);
  }

  isBalanced() {
    const checkBalance = (node) => {
      // If a node is null, it is balanced
      if (node === null) return { height: -1, balanced: true };

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      if (!left.balanced || !right.balanced) {
        return { height: 0, balanced: false };
      }

      if (Math.abs(left.height - right.height) > 1) {
        return { height: 0, balanced: false };
      }

      const height = 1 + Math.max(left.height, right.height);
      return { height, balanced: true };
    };

    return checkBalance(this.root).balanced;
  }

  rebalance() {
    let newArray = this.inOrderTraversal(this.root);
    this.root = this.buildTree(newArray);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

function generateRandomArray(array = []) {
  if (array.length === 100) return array;
  let randomNumber = Math.floor(Math.random() * 100);
  array.push(randomNumber);
  return generateRandomArray(array);
}

let randArray = generateRandomArray();
const tree = new Tree(randArray);

tree.insert(140);
tree.insert(150);
tree.insert(189);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
tree.isBalanced();
