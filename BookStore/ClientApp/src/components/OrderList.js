import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'
import { OrderObject } from './OrderObject'
import { OrderEntity } from './OrderEntity'

export class OrderList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'orders';
    }

    renderTable() {
        let tableData = this.state.tableData;

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <tbody>
                    {tableData.map(data =>
                        <OrderEntity data={data} />
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
