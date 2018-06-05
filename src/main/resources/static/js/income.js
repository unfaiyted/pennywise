const DeleteObj = require('./lib/remove.js');

// Deletes a bill from the list of bills
let deleteIncome = new DeleteObj({
    dataSet: "../api/income/delete",
    triggerClass: "delete-btn",
    displayClass: "income",
    deleteMsg: "Are you sure you want to delete this income source?"
});