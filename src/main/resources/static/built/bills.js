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
/******/ 	return __webpack_require__(__webpack_require__.s = 174);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InvalidMonthError = __webpack_require__(11);
var InvalidMonthsError = __webpack_require__(12);
var InvalidMonthsAbbrError = __webpack_require__(13);

var InvalidWeekdayError = __webpack_require__(14);
var InvalidWeekdaysError = __webpack_require__(15);
var InvalidWeekdaysAbbrError = __webpack_require__(16);

var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

var WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function generateAbbr(arr, len) {
  return arr.map(function(item) {
    return item.slice(0, len || 3);
  });
}

function createArray(length) {
  var a = [];

  for (var i = 0; i < length; i++) {
    a.push(1);
  }

  return a;
}

function calendar(config) {
  var abbrLengthWeek =
    config && !isNaN(config.abbrWeek) && config.abbrWeek > 0
      ? config.abbrWeek
      : 3;
  var abbrLengthMonth =
    config && !isNaN(config.abbrMonth) && config.abbrMonth > 0
      ? config.abbrMonth
      : 3;

  var _months = MONTHS;
  var _monthsAbbr = generateAbbr(MONTHS, abbrLengthMonth);
  var _weekdays = WEEKDAYS;
  var _weekdaysAbbr = generateAbbr(WEEKDAYS, abbrLengthWeek);

  if (config && config.months) {
    if (!Array.isArray(config.months) || config.months.length !== 12) {
      throw new InvalidMonthsError('Months array must have 12 values');
    }

    _months = config.months;
    _monthsAbbr = generateAbbr(config.months, abbrLengthMonth);
  }

  if (config && config.monthsAbbr) {
    if (!Array.isArray(config.monthsAbbr) || config.monthsAbbr.length !== 12) {
      throw new InvalidMonthsAbbrError('Months array must have 12 values');
    }

    _monthsAbbr = config.monthsAbbr;
  }

  if (config && config.weekdays) {
    if (!Array.isArray(config.weekdays) || config.weekdays.length !== 7) {
      throw new InvalidWeekdaysError('Weekdays array must have 7 values');
    }

    _weekdays = config.weekdays;
    _weekdaysAbbr = generateAbbr(config.weekdays, abbrLengthWeek);
  }

  if (config && config.weekdaysAbbr) {
    if (
      !Array.isArray(config.weekdaysAbbr) ||
      config.weekdaysAbbr.length !== 7
    ) {
      throw new InvalidWeekdaysAbbrError('Weekdays array must have 7 values');
    }

    _weekdaysAbbr = config.weekdaysAbbr;
  }

  return {
    months: function() {
      return _months;
    },

    monthsAbbr: function() {
      return _monthsAbbr;
    },

    years: function(from, to) {
      if (from > to) {
        throw new RangeError(
          'The first year argument cannot be greater than the second'
        );
      }

      var years = [from.toString()];
      var totalYears = to - from + 1;

      while (years.length < totalYears) {
        var year = parseInt(years[years.length - 1], 10) + 1;

        years.push(year.toString());
      }

      return years;
    },

    yearsAbbr: function(from, to) {
      var years = this.years(from, to).map(function(year) {
        return year.toString().substring(2);
      });

      return years.length > 1 ? years : years[0];
    },

    weekdays: function() {
      return _weekdays;
    },

    weekdaysAbbr: function() {
      return _weekdaysAbbr;
    },

    generateCalendar: function(
      year,
      month,
      numberOfDays,
      firstWeekday,
      lastWeekday,
      dayTransformer,
      cbData
    ) {
      var calendar = [];
      var totalWeeks = Math.ceil((numberOfDays + firstWeekday) / 7);
      var totalDaysOnWeek = 7;
      var lastWeek = totalWeeks - 1;
      var execCb = typeof dayTransformer === 'function';

      var lastDay = firstWeekday * -1;
      var weeks = [];

      createArray(totalWeeks).forEach(function(_, week) {
        createArray(totalDaysOnWeek).forEach(function(_, day) {
          lastDay++;

          var date = new Date(year, month, lastDay);

          var data = {
            date: date,
            day: date.getDate(),
            isInPrimaryMonth: date.getMonth() === month,
            isInLastWeekOfPrimaryMonth: week === lastWeek,
            index: {
              day: day,
              week: week,
            },
          };

          if (execCb) {
            var result = dayTransformer(data, cbData);

            if (result !== undefined) {
              data = result;
            }
          }

          weeks.push(data);
        });

        calendar.push(weeks);

        weeks = [];
      });

      return calendar;
    },

    of: function(year, month, transformer) {
      var data = this.detailed(year, month, function(data) {
        return data.isInPrimaryMonth ? data.day : 0;
      });

      if (typeof transformer === 'function') {
        return transformer(data);
      }

      return data;
    },

    detailed: function(year, month, dayTransformer) {
      if (month < 0 || month > 11) {
        throw new InvalidMonthError('Month should be beetwen 0 and 11');
      }

      if (typeof year !== 'number' || typeof month !== 'number') {
        throw new Error('Arguments should be numbers');
      }

      var numberOfDays = new Date(year, month + 1, 0).getDate();
      var firstWeekday = new Date(year, month, 1).getDay();
      var lastWeekday = new Date(year, month, numberOfDays).getDay();

      var data = {
        year: year.toString(),
        yearAbbr: this.yearsAbbr(year),
        month: this.months()[month],
        monthAbbr: this.monthsAbbr()[month],
        weekdays: this.weekdays(),
        weekdaysAbbr: this.weekdaysAbbr(),
        days: numberOfDays,
        firstWeekday: firstWeekday,
        lastWeekday: lastWeekday,
      };

      var calendar = this.generateCalendar(
        year,
        month,
        numberOfDays,
        firstWeekday,
        lastWeekday,
        dayTransformer,
        data
      );

      data.calendar = calendar;

      return data;
    },

    validate: function(year, month, day) {
      var date = new Date(year, month, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    },
  };
}

module.exports = calendar;


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

module.exports = function InvalidMonthError(message) {
  this.message = message;
  this.name = 'InvalidMonthError';
};


/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsError(message) {
  this.message = message;
  this.name = 'InvalidMonthsError';
};


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsAbbrError(message) {
  this.message = message;
  this.name = 'InvalidMonthsAbbrError';
};


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = function InvalidMonthError(message) {
  this.message = message;
  this.name = 'InvalidWeekdayError';
};


/***/ }),

