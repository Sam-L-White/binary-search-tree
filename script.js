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


    array = array.sort(function(a, b){return a - b})
    let uniqueArray = [...new Set(array)]


    let root = buildTree(uniqueArray, 0, uniqueArray.length - 1)

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

    const nodeDepth = (inputNode, currentRoot = root, counter = 0) => {
        if(currentRoot === null || inputNode.data === currentRoot.data){
            return counter
        } else if (inputNode.data < currentRoot.data){
            counter++
            return nodeDepth(inputNode, currentRoot.left, counter)
        } else {
            counter++
            return nodeDepth(inputNode, currentRoot.right, counter)
        }
    }

    const isBalanced = (currentRoot = root) => {
        
        const leftHeight = nodeHeight(currentRoot.left);
        const rightHeight = nodeHeight(currentRoot.right);
        const difference = Math.abs(leftHeight - rightHeight);
        if(difference > 1){
            return false
        } else {
            return true
        }
    }

    const rebalance = (currentRoot = root) => {
        let newArray = levelOrder(currentRoot)
        newArray = newArray.sort(function(a, b){return a - b})
        return root = buildTree(newArray, 0, newArray.length - 1)
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

    return{get root(){return root}, insertNode, deleteNode, find, levelOrder, preOrder, inOrder, postOrder, nodeHeight, nodeDepth, isBalanced, rebalance}
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

const driver = (() => {
    const array = Array(10).fill().map(() => Math.floor(100 * Math.random()))
    let treeResult = (tree(array))
    console.log(treeResult.isBalanced())
    console.log(treeResult.levelOrder())
    console.log(treeResult.preOrder())
    console.log(treeResult.inOrder())
    console.log(treeResult.postOrder())
    treeResult.insertNode(105)
    treeResult.insertNode(110)
    treeResult.insertNode(120)
    treeResult.insertNode(130)
    console.log(treeResult.isBalanced())
    treeResult.rebalance()
    console.log(treeResult.isBalanced())
    console.log(treeResult.levelOrder())
    console.log(treeResult.preOrder())
    console.log(treeResult.inOrder())
    console.log(treeResult.postOrder())
})()