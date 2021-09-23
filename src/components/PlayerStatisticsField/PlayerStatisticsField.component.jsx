import React from 'react';
import TableCell from '../TableCell';
import './PlayerStatisticsField.style.scss';

const PlayerStatisticsField = ({ data }) => {
    // TODO: custom table with custom table cells
    return (
        <table className="player-statistics-field">
            <thead>
                <tr>
                    <th></th>
                    <th>Total</th>
                    <th>24 Hours</th>
                    <th>7 Days</th>
                    <th>30 Days</th>
                    <th>1000 battles</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Battles</td>
                    <TableCell>{data.statistics.random.battles}</TableCell>
                    <td></td>
                </tr>
                <tr>
                    <td>Victories</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Defeats</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Draws</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
                <tr></tr>
            </tbody>
            <tfoot></tfoot>
        </table>
    )
}

export default PlayerStatisticsField