/***/ 15:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsError(message) {
  this.message = message;
  this.name = 'InvalidWeekdaysError';
};


/***/ }),

/***/ 16:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsAbbrError(message) {
  this.message = message;
  this.name = 'InvalidWeekdaysAbbrError';
};


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var api = __webpack_require__(3);
var alert = __webpack_require__(5);

// Trigger on page to remove entries from page, settings need to be setup to delete
// both visual and database data from user.


//Constructor
function DeleteObject(settings) {
    // {dataSet, triggerClass, displayClass, deleteMsg}
    this.settings = settings;
    this.settings.triggerClass = typeof this.settings.triggerClass !== 'undefined' ? this.settings.triggerClass : 'delete-btn';
    this.settings.displayClass = typeof this.settings.displayClass !== 'undefined' ? this.settings.displayClass : "object-display";
    this.settings.deleteMsg = typeof this.settings.deleteMsg !== 'undefined' ? this.settings.deleteMsg : "Are you sure you'd like to delete this?";

    if (this.settings.dataSet !== null) {
        this.initHandler();
    }
}

// Function of Delete Object
DeleteObject.prototype.disp = function disp() {
    console.log(this.settings);
};

DeleteObject.prototype.initHandler = function () {
    var self = this;

    $('.' + this.settings.triggerClass).click(function () {
        var id = $(this).data("id");
        self.confirmRemove(id);
    });
};

DeleteObject.prototype.confirmRemove = function (id) {
    var self = this;
    alert.confirmPopUp(this.settings.deleteMsg).then(function () {
        self.updateServer(id).then(self.removeVisual(id)).catch(function (data) {
            alert.displayPopUpAlert("Error removing item", "danger");
        });
    }, //promise resolved
    function () {
        console.log('You clicked cancel');
    } //promise rejected

    );
};

