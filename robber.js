const numbers = [1, 2, 3, 1]

let current = 0
let right = 0

for (let i = numbers.length-1; i >= 0; i--) {
    // make sure to record the new max \
    // numbers[i] + right => take this house
    // current => don't take this house
    let newCurrent = Math.max(numbers[i] + right, current)

    // update our two values
    right = current
    current = newCurrent
  
    console.log(`current: ${current}, right: ${right}`)
}

console.log(current)