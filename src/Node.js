// Look up why changing constructor function from class function changed the object. 

const Node = (value = null, left = null, right = null) => {
    return {value, left, right}
}


module.exports = Node;
