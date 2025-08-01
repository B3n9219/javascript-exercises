function sumRange(num) {
    if (num === 1 || num === 0) {
        return num
    }
    else {
        return num + sumRange(num-1)
    }
}
// console.log(sumRange(3))

function power(base, exponent) {

    if (exponent === 0) {
        return 1
    }
    else {
        return base * power(base, exponent - 1)
    }
}

function factorial(num) {
    if (num === 1) {
        return num
    }
    else {
        return num * factorial(num-1)
    }
}

function all (array, callback) {
    array.forEach(value => {
        if (!callback(value)) {
            return false
        }
    })
    return true
}

function productOfArray(array) {
    const copy = array
    if (array.length === 0) {
        return 1
    }
    else {
        return copy.shift() * productOfArray(copy)
    }
}
// console.log(productOfArray([1, 5, 6]))

function contains(object, searchValue) {
    for (const key in object) {
        const value = object[key]
        console.log(`key: ${key} value: ${value}`)
        if (value === searchValue) {
            return true
        }
        else if (value !== null && typeof value === "object") {
            return contains(value, searchValue)
        }
    }
    return false
}

function totalIntegers(array) {
    let total = 0
    for (const item of array) {
        if (Array.isArray(item)) {
            total += totalIntegers(item)
        }
        else if (Number.isInteger(item)) {
            total += 1
        }
    }
    return total
}

function SumSquares(array) {
    let sum = 0
    for (const item of array) {
        if (Array.isArray(item)) {
            sum += SumSquares(item)
        }
        else if (Number.isInteger(item)) {
            sum += item * item
        }
    }
    return sum
}

function replicate (times, value) {
    if (times <= 0) {
        return []
    }
    else {
        let arr = [value]
        return arr.concat(replicate(times-1, value))
    }
}
console.log(replicate(3, 5)) // [5, 5, 5]
console.log(replicate(1, 69)) // [69]
console.log(replicate(-2, 6)) // []
