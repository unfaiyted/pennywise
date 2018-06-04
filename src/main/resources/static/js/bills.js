import styles from '../css/module/bills.css'

const deleteBill = require('./lib/remove.js');
const cal = require('./modules/cal.js');
const payBill = require('./modules/bill-payment.js');


// Deletes a bill from the list of bills
deleteBill.init({
    dataSet: "../api/bill/delete",
    triggerClass: "delete-btn",
    displayClass: "bill",
    deleteMsg: "Are you sure you want to delete this bill?"
});



if ($("#calendar")[0]){
    // Do something if class exists
    cal.init();
}



payBill.init();

