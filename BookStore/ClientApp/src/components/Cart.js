import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {OrderData} from './OrderObject';
import App from '../App';
import ObjectComponent from './abstraction/ObjectComponent';

export default class Cart extends Component {
    static data = [];
    static dataPk = [];
    static defCart;

    static increaseInfo(newData) {
        Cart.data.push(newData);
        Cart.dataPk.push(newData.id);
        Cart.defCart.setState({ data: Cart.data, count: 1 + Cart.defCart.state.count, orderCompete: false });
    }

    constructor(props) {
        super(props);
        this.state = { data: '', count: 0, orderCompete: false };
        Cart.defCart = this;
    }

    render() {
        let contains;
        if (this.state.orderCompete) {
            contains = 'Order Compete!';
        }
        else {
            contains = this.state.count == 0
                ? 'empty'
                : this.state.data.map(dataSet => <p>{dataSet.name}</p>);
        }



        return (
            <div>
                <p>Cart: {this.state.count} books</p>
                {contains}
                <button onClick={(e) => this.onClickHandle()}>Create Order!</button>
            </div>
        );
    }

    async onClickHandle() {
        let orderData = new OrderData()
        orderData.books = Cart.dataPk;
        orderData.username = App.thisUser;

        const requestOptions = ObjectComponent.getRequest(orderData);

        const response = await fetch('api/orders', requestOptions);
        const data = await response.json();
        if (response.status == 201) {
            this.afterSave();
        }
    }

    afterSave() {
        this.setState({ data: '', count: 0, orderCompete: true });
        Cart.data = [];
        Cart.dataPk = [];
    }
}
