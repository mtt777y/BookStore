import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'
import { BookObject } from './BookObject'
import { BookEntity } from './BookEntity'

export class BookList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'books';
    }

    renderTable() {
        let tableData = this.state.tableData;

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <tbody>
                    {tableData.map(data =>
                        <BookEntity data={data} />
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
