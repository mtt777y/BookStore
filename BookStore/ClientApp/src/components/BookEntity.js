import React, { Component } from 'react';
import Cart from './Cart'

export class BookEntity extends Component {

    id;
    name;
    isbn;
    genre;
    author;

    constructor(props) {
        super(props);
        this.id = props.data.id;
        this.name = props.data.name;
        this.isbn = props.data.isbn;
        this.genre = props.data.genre;
        this.author = props.data.author;
    }

    render() {
        return (
            <div>
                <table className='table table-striped'>
                <tr>
                        <td class="col-md-1">{this.id}</td>
                        <td class="col-md-4">{this.name}</td>
                        <td class="col-md-2">{this.isbn}</td>
                        <td class="col-md-2">{this.genre}</td>
                        <td class="col-md-4">{this.author}</td>
                        <td class="col-md-2"><button onClick={(e) => this.onClickHandle()}>Add to cart!</button></td>
                </tr>
                </table>
            </div>)
    }

    onClickHandle() {
        Cart.increaseInfo(this);
    }
}
