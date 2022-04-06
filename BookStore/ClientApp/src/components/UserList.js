import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'

export class UserList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'users';
    }
}
