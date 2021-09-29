import React from 'react';

// import compnents
import CanvasType from './Components/CanvasType';
import DynamicCanvasBar from './Components/DynamicCanvasBar/DynamicCanvasBar';

const OptionsBar = () => {
    return (
        <section className="options-bar">
            <CanvasType />
            <DynamicCanvasBar />
        </section>
    )
}

export default OptionsBar
