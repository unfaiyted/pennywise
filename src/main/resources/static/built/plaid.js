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

var handler = Plaid.create({
    env: PLAID_ENV,
    key: PLAID_PUBLIC_KEY,

    apiVersion: 'v2',
    clientName: 'Pennywise',
    product: ['transactions'],

    onSuccess: function onSuccess(public_token) {
        lib.post('plaid/get_access_token', {
            public_token: public_token
        }, function () {
            $('#container').fadeOut('fast', function () {
                $('#intro').hide();
                $('#app, #steps').fadeIn('slow');
            });
        });
    }
});

$('#link-btn').on('click', function (e) {
    handler.open();
});

$('#get-accounts-btn').on('click', function (e) {
    $.get('/api/plaid/accounts', function (data) {
        $('#get-accounts-data').slideUp(function () {
            var html = '';
            data.accounts.forEach(function (account, idx) {
                html += '<div class="inner">';
                html += '<strong>' + account.name + ' $' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</strong><br/>';
                html += account.subtype + ' ' + account.mask;
                html += '</div>';
            });

            $(this).html(html).slideDown();
        });
    });
});

$('#get-item-btn').on('click', function (e) {
    console.log("getting items");
    lib.post('plaid/item').then(function (data) {
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
});

$('#get-transactions-btn').on('click', function (e) {
    lib.post('plaid/transactions').then(function (data) {
        if (data.error != null) {
            // Format the error
            var errorHtml = '<div class="inner"><p>' + '<strong>' + data.error.error_code + ':</strong> ' + data.error.error_message + '</p></div>';

            if (data.error.error_code === 'PRODUCT_NOT_READY') {
                // Add additional context for `PRODUCT_NOT_READY` errors
                errorHtml += '<div class="inner"><p>The PRODUCT_NOT_READY ' + 'error is returned when a request to retrieve Transaction data ' + 'is made before Plaid finishes the <a href="https://plaid.com/' + 'docs/quickstart/#transaction-data-with-webhooks">initial ' + 'transaction pull.</a></p></div>';
            }
            // Render the error
            $('#get-transactions-data').slideUp(function () {
                $(this).slideUp(function () {
                    $(this).html(errorHtml).slideDown();
                });
            });
        } else {
            $('#get-transactions-data').slideUp(function () {
                var html = '';
                data.transactions.forEach(function (txn, idx) {
                    html += '<div class="inner">';
                    html += '<strong>' + txn.name + '</strong><br/>';
                    html += '$' + txn.amount;
                    html += '<br/><em>' + txn.date + '</em>';
                    html += '</div>';
                });

                $(this).slideUp(function () {
                    $(this).html(html).slideDown();
                });
            });
        }
    });
});

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

/***/ })

/******/ });
//# sourceMappingURL=plaid.js.map