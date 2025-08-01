import { Tree } from "./Tree.js"

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
};

function logNodeData(node) {
    console.log(node.data)
}

const tree= new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 8, 6345, 324])
tree.buildTree()

prettyPrint(tree.root)
tree.insert(7000)
prettyPrint(tree.root)
tree.insert(8000)
prettyPrint(tree.root)
tree.insert(9000)
prettyPrint(tree.root)
console.log("BALANCED?", tree.isBalanced())
tree.rebalance()
prettyPrint(tree.root)
console.log(tree.depth(67))


// prettyPrint(([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 8, 6345, 324]))
