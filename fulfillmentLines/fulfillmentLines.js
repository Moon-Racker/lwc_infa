import { LightningElement, track, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import getFulfillmentLines from '@salesforce/apex/testOrderProducts.getFulfillmentLines';

let defaultTab = 'All'
const MDM_Cloud_Col = [
    { label: 'Fulfillment System', fieldName: 'License_Screen_Type2__c', type: 'text' },
    {
        label: 'Start Date', fieldName: 'Start_date__c', type: 'date-local', editable: true,
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },initialWidth: 100
    },
    {
        label: 'End Date', fieldName: 'End_Date__c', type: 'date-local', editable: true,
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },initialWidth: 100
    },
    { label: 'Fulfillment Status', fieldName: 'Ship_Status__c', type: 'text', editable: false },
    {
        label: 'Ship Date', fieldName: 'Ship_Date__c', type: 'date-local', editable: true,
                    typeAttributes: {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    },initialWidth: 100
    },
    {label: 'Provisioning Environment', fieldName: 'Provisioning_Environment__c', type: 'text',  editable: true,initialWidth: 100 },
    {label: 'Org UUID', fieldName: 'Org_UUID__c', type: 'text', editable: false,initialWidth: 100 },
    {label: 'Skip Fulfillment', fieldName: 'Skip_Fulfillment__c', type: 'boolean',  editable: true,initialWidth: 100 }
];
const All_col = [
    { label: 'Fulfillment System', fieldName: 'License_Screen_Type2__c', type: 'text' },
    {
        label: 'Start Date', fieldName: 'Start_date__c', type: 'date-local', editable: true,
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    },
    {
        label: 'End Date', fieldName: 'End_Date__c', type: 'date-local', editable: true,
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    },
    { label: 'Fulfillment Status', fieldName: 'Ship_Status__c', type: 'text', editable: false },
    {
        label: 'Ship Date', fieldName: 'Ship_Date__c', type: 'date-local', editable: true,
                    typeAttributes: {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }
    },
    {label: 'Provisioning Environment', fieldName: 'Provisioning_Environment__c', type: 'text',  editable: true },
    { label: 'Org UUID', fieldName: 'Org_UUID__c', type: 'text', editable: false },
    { label: 'Tracking Number', fieldName: 'Tracking_Number__c', type: 'text', editable: true },
    { label: 'License Serial Number', fieldName: 'License_Serial_Number__c', type: 'text', editable: true },
    {label: 'Skip Fulfillment', fieldName: 'Skip_Fulfillment__c', type: 'boolean',  editable: true, initialWidth: 50 }
];
const Daas_Col = [
    { label: 'Fulfillment System', fieldName: 'License_Screen_Type2__c', type: 'text' },
    {
        label: 'Start Date', fieldName: 'Start_date__c', type: 'date-local', editable: true,
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    },
    {
        label: 'End Date', fieldName: 'End_Date__c', type: 'date-local', editable: true,
        typeAttributes: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }
    },
    { label: 'Fulfillment Status', fieldName: 'Ship_Status__c', type: 'text', editable: false },
    {
        label: 'Ship Date', fieldName: 'Ship_Date__c', type: 'date-local', editable: true,
                    typeAttributes: {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }
    },
    // { label: 'Ship Via', fieldName: 'Ship_via__c', type: 'text', editable: false },
    { label: 'Tracking Number', fieldName: 'Tracking_Number__c', type: 'text', editable: true },
    { label: 'License Serial Number', fieldName: 'License_Serial_Number__c', type: 'text', editable: true,initialWidth: 100 },
    { label: 'Skip Fulfillment', fieldName: 'Skip_Fulfillment__c', type: 'boolean', editable: true,initialWidth: 100 }
    
];

let fulfillmentSystem = [
    { key: 'All', label: 'All' },
    { key: 'Cloud', label: 'Cloud' },
    { key: 'Daas', label: 'Daas' },
    { key: 'MDM', label: 'MDM'}
];
let massUpdateFields = [
    { key: 'Ship_via__c', label: 'Ship Via' },
    { key: 'CloShip_Date__cud', label: 'Ship Date' },
    { key: 'Org_UUID__c', label: 'Org UUID' },
    { key: 'Tracking_Number__c', label: 'Tracking Number'},
    { key: 'License_Serial_Number__c', label: 'License Serial Number'},
    { key: 'Ship_Status__c', label: 'Fulfillment Status'}
];


export default class FulfillmentLines extends LightningElement {
    @track columns;
    @track data;
    @api recordId;
    @track displayCustomDockFooter = false;
    @track tabs = fulfillmentSystem;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        console.log(`recordId --> ${this.recordId}`);
        console.log(`typeof recordId --> ${typeof (this.recordId)}`);
        let fulfillmentHeaderId = this.recordId;
        let fulfillmentSystem = 'All';
        let lstString = [];
        lstString.push(fulfillmentHeaderId);
        lstString.push(fulfillmentSystem);
        if (fulfillmentSystem == 'MDM' || fulfillmentSystem == 'Cloud') {
            this.columns = MDM_Cloud_Col
        }
        else if (fulfillmentSystem == 'Daas') {
            this.columns = Daas_Col;
        }
        else if (fulfillmentSystem == 'All') {
            this.columns = All_col;
        }
        console.log(`lstString --> ${lstString}`);
        getFulfillmentLines({ lstString })
            .then(result => {
                this.data = result;
                console.log(`result --> ${JSON.stringify(result)}`)
            })
            .catch(error => {
                console.log(`error reference --> ${error.body.message}`);
            })
    }

    get massUpdateFields() {
        return massUpdateFields;
    }

    get defaultTab() { 
        return defaultTab;
    }
    
    handleTabOnActive(event) {
        console.log(`event target value --> ${typeof(event.target.value)}`);
        this.data = undefined;
        this.columns = undefined;
        let fulfillmentHeaderId = this.recordId;
        let fulfillmentSystem = event.target.value;
        let lstString = [];
        lstString.push(fulfillmentHeaderId);
        lstString.push(fulfillmentSystem);
        if (fulfillmentSystem == 'MDM' || fulfillmentSystem == 'Cloud') {
            this.columns = MDM_Cloud_Col
        }
        else if (fulfillmentSystem == 'Daas') {
            this.columns = Daas_Col;
        }
        else if (fulfillmentSystem == 'All') {
            this.columns = All_col;
        }
        console.log(`lstString --> ${lstString}`);
        getFulfillmentLines({ lstString })
            .then(result => {
                this.data = result;
                console.log(`result --> ${JSON.stringify(result)}`)
            })
            .catch(error => {
                console.log(`error reference --> ${error.body.message}`);
            })
    }
    handlecellchange(event) {
        this.displayCustomDockFooter = false;
    }


    handleSelectedFulfillmentLine(event) {
        const selectedRow = event.detail.selectedRows;
        console.log(`selectedRow --> ${JSON.stringify(selectedRow)}`);
        const rerender = true;
        fireEvent(this.pageRef, 'fulfillmentChange', selectedRow);
        fireEvent(this.pageRef, 'OrdProductsRerender', rerender);
    }
}