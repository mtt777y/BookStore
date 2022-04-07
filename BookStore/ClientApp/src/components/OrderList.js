import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'
import { OrderObject } from './OrderObject'

export class OrderList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'orders';
    }

    renderTable() {
        let tableData = this.state.tableData;

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>OrderDate</th>
                        <th>User</th>
                        <th>Book Count</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(Data =>
                        <tr key={Data.id}>
                            <td>{Data.id}</td>
                            <td>{Data.orderDate}</td>
                            <td>{Data.user.name}</td>
                            <td>{Data.count}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderObject() {
        return (
            <div>
                <p><OrderObject controller={this.baseController} parent={this} /></p>
                <p>
                    <button onClick={this.CancelNew}>
                        Cancel
                    </button>
                </p>
            </div>
        );
    }
}
