const Node = require('./Node');



class Tree {
  constructor (array) {
    const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b)
    this.root = this.buildTree(sortedArray);
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) {
        return null;
    }

    var mid = Math.floor(sortedArray.length / 2);
    var root = Node(sortedArray[mid]);

    root.left = this.buildTree(sortedArray.slice(0, mid));
    root.right = this.buildTree(sortedArray.slice(mid+1));

    return root;
  }

  insert (value, currentNode = this.root) {
    if (currentNode === null) return Node(value);
    if (currentNode.value === value) return;

    if (value < currentNode.value) {
      currentNode.left = this.insert(value, currentNode.left)
    } else {
      currentNode.right = this.insert(value, currentNode.right);
    }
    return currentNode;
  }


  //Come back to this to full grasp it. 
  delete (value, currentNode = this.root) { 
    if (currentNode === null) return currentNode;
    if (currentNode.value === value) {
      currentNode = this.#removeNode(currentNode);
    } else if (currentNode.value > value) {
      currentNode.left = this.delete(value, currentNode.left);
    } else if (currentNode.value < value) {
      currentNode.right = this.delete(value, currentNode.right);
    }
    return currentNode;
  }
  
  #removeNode(node) {
    if (node.left && node.right) {
      const successorNode = this.#inorderSuccessorFor(node.right);
      node.value = successorNode.value;
      node.right = this.delete(successorNode.value, node.right);
      return node;
    } else {
      const replacementNode = node.right || node.left;
      node = null;
      return replacementNode;
    }
  }

  #inorderSuccessorFor(node) {
    let currentNode = node;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
  
  find (value, currentNode = this.root) {
    if (currentNode === null || currentNode.value === value) return currentNode;

    if (currentNode.value > value) {
      return this.find(value, currentNode.left);
    } else if( currentNode.value < value) {
      return this.find(value, currentNode.right);
    } 
  }

  levelOrder (callBack) {
    let current = this.root;
    const queue = [current];
    const result = [];
    console.log(current)
    while (queue.length > 0) {
      result.push(queue);
      queue.splice(0,1)
      if (current.left) {
        queue.push(current.left);
      }
      if(current.right) {
        queue.push(current.right);
        current = queue[0];
      }
    }
    if(callBack) return callBack(result);
    return result;

    }


  
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}




let array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree(array1);
console.log(tree)
tree.prettyPrint();
tree.insert(24)
tree.prettyPrint();
tree.delete(67);
tree.prettyPrint();
console.log(tree.levelOrder());
