/**
 75 - 0/0
95 64 - 1/1
17 47 82 - 2/3
18 35 87 10 - 3/6
20 04 82 47 65 - 4/10
19 01 23 75 03 34 - 5/15
88 02 77 73 07 63 67 - 
99 65 04 28 06 16 70 92
41 41 26 56 83 40 80 70 33
41 48 72 33 47 32 37 16 94 29
53 71 44 65 25 43 91 52 97 51 14
70 11 33 28 77 73 17 78 39 68 17 57
91 71 52 38 17 14 91 43 58 50 27 29 48
63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23


              75
             95 64
            17 47 82
           18 35 87 10
          20 04 82 47 65
         19 01 23 75 03 34
        88 02 77 73 07 63 67
       99 65 04 28 06 16 70 92
      41 41 26 56 83 40 80 70 33
     41 48 72 33 47 32 37 16 94 29
    53 71 44 65 25 43 91 52 97 51 14
   70 11 33 28 77 73 17 78 39 68 17 57
  91 71 52 38 17 14 91 43 58 50 27 29 48
 63 66 04 68 89 53 67 30 73 16 69 87 40 31
04 62 98 27 23 09 70 98 73 93 38 53 60 04 23
 */

const f = (row, offset) => row * (row + 1) / 2 + offset
const finv = (index, height) => {
    let row = 0
    while(row <= height) {
        let index1 = f(row, 0)
        let index2 = f(row+1, 0)

        if (index <= index2 && index >= index1) {
            return [row, index - index1]
        }
        row++
    }

    return row
}

const height = (area) =>  {
    let index = 0
    let row = 0
    while(index < area - row) {
        index = f(row, 0)
        row++
    }
    return row
}

const triangle = [75, 95, 64, 17, 47, 82, 18, 35, 87, 10, 20, 4, 82, 47, 65, 19, 1, 23, 75, 3, 34, 88, 2, 77, 73, 7, 63, 67, 99, 65, 4, 28, 06, 16, 70, 92, 41, 41, 26, 56, 83, 40, 80, 70, 33, 41, 48, 72, 33, 47, 32, 37, 16, 94, 29, 53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14, 70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57, 91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48, 63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31, 04, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23] 

console.log(`height is: ${height(triangle.length)}`)
 
const rsum = (numbers, row, offset) => {
    console.log(`row is ${row} offset is ${offset} height is ${height(numbers.length)}`)
    if (row >= height(numbers.length)) {
        return 0
    }

    console.log(`numbers[f(${row}, ${offset})] is ${numbers[f(row, offset)]}`)
    return numbers[f(row, offset)] + Math.max(rsum(numbers, row+1, offset), rsum(numbers, row+1, offset+1))
}

const dpsum = (numbers) => {
    const totals = new Array(numbers.length + height(numbers.length) + 1)
    for (let i = numbers.length; i <= numbers.length + height(numbers.length)+1; i++) {
        totals[i] = 0
    }

    for (let i = numbers.length-1; i >= 0; i--) {
        offsets = finv(i, numbers.length)
        console.log(`i is ${i}, offsets are ${offsets}`)
        console.log(`totals[${f(offsets[0]+1, offsets[1])}] is ${totals[f(offsets[0]+1, offsets[1])]}`)
        console.log(`totals[${f(offsets[0]+1, offsets[1]+1)}] is ${totals[f(offsets[0]+1, offsets[1]+1)]}`)
        console.log(`settings totals[${i}] to ${numbers[i]} + max of above`)
        
        totals[i] = numbers[i] + Math.max(totals[f(offsets[0]+1, offsets[1])], totals[f(offsets[0]+1, offsets[1]+1)])
    }

    return totals[0]
}



// console.log(rsum(triangle, 0, 0))
console.log(dpsum(triangle))