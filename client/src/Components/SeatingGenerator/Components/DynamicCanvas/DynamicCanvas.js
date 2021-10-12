import React, { useState } from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';

import DynamicCanvasBar from './DynamicCanvasBar/DynamicCanvasBar';

const generateShapes = () => {
    return [...Array(10)].map((_, i) => ({
        id: i.toString(),
        x: Math.random() * window.innerWidth/2,
        y: Math.random() * window.innerHeight/2,
        rotation: Math.random() * 280,
        isDragging: false,
    }));
}

const INITIAL_STATE = generateShapes();

const DynamicCanvas = () => {
    const [tableRows, setTableRows] = useState(0);
    const [tableColumns, setTableColumns] = useState(0);
    const [stars, setStars] = useState(INITIAL_STATE);
    console.log(stars);

    const handleDragStart = (e) => {
        const id = e.target.id();
        setStars(
        stars.map((star) => {
            return {
            ...star,
            isDragging: star.id === id,
            };
        })
        );
    };
    const handleDragEnd = (e) => {
        setStars(
        stars.map((star) => {
            return {
            ...star,
            isDragging: false,
            };
        })
        );
    };
 
    
    return (
        <>
            <DynamicCanvasBar tableRows={tableRows} tableColumns={tableColumns} setTableRows={setTableRows} setTableColumns={setTableColumns} />
            <Stage width={window.innerWidth/2} height={window.innerHeight/2} className="generator-ui" >
                <Layer>
                    <Text text="Try to drag a star" />
                    {stars.map((star) => (
                    <Star
                        key={star.id}
                        id={star.id}
                        x={star.x}
                        y={star.y}
                        numPoints={5}
                        innerRadius={20}
                        outerRadius={40}
                        fill="#89b717"
                        opacity={0.8}
                        draggable
                        rotation={star.rotation}
                        shadowColor="black"
                        shadowBlur={10}
                        shadowOpacity={0.6}
                        shadowOffsetX={star.isDragging ? 10 : 5}
                        shadowOffsetY={star.isDragging ? 10 : 5}
                        scaleX={star.isDragging ? 1.2 : 1}
                        scaleY={star.isDragging ? 1.2 : 1}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                    ))}
                </Layer>
            </Stage>
        </>
    )
}

export default DynamicCanvas
