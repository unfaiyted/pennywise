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
/******/ 	return __webpack_require__(__webpack_require__.s = 162);
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

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _bills = __webpack_require__(163);

var _bills2 = _interopRequireDefault(_bills);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteBill = __webpack_require__(5);
var cal = __webpack_require__(165);

// Deletes a bill from the list of bills
deleteBill.init({
    dataSet: "../api/bill/delete",
    triggerClass: "delete-btn",
    displayClass: "bill",
    deleteMsg: "Are you sure you want to delete this bill?"
});

cal.init();

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(164);

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

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".table {\r\n    margin-bottom: 0;\r\n}\r\n\r\n.bill-analysis {\r\n    list-style-type: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    text-align: center;\r\n\r\n}\r\n\r\n.bill-analysis .amt {\r\n    font-size: 25px;\r\n\r\n}\r\n\r\n.bill-analysis .desc {\r\n    font-size: 12px;\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(166);

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calendar = __webpack_require__(168);

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

        var calHTML = '\n         <div class="row cal-row cal-header">\n                                <div class="cal-1 text-truncate">Sun</div>\n                                <div class="cal-1 text-truncate">Mon</div>\n                                <div class="cal-1 text-truncate">Tue</div>\n                                <div class="cal-1 text-truncate">Wed</div>\n                                <div class="cal-1 text-truncate">Thu</div>\n                                <div class="cal-1 text-truncate">Fri</div>\n                                <div class="cal-1 text-truncate">Sat</div>\n                            </div>';

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

        console.log(d);

        var isToday = d === today ? 'cal-today' : ' ';

        if (module.exports.settings.dueDates.includes(d)) {
            return '<div class="cal-1 cal-due-date cal-popover ' + isToday + '" data-container="body"\n                         data-toggle="popover" data-trigger="hover"  data-placement="top" data-content="Bill due date."\n                            >' + oDay + '</div>';
        }

        return '<div class="cal-1  ' + isToday + '">' + oDay + '</div>';
    }

};

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(167);

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

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\r\n.cal-1 {\r\n    width: 14.28%;\r\n    border-right: 1px solid #a7a3a7;\r\n    border-top: 1px solid #b8b6b8;\r\n    text-align: right;\r\n    height: 35px;\r\n    line-height: 3;\r\n    padding-right: 9px;\r\n}\r\n\r\n.cal-1:hover {\r\n    background-color: #e6e6e6;\r\n}\r\n\r\n.next-month, .prev-month {\r\n    cursor: pointer;\r\n}\r\n\r\n.next-month:hover, .prev-month:hover {\r\n    cursor: pointer;\r\n    color: #00B4DB;\r\n}\r\n.cal-title {\r\n    font-weight: bold;\r\n}\r\n\r\n.cal-header {\r\n   background-color: #eaecef;\r\n    padding: 0;\r\n    font-weight: bold;\r\n\r\n}\r\n\r\n.cal-row .cal-1:last-child {\r\n    border-right: 0;\r\n}\r\n\r\n\r\n.calendar-body {\r\n    margin-left:15px;\r\n    margin-right:15px;\r\n}\r\n\r\n.calendar-body .cal-row:last-child {\r\n    border-bottom: 0;\r\n}\r\n\r\n.cal-due-date {\r\n    cursor: pointer;\r\n    color: #db3b42;\r\n    font-weight: bold;\r\n    background-color: #2312120f;\r\n}\r\n\r\n.cal-today {\r\n    font-weight: bold;\r\n    background: #c0fdfb;\r\n}", ""]);

// exports


/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var InvalidMonthError = __webpack_require__(169);
var InvalidMonthsError = __webpack_require__(170);
var InvalidMonthsAbbrError = __webpack_require__(171);

var InvalidWeekdayError = __webpack_require__(172);
var InvalidWeekdaysError = __webpack_require__(173);
var InvalidWeekdaysAbbrError = __webpack_require__(174);

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

/***/ 169:
/***/ (function(module, exports) {

module.exports = function InvalidMonthError(message) {
  this.message = message;
  this.name = 'InvalidMonthError';
};


/***/ }),

/***/ 170:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsError(message) {
  this.message = message;
  this.name = 'InvalidMonthsError';
};


/***/ }),

/***/ 171:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsAbbrError(message) {
  this.message = message;
  this.name = 'InvalidMonthsAbbrError';
};


/***/ }),

/***/ 172:
/***/ (function(module, exports) {

module.exports = function InvalidMonthError(message) {
  this.message = message;
  this.name = 'InvalidWeekdayError';
};


/***/ }),

/***/ 173:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsError(message) {
  this.message = message;
  this.name = 'InvalidWeekdaysError';
};


/***/ }),

/***/ 174:
/***/ (function(module, exports) {

module.exports = function InvalidMonthsAbbrError(message) {
  this.message = message;
  this.name = 'InvalidWeekdaysAbbrError';
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

var	fixUrls = __webpack_require__(3);

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
//# sourceMappingURL=bills.js.map