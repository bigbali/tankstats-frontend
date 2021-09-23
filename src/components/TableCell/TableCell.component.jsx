import React from 'react';

const TableCell = ({ children, type, color }) => {
    let style = null;

    if (type && !color) {
        switch (type) {
            case "wn8":
                break
            case "wn7":
                break
            case "wtr":
                break
            case "wgr":
                break
            case "pr":
                break
            default:
                break
        }
    }
    else if (!type && color) {
        style = {
            backgroundColor: color
        }
    }

    return (
        <>
            <td style={style}>
                {children}
            </td>
        </>
    )
}

export default TableCell
