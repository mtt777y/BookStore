import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import App from '../App';
import { ObjectComponent } from './abstraction/ObjectComponent'

export class UserObject extends ObjectComponent {
    constructor(prop) {
        super(prop);
        this.baseController = 'users';
    }

    userData;

    componentDidMount() {
        this.userData = new UserData();
    }

    render() {
        return (
            <div>
                <em>Name:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.userData.entityName = event.target.value} />
                </p>
                <em>Password:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.userData.userPass = event.target.value} />
                </p>
                <em>Role:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.userData.userRole = event.target.value} />
                </p>
                <p>
                    <button onClick={this.SaveEntity}>
                        Save
                    </button>
                </p>
            </div>)
    }

    getContent() {
        return (this.userData)
    }
}

class UserData {
    entityName;
    userPass;
    userRole;
}
