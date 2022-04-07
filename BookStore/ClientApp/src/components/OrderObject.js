import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import App from '../App';
import { ObjectComponent } from './abstraction/ObjectComponent'

export class OrderObject extends ObjectComponent {
    constructor(prop) {
        super(prop);
        this.baseController = 'orders';
        this.AddBook = this.AddBook.bind(this);
        this.state = { addedbooks: []};
    }

    orderData;
    currBook;
    addedbooks;

    componentDidMount() {
        this.orderData = new OrderData();
        this.orderData.username = App.thisUser;
        this.addedbooks = []
    }

    AddBook() {
        //this.state.addedbooks.push(this.currBook);
        this.addedbooks.push(this.currBook);
        this.setState({ addedbooks: this.addedbooks })
    }

    render() {
        return (
            <div>
                <em>Book:</em>
                <p>
                    <input type="text" name="name" value={this.currBook} onChange={(event) => this.currBook = event.target.value} />
                </p>
                <p>
                    <button onClick={this.AddBook}>
                        Add book
                    </button>
                </p>
                <p>
                    {this.state.addedbooks.map(d =>
                        <p>
                            {d}
                        </p>
                    )}
                </p>
                <p>
                    <button onClick={this.SaveEntity}>
                        Save
                    </button>
                </p>
            </div>)
    }

    getContent() {
        this.orderData.books = this.addedbooks;
        this.orderData.username = App.thisUser;
        return (this.orderData)
    }
}

class OrderData {
    books;
    username;
}
