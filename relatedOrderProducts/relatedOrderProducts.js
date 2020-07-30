import { LightningElement, track, api, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

const col = [
    { label: 'Product Name', fieldName: 'ProductName', type: 'text' },
    { label: 'Order Product Number', fieldName: 'OrderItemNumber', type: 'text' },
    { label: 'Quantity', fieldName: 'Quantity', type: 'number' }
];
let result1 = [
    {
        Id: 'a5P6300000037nYEAQ',
        ProductName: 'PowerCenter PE per CPU-core Multi-core Multi-OS Production License',
        OrderItemNumber: '0000045281',
        Quantity: 2
    },
    {
        Id: 'a5P6300000037nYEAQ',
        ProductName: 'PowerExchange for Netezza Performance Server (per Environment) Production License',
        OrderItemNumber: '0000045283',
        Quantity: 1
    },
];
let result2 = [
    {
        Id: 'a5P6300000037nZEAQ',
        ProductName: 'MDX for PCAE - Oracle RDBMS Production License',
        OrderItemNumber: '0000045284',
        Quantity: 2
    },
    {
        Id: 'a5P6300000037nZEAQ',
        ProductName: 'PowerExchange for Greenplum data types (per Environment) Production License',
        OrderItemNumber: '0000045285',
        Quantity: 1
    },
    {
        Id: 'a5P6300000037nZEAQ',
        ProductName: 'PowerExchange for Web Services per CPU-core Multi-core Multi-OS Production License',
        OrderItemNumber: '0000045288',
        Quantity: 1
    }
];

let result3 = [
    {
        Id: 'a5P6300000037ndEAA',
        ProductName: 'PowerCenter PE per CPU-core Multi-core Multi-OS Development Lab License',
        OrderItemNumber: '0000045286',
        Quantity: 2
    },
    {
        Id: 'a5P6300000037ndEAA',
        ProductName: 'PowerExchange for Greenplum data types (per Environment) Production License',
        OrderItemNumber: '0000045290',
        Quantity: 1
    },
    {
        Id: 'a5P6300000037ndEAA',
        ProductName: 'PowerExchange for Web Services per CPU-core Multi-core Multi-OS Production License',
        OrderItemNumber: '0000045288',
        Quantity: 1
    }
];

let result4 = [
    {
        Id: 'a5P6300000037q2EAA',
        ProductName: 'MDX for PCAE - Oracle RDBMS Production License',
        OrderItemNumber: '0000045284',
        Quantity: 2
    },
    {
        Id: 'a5P6300000037q2EAA',
        ProductName: 'PowerExchange for Greenplum data types (per Environment) Production License',
        OrderItemNumber: '0000045285',
        Quantity: 1
    },
    {
        Id: 'a5P6300000037q2EAA',
        ProductName: 'PowerExchange for Web Services per CPU-core Multi-core Multi-OS Production License',
        OrderItemNumber: '0000045288',
        Quantity: 1
    }
];

export default class RelatedOrderProducts extends LightningElement {
    @track columns = col;
    @track data;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('fulfillmentChange', this.reRenderROP, this);
        registerListener('OrdProductsRerender', this.resetROP, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    reRenderROP(ffl_Id) {
        let temp = ffl_Id[0].Id;
        if (temp == 'a5P6300000037nYEAQ') {
            this.data = result1;
        }
        else if (temp == 'a5P6300000037nZEAQ') {
            this.data = result2;
        }
        else if (temp == 'a5P6300000037ndEAA') {
            this.data = result3;
        }
        else if (temp == 'a5P6300000037q2EAA') {
            this.data = result4
        }
    }
    reesetROP(reset) {
        this.data = undefined;
    }
}