/**
 * 
    DP strategy
    1. Come up with any brute force recursive solution.
        1a. Figure out the base case first. Usually very easy.
        1b. Look for any ways any parameters that can be decreased, then decrease it and ask yourself if knowing the result given that decreased parameter is useful in finding the result given the current parameters. Use this as the recursive case.
    2. Adjust your recursive function such that all parameters that change for recursive calls are integer function arguments.
    3. Count the number of changing integer parameters and create a new function that declares an array with that many dimensions to use as a cache.
    4. Examine the recursive function to see in which direction the integer parameters move for recursive calls. Then in your DP function, fill in the array by iterating the opposite direction.
    5. Return the element of the array corresponding to the original problem.
    6. Examine the array iteration order and see if you can get rid of the array to save space.
*/

const f = (x, y) => {
    let total = 0
    if (x > 0) {
        total += f(x-1, y)
    }

    if (y > 0) {
        total += f(x, y-1)
    }

    if (x === 0 && y === 0) {
        total += 1
    }

    return total
}

const fdp = (x, y) => {
    const totals = [...Array(x+1)].map(() => new Array(y+1))

    for (let xi = 0; xi <= x; xi++) {
        totals[xi][0] = 1
    }
    for (let yi = 0; yi <= y; yi++) {
        totals[0][yi] = 1
    }
    
    for (let xi = 1; xi <= x; xi++) {
        for (let yi = 1; yi <= y; yi++) {
            console.log(`xi: ${xi}, yi: ${yi}, totals[${xi-1}][${yi}]: ${totals[xi-1][yi]}, totals[${xi}][${yi-1}]: ${totals[xi][yi-1]}`)
            totals[xi][yi] = totals[xi][yi-1] + totals[xi-1][yi]
        }
    }

    return totals[x][y]
}

// console.log(f(6,6))
console.log(fdp(20,20))