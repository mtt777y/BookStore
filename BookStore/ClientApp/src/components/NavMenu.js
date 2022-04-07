import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import App from '../App';
import Cart from './Cart';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            LoginSuccess: false
        };
    }

    componentDidMount() {
        App.thisNav = this;
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        let content;
        if (this.state.LoginSuccess) {
            let adminconent;
            let adminconent2;

            if (App.thisRole == 'admin') {
                adminconent =
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/order-list">List of orders</NavLink>
                    </NavItem>;
                adminconent2 = 
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/user-list">List of users</NavLink>
                    </NavItem>
            }
            content =
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/book-list">List of books</NavLink>
                    </NavItem>
                {adminconent}
                {adminconent2}
                <Cart />
                </ul>

        }
        else {
            content =
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/loginpage">Sing in</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/register">Sing up</NavLink>
                </NavItem>
                </ul>

        }
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Book Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            {content}
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }


}
