import React, { useEffect, useState } from 'react';
import Node from './Node';
import './PathFinderBoard.css';
import AStar from '../Algorithms/AStar';

const PathFinderBoard = () => {

    const [nodes, setNodes] = useState([]);

    const [startNode, setStartNode] = useState();
    const [endNode, setEndNode] = useState();

    useEffect(() => {
        const currentNodes = [];
        for (let row = 0; row < 60; row++) {
            const currentRow = [];
            for (let column = 0; column < 20; column++) {
                currentRow.push({
                    row,
                    column,
                    gCost: 0,
                    hCost: 0,
                    fCost: 0
                })
            }
            currentNodes.push(currentRow);
        }
        setNodes(currentNodes);
    }, []);

    const handleNodeClick = ({ row, column }) => {
        let helper = nodes;
        if (!startNode) {
            helper[row][column] = { ...helper[row][column], isStart: true };
            setStartNode(helper[row][column]);
        } else if (!endNode) {
            helper[row][column] = { ...helper[row][column], isEnd: true };
            setEndNode(helper[row][column]);
        }
        setNodes([...helper]);
    }

    const startSearch = () => {
        AStar(startNode, endNode, nodes, setNodes);
        console.log(startNode)
        console.log(endNode)
    }

    const clearBoard = () => {
        let helper = nodes.map(row => row.map(({ row, column }) => {
            return {
                row,
                column,
                gCost: 0,
                hCost: 0,
                fCost: 0
            }
        }))
        setEndNode(null);
        setStartNode(null);
        setNodes([...helper]);
    }

    return (
        <>
            <button onClick={startSearch}>Start</button>
            <button onClick={clearBoard}>Clear board</button>
            <div className='board'>
                {nodes.map((row, index) => (
                    <div className="row" key={index}>
                        {row.map((node, nodeIndex) => (
                            <div key={nodeIndex} onClick={() => handleNodeClick(node)}>
                                <Node info={node} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default PathFinderBoard;