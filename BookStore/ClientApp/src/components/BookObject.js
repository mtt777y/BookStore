import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import App from '../App';
import { ObjectComponent } from './abstraction/ObjectComponent'

export class BookObject extends ObjectComponent {
    constructor(prop) {
        super(prop);
        this.baseController = 'books';
    }

    bookData;

    componentDidMount() {
        this.bookData = new BookData();
    }

    render() {
        return (
            <div>
                <em>Name:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.bookData.entityName = event.target.value} />
                </p>
                <em>Genre:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.bookData.bookGenre = event.target.value} />
                </p>
                <em>Author:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.bookData.bookAuthor = event.target.value} />
                </p>
                <em>ISBN:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.bookData.bookISBN = event.target.value} />
                </p>
                <p>
                    <button onClick={this.SaveEntity}>
                        Save
                    </button>
                </p>
            </div>)
    }

    getContent() {
        return (this.bookData)
    }
}

class BookData {
    entityName;
    bookGenre;
    bookAuthor;
    bookISBN;
}
