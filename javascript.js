

class Node {
    constructor (value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function buildTree(array, start, end) {
    if (start > end) {
        return null;
    }

    var mid = Math.floor((start + end) / 2);
    var root = new Node(array[mid]);

    root.left = buildTree(array, start, mid-1);
    root.right = buildTree(array, mid + 1, end);

    return root;
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



let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
array1 = Array.from(new Set(array1)).sort((a, b) => a - b);
console.log(array1)
const tree = buildTree(array1, 0, array1.length - 1);
console.log(tree)
prettyPrint(tree)