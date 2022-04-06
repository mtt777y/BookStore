import React, { Component } from 'react';
import { ListedComponent } from './abstraction/ListedComponent'

export class BookList extends ListedComponent {
    constructor(prop, controller) {
        super(prop, controller);
        this.baseController = 'books';
    }
}
