/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 180);
/******/ })
/************************************************************************/
/******/ ({

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(3);
var alerts = __webpack_require__(5);

//Constructor
function PlaidObject(settings) {

    this.page = 1;
    this.days = 30;

    this.findLastTransactionDate();

    this.init();
}

PlaidObject.prototype.init = function () {
    var self = this;

    // Link new account
    $('#link-btn').on('click', function (e) {
        self.handler.open();
    });

    $('#get-accounts-btn').on('click', function (e) {
        self.getAccounts();
    });

    $('#get-item-btn').on('click', function (e) {});

    $('#sync-transactions-btn').click(function () {
        self.getTransactions();
    });

    $('#get-older-transactions-btn').click(function () {

        var btn = $(this);

        btn.prop('disabled', true);

        var id = $(this).attr('data-acc-id');

        self.page = self.page + 1;

        self.getAgedTransactions(id, self.oldestTransaction, self.days).then(function (data) {

            if (data.message != null) {
                alerts.displayPopUpAlert("Issue adding transactions", "warning");
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
PlaidObject.prototype.linkInstitution = function () {};

PlaidObject.prototype.findLastTransactionDate = function () {
    this.oldestTransaction = $('tbody tr:last td:first span').text();

    console.log(this.oldestTransaction);
    return this.oldestTransaction;
};

/**
 * Removes an existing institution from the stored list locally
 * removes access key and server will remove all transactions.
 */
PlaidObject.prototype.deleteInstitution = function () {};

/**
 * Grabs the existing users institution list to be displayed on the page.
 */
PlaidObject.prototype.getInstitutionList = function () {};

/**
 * Display added institution
 */
PlaidObject.prototype.renderInstitutions = function () {};

PlaidObject.prototype.getAccounts = function () {
    return $.get('/api/plaid/accounts', function (data) {
        $('#get-accounts-data').slideUp(function () {
            var html = '';
            data.accounts.forEach(function (account, idx) {
                html += '<div class="inner">';
                html += '<strong>' + account.name + ' $' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</strong><br/>';
                html += account.subtype + ' ' + account.mask;
                html += '</div>';
            });
        });
    });
};

PlaidObject.prototype.getTransactions = function () {
    var self = this;
    return lib.post('plaid/transactions').then(function (data) {
        if (data.error == null) {
            self.renderTransactions(data);
        } else {
            //err
        }
    });
};

PlaidObject.prototype.getAgedTransactions = function (id, oldest, days) {
    return lib.post('plaid/transactions/aged', {
        acc_id: id,
        oldestTransaction: oldest,
        days: days
    });
};

PlaidObject.prototype.getItem = function () {
    return lib.post('plaid/item').then(function (data) {
        $('#get-item-data').slideUp(function () {
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
    var self = this;
    var transactions = '';

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var d = _step.value;

            transactions += self.createTransaction(d);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $("#transaction-list").append(transactions);

    // updates last transaction
    this.findLastTransactionDate();
};

PlaidObject.prototype.createTransaction = function (t) {

    var category = '';

    t.category.forEach(function (cat) {
        category += cat + ',';
    });

    category = category.slice(0, -1);

    return '<tr class="transaction"  data-id="' + t.id + '">\n        <td>  <span class="text-muted">' + t.date + '</span></td>\n    <td>\n    <a href="/transaction/view/' + t.id + '" >' + t.name + '</a>\n        </td>\n        <td ><span>' + t.amount + '</span>\n\n    </td>\n    <td class="pl-4 d-none d-sm-table-cell">\n     ' + category + '\n        </td>\n        </tr>';
};

PlaidObject.prototype.handler = Plaid.create({
    env: PLAID_ENV,
    key: PLAID_PUBLIC_KEY,

    apiVersion: 'v2',
    clientName: 'Pennywise',
    product: ['transactions'],

    onSuccess: function onSuccess(public_token) {
        // send access token
        lib.post('plaid/get_access_token', {
            public_token: public_token
        }, function () {
            $('#container').fadeOut('fast', function () {
                $('#intro').hide();
            });
        });
    }
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

var inst = new PlaidObject();

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Functions for local json file interactions
module.exports = {

    settings: { //settings
        url: window.location.origin + "/api/",
        rateLimit: 5,
        token: $("meta[name='_csrf']").attr("content"),
        header: $("meta[name='_csrf_header']").attr("content")
    },

    //Inserts data into server
    addData: function addData(location, data) {
        location = typeof location !== 'undefined' ? location : "";
        return fetch(module.exports.settings.url + location, {
            method: "post",
            credentials: "same-origin",
            headers: {
                "X-CSRF-Token": module.exports.settings.token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        });
    },

    deleteData: function deleteData(location, data) {
        return module.exports.addData(location, data);
    },

    updateData: function updateData(location, data) {
        return module.exports.addData(location, data);
    },

    post: function post(location, data) {
        return module.exports.addData(location, data);
    },

    getData: function getData(type, parameter, query) {
        parameter = typeof parameter !== 'undefined' ? parameter : "";
        query = typeof query !== 'undefined' ? query : "";

        return fetch(module.exports.settings.url + type + "/" + parameter + query, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            agent: null,
            headers: {
                "Content-Type": "text/plain",
                'Authorization': 'Basic ' + btoa('username:password')
            }
        }).then(function (response) {
            var json = response.json();
            if (response.status >= 200 && response.status < 300) {
                return json;
            } else {
                return json.then(Promise.reject.bind(Promise));
            }
        });
    }
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// site wide alert system code
module.exports = {

    settings: {
        alertId: "alert",
        alertFiller: $('#alert'), // site wide alertID
        alertType: "popup",
        createdPopUpAlert: false,
        createdConfirmAlert: false
    },

    displayPopUpAlert: function displayPopUpAlert(message, type) {
        // check if alert modal exists
        if (module.exports.settings.createdPopUpAlert === false) module.exports.createPopupAlert();

        module.exports.settings.createdPopUpAlert = true;

        //cleans alerts coloring
        module.exports.removeAlertTypes();

        $('.alert').addClass("alert-" + type);
        $('#alert-message').text(message);

        $("#alertModal").modal('show');
    },

    displayInlineAlert: function displayInlineAlert(appendLocation, message, type) {

        //empty append location
        appendLocation.empty();

        module.exports.createInlineAlert(appendLocation);

        // Message String
        if (typeof message === "string") {
            $('#inline-alert-message').text(message);
        }

        // Message Array
        if ((typeof message === "undefined" ? "undefined" : _typeof(message)) === "object") {

            var errors = "<div class=\"row\">";

            message.forEach(function (m) {
                errors += "<div class=\"col-12\">" + m + "</div>";
            });

            errors += "</div>";

            $('#inline-alert-message').html(errors);
        }

        $('.alert').addClass("alert-" + type);
    },

    removeAlertTypes: function removeAlertTypes() {
        $('.alert').removeClass("alert-danger").removeClass("alert-warning").removeClass("alert-success").removeClass("alert-warning").removeClass("alert-primary").removeClass("alert-secondary").removeClass("alert-light").removeClass("alert-dark");
    },

    confirmPopUp: function confirmPopUp(message) {
        // check if popup modal exists, or creates it.
        if (module.exports.settings.createdConfirmAlert === false) module.exports.createPopUpConfirm();

        module.exports.settings.createdConfirmAlert = true;

        $('#confirm-message').text(message);
        $("#confirmModal").modal('show');

        var dfd = $.Deferred();
        $('#confirmModal')
        //turn off any events that were bound to the buttons last
        //time you called showprompt()
        .off('click.prompt').on('click.prompt', '#ok', function () {
            dfd.resolve();$("#confirmModal").modal('hide');
        }) //resolve the deferred
        .on('click.prompt', '#cancel', function () {
            dfd.reject();$("#confirmModal").modal('hide');
        }); //reject the deferred
        return dfd.promise();
    },

    createPopUpConfirm: function createPopUpConfirm() {

        //create new alert if not...
        $('body').append($("<div class=\"modal p-2 fade\" id=\"confirmModal\">").append($("<div class=\"modal-dialog modal-dialog-centered modal-sm\" role=\"document\">").append($(" <div class=\"modal-content p-2\">").append($(" <div class=\"fade show\" role=\"alert\">").append($("<span id=\"confirm-message\" class=\"p-1\">").text("Confirm Message"), $("<div class=\"text-right\">").append($("<button class=\"btn btn-sm btn-primary p-1 m-1\" id=\"ok\">").text("Ok"), $("<button class=\"btn btn-sm btn-secondary p-1 m-1\" id=\"cancel\">").text("Cancel")))))));
    },

    createInlineAlert: function createInlineAlert(location) {

        location.append($(" <div class=\"alert alert-dismissible fade show\" role=\"alert\">").append($("<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">").append($(" <span aria-hidden=\"true\">").html("&times;")), $("<span id=\"inline-alert-message\">").text("Alert Message")));
    },

    createPopupAlert: function createPopupAlert() {

        //create new alert if not...
        $('body').append($("<div class=\"modal fade\" id=\"alertModal\">").append($("<div class=\"modal-dialog\" role=\"document\">").append($(" <div class=\"modal-content\">").append($(" <div class=\"modal-content\">").append($(" <div class=\"alert alert-dismissible fade show\" role=\"alert\">").append($("<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">").append($(" <span aria-hidden=\"true\">").html("&times;")), $("<span id=\"alert-message\">").text("Alert Message")))))));
    }

};

/***/ })

/******/ });
//# sourceMappingURL=plaid.js.map