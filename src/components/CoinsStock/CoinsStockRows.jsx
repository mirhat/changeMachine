import React, { Component } from "react";
import MaterialIcon from 'material-icons-react';
import {
    Table,
} from 'react-bootstrap';

class CoinsStockRows extends Component {
    render() {
        const rows = this.props.data.sort((a, b) => b.denomination - a.denomination).map((stock) => {
            return (
                <tr key={stock.id}>
                    <td>{stock.denomination}</td>
                    <td>{stock.numberOfItems}</td>
                    <td>
                        <button className={`icon-button mr-2`}><MaterialIcon icon="edit" size="small" onClick={() => this.props.handleEditIconClick(stock)} /></button>
                        <button className={'icon-button'}><MaterialIcon icon="delete" size="small" onClick={() => this.props.handleDeleteIconClick(stock.id)} /></button>
                    </td>
                </tr>
            );
        });
        return (
            <Table responsive hover striped>
                <thead>
                    <tr>
                        <td>Value</td>
                        <td>Number of items</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        )
    }
}

export default CoinsStockRows;