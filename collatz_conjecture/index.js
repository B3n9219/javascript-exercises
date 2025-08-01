function collatz(n, steps = 0) {
    if (n === 1) {
        return steps
    }
    else if (n % 2 === 0) {
        return collatz(n/2, steps + 1)
    }
    else {
        return collatz(3 * n+1, steps + 1)
    }
}

console.log(collatz(34))
