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

    const find = (input, currentRoot = root) => {
        if(currentRoot === null || input === currentRoot.data){
            return currentRoot
        } else if (input < currentRoot.data){
            return find(input, currentRoot.left)
        } else {
            return find(input, currentRoot.right)
        }
    }

    const levelOrder = (currentRoot = root, outputArray = [], queue = []) => {
        if(currentRoot === null){
            return
        }
        outputArray.push(currentRoot.data)
        queue.push(currentRoot.left)
        queue.push(currentRoot.right)

        while(queue.length > 0){
            const newRoot = queue[0]
            queue.shift();
            levelOrder(newRoot, outputArray, queue)
        }

        return outputArray
        
    }

    const preOrder = (currentRoot = root, outputArray = []) => {
        if(currentRoot === null){
            return
        }
        outputArray.push(currentRoot.data)
        preOrder(currentRoot.left, outputArray)
        preOrder(currentRoot.right, outputArray)
        return outputArray
    }

    const inOrder = (currentRoot = root, outputArray = []) => {
        if(currentRoot === null){
            return
        }
        inOrder(currentRoot.left, outputArray)
        outputArray.push(currentRoot.data)
        inOrder(currentRoot.right, outputArray)
        return outputArray
    }

    const postOrder = (currentRoot = root, outputArray = []) => {
        if(currentRoot === null){
            return
        }
        postOrder(currentRoot.left, outputArray)
        postOrder(currentRoot.right, outputArray)
        outputArray.push(currentRoot.data)
        return outputArray
    }

    const nodeHeight = (currentRoot = root) => {
        if(currentRoot === null){
            return 0
        } else {
            let leftHeight = nodeHeight(currentRoot.left)
            let rightHeight = nodeHeight(currentRoot.right)
            if (leftHeight > rightHeight){
                return leftHeight + 1;
            } else {
                return rightHeight + 1;
            }
        }
        
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

    return{get root(){return root}, insertNode, deleteNode, find, levelOrder, preOrder, inOrder, postOrder, nodeHeight}
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
let nodeResult = treeResult.find(5)

prettyPrint(treeResult.root)
console.log(treeResult.nodeHeight(nodeResult))