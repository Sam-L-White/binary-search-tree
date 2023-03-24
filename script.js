const node = (data, left = null, right = null) => {
    return{data, left, right}
}

function buildTree(array, startIndex, endIndex){
    if(startIndex > endIndex){
        return null
    }
    let midIndex = Math.floor((startIndex + endIndex) / 2)
    let root = node(array[midIndex])
    root.left = buildTree(array, startIndex, midIndex - 1)
    root.right = buildTree(array, midIndex + 1, endIndex)
    return root
}

const tree = (array) => {

    let root = buildTree(array, 0, array.length - 1)

    const insertNode = (input, currentRoot = root) => {
        if(input < currentRoot.data){
            if(currentRoot.left !== null){
                insertNode(input, currentRoot.left)
            } else {
                currentRoot.left = node(input)
            } 
        } else {
            if(currentRoot.right !== null){
                insertNode(input, currentRoot.right)
            } else {
                currentRoot.right = node(input)
            } 
        }
    }

    const deleteNode = (input, currentRoot = root) => {
        if(currentRoot === null){
            return currentRoot
        }
        if(input < currentRoot.data){
            currentRoot.left = deleteNode(input, currentRoot.left)
        } else if(input > currentRoot.data){
            currentRoot.right = deleteNode(input, currentRoot.right)
        } else {
            if(currentRoot.left == null){
                return currentRoot.right
            } else if(currentRoot.right == null){
                return currentRoot.left
            } else {
                currentRoot.data = minValue(currentRoot.right)
                currentRoot.right = deleteNode(currentRoot.right, currentRoot.data)
            }
        }
        return currentRoot
    }

    function minValue(root){
    let minv = root.data;
        while (root.left != null)
        {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    return{get root(){return root}, insertNode, deleteNode}
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let array = [1,2,4,5,9,10,14]
let treeResult = (tree(array))

prettyPrint(treeResult.root)
treeResult.deleteNode(14)
prettyPrint(treeResult.root)
treeResult.deleteNode(9)
prettyPrint(treeResult.root)
treeResult.deleteNode(10)
prettyPrint(treeResult.root)