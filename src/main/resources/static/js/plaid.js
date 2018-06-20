const lib =  require('./lib/local');


//Constructor
function PlaidObject(settings) {

}

PlaidObject.prototype.init = function() {
};

/**
 * Create a new link to an institution and add it to the existing
 * list of institutions within a users interface.
 */
PlaidObject.prototype.linkInstitution = function() {

};


/**
 * Removes an existing institution from the stored list locally
 * removes access key and server will remove all transactions.
 */
PlaidObject.prototype.deleteInstitution = function () {

};

/**
 * Grabs the existing users institution list to be displayed on the page.
 */
PlaidObject.prototype.getInstitutions  = function() {

};


PlaidObject.prototype.renderInstitutions = function() {
    
};



//
//
//
//
// const handler = Plaid.create({
//     env: PLAID_ENV,
//     key: PLAID_PUBLIC_KEY,
//
//     apiVersion: 'v2',
//     clientName: 'Pennywise',
//     product: ['transactions'],
//
//     onSuccess: function(public_token) {
//         lib.post('plaid/get_access_token', {
//             public_token: public_token
//         }, function() {
//             $('#container').fadeOut('fast', function() {
//                 $('#intro').hide();
//                 $('#app, #steps').fadeIn('slow');
//             });
//         });
//     },
// });
//
//
// $('#link-btn').on('click', function(e) {
//     handler.open();
// });
//
// $('#get-accounts-btn').on('click', function(e) {
//     $.get('/api/plaid/accounts', function(data) {
//         $('#get-accounts-data').slideUp(function() {
//             var html = '';
//             data.accounts.forEach(function(account, idx) {
//                 html += '<div class="inner">';
//                 html += '<strong>' + account.name +
//                     ' $' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</strong><br/>';
//                 html += account.subtype + ' ' + account.mask;
//                 html += '</div>';
//             });
//
//             $(this).html(html).slideDown();
//         });
//     });
// });
//
// $('#get-item-btn').on('click', function(e) {
//     console.log("getting items");
//     lib.post('plaid/item').then(function(data) {
//         $('#get-item-data').slideUp(function() {
//             if (data.error) {
//                 $(this).html('<p>' + data.error + '</p>').slideDown();
//             } else {
//                 console.log('no error');
//                 var html = '<div class="inner">';
//                 html += '<p>Here\'s some basic information about your Item:</p>';
//                 html += '<p>Institution name:' + data.institution.name + '</p>';
//                 html += '<p>Billed products: ' + data.item.billedProducts.join(', ') + '</p>';
//                 html += '<p>Available products: ' + data.item.availableProducts.join(', ') + '</p>';
//                 html += '</div>';
//
//                 $(this).html(html).slideDown();
//             }
//         });
//     });
// });
//
// $('#get-transactions-btn').on('click', function(e) {
//     lib.post('plaid/transactions').then(function(data) {
//         if (data.error != null) {
//             // Format the error
//             var errorHtml = '<div class="inner"><p>' +
//                 '<strong>' + data.error.error_code + ':</strong> ' +
//                 data.error.error_message + '</p></div>';
//
//             if (data.error.error_code === 'PRODUCT_NOT_READY') {
//                 // Add additional context for `PRODUCT_NOT_READY` errors
//                 errorHtml += '<div class="inner"><p>The PRODUCT_NOT_READY ' +
//                     'error is returned when a request to retrieve Transaction data ' +
//                     'is made before Plaid finishes the <a href="https://plaid.com/' +
//                     'docs/quickstart/#transaction-data-with-webhooks">initial ' +
//                     'transaction pull.</a></p></div>';
//             }
//             // Render the error
//             $('#get-transactions-data').slideUp(function() {
//                 $(this).slideUp(function() {
//                     $(this).html(errorHtml).slideDown();
//                 });
//             });
//         } else {
//             $('#get-transactions-data').slideUp(function() {
//                 var html = '';
//                 data.transactions.forEach(function(txn, idx) {
//                     html += '<div class="inner">';
//                     html += '<strong>' + txn.name + '</strong><br/>';
//                     html += '$' + txn.amount;
//                     html += '<br/><em>' + txn.date + '</em>';
//                     html += '</div>';
//                 });
//
//                 $(this).slideUp(function() {
//                     $(this).html(html).slideDown();
//                 });
//             });
//         }
//     });
// });


