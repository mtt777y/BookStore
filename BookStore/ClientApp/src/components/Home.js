import React, { Component } from 'react';
import App from '../App';
import { Link } from 'react-router-dom';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

export class Home extends Component {
  static displayName = Home.name;

    render() {
        let content;
        if (App.token != undefined) {
            content = <p><em>Вы залогинены!</em></p>
        }
        else {
            content =
                <div>
                    <p><em>Авторизуйтесь</em></p>
                    <p><NavLink tag={Link} className="text-dark" to="/loginpage">Перейдите на страницу ввода логина и пароля</NavLink></p>
                </div>
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}
