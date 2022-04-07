import React, { Component } from 'react';
import App from '../App';
import NavMenu from './NavMenu';
import { LoginPass } from './Autorization'
import '../custom.css'

export class Registration extends Component {
    constructor(prop) {
        super(prop);
        this.tryRegist = this.tryRegist.bind(this);
        this.state = { RegisterError: false, RegisterSuccess: false };
    }
    static displayName = "Registration Page";
    lp;

    componentDidMount() {
        this.lp = new LoginPass();
    }

    async tryRegist() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.lp)
        };

        const response = await fetch('regist', requestOptions);
        const data = await response.json();
        if (response.status == 201) {
            this.setState({ RegisterSuccess: true });
        }
        else {
            this.setState({ RegisterSuccess: false });
        }
    }

    render() {
        let contents;

        if (this.state.RegisterSuccess) {
            contents = <p><em>Success!</em></p>;
        }
        else {
            contents = this.state.RegisterError
                ? <p><em>Error!</em></p>
                : <p><em>Enter login and password...</em></p>;
        }

        return (
            <div>
                {contents}
                <p>
                    <em>Login:</em>
                    <input type="text" name="login" onChange={(event) => this.lp.Login = event.target.value}/>
                </p>
                <p>
                    <em>Password:</em>
                    <input type="password" name="pass" onChange={(event) => this.lp.Pass = event.target.value}/>
                </p>
                <p>
                    <button onClick={this.tryRegist}>
                        Register
                    </button>
                </p>
            </div>
        );
    }


}