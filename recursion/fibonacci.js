function fibs(num) {
    let sequence = []
    for (let i = 0; i < num; i++) {
        if (i === 0) {
            sequence.push(0)
        } else if (i === 1) {
            sequence.push(1)
        } else {
            sequence.push(sequence[i-2] + sequence[i-1])
        }
    }
    return sequence
}

function fibsRec(num) {
    if (num === 1) {
        return [0]
    }
    else if (num === 2) {
        return [0, 1]
    }
    else {
        const sequence = fibsRec(num-1)
        sequence.push(sequence[sequence.length-1] + sequence[sequence.length-2])
        return sequence
    }
}
console.log(fibsRec(5))
