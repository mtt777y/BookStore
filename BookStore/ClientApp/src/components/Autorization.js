import React, { Component } from 'react';
import App from '../App';
import NavMenu from '../components/NavMenu';

import '../custom.css'

export class Autorization extends Component {
    constructor(prop) {
        super(prop);
        this.tryLogin = this.tryLogin.bind(this);
        this.state = { LoginError: false, LoginSuccess: false };
    }
    static displayName = "AutorizationPage";
    lp;

    componentDidMount() {
        this.lp = new LoginPass();
    }

    async tryLogin() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.lp)
        };

        const response = await fetch('token', requestOptions);
        const data = await response.json();
        if (response.status == 200) {
            App.token = data.access_token;
            this.setState({ LoginError: false, LoginSuccess: true });
            App.thisNav.setState({ LoginSuccess: true });
        }
        else {
            //this.setState.LoginError = true;
            this.setState({ LoginError: true });
        }
    }

    render() {
        let contents;

        if (this.state.LoginSuccess) {
            contents = <p><em>Успех!</em></p>;
        }
        else {
            contents = this.state.LoginError
                ? <p><em>Ошибка при вводе логина и пароля!</em></p>
                : <p><em>Введите логин и пароль...</em></p>;
        }

        return (
            <div>
                {contents}
                <p>
                    <em>Логин:</em>
                    <input type="text" name="login" onChange={(event) => this.lp.Login = event.target.value}/>
                </p>
                <p>
                    <em>Пароль:</em>
                    <input type="password" name="pass" onChange={(event) => this.lp.Pass = event.target.value}/>
                </p>
                <p>
                    <button onClick={this.tryLogin}>
                        Login
                    </button>
                </p>
            </div>
        );
    }


}

class LoginPass {
    Login;
    Pass;
}