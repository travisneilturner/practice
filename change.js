const coins = [1, 2, 5, 10, 20, 50]

let countChangePermutations = (target) => {
    const dfsQueue = []
    let count = 0
    dfsQueue.push(...coins.map(coin => [coin, coins.filter(c => c >= coin)]))

    while (dfsQueue.length > 0) {
        let node = dfsQueue.pop()
        if (node[0] === target) {
            count++
        } else {
            for (let option of node[1]) {
                if (node[0] + option <= target) {
                    let next = [node[0] + option, node[1].reduce((arr, ele) => {
                        if (ele >= option) {
                            arr.push(ele)
                        }

                        return arr
                    }, [])]
                    dfsQueue.push(next)
                }
            }
        }
    }

    return count
}

console.log(countChangePermutations(100))