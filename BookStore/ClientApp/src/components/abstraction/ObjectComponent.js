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
                {this.parent.additionalFields.map(f => 
                <div>
                        <em>{f}</em>
                <p>
                        <input type="text" name={f} onChange={(event) => this[f] = event.target.value}/>
                </p>
                </div>
                )}
                <p>
                    <button onClick = {this.SaveEntity}>
                        Cохранить
                    </button>
                </p>
            </div>)
    }

    async SaveEntity() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + App.token
            },
            body: JSON.stringify(this.entityName)
        };

        const response = await fetch('api/' + this.baseController, requestOptions);
        const data = await response.json();
        if (response.status == 201) {
            this.parent.AfterSave();
        }
    }
}

export default ObjectComponent; 