DeleteObject.prototype.removeVisual = function (id) {
    $('.' + this.settings.displayClass + '[data-id="' + id + '"]').remove();
};

DeleteObject.prototype.updateServer = function (id) {
    var json = { identifier: id };
    return api.deleteData(this.settings.dataSet, JSON.stringify(json));
};

//
module.exports = DeleteObject;

/***/ }),

/***/ 174:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bills = __webpack_require__(175);

var _bills2 = _interopRequireDefault(_bills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeleteObj = __webpack_require__(17);
var cal = __webpack_require__(177);
var payBill = __webpack_require__(178);
// Date Picker


var deleteBill = new DeleteObj({
    dataSet: "bill/delete",
    triggerClass: "delete-btn",
    displayClass: "bill",
    deleteMsg: "Are you sure you want to delete this bill?"
});

var deletePayment = new DeleteObj({
    dataSet: "bill/payment/delete",
    triggerClass: "delete-payment-btn",
    displayClass: "bill-payment",
    deleteMsg: "Are you sure you want to delete this payment?"
});

if ($("#calendar")[0]) {
    // Do something if class exists
    cal.init();
}

payBill.init();

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(176);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!./bills.css", function() {
		var newContent = require("!!../../../../../../node_modules/css-loader/index.js!./bills.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".table {\n    margin-bottom: 0;\n}\n\n.bill-analysis {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    text-align: center;\n\n}\n\n.bill-analysis .amt {\n    font-size: 25px;\n\n}\n\n.bill-analysis .desc {\n    font-size: 12px;\n}\n\n\n\n.delete-payment-btn, .edit-payment-btn {\n     cursor: pointer;\n\n }\n\n.edit-payment-btn:hover {\n    cursor: pointer;\n    color: #00B4DB;\n\n}\n\n\n.delete-payment-btn:hover {\n    cursor: pointer;\n    color: #c52926;\n\n}", ""]);

// exports


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(6);

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendar = __webpack_require__(10);

module.exports = {

    settings: {
        currMonth: 0,
        currYear: 2018,
        dueDates: []
    },

    init: function init() {
        //get current month date
        var d = new Date();
        module.exports.settings.currMonth = d.getMonth();
        module.exports.settings.currYear = d.getFullYear();
        module.exports.settings.dueDates = $('#calendar').data("due-dates");

        module.exports.initHandlers();
        module.exports.renderMonth();
    },

    initHandlers: function initHandlers() {

        $('.next-month').click(function () {
            module.exports.changeMonth("forward");
        });

        $('.prev-month').click(function () {
            module.exports.changeMonth("back");
        });
    },

    changeMonth: function changeMonth(direction) {

        if (module.exports.settings.currMonth === 11 && direction === "forward") {
            module.exports.settings.currMonth = -1;
            module.exports.settings.currYear++;
        }

        if (module.exports.settings.currMonth === 0 && direction === "back") {
            module.exports.settings.currMonth = 12;
            module.exports.settings.currYear--;
        }

        if (direction === "forward") {
            module.exports.settings.currMonth++;
        } else {
            module.exports.settings.currMonth--;
        }

        module.exports.renderMonth();
    },

    renderMonth: function renderMonth() {
        var cal = calendar().of(module.exports.settings.currYear, module.exports.settings.currMonth);

        $('.calendar-body').empty();

        $('.cal-title-text').text(cal.month + ' - ' + cal.year);

        var calHTML = '\n         <div class="row cal-row cal-header">\n                                <div class="cal-big-1 text-truncate">Sun</div>\n                                <div class="cal-big-1 text-truncate">Mon</div>\n                                <div class="cal-big-1 text-truncate">Tue</div>\n                                <div class="cal-big-1 text-truncate">Wed</div>\n                                <div class="cal-big-1 text-truncate">Thu</div>\n                                <div class="cal-1 text-truncate">Fri</div>\n                                <div class="cal-1 text-truncate">Sat</div>\n                            </div>';

        for (var i = 0; i < cal.calendar.length; i++) {

            calHTML += '               \n               <div class="row cal-row">';

            for (var j = 0; j < 7; j++) {
                if (cal.calendar[i][j] === 0) {
                    calHTML += '<div class="cal-1"> </div>';
                } else {

                    calHTML += module.exports.isDueDate(cal.calendar[i][j]);
                }
            }
            calHTML += '</div>';
        }

        $('.calendar-body').append(calHTML);

        $('.cal-popover').popover({
            container: 'body'
        });
    },

    isDueDate: function isDueDate(day) {

        var oDay = day;

        var today = new Date().toISOString().slice(0, 10);

        if (day < 10) {
            day = "0" + day;
        }

        // starts at zero offset
        var month = module.exports.settings.currMonth + 1;
        if (month < 10) {
            month = "0" + month;
        }

        var d = module.exports.settings.currYear + "-" + month + "-" + day;

        var isToday = d === today ? 'cal-today' : ' ';

        if (module.exports.settings.dueDates.includes(d)) {
            return '<div class="cal-1 cal-due-date cal-popover ' + isToday + '" data-container="body"\n                         data-toggle="popover" data-trigger="hover"  data-placement="top" data-content="Bill due date."\n                            >' + oDay + '</div>';
        }

        return '<div class="cal-1  ' + isToday + '">' + oDay + '</div>';
    }

};

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var api = __webpack_require__(3);
var alerts = __webpack_require__(5);
module.exports = {

    settings: {
        data: null
    },

    init: function init() {
        module.exports.initHandlers();
    },

    initHandlers: function initHandlers() {

        $('[data-target=\'#pay-modal\']').click(function () {

            $('.modal-content').hide();

            $('.status').fadeIn(); // will first fade out the loading animation
            $('.preloader').fadeIn();

            // $(`#pay-modal-website`).attr('href', $(this).data('web'));
            // $(`#pay-modal-user`).text($(this).data('name'));

            api.getData('bill/' + $(this).data('id')).then(function (data) {
                module.exports.settings.data = data;
                module.exports.updateModal(data);
            });
        });

        $('#pay-submit-form').click(function (e) {
            e.preventDefault();
            console.log("submit-form");

            if ($.isNumeric($('#pay-amount').val())) {
                module.exports.confirmPayment();
            } else {
                return alerts.displayPopUpAlert('Input value is not valid number.', 'danger');
            }
        });
    },

    confirmPayment: function confirmPayment() {
        alerts.confirmPopUp("Are you sure you sure you want to complete this payment?").then(function () {
            module.exports.updateServer().then(location.reload()).catch(function () {
                alerts.displayPopUpAlert("Error bill unable to add item", "danger");
            });
        }, //promise resolved
        function () {
            console.log('You clicked cancel');
        } //promise rejected

        );
    },

    updateModal: function updateModal(data) {

        var merchantName = data.merchant.name;
        var method = data.method.name;

        //sets icon for header
        $('#pay-icon').removeAttr('class').addClass(data.method.icon);

        $('#pay-bill-name').text(merchantName);
        module.exports.updateBillMethod(method);

        $('.status').fadeOut(); // will first fade out the loading animation
        $('.preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('.modal-content').delay(500).show();
    },

    updateBillMethod: function updateBillMethod(method) {
        $("#pay-bill-action").empty();

        var data = module.exports.settings.data;
        var childHTML = '';

        if (method === 'Mail') {

            childHTML += '\n            <p>Please mail your payment to this following address:</p>\n            <span>' + data.merchant.address.title + '</span>\n            <span>' + data.merchant.address.street + '</span>\n            <span>' + data.merchant.address.city + '</span>\n             <span>' + data.merchant.address.zipcode + '</span>\n              <span>' + data.merchant.address.state.abbr + '</span>';
        } else if (method === 'In-Person') {
            childHTML += '<p>Plase Give the payment in person.</p>';
        } else if (method.includes('Pay') || method === 'Website') {

            var webAddress = method === 'Website' ? data.merchant.website : data.method.link;
            var payMethodName = method;
            var webUsername = data.merchant.websiteUsername;

            childHTML += '<a href="' + webAddress + '" class="mx-auto btn btn-primary" target="_blank" id="pay-modal-website">\n            Go to ' + payMethodName + ' </a>';

            if (webUsername !== '') {
                childHTML += '<span class="ml-3 text-muted">  Your username is <strong id="pay-modal-user">' + webUsername + '</strong> </span>\n            ';
            }
        }

        $("#pay-bill-action").append(childHTML);
    },

    updateServer: function updateServer() {

        var data = {
            billId: module.exports.settings.data.id,
            payAmount: $('#pay-amount').val()
        };

        return api.addData('bill/pay', JSON.stringify(data));
    }

};

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(4);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


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

/***/ 4:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
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

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!./calendar.css", function() {
		var newContent = require("!!../../../../../../node_modules/css-loader/index.js!./calendar.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(8);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.cal-loader {\n    top:0;\n    left:0;\n    right:0;\n    bottom:0;\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    background-color: rgba(29, 27, 27, 0.12); /* change if the mask should have another color then white */\n    z-index:99999999; /* makes sure it stays on top */\n    -webkit-border-radius: 10px;\n    -moz-border-radius: 10px;\n    border-radius: 10px;\n\n}\n\n\n.cal-status {\n    width:300px;\n    height:300px;\n    position:absolute;\n    left:50%; /* centers the loading animation horizontally one the screen */\n    top:50%; /* centers the loading animation vertically one the screen */\n    background-image:url(" + escape(__webpack_require__(9)) + "); /* path to your loading animation */\n    background-repeat:no-repeat;\n    background-position:center;\n    margin:-150px 0 0 -150px; /* is width and height divided by two */\n}\n\n\n.cal-blur {\n    -webkit--filter: blur(4px);\n    filter: blur(4px);\n}\n\n\n\n\n.cal-1 {\n    width: 14.281%;\n    border-right: 1px solid #c6c2c6;\n    border-top: 1px solid #d6d2d6;\n    text-align: right;\n    height: 35px;\n    line-height: 3;\n    padding-right: 9px;\n}\n\n.cal-1:hover {\n    background-color: #ececec;\n}\n\n.cal-row .cal-1:last-child, .cal-row .cal-1-header:last-child  {\n    border-right: 0;\n}\n\n\n.cal-1-header {\n    width: 14.281%;\n    border-right: 1px solid #c6c2c6;\n    border-top: 1px solid #d6d2d6;\n    text-align: right;\n    height: 35px;\n    line-height: 3;\n    padding-right: 9px;\n    border-bottom:  2px solid #c6c2c6;\n    text-align: center;\n}\n\n\n\n.next-month, .prev-month {\n    cursor: pointer;\n}\n\n.next-month:hover, .prev-month:hover {\n    cursor: pointer;\n    color: #00B4DB;\n}\n.cal-title {\n    font-weight: bold;\n}\n\n\n.cal-title-text {\n\n    font-size: 20px;\n}\n.cal-header {\n   background-color: #eaecef;\n    padding: 0;\n    font-weight: bold;\n\n}\n\n\n.calendar-body {\n    margin-left:15px;\n    margin-right:15px;\n}\n\n.calendar-body .cal-row:last-child {\n    border-bottom: 0;\n}\n\n.cal-due-date {\n    cursor: pointer;\n    color: #db3b42;\n    font-weight: bold;\n    background-color: #2312120f;\n}\n\n.cal-today {\n    font-weight: bold;\n    background: rgb(246, 252, 255)\n}\n\n.cal-today-btn {\n    margin-bottom: 7px;\n    margin-left: 11px;\n}\n\n\n/* BIG CALENDAR */\n\n.calendar-container {\n    width: 100%;\n    height: 100vh;\n    padding-left: 6%;\n\n}\n\n#calendar {\n    box-shadow: 0 9px 23px rgba(0, 0, 0, 0.09), 0 5px 5px rgba(0, 0, 0, 0.06) !important;\n    -webkit-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -moz-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -o-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -webkit-border-radius: 0.4167rem;\n    -moz-border-radius: 0.4167rem;\n    -ms-border-radius: 0.4167rem;\n    -o-border-radius: 0.4167rem;\n    border-radius: 0.4167rem;\n\n    padding:0;\n    margin:0;\n\n}\n\n\n\n.cal-big-1 {\n    width: 14.281%;\n    position: relative;\n    border-right: 1px solid #ebe6eb;\n    border-top: 1px solid #ebe6eb;\n    text-align: right;\n    line-height: 3;\n    padding-right: 9px;\n    overflow: hidden;\n}\n\n.cal-big-1:after {\n    content: \"\";\n    display: block;\n    padding-bottom: 48%;\n}\n\n.cal-big-1:hover {\n    background-color: #ececec;\n}\n\n.cal-row .cal-big-1:last-child {\n    border-right: 0;\n}\n\n\n.event-list li {\n    list-style-type: none;\n}\n\n/*.event-list li:before {*/\n    /*font-family: Font Awesome\\ 5 Free;*/\n    /*font-weight: 900;*/\n    /*-webkit-font-smoothing: antialiased;*/\n    /*text-rendering: auto;*/\n    /*content: '\\f4c0';*/\n    /*margin:-20px 5px 0 -15px;*/\n    /*color: #102911;*/\n    /*position: relative;*/\n    /*top: 10px*/\n\n/*}*/\n\n\n.event-list {\n    line-height: 1.3;\n    padding-left:5px;\n    height: 0;\n    position: relative;\n    top: -10px\n}\n\n.event-item {\n    cursor: pointer;\n}\n\n.event-name-highlight:hover {\n\n}\n\n.event-details-header {\n    background-color: #dcdcdc;\n    border-bottom: 2px solid #e0e0e0;\n    position: relative;\n    top: -16px;\n    left: -31px;\n    padding: 10px;\n    width: calc(100% + 50px);\n}\n\n.event-details-title {\n    font-weight: bold;\n}\n\n\n.event-details-body {\n    background-color: #eaeaea;\n    position: relative;\n    left: -31px;\n    top: -16px;\n    width: calc(100% + 62px);\n\n\n}\n\n.event-details-footer {\n    background-color: #dcdcdc;\n    border-bottom: 2px solid #e0e0e0;\n    position: relative;\n    padding: 10px;\n    padding-left: 20px;\n    border-bottom-right-radius: 10px;\n    left: -31px;\n    top: -16px;\n    width: calc(100% + 62px);\n}\n\n#calendar-panel {\n    background-color: transparent;\n    border-radius: 10px;\n}\n\n\n\n.calendar-overlay {\n    position: fixed;\n\n    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0.65+0,0+100;Neutral+Density */\n    background: -moz-linear-gradient(left, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%); /* FF3.6-15 */\n    background: -webkit-linear-gradient(left, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to right, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=1 ); /* IE6-9 */\n\n    width: 100%;\n    height: 100%;\n    display: none;\n    z-index: 999999;\n    -webkit-transition: all 225ms ease;\n    -moz-transition: all 225ms ease;\n    transition: all 225ms ease;\n\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n    border-radius: 10px;\n\n    -webkit-animation-name: fadeIn;\n    animation-name: fadeIn;\n    cursor: pointer;\n}\n.scotch-is-showing .calendar-overlay {\n    display: block;\n}\n\n\n\n@-webkit-keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n\n@keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n\n", ""]);

// exports


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 9:
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwcHgiICBoZWlnaHQ9IjIwMHB4IiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIGNsYXNzPSJsZHMtcmlwcGxlIiBzdHlsZT0iYmFja2dyb3VuZDogbm9uZTsiPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEzLjY0NDIiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMX19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjOGNkMGU1IiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjYiIGtleVNwbGluZXM9IjAgMC4yIDAuOCAxIiBiZWdpbj0iLTAuOHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS42IiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49Ii0wLjhzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMzLjIyMjgiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMn19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjMzc2ODg4IiBzdHJva2Utd2lkdGg9IjIiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjYiIGtleVNwbGluZXM9IjAgMC4yIDAuOCAxIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS42IiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPjwvY2lyY2xlPjwvc3ZnPg=="

/***/ })

/******/ });
//# sourceMappingURL=bills.js.map