import { LinkedList } from "./LinkedList.js";

export class HashLinkedList extends LinkedList {
    constructor() {
        super();
    }
    containsEntry(key) {
        let current = this.head
        while (current !== null) {
            if (current.value.key === key) {
                return true
            }
            current = current.nextNode
        }
        return false
    }
    findEntry(key) {
        let current = this.head
        let count = 0
        while (current !== null) {
            if (current.value.key === key) {
                return count
            }
            current = current.nextNode
            count += 1
        }
        return null
    }
    getEntry(key) {
        let current = this.head
        while (current !== null) {
            if (current.value.key === key) {
                return current.value
            }
            current = current.nextNode
        }
        return null
    }
    getAllEntries() {
        let current = this.head
        if (this.head === this.tail && this.head !== null) {
            return [this.head]
        }
        let entries = []
        while (current !== null) {
            entries.push(current)
            current = current.nextNode
        }
        return entries
    }
}
