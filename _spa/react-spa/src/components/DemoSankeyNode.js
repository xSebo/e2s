import React, { Component } from 'react';
import { Rectangle, Layer } from 'recharts';

// Built on top of code from xile611 at https://github.com/recharts/recharts/blob/db0f3f254f12d59583052e77a43822163c476c9f/demo/component/DemoSankeyNode.js

export default function DemoSankeyNode({ x, y, width, height, index, payload, containerWidth}) {
    const isOut = x + width + 6 > containerWidth;
    return (
        <Layer key={`CustomNode${index}`}>
            <Rectangle
                x={x} y={y} width={width} height={height}
                fill="#5192ca" fillOpacity="1"
            />
            <text
                textAnchor={isOut ? 'end' : 'start'}
                x={isOut ? x - 6 : x + width + 6}
                y={y + height / 2}
                fontSize="14"
                stroke="#333"
            >{payload.name}</text>
            <text
                textAnchor={isOut ? 'end' : 'start'}
                x={isOut ? x - 6 : x + width + 6}
                y={y + height / 2 + 13}
                fontSize="12"
                stroke="#333"
                strokeOpacity="0.5"
            >{payload.value + 'kW'}</text>
        </Layer>
    );
}