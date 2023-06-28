const Node = require('./Node');



class Tree {
  constructor (array) {
    const sortedArray = Array.from(new Set(array1)).sort((a, b) => a - b)
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray, start, end) {
    if (start > end) {
        return null;
    }

    var mid = Math.floor((start + end) / 2);
    var root = new Node(sortedArray[mid]);

    root.left = buildTree(sortedArray, start, mid-1);
    root.right = buildTree(sortedArray, mid + 1, end);

    return root;
}
}

  const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };

function insert(value, currentNode = this.root) {
  if (currentNode === null) return Node(value);
  if (currentNode.value === value) return;

  if (value < currentNode.value) {
    currentNode.left = this.insert(value, currentNode.left)
  } else {
    currentNode.right = this.insert(value, currentNode.right);
  }
  return currentNode;
}

let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
// array1 = Array.from(new Set(array1)).sort((a, b) => a - b); //How to put this in the buildTree function to only occur once??
console.log(array1)
const tree = buildTree(array1, 0, array1.length - 1);
console.log(tree)
prettyPrint(tree)