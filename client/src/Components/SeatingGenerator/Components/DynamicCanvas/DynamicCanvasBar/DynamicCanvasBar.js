import React, { useState } from 'react';

// import material ui icons
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// import css file
import './style.css'

const DynamicCanvasBar = ({ tableRows, setTableRows, tableColumns, setTableColumns }) => {

    return (
        <section className="dynamic-bar">
            <div className="insert-table">
                <form>
                    <label htmlFor="table-rows"><input type="number" min="0" value={tableRows} onChange={e => setTableRows(parseInt(e.target.value) || '')} /> Rows</label>
                    <label htmlFor="table-columns"><input type="number" min="0" value={tableColumns} onChange={(e) => setTableColumns(parseInt(e.target.value) || '')} /> Columns</label>
                </form>
            </div>
            <div className="dynamic-bar-divider"></div>
            <TablePreview tableRows={tableRows} tableColumns={tableColumns} />
        </section>
    )
}

const TablePreview = ({ tableRows, tableColumns }) => {
    let tableArr;
    if (!tableRows || !tableColumns) {
        tableArr = [];
    }
    else {
        tableArr = Array(tableRows * tableColumns);
    }
    
    return (
        <div className="table-preview">
            <h2>Table Preview</h2>
            <div className="table-display" style={{ display: 'grid', gridTemplateRows: '1fr '.repeat(tableRows), gridTemplateColumns: '1fr '.repeat(tableColumns) }}>
                {
                    [...tableArr].map((cell, index) => {
                        return (
                            <span key={index}></span>
                        );
                    })
                }
            </div>
            <p style={{display: tableArr.length ? 'block' : 'none'}}>{tableRows} x {tableColumns}</p>
        </div>
    );
}

export default DynamicCanvasBar