import React from 'react'

const CanvasType = () => {
    return (
        <div className="canvas-type">
            <form>
                <select name="canvas-type">
                    <option value="Dynamic">Dynamic</option>
                    <option value="Grid">Grid</option>
                </select>
            </form>
        </div>
    )
}

export default CanvasType
