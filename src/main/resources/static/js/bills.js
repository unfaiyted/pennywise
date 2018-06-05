import styles from '../css/module/bills.css'

const DeleteObj = require('./lib/remove.js');
const cal = require('./modules/cal.js');
const payBill = require('./modules/bill-payment.js');
// Date Picker



let deleteBill = new DeleteObj({
    dataSet: "bill/delete",
    triggerClass: "delete-btn",
    displayClass: "bill",
    deleteMsg: "Are you sure you want to delete this bill?"
});


let deletePayment = new DeleteObj({
    dataSet: "bill/payment/delete",
    triggerClass: "delete-payment-btn",
    displayClass: "bill-payment",
    deleteMsg: "Are you sure you want to delete this payment?"
});



//
// const deleteBill =  require('./lib/remove.js');
// const deletePayment = require('./lib/remove.js');
//
// // Deletes a bill from the list of bills
// deleteBill.init({
//
// // deletePayment.init({
//     dataSet: "bill/payment/delete",
//     triggerClass: "delete-payment-btn",
//     displayClass: "bill-payment",
//     deleteMsg: "Are you sure you want to delete this payment?"
// // });


if ($("#calendar")[0]){
    // Do something if class exists
    cal.init();
}





payBill.init();

