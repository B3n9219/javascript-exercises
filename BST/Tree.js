import { Node } from "./Node.js"

export class Tree {
    constructor(array) {
        this.array = this.format(array)
        this.root = null
    }
    buildTree(array = this.array) {
        if (array.length === 0) {
            return null
        }
        const mid = Math.floor(array.length/2)
        const node = new Node(array[mid])
        node.left = this.buildTree(array.slice(0, mid))
        node.right = this.buildTree(array.slice(mid + 1))
        if (array === this.array) {
            this.root = node
        }
        return node
    }
    insert(value, node=this.root) {
        if (value < node.data) {
            if (node.left) {
                this.insert(value, node.left)
            } else {
            node.left = new Node(value)
            }
        } else if (value > node.data) {
            if (node.right) {
                this.insert(value, node.right)
            } else {
                node.right = new Node(value)
            }
        }
    }
    find(value, node=this.root) {
        if (node) {
            if (value === node.data) {
                return node
            } else if (value < node.data) {
                return this.find(value, node.left)
            } else if (value > node.data) {
                return this.find(value, node.right)
            }
        }
        return null
    }
    findParent(value, node=this.root) {
        if (node && (node.left || node.right)) {
            if (value === node.left.data || value === node.right.data) {
                return node
            } else if (value < node.data) {
                return this.findParent(value, node.left)
            } else if (value > node.data) {
                return this.findParent(value, node.right)
            }
        }
        return null
    }

    deleteLeaf(node, nodeParent) {
        if (nodeParent === null) {
            this.root = null
        } else {
            if (nodeParent.left === node) {
                nodeParent.left = null
            } else if (nodeParent.right === node) {
                nodeParent.right = null
            }
        }
    }
    deleteSingleChild(node, nodeParent) {
        // One of node.left or node.right is empty
        // child is the node that will replace node's relation to nodeParent
        const child = node.left !== null ? node.left : node.right;
        if (nodeParent === null) {
            this.root = child
        }
        else {
            if (nodeParent.left === node) {
                nodeParent.left = child;
            } else if (nodeParent.right === node) {
                nodeParent.right = child;
            }
        }
    }

    deleteItem(value) {
        let node = null, nodeParent = null
        if (value === this.root.data) {
            node = this.root
        } else {
            nodeParent = this.findParent(value)
            node = this.find(value, nodeParent)
        }
        console.log("PARENT", nodeParent, "NODE", node)
        if (node.left === null && node.right === null) {
            this.deleteLeaf(node, nodeParent)
        } else if (node.left !== null && node.right !== null) {
            const nextBiggest = (() => {
                let found = false
                // starting with the right node to ensure that the found node is bigger than the original node
                let parent = node
                let current = node.right
                while (!found) {
                    if (current.left) {
                        parent = current
                        current = current.left
                    } else {
                        found = true
                        return { parent: parent, node: current}
                    }
                }
            })();
            node.data = nextBiggest.node.data
            if (nextBiggest.parent.right !== null) {
                this.deleteSingleChild(nextBiggest.node, nextBiggest.parent)
            } else {
                this.deleteLeaf(nextBiggest.node, nextBiggest.parent)
            }
        } else {
            this.deleteSingleChild(node, nodeParent)
        }
    }
    levelOrderForEach(callback) {
        if (!callback) {
            throw Error("No callback provided")
        }
        let node = this.root
        let queue = [];
        (function levelOrder(node) {
            if(!node) {
                return
            }
            queue.push(node)
            while(queue.length > 0) {
                let current = queue.shift()

                callback(current)

                if (current.left !== null) {
                    queue.push(current.left)
                }
                if (current.right !== null) {
                    queue.push(current.right)
                }
            }
        })(node)
    }
    levelOrderForEachRecursive(callback) {
        if (!callback) {
            throw Error("No callback provided")
        }
        let queue = [ this.root ];
        (function levelOrder() {
            let current = queue.shift()
            if (!current) {
                return;
            }
            callback(current)
            if (current.left !== null) {
                queue.push(current.left)
            }
            if (current.right !== null) {
                queue.push(current.right)
            }
            levelOrder()
        })();
    }
    preOrderForEach(callback) {
        if (!callback) {
            throw Error("No callback provided")
        }
        (function inOrder(node) {
            if (!node) {
                return null
            }
            callback(node)
            inOrder(node.left)
            inOrder(node.right)
        })(this.root);
    }
    inOrderForEach(callback) {
        if (!callback) {
            throw Error("No callback provided")
        }
        (function inOrder(node) {
            if (!node) {
                return null
            }
            inOrder(node.left)
            callback(node)
            inOrder(node.right)
        })(this.root);
    }
    postOrderForEach(callback) {
        if (!callback) {
            throw Error("No callback provided")
        }
        (function inOrder(node) {
            if (!node) {
                return null
            }
            inOrder(node.left)
            inOrder(node.right)
            callback(node)
        })(this.root);
    }
    height(value, node=this.find(value)) {
        if (!node) {
            return -1
        }
        const maxHeight = Math.max(this.height(null, node.left), this.height(null, node.right))
        return 1 + maxHeight
    }
    depth(value, node=this.root) {
        if (node) {
            if (value === node.data) {
                return 0
            } else if (value < node.data) {
                return 1 + this.depth(value, node.left)
            } else if (value > node.data) {
                return 1 + this.depth(value, node.right)
            }
        }
        return 0
    }
    isBalanced(node=this.root) {
        if (!node) {
            return true
        }
        const leftHeight = this.height(null, node.left)
        const rightHeight = this.height(null, node.right)
        const balanced = (() => {
            const difference = Math.abs(leftHeight - rightHeight)
            return difference <= 1;
        })()
        return balanced && this.isBalanced(node.left) && this.isBalanced(node.right)
    }
    rebalance() {
        let array = []
        this.inOrderForEach((node) => {
            array.push(node.data)
        })
        this.array = array
        this.buildTree(array)
    }
    format(array) {
        if (!this.isSorted(array)) {
            array = this.mergeSort(array)
        }
        array = this.removeDuplicates(array)
        return array
    }
    isSorted(array) {
        let prevItem = null
        for (let item of array) {
            if (prevItem > item) {
                return false
            }
            prevItem = item
        }
        return true
    }
    mergeSort(array) {
        if (array.length === 1) {
            return array
        } else {
            const mid = Math.floor(array.length/2)
            const left = this.mergeSort(array.slice(0, mid))
            const right = this.mergeSort(array.slice(mid, array.length))
            let sortedArray = []
            let leftIndex = 0, rightIndex = 0
            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] <= right[rightIndex]) {
                    sortedArray.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    sortedArray.push(right[rightIndex]);
                    rightIndex++;
                }
            }
            while (leftIndex < left.length) {
                sortedArray.push(left[leftIndex]);
                leftIndex++;
            }
            while (rightIndex < right.length) {
                sortedArray.push(right[rightIndex]);
                rightIndex++;
            }
            return sortedArray
        }
    }
    removeDuplicates(array) {
        let prevItem = null
        for (let i = 0; i < array.length; i++) {
            if (prevItem === array[i]) {
                array.splice(i, 1)
                i--
            } else {
                prevItem = array[i]
            }
        }
        return array
    }
}
