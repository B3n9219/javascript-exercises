const fibonacci = function(index) {
    let firstPrevious = 1
    let secondPrevious = 0
    for (let i=2; i<=index; i++) {
        let current = firstPrevious + secondPrevious
        secondPrevious = firstPrevious
        firstPrevious = current
    }
    return firstPrevious;
};


// Do not edit below this line
module.exports = fibonacci;
