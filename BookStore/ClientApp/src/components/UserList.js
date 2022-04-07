import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'
import { UserObject } from './UserObject'

export class UserList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'users';
    }

    renderTable() {
        let tableData = this.state.tableData;

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(Data =>
                        <tr key={Data.id}>
                            <td>{Data.id}</td>
                            <td>{Data.name}</td>
                            <td>{Data.role.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderObject() {
        return (
            <div>
                <p><UserObject controller={this.baseController} parent={this} /></p>
                <p>
                    <button onClick={this.CancelNew}>
                        Отменить
                    </button>
                </p>
            </div>
        );
    }
}
