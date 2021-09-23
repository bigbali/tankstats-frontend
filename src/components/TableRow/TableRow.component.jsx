import React from 'react'

const TableRow = ({columns, dataArray}) => {
    const row = columns.map((column, index) => {
        return dataArray[index]
    })

    return (
        <tr>
            
        </tr>
    )
}

export default TableRow
