import React, { useState } from 'react';

// import compnents
import CanvasType from './CanvasType';
import DynamicCanvasBar from '../DynamicCanvas/DynamicCanvasBar/DynamicCanvasBar';
import GridCanvasBar from '../GridCanvas/GridCanvasBar/GridCanvasBar';

// import css file
import './style.css';

const OptionsBar = ({ barType, setBarType }) => {

    return (
        <CanvasType setBarType={setBarType} />
    )
}

export default OptionsBar
