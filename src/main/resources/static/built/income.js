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
/******/ 	return __webpack_require__(__webpack_require__.s = 175);
/******/ })
/************************************************************************/
/******/ ({

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deleteIncome = __webpack_require__(5);

// Deletes a bill from the list of bills
deleteIncome.init({
    dataSet: "../api/income/delete",
    triggerClass: "delete-btn",
    displayClass: "income",
    deleteMsg: "Are you sure you want to delete this income source?"
});

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Functions for local json file interactions
module.exports = {

    settings: { //settings
        url: "/api/",
        rateLimit: 5,
        token: $("meta[name='_csrf']").attr("content"),
        header: $("meta[name='_csrf_header']").attr("content")
    },

    //Inserts data into server
    addData: function addData(location, data) {
        location = typeof location !== 'undefined' ? location : "";
        return fetch(location, {
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

    // query for post data
    // parameter for url info
    // ex: players/Name+Last/?post=3 type/parameter/query
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
            return response.json();
        });
    }
};

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var api = __webpack_require__(4);
var alert = __webpack_require__(6);

// Trigger on page to remove entries from page, settings need to be setup to delete
// both visual and database data from user.
module.exports = {

    settings: {
        triggerClass: "delete-btn", // Associated class that will be picked up
        displayClass: "object-display", //
        dataSet: null, // The url location to send for deletion
        deleteMsg: "Are you sure you'd like to delete this?" // Default Msg
    },

    init: function init(_ref) {
        var dataSet = _ref.dataSet,
            triggerClass = _ref.triggerClass,
            displayClass = _ref.displayClass,
            deleteMsg = _ref.deleteMsg;

        module.exports.settings.dataSet = typeof dataSet !== 'undefined' ? dataSet : module.exports.settings.dataSet;
        module.exports.settings.triggerClass = typeof triggerClass !== 'undefined' ? triggerClass : module.exports.settings.triggerClass;
        module.exports.settings.displayClass = typeof displayClass !== 'undefined' ? displayClass : module.exports.settings.displayClass;
        module.exports.settings.deleteMsg = typeof deleteMsg !== 'undefined' ? deleteMsg : module.exports.settings.deleteMsg;

        if (module.exports.settings.dataSet != null) {
            return module.exports.initHandlers();
        }

        console.log("Error: Init must contain a dataSet for deletion or be false");
    },

    initHandlers: function initHandlers() {

        $('.' + module.exports.settings.triggerClass).click(function () {
            var id = $(this).data("id");
            module.exports.confirmRemove(id);
        });
    },

    confirmRemove: function confirmRemove(id) {
        alert.confirmPopUp(module.exports.settings.deleteMsg).then(function () {
            module.exports.updateServer(id).then(module.exports.removeVisual(id)).catch(function (data) {
                console.log(data);
                alert.displayPopUpAlert("Error removing item", "danger");
            });
        }, //promise resolved
        function () {
            console.log('You clicked cancel');
        } //promise rejected

        );
    },

    removeVisual: function removeVisual(id) {
        $('.' + module.exports.settings.displayClass + '[data-id="' + id + '"]').remove();
    },

    updateServer: function updateServer(id) {

        console.log(module.exports.settings.dataSet);

        var json = { identifier: id };
        return api.deleteData(module.exports.settings.dataSet, JSON.stringify(json));
    }

};

/***/ }),

/***/ 6:
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
//# sourceMappingURL=income.js.map