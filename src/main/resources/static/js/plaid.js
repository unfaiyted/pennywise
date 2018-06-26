const lib =  require('./lib/local');
const alerts = require('./lib/alert');


//Constructor
function PlaidObject(settings) {

    this.page = 1;
    this.days = 30;

    this.findLastTransactionDate();

        this.init();
}

PlaidObject.prototype.init = function() {
    let self =  this;

    // Link new account
    $('#link-btn').on('click', function(e) {
        self.handler.open();
    });


    $('#get-accounts-btn').on('click', function(e) {
        self.getAccounts();
    });

    $('#get-item-btn').on('click', function(e) {

    });

    $('#sync-transactions-btn').click(function() {
        self.getTransactions();
    });

    $('#get-older-transactions-btn').click(function() {

        let btn =$(this);

        btn.prop('disabled', true);

        let id = $(this).attr('data-acc-id');

        self.page = self.page + 1;

        self.getAgedTransactions(id, self.oldestTransaction, self.days).then(function(data) {

            if (data.message != null) {
                alerts.displayPopUpAlert("Issue adding transactions","warning");
                btn.prop('disabled', false);
            } else {
                console.log(data);

                self.renderTransactions(data);

                btn.prop('disabled', false);
            }
        });

    });

};

/**
 * Create a new link to an institution and add it to the existing
 * list of institutions within a users interface.
 */
PlaidObject.prototype.linkInstitution = function() {

};


PlaidObject.prototype.findLastTransactionDate = function() {
    this.oldestTransaction = $('tbody tr:last td:first span').text();

    console.log(this.oldestTransaction);
    return this.oldestTransaction;
}

/**
 * Removes an existing institution from the stored list locally
 * removes access key and server will remove all transactions.
 */
PlaidObject.prototype.deleteInstitution = function () {

};

/**
 * Grabs the existing users institution list to be displayed on the page.
 */
PlaidObject.prototype.getInstitutionList = function() {

};

/**
 * Display added institution
 */
PlaidObject.prototype.renderInstitutions = function() {
    
};


PlaidObject.prototype.getAccounts = function () {
    return $.get('/api/plaid/accounts', function(data) {
            $('#get-accounts-data').slideUp(function() {
                var html = '';
                data.accounts.forEach(function(account, idx) {
                    html += '<div class="inner">';
                    html += '<strong>' + account.name +
                        ' $' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</strong><br/>';
                    html += account.subtype + ' ' + account.mask;
                    html += '</div>';
                });

            });
        });

};

PlaidObject.prototype.getTransactions = function() {
    let self = this;
  return lib.post('plaid/transactions').then(function(data) {
      if(data.error == null) {
          self.renderTransactions(data);
      }
      else {
           //err
        }
    });
};




PlaidObject.prototype.getAgedTransactions = function(id, oldest, days) {
    return lib.post('plaid/transactions/aged', {
        acc_id: id,
        oldestTransaction: oldest,
        days: days
    });
};


PlaidObject.prototype.getItem = function () {
  return lib.post('plaid/item').then(function(data) {
        $('#get-item-data').slideUp(function() {
            if (data.error) {
                $(this).html('<p>' + data.error + '</p>').slideDown();
            } else {
                console.log('no error');
                var html = '<div class="inner">';
                html += '<p>Here\'s some basic information about your Item:</p>';
                html += '<p>Institution name:' + data.institution.name + '</p>';
                html += '<p>Billed products: ' + data.item.billedProducts.join(', ') + '</p>';
                html += '<p>Available products: ' + data.item.availableProducts.join(', ') + '</p>';
                html += '</div>';

                $(this).html(html).slideDown();
            }
        });
    });
};

PlaidObject.prototype.renderTransactions = function (data) {
    let self = this;
    let transactions = ``;

    for(let d of data) {
        transactions += self.createTransaction(d);
    }

    $("#transaction-list").append(transactions);

    // updates last transaction
    this.findLastTransactionDate();

};


PlaidObject.prototype.createTransaction = function(t) {

    let category = ``;

    t.category.forEach(function(cat) {
            category += cat + ',';
    });

    category = category.slice(0,-1);

    return `<tr class="transaction"  data-id="${t.id}">
        <td>  <span class="text-muted">${t.date}</span></td>
    <td>
    <a href="/transaction/view/${t.id}" >${t.name}</a>
        </td>
        <td ><span>${t.amount}</span>

    </td>
    <td class="pl-4 d-none d-sm-table-cell">
     ${category}
        </td>
        </tr>`;

}


PlaidObject.prototype.handler = Plaid.create({
    env: PLAID_ENV,
    key: PLAID_PUBLIC_KEY,

    apiVersion: 'v2',
    clientName: 'Pennywise',
    product: ['transactions'],

    onSuccess: function(public_token) {
        // send access token
        lib.post('plaid/get_access_token', {
            public_token: public_token
        }, function() {
            $('#container').fadeOut('fast', function() {
                $('#intro').hide();
            });
        });
    },
});






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


module.exports = PlaidObject;


const inst = new PlaidObject();



