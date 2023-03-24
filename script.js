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

    const insert = (input, currentRoot = root) => {
        if(input < currentRoot.data){
            if(currentRoot.left !== null){
                insert(input, currentRoot.left)
            } else {
                currentRoot.left = node(input)
            } 
        } else {
            if(currentRoot.right !== null){
                insert(input, currentRoot.right)
            } else {
                currentRoot.right = node(input)
            } 
        }
    }
    return{get root(){return root}, insert}
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
treeResult.insert(3)
treeResult.insert(11)
prettyPrint(treeResult.root)