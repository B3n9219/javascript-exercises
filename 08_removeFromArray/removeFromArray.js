const removeFromArray = function(array, ...values) {
    let finalArray = [];
    for (let item of array) {
        console.log("item", item);
        if (!values.includes(item)) {
            finalArray.push(item);
        }
    }
    return finalArray;

};
// Do not edit below this line
module.exports = removeFromArray;
