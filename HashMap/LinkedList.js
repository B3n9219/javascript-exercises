export class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }
    append(value) {
        const node = new Node(value)
        if (this.head === null) {
            this.head = node
            this.tail = this.head
        } else {
            this.tail.nextNode = node
            this.tail = node
        }
    }
    prepend(value) {
        const node = new Node(value)
        if (this.head === null) {
            this.tail = node
            this.head = this.tail
        } else {
            node.nextNode = this.head
            this.head = node
        }
    }
    get size() {
        let size = 0
        let current = this.head
        if (this.head === this.tail && this.head !== null) {
            return 1
        }
        while (current !== null) {
            current = current.nextNode
            size++
        }
        return size
    }
    at(index) {
        let current = this.head
        let count = 0
        while (count < index) {
            if (current) {
                current = current.nextNode
                count += 1
            } else {
                return null
            }
        }
        return current
    }
    pop() {
        if (this.head === null) {
            return null
        }
        if (this.head === this.tail) {
            const value = this.head.value
            this.head = null
            this.tail = null
            return value
        } else {
            let current = this.head
            while (current.nextNode !== this.tail) {
                current = current.nextNode
            }
            this.tail = current
            const removedValue = current.nextNode.value
            current.nextNode = null
            return removedValue
        }
    }
    contains(value) {
        let current = this.head
        while (current !== null) {
            if (current.value === value) {
                return true
            }
            current = current.nextNode
        }
        return false
    }
    find(value) {
        let current = this.head
        let count = 0
        while (current !== null) {
            if(current.value === value) {
                return count
            }
            current = current.nextNode
            count += 1
        }
        return null
    }
    toString() {
        let current = this.head
        let string = ""
        while (current !== null) {
            string += `( ${current.value} ) -> `
            current = current.nextNode
        }
        string += "null"
        return string
    }
    insertAt(value, index) {
        let current = this.head
        let count = 0
        if (index === 0) {
            this.prepend(value)
            return
        }
        while (count < index - 1) {
            if (current === null) {
                return
            }
            current = current.nextNode
            count += 1
        }
        const node = new Node(value)
        node.nextNode = current.nextNode
        current.nextNode = node
        if (node.nextNode === null) {
            this.tail = node
        }
    }
    removeAt(index) {
        let current = this.head
        let count = 0
        if (index === 0) {
            const size = this.size
            if (size === 1) {
                this.head = null
                this.tail = null
            } else {
                this.head = current.nextNode
            }
            return
        }
        while (count < index) {
            current = current.nextNode
            count += 1
        }
        const deletionNode = current.nextNode
        current.nextNode = deletionNode.nextNode
        if (current.nextNode === null) {
            this.tail = current
        }
    }

}

class Node {
    constructor(value = null, nextNode = null) {
        this.value = value
        this.nextNode = nextNode
    }
}

// const list = new LinkedList();
//
// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");
//
// console.log(list.toString())
