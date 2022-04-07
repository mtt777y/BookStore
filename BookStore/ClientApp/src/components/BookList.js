import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'
import { BookObject } from './BookObject'

export class BookList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'books';
    }

    renderTable() {
        let tableData = this.state.tableData;

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>ISBN</th>
                        <th>Genre</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map(Data =>
                        <tr key={Data.id}>
                            <td>{Data.id}</td>
                            <td>{Data.name}</td>
                            <td>{Data.isbn}</td>
                            <td>{Data.genre}</td>
                            <td>{Data.author}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    renderObject() {
        return (
            <div>
                <p><BookObject controller={this.baseController} parent={this} /></p>
                <p>
                    <button onClick={this.CancelNew}>
                        Cancel
                    </button>
                </p>
            </div>
        );
    }
}
