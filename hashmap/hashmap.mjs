import { LinkedList } from "./linkedList.mjs";

class HashMap {
  constructor() {
    this.numBuckets = 16; // changes dynamically
    this.hashTable = new Array(this.numBuckets).fill(null);
    this.size = 0; // total number of nodes
    this.capacity = this.hashTable.length;
    this.load = 0.75;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.numBuckets;
    }

    return hashCode;
  }

  // Assigns key/value pair to hash table
  set(key, value) {
    //TODO Add Load Check
    // Hash the key and get a bucket to generate index
    const index = this.hash(key);
    let bucket = this.hashTable[index];

    // If the the bucket is null, create a linked list and set it to the index
    if (bucket === null) {
      bucket = new LinkedList();
      this.hashTable[index] = bucket;

      // Append the key/value pair to the list
      bucket.append(key, value);
      this.size++;
      console.log(bucket.toString());
      return;
    }
    // Since the bucket exists, check it is not already in the list
    // If it is, update it
    if (bucket.containsKey(key)) {
      bucket.updateValue(key, value);
      console.log(bucket.toString());
      return;
    }
    // Otherwise add the new key/value pair
    bucket.append(key, value);
    this.size++;
    console.log(bucket.toString());
    return;
  }

  // Get value at a given key
  get(key) {
    const index = this.hash(key);
    let bucket = this.hashTable[index];
    if (bucket === null) return false;
    return bucket.getValue(key);
  }

  // Check if a key is present
  has(key) {
    const index = this.hash(key);
    let bucket = this.hashTable[index];
    return bucket.hasKey(key);
  }

  // Remove node using key
  remove(key) {
    const index = this.hash(key);
    let bucket = this.hashTable[index];
    return bucket.removeNode(key);
  }

  // Get number of stored keys
  length() {
    return this.size;
  }

  // Remove all entries in the hash map
  clear() {
    let newHashTable = new Array(this.numBuckets).fill(null);
    this.hashTable = newHashTable;
    this.size = 0;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("lion", "cheese");
test.set("ice cream,", "Tastes great");
test.set("chaaa", "Ooooh");
console.log(test.get("kite"));
console.log(test.get("frog"));
console.log(test.has("lion"));
console.log(test.has("chicken"));
console.log(test.remove("chicken"));
console.log(test.remove("lion"));
console.log(test.length());
console.log(test.clear());
console.log(test.length());
console.log(test.get("frog"));
