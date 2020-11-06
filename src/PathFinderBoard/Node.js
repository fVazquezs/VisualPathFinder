import React from 'react';
import './Node.css';

const Node = ({ info }) => {
    const className = info.isStart ? 'is-start' : info.isEnd ? 'is-end' : info.isNeighbour? 'is-neighbour' : info.isPath? 'is-path' : '';
    return <div className={`node-square ${className}`} />
}

export default Node;