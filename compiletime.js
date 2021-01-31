

const files = [
    {
        name: "file1.go",
        time: 7,
        includes: ["file2.go", "file3.go"]
    },
    {
        name: "file2.go",
        time: 4,
        includes: [],
    },
    {
        name: "file3.go",
        time: 3,
        includes: ["file5.go"],
    },
    {
        name: "file5.go",
        time: 12,
        includes: []
    }
]


const compileTime = (files) => {
    let times = {};
    let graph = {};
    for (let file of files) {
        times[file.name] = file.time
        graph[file.name] = file.includes
    }

    // console.log(times)
    // console.log(graph)

    const reversed = reverseGraph(graph)
    const topo = topologicalBFS(reversed, getInDegrees(graph))

    let start = 0
    let maxTime = 0
    const finishTimes = {}
    for (let node of topo) {
        // start time for this file is the max of its dependency's end times
        start = graph[node].reduce((max, el) => {
            return finishTimes[el] ? (
                max < finishTimes[el] ? finishTimes[el] : max
            ) : 0
        }, 0)
        let finish = start + times[node]
        if (finish > maxTime) {
            maxTime = finish
        }
        finishTimes[node] = start + times[node]
    }

    return maxTime
}

const reverseGraph = (graph) => {
    let reversed = {}
    for (let node in graph) {
        for (let adj of graph[node]) {
            if (!reversed[adj]) {
                reversed[adj] = []
            }
            reversed[adj].push(node)
        }
    }

    return reversed
}

const getInDegrees = (graph) => {
    const inDegrees = []
    for (let node in graph) {
        inDegrees[node] = graph[node].length
    }

    return inDegrees
}

const topologicalBFS = (reversedGraph, inDegrees) => {
    const bfsQueue = []
    const topologicalOrdering = []
    for (let node in inDegrees) {
        if (inDegrees[node] === 0) {
            bfsQueue.push(node)
        }
    }

    while(bfsQueue.length > 0) {
        let node = bfsQueue.shift()
        
        // node is not dependency of anything else
        if (!reversedGraph[node]) {
            topologicalOrdering.push(node)
            continue
        }

        for (let parent of reversedGraph[node]) {
            inDegrees[parent] -= 1
            if (inDegrees[parent] === 0) {
                bfsQueue.push(parent)
            }
            topologicalOrdering.push(node)
        }
    }

    return topologicalOrdering
}

console.log(compileTime(files))