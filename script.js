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
    return{get root(){return root}}
}

let array = [1,2,3,4,5]
console.log(tree(array).root)

