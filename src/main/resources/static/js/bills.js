import styles from '../css/module/bills.css'

const deleteBill = require('./lib/remove.js');

// Deletes a bill from the list of bills
deleteBill.init({
    dataSet: "../api/bill/delete",
    triggerClass: "delete-btn",
    displayClass: "bill",
    deleteMsg: "Are you sure you want to delete this bill?"
});


