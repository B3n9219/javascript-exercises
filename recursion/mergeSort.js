function mergeSort(array) {
    if (array.length <= 1) {
        return array
    }
    else {
        const half = array.length / 2
        const array1 = mergeSort(array.slice(0, Math.floor(half)))
        const array2 = mergeSort(array.slice(Math.floor(half), array.length))
        let sortedArray = []
        let sorted = false
        let index1 = 0
        let index2 = 0
        while (!sorted) {
            const item1 = array1[index1]
            const item2 = array2[index2]

            if (item1 <= item2) {
                sortedArray.push(item1)
                index1++
            } else if (item1 >= item2){
                sortedArray.push(item2)
                index2++
            } else {
                if (item1 === undefined && item2 === undefined) {
                    sorted = true
                } else if (item1 === undefined) {
                    sortedArray.push(item2)
                    index2++
                } else if (item2 === undefined) {
                    sortedArray.push(item1)
                    index1++
                }
            }
        }
        return sortedArray
    }
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1, 65, 23, 121, 68, 43, 245]))


