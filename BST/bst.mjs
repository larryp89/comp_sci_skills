class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array; // Set the array before calling buildTree
    this.root = this.buildTree(); // Now call buildTree
  }

  buildTree() {
    // Step 1: Take an unsorted array and build a search tree

    // Set the root node as the first element in the array
    let root = new Node(this.array[0]); // Use this.array instead of array

    for (let i = 1; i < this.array.length; i++) {
      this.insertNode(root, this.array[i]); // Insert each element starting from root
    }

    // Step 2: in-order traversal to get data from each node
    let sortedArray = this.inOrderTraversal(root);
    sortedArray.filter((item, index) => sortedArray.indexOf(item) === index);
    console.log(sortedArray);

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

const tree = new Tree([1, 10, 15, 7, 11, 7, 23, 1, 16]);

tree.insert(300);
tree.insert(2);
tree.prettyPrint(tree.root);
tree.deleteItem(23);
tree.prettyPrint(tree.root);
