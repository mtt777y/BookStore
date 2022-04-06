import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BookList } from './components/BookList';
import { UserList } from './components/UserList';
import { OrderList } from './components/OrderList';
import { Autorization } from './components/Autorization';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    static token;
    static thisNav;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/user-list' component={UserList} />
                <Route path='/book-list' component={BookList} />
                <Route path='/order-list' component={OrderList} />
                <Route path='/loginpage' component={Autorization} />
            </Layout>
        );
    }

}