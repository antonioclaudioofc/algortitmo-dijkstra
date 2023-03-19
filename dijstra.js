// Graph

createGraph = (vertex) => Array(vertex).fill(0).map(() => Array(vertex).fill(0))

addEdge = (graph, u, v, weight) => {
    graph[u - 1][v - 1] = weight
    graph[v - 1][u - 1] = weight
}

showGraph = (graph) => {
    for (let i = 0; i < graph.length; i++) {
        console.log(`[${graph[i]}]`)
    }
}

// Heap

let element = 0
let heap = []

addElementsToHeap = (weight, index) => {
    heap.push([weight, index])
    element += 1
    child = element

    while (true) {
        if (child == 1) break
        parent = Math.floor(child / 2)

        if (heap[parent - 1][0] <= heap[child - 1][0]) break
        else {
            [heap[parent - 1], heap[child - 1]] = [heap[child - 1], heap[parent - 1]]

            child = parent
        }
    }
}

removeElementsFromHeap = () => {
    firstElement = heap[0]
    heap[0] = heap[element - 1]
    heap.pop()
    element -= 1

    parent = 1

    while (true) {
        child = 2 * parent

        if (child > element) break

        if (child + 1 <= element) {
            if (heap[child][0] < heap[child - 1][0]) {
                child += 1
            }
        }

        if (heap[parent - 1][0] <= heap[child - 1][0]) break
        else {
            [heap[child - 1], heap[parent - 1]] = [heap[parent - 1], heap[child - 1]]

            parent = child
        }
    }

    return firstElement
}

heapSize = () => element

showHeap = () => console.log(heap)

// Dijkstra 

dikstra = (graph, origin, vertex) => {
    cost = Array(vertex).fill([-9999, 0])
    cost[origin - 1] = [0, origin]

    addElementsToHeap(0, origin)

    while (heapSize() > 0) {
        [distance, v] = removeElementsFromHeap()

        for (let i = 0; i < vertex; i++) {
            if (graph[v - 1][i] != 0) {
                if (cost[i][0] == -9999 || cost[i][0] > distance + graph[v - 1][i]) {
                    cost[i] = [distance + graph[v - 1][i], v]
                    addElementsToHeap(distance + graph[v - 1][i], i + 1)
                }
            }
        }
    }

    return cost
}

const vertex = 7
const graph = createGraph(vertex)

addEdge(graph, 1, 2, 2)
addEdge(graph, 1, 4, 7)
addEdge(graph, 1, 7, 2)
addEdge(graph, 2, 3, 1)
addEdge(graph, 2, 4, 4)
addEdge(graph, 2, 5, 3)
addEdge(graph, 2, 7, 5)
addEdge(graph, 3, 5, 4)
addEdge(graph, 3, 7, 4)
addEdge(graph, 4, 5, 1)
addEdge(graph, 4, 6, 5)
addEdge(graph, 5, 6, 7)

showGraph(graph)

const source = 1
const target = 6

const solution = dikstra(graph, source, vertex)

let lastVertex = target;
const path = [lastVertex];

while (lastVertex != source) {
    for (let i = 0; i < solution.length; i++) {
        if (i == lastVertex - 1) {
            lastVertex = solution[i][1]
            path.push(lastVertex);
            break
        }
    }
}

console.log(path.reverse())