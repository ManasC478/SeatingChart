import React from 'react';

import './style.css'

const CanvasType = ({ setBarType }) => {
    return (
        <div className="canvas-type">
            <form>
                <select name="canvas-type" onChange={(e) => setBarType(e.target.value)}>
                    <option value="dynamic">Dynamic</option>
                    <option value="grid">Grid</option>
                </select>
            </form>
        </div>
    )
}

export default CanvasType
