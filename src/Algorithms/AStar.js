export default (startNode, endNode, nodes, setNodes) => {
    const findNeighbours = (node) => {
        const neighbours = [];
        for (let row = -1; row <= 1; row++) {
            for (let column = -1; column <= 1; column++) {
                if (!(row === 0 && column === 0)) {
                    let checkRow = node.row + row;
                    let checkColumn = node.column + column;

                    if (nodes.length > checkRow && checkRow >= 0 && nodes[0].length > checkColumn && checkColumn >= 0) {
                        neighbours.push(nodes[checkRow][checkColumn])
                    }
                }
            }
        }
        let helper = nodes;
        neighbours.forEach(node => {
            helper[node.row][node.column] = { ...helper[node.row][node.column], isNeighbour: true };
        });

        setNodes([...helper]);
        return neighbours;
    }

    const calculateNodeToNode = (node, target) => {
        let dstRow = Math.abs(node.row - target.row);
        let dstColumn = Math.abs(node.column - target.column);

        if (dstRow > dstColumn) {
            return 14 * dstColumn + 10 * (dstRow - dstColumn);
        } else {
            return 14 * dstRow + 10 * (dstColumn - dstRow);
        }
    }

    const TrackPathBack = () => {
        let currentNode = endNode;

        while(startNode.row !== currentNode.row && startNode.column !== currentNode.column) {
            let helper = nodes;
            helper[currentNode.row][currentNode.column] = { ...helper[currentNode.row][currentNode.column], isNeighbour: false, isPath: true };
            setNodes([...helper]);
            console.log(currentNode)
            currentNode = currentNode.parent;
        }
    }

    let closedSet = new Set();
    let openSet = [];
    openSet.push(startNode);

    while (openSet.length > 0) {
        let currentNode = openSet[0];
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].fCost < currentNode.fCost || openSet[i].fCost === currentNode.fCost && openSet[i].hCost < currentNode.hCost) {
                currentNode = openSet[i];
            }
        }

        openSet = openSet.filter(node => node.row !== currentNode.row && node.column !== currentNode.column);
        closedSet.add(currentNode);

        if (currentNode.row === endNode.row && currentNode.column === endNode.column) {
            TrackPathBack();
            return;
        }

        findNeighbours(currentNode).forEach(neighbour => {
            if (closedSet.has(neighbour)) {
                return;
            }
            let newMovementCostToNEighbour = currentNode.gCost + calculateNodeToNode(currentNode, neighbour);
            if (newMovementCostToNEighbour < neighbour.gCost || openSet.filter(node => node.row === neighbour.row && node.column === neighbour.column).length === 0) {
                neighbour.gCost = newMovementCostToNEighbour;
                neighbour.hCost = calculateNodeToNode(neighbour, endNode);
                neighbour.fCost = neighbour.gCost + neighbour.hCost;
                neighbour.parent = currentNode;

                if (openSet.filter(node => node.row === neighbour.row && node.column === neighbour.column).length === 0) {
                    openSet.push(neighbour)
                }
                let helper = nodes;
                helper[neighbour.row][neighbour.column] = { ...helper[neighbour.row][neighbour.column], fCost: neighbour.fCost };
                setNodes([...helper]);
            }
        });
    }


}
