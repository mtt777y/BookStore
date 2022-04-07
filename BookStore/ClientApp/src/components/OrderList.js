import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'

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
                            <td>{Data.orderdate}</td>
                            <td>{Data.user.name}</td>
                            <td>{Data.bookcount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}
