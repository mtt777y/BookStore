import { Modal } from 'bootstrap';
import React, { Component } from 'react';
import App from '../../App';

export class ObjectComponent extends Component {
    baseController;
    entityName;
    parent;

    constructor(props) {
        super(props);
        this.baseController = props.controller;
        this.parent = props.parent;
        this.SaveEntity = this.SaveEntity.bind(this);
    }

    render() {
        return (
            <div>
                <em>Name:</em>
                <p>
                    <input type="text" name="name" value={this.entityName} onChange={(event) => this.entityName = event.target.value}/>
                </p>
                <p>
                    <button onClick = {this.SaveEntity}>
                        Save
                    </button>
                </p>
            </div>)
    }

    getContent() {
        return (this.entityName)
    }

    static getRequest(postedContent) {
        return (
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + App.token
                },
                body: JSON.stringify(postedContent)
            }
        );
    }

    async SaveEntity() {
        let postedContent = this.getContent();

        const requestOptions = ObjectComponent.getRequest(postedContent);

        const response = await fetch('api/' + this.baseController, requestOptions);
        const data = await response.json();
        if (response.status == 201) {
            this.parent.AfterSave();
        }
    }
}

export default ObjectComponent; 
