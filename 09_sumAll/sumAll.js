const sumAll = function(num1, num2) {
    let sum = 0
    let min = num1;
    let max = num2;
    if (num1 > num2) {
        max = num1;
        min = num2;
    }

    let count = 0
    while ((min + count) <= max) {
        sum += (min +count)
        count += 1
    }
    return sum;
};
// Do not edit below this line
module.exports = sumAll;
