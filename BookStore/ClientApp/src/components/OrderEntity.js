import React, { Component } from 'react';
import App from '../App';
import ObjectComponent from './abstraction/ObjectComponent'

export class OrderEntity extends Component {

    id;
    orderDate;
    username;
    status;
    count;

    constructor(props) {
        super(props);
        this.id = props.data.id;
        this.orderDate = props.data.orderDate;
        this.username = props.data.user.name;
        this.status = props.data.status;
        this.count = props.data.count;
        this.state = { status: props.data.status };
    }

    render() {
        let buttoncontent;
        if (App.thisRole == 'user') {
            buttoncontent = <td class="col-md-2"><button onClick={(e) => this.Decline()}>Decline!</button></td>
        }
        else {
            buttoncontent = <td class="col-md-2"><button onClick={(e) => this.Decline()}>Decline!</button><button onClick={(e) => this.Promote()}>Promote!</button></td>
        }

        return (
            <div>
                <table className='table table-striped'>
                <tr>
                        <td class="col-md-1">{this.id}</td>
                        <td class="col-md-4">{this.orderDate}</td>
                        <td class="col-md-2">{this.username}</td>
                        <td class="col-md-2">{this.status}</td>
                        <td class="col-md-4">{this.count}</td>
                        {buttoncontent}
                    </tr>
                </table>
            </div>)
    }

    async Decline() {
        const requestOptions = ObjectComponent.getRequest(this.id);

        const response = await fetch('api/orders/decline', requestOptions);
        const data = await response.json();
        if (response.status == 201) {
            this.AfterSave(data.status);
        }
    }

    async Promote() {
        const requestOptions = ObjectComponent.getRequest(this.id);

        const response = await fetch('api/orders/promote', requestOptions);
        const data = await response.json();
        if (response.status == 201) {
            this.AfterSave(data.status);
        }
    }

    AfterSave(newstatus) {
        this.status = newstatus;
        this.setState({ status: newstatus });
    }
}
