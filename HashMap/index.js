import { HashLinkedList } from "./HashLinkedList.js";

class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.buckets = new Array(capacity).fill(null).map(() => new HashLinkedList())
    }
    hash(key) {
        let hashCode = 0
        const primeNum = 31
        for (let i =0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode
    }
    resize() {
        const oldEntries = this.entries()
        this.capacity *= 2
        this.buckets = new Array(this.capacity).fill(null).map(() => new HashLinkedList())
        oldEntries.forEach(entry => {
            this.set(entry[0], entry[1])
        })
    }
    checkOutOfBounds(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
    }
    set(key, value) {
        if (this.length >= this.capacity * this.loadFactor) {
            this.resize()
        }
        const hashedKey = this.hash(key)
        this.checkOutOfBounds(hashedKey)
        const entry = new Entry(key, value)
        let bucket = this.buckets[hashedKey]
        if (bucket.head === null) {
            bucket.append(entry)
        } else {
            const existingEntry = bucket.getEntry(key)
            if (existingEntry) {
                existingEntry.value = entry.value
            } else {
                bucket.append(entry)
            }
        }
    }
    get(key) {
        const hashedKey = this.hash(key)
        this.checkOutOfBounds(hashedKey)
        const entry = this.buckets[hashedKey].getEntry(key)
        if (entry) {
            return entry.value
        }
        return null

    }
    has(key) {
        const hashedKey = this.hash(key)
        this.checkOutOfBounds(hashedKey)
        return this.buckets[hashedKey].containsEntry(key)
    }
    remove(key) {
        const hashedKey = this.hash(key)
        this.checkOutOfBounds(hashedKey)
        const buckets = this.buckets[hashedKey]
        if (buckets.containsEntry(key)) {
            const entryIndex = buckets.findEntry(key)
            buckets.removeAt(entryIndex)
        }
    }
    get length() {
        let count = 0
        for (let bucket of this.buckets) {
            count += bucket.size
        }
        return count
    }
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = new HashLinkedList()
        }
    }
    keys() {
        const entries = this.entries()
        return entries.map(entry => entry[0])
    }
    values() {
        const entries = this.entries()
        return entries.map(entry => entry[1])
    }
    entries() {
        let entries = []
        this.buckets.forEach((bucket) => {
            const bucketEntries = bucket.getAllEntries()
            if (bucketEntries.length !== 0) {
                entries = entries.concat(bucketEntries.map(entry => [entry.value.key, entry.value.value]))
            }
        })
        return entries
    }
}

class Entry {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}

const hashMap = new HashMap(0.75, 16)
hashMap.set('apple', 'red')
hashMap.set('banana', 'yellow')
hashMap.set('carrot', 'orange')
hashMap.set('dog', 'brown')
hashMap.set('elephant', 'gray')
hashMap.set('frog', 'green')
hashMap.set('grape', 'purple')
hashMap.set('hat', 'black')
hashMap.set('ice cream', 'white')
hashMap.set('jacket', 'blue')
hashMap.set('kite', 'pink')
hashMap.set('lion', 'golden')
hashMap.set('adsda', 'golden')
console.log(hashMap.buckets, "buckets", hashMap.buckets.length, "items", hashMap.length)
console.log(hashMap.get("lion"))

