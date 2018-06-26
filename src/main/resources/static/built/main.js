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
/******/ 	return __webpack_require__(__webpack_require__.s = 155);
/******/ })
/************************************************************************/
/******/ ({

/***/ 150:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(156);
__webpack_require__(160);
module.exports = __webpack_require__(161);


/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    return new Promise(function (resolve, reject) {
      if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
      var args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(157).setImmediate))

/***/ }),

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(158);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150)))

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(150), __webpack_require__(159)))

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 160:
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),

/***/ 161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hover = __webpack_require__(162);

var _hover2 = _interopRequireDefault(_hover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var panel = __webpack_require__(164);
var NotificationObject = __webpack_require__(167);

(function ($) {
    console.log("Please pay your bills!");
})(jQuery);

panel.init();

var notification = new NotificationObject();

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(163);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../css-loader/index.js!../../sass-loader/lib/loader.js!./hover.scss", function() {
		var newContent = require("!!../../css-loader/index.js!../../sass-loader/lib/loader.js!./hover.scss");

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

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "/*!\r\n * Hover.css (http://ianlunn.github.io/Hover/)\r\n * Version: 2.3.1\r\n * Author: Ian Lunn @IanLunn\r\n * Author URL: http://ianlunn.co.uk/\r\n * Github: https://github.com/IanLunn/Hover\r\n\r\n * Hover.css Copyright Ian Lunn 2017. Generated with Sass.\r\n */\n/* 2D TRANSITIONS */\n/* Grow */\n.hvr-grow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); }\n\n/* Shrink */\n.hvr-shrink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-shrink:hover, .hvr-shrink:focus, .hvr-shrink:active {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); }\n\n/* Pulse */\n@-webkit-keyframes hvr-pulse {\n  25% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); }\n  75% {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); } }\n\n@keyframes hvr-pulse {\n  25% {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); }\n  75% {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); } }\n\n.hvr-pulse {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-pulse:hover, .hvr-pulse:focus, .hvr-pulse:active {\n    -webkit-animation-name: hvr-pulse;\n    animation-name: hvr-pulse;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite; }\n\n/* Pulse Grow */\n@-webkit-keyframes hvr-pulse-grow {\n  to {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); } }\n\n@keyframes hvr-pulse-grow {\n  to {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); } }\n\n.hvr-pulse-grow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-pulse-grow:hover, .hvr-pulse-grow:focus, .hvr-pulse-grow:active {\n    -webkit-animation-name: hvr-pulse-grow;\n    animation-name: hvr-pulse-grow;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    -webkit-animation-direction: alternate;\n    animation-direction: alternate; }\n\n/* Pulse Shrink */\n@-webkit-keyframes hvr-pulse-shrink {\n  to {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); } }\n\n@keyframes hvr-pulse-shrink {\n  to {\n    -webkit-transform: scale(0.9);\n    transform: scale(0.9); } }\n\n.hvr-pulse-shrink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-pulse-shrink:hover, .hvr-pulse-shrink:focus, .hvr-pulse-shrink:active {\n    -webkit-animation-name: hvr-pulse-shrink;\n    animation-name: hvr-pulse-shrink;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    -webkit-animation-direction: alternate;\n    animation-direction: alternate; }\n\n/* Push */\n@-webkit-keyframes hvr-push {\n  50% {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n@keyframes hvr-push {\n  50% {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1); } }\n\n.hvr-push {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-push:hover, .hvr-push:focus, .hvr-push:active {\n    -webkit-animation-name: hvr-push;\n    animation-name: hvr-push;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Pop */\n@-webkit-keyframes hvr-pop {\n  50% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); } }\n\n@keyframes hvr-pop {\n  50% {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2); } }\n\n.hvr-pop {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-pop:hover, .hvr-pop:focus, .hvr-pop:active {\n    -webkit-animation-name: hvr-pop;\n    animation-name: hvr-pop;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Bounce In */\n.hvr-bounce-in {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s; }\n  .hvr-bounce-in:hover, .hvr-bounce-in:focus, .hvr-bounce-in:active {\n    -webkit-transform: scale(1.2);\n    transform: scale(1.2);\n    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\n    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36); }\n\n/* Bounce Out */\n.hvr-bounce-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s; }\n  .hvr-bounce-out:hover, .hvr-bounce-out:focus, .hvr-bounce-out:active {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8);\n    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\n    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36); }\n\n/* Rotate */\n.hvr-rotate {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-rotate:hover, .hvr-rotate:focus, .hvr-rotate:active {\n    -webkit-transform: rotate(4deg);\n    transform: rotate(4deg); }\n\n/* Grow Rotate */\n.hvr-grow-rotate {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-grow-rotate:hover, .hvr-grow-rotate:focus, .hvr-grow-rotate:active {\n    -webkit-transform: scale(1.1) rotate(4deg);\n    transform: scale(1.1) rotate(4deg); }\n\n/* Float */\n.hvr-float {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n  -webkit-transition-timing-function: ease-out;\n  transition-timing-function: ease-out; }\n  .hvr-float:hover, .hvr-float:focus, .hvr-float:active {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); }\n\n/* Sink */\n.hvr-sink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n  -webkit-transition-timing-function: ease-out;\n  transition-timing-function: ease-out; }\n  .hvr-sink:hover, .hvr-sink:focus, .hvr-sink:active {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n\n/* Bob */\n@-webkit-keyframes hvr-bob {\n  0% {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); }\n  50% {\n    -webkit-transform: translateY(-4px);\n    transform: translateY(-4px); }\n  100% {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); } }\n\n@keyframes hvr-bob {\n  0% {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); }\n  50% {\n    -webkit-transform: translateY(-4px);\n    transform: translateY(-4px); }\n  100% {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); } }\n\n@-webkit-keyframes hvr-bob-float {\n  100% {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); } }\n\n@keyframes hvr-bob-float {\n  100% {\n    -webkit-transform: translateY(-8px);\n    transform: translateY(-8px); } }\n\n.hvr-bob {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-bob:hover, .hvr-bob:focus, .hvr-bob:active {\n    -webkit-animation-name: hvr-bob-float, hvr-bob;\n    animation-name: hvr-bob-float, hvr-bob;\n    -webkit-animation-duration: .3s, 1.5s;\n    animation-duration: .3s, 1.5s;\n    -webkit-animation-delay: 0s, .3s;\n    animation-delay: 0s, .3s;\n    -webkit-animation-timing-function: ease-out, ease-in-out;\n    animation-timing-function: ease-out, ease-in-out;\n    -webkit-animation-iteration-count: 1, infinite;\n    animation-iteration-count: 1, infinite;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards;\n    -webkit-animation-direction: normal, alternate;\n    animation-direction: normal, alternate; }\n\n/* Hang */\n@-webkit-keyframes hvr-hang {\n  0% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n  50% {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n  100% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); } }\n\n@keyframes hvr-hang {\n  0% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n  50% {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n  100% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); } }\n\n@-webkit-keyframes hvr-hang-sink {\n  100% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); } }\n\n@keyframes hvr-hang-sink {\n  100% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); } }\n\n.hvr-hang {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-hang:hover, .hvr-hang:focus, .hvr-hang:active {\n    -webkit-animation-name: hvr-hang-sink, hvr-hang;\n    animation-name: hvr-hang-sink, hvr-hang;\n    -webkit-animation-duration: .3s, 1.5s;\n    animation-duration: .3s, 1.5s;\n    -webkit-animation-delay: 0s, .3s;\n    animation-delay: 0s, .3s;\n    -webkit-animation-timing-function: ease-out, ease-in-out;\n    animation-timing-function: ease-out, ease-in-out;\n    -webkit-animation-iteration-count: 1, infinite;\n    animation-iteration-count: 1, infinite;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards;\n    -webkit-animation-direction: normal, alternate;\n    animation-direction: normal, alternate; }\n\n/* Skew */\n.hvr-skew {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-skew:hover, .hvr-skew:focus, .hvr-skew:active {\n    -webkit-transform: skew(-10deg);\n    transform: skew(-10deg); }\n\n/* Skew Forward */\n.hvr-skew-forward {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%; }\n  .hvr-skew-forward:hover, .hvr-skew-forward:focus, .hvr-skew-forward:active {\n    -webkit-transform: skew(-10deg);\n    transform: skew(-10deg); }\n\n/* Skew Backward */\n.hvr-skew-backward {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform;\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%; }\n  .hvr-skew-backward:hover, .hvr-skew-backward:focus, .hvr-skew-backward:active {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n\n/* Wobble Vertical */\n@-webkit-keyframes hvr-wobble-vertical {\n  16.65% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n  33.3% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); }\n  49.95% {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n  66.6% {\n    -webkit-transform: translateY(-2px);\n    transform: translateY(-2px); }\n  83.25% {\n    -webkit-transform: translateY(1px);\n    transform: translateY(1px); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n@keyframes hvr-wobble-vertical {\n  16.65% {\n    -webkit-transform: translateY(8px);\n    transform: translateY(8px); }\n  33.3% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); }\n  49.95% {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n  66.6% {\n    -webkit-transform: translateY(-2px);\n    transform: translateY(-2px); }\n  83.25% {\n    -webkit-transform: translateY(1px);\n    transform: translateY(1px); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n.hvr-wobble-vertical {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-wobble-vertical:hover, .hvr-wobble-vertical:focus, .hvr-wobble-vertical:active {\n    -webkit-animation-name: hvr-wobble-vertical;\n    animation-name: hvr-wobble-vertical;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Wobble Horizontal */\n@-webkit-keyframes hvr-wobble-horizontal {\n  16.65% {\n    -webkit-transform: translateX(8px);\n    transform: translateX(8px); }\n  33.3% {\n    -webkit-transform: translateX(-6px);\n    transform: translateX(-6px); }\n  49.95% {\n    -webkit-transform: translateX(4px);\n    transform: translateX(4px); }\n  66.6% {\n    -webkit-transform: translateX(-2px);\n    transform: translateX(-2px); }\n  83.25% {\n    -webkit-transform: translateX(1px);\n    transform: translateX(1px); }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes hvr-wobble-horizontal {\n  16.65% {\n    -webkit-transform: translateX(8px);\n    transform: translateX(8px); }\n  33.3% {\n    -webkit-transform: translateX(-6px);\n    transform: translateX(-6px); }\n  49.95% {\n    -webkit-transform: translateX(4px);\n    transform: translateX(4px); }\n  66.6% {\n    -webkit-transform: translateX(-2px);\n    transform: translateX(-2px); }\n  83.25% {\n    -webkit-transform: translateX(1px);\n    transform: translateX(1px); }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n.hvr-wobble-horizontal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-wobble-horizontal:hover, .hvr-wobble-horizontal:focus, .hvr-wobble-horizontal:active {\n    -webkit-animation-name: hvr-wobble-horizontal;\n    animation-name: hvr-wobble-horizontal;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Wobble To Bottom Right */\n@-webkit-keyframes hvr-wobble-to-bottom-right {\n  16.65% {\n    -webkit-transform: translate(8px, 8px);\n    transform: translate(8px, 8px); }\n  33.3% {\n    -webkit-transform: translate(-6px, -6px);\n    transform: translate(-6px, -6px); }\n  49.95% {\n    -webkit-transform: translate(4px, 4px);\n    transform: translate(4px, 4px); }\n  66.6% {\n    -webkit-transform: translate(-2px, -2px);\n    transform: translate(-2px, -2px); }\n  83.25% {\n    -webkit-transform: translate(1px, 1px);\n    transform: translate(1px, 1px); }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); } }\n\n@keyframes hvr-wobble-to-bottom-right {\n  16.65% {\n    -webkit-transform: translate(8px, 8px);\n    transform: translate(8px, 8px); }\n  33.3% {\n    -webkit-transform: translate(-6px, -6px);\n    transform: translate(-6px, -6px); }\n  49.95% {\n    -webkit-transform: translate(4px, 4px);\n    transform: translate(4px, 4px); }\n  66.6% {\n    -webkit-transform: translate(-2px, -2px);\n    transform: translate(-2px, -2px); }\n  83.25% {\n    -webkit-transform: translate(1px, 1px);\n    transform: translate(1px, 1px); }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); } }\n\n.hvr-wobble-to-bottom-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-wobble-to-bottom-right:hover, .hvr-wobble-to-bottom-right:focus, .hvr-wobble-to-bottom-right:active {\n    -webkit-animation-name: hvr-wobble-to-bottom-right;\n    animation-name: hvr-wobble-to-bottom-right;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Wobble To Top Right */\n@-webkit-keyframes hvr-wobble-to-top-right {\n  16.65% {\n    -webkit-transform: translate(8px, -8px);\n    transform: translate(8px, -8px); }\n  33.3% {\n    -webkit-transform: translate(-6px, 6px);\n    transform: translate(-6px, 6px); }\n  49.95% {\n    -webkit-transform: translate(4px, -4px);\n    transform: translate(4px, -4px); }\n  66.6% {\n    -webkit-transform: translate(-2px, 2px);\n    transform: translate(-2px, 2px); }\n  83.25% {\n    -webkit-transform: translate(1px, -1px);\n    transform: translate(1px, -1px); }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); } }\n\n@keyframes hvr-wobble-to-top-right {\n  16.65% {\n    -webkit-transform: translate(8px, -8px);\n    transform: translate(8px, -8px); }\n  33.3% {\n    -webkit-transform: translate(-6px, 6px);\n    transform: translate(-6px, 6px); }\n  49.95% {\n    -webkit-transform: translate(4px, -4px);\n    transform: translate(4px, -4px); }\n  66.6% {\n    -webkit-transform: translate(-2px, 2px);\n    transform: translate(-2px, 2px); }\n  83.25% {\n    -webkit-transform: translate(1px, -1px);\n    transform: translate(1px, -1px); }\n  100% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); } }\n\n.hvr-wobble-to-top-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-wobble-to-top-right:hover, .hvr-wobble-to-top-right:focus, .hvr-wobble-to-top-right:active {\n    -webkit-animation-name: hvr-wobble-to-top-right;\n    animation-name: hvr-wobble-to-top-right;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Wobble Top */\n@-webkit-keyframes hvr-wobble-top {\n  16.65% {\n    -webkit-transform: skew(-12deg);\n    transform: skew(-12deg); }\n  33.3% {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n  49.95% {\n    -webkit-transform: skew(-6deg);\n    transform: skew(-6deg); }\n  66.6% {\n    -webkit-transform: skew(4deg);\n    transform: skew(4deg); }\n  83.25% {\n    -webkit-transform: skew(-2deg);\n    transform: skew(-2deg); }\n  100% {\n    -webkit-transform: skew(0);\n    transform: skew(0); } }\n\n@keyframes hvr-wobble-top {\n  16.65% {\n    -webkit-transform: skew(-12deg);\n    transform: skew(-12deg); }\n  33.3% {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n  49.95% {\n    -webkit-transform: skew(-6deg);\n    transform: skew(-6deg); }\n  66.6% {\n    -webkit-transform: skew(4deg);\n    transform: skew(4deg); }\n  83.25% {\n    -webkit-transform: skew(-2deg);\n    transform: skew(-2deg); }\n  100% {\n    -webkit-transform: skew(0);\n    transform: skew(0); } }\n\n.hvr-wobble-top {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%; }\n  .hvr-wobble-top:hover, .hvr-wobble-top:focus, .hvr-wobble-top:active {\n    -webkit-animation-name: hvr-wobble-top;\n    animation-name: hvr-wobble-top;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Wobble Bottom */\n@-webkit-keyframes hvr-wobble-bottom {\n  16.65% {\n    -webkit-transform: skew(-12deg);\n    transform: skew(-12deg); }\n  33.3% {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n  49.95% {\n    -webkit-transform: skew(-6deg);\n    transform: skew(-6deg); }\n  66.6% {\n    -webkit-transform: skew(4deg);\n    transform: skew(4deg); }\n  83.25% {\n    -webkit-transform: skew(-2deg);\n    transform: skew(-2deg); }\n  100% {\n    -webkit-transform: skew(0);\n    transform: skew(0); } }\n\n@keyframes hvr-wobble-bottom {\n  16.65% {\n    -webkit-transform: skew(-12deg);\n    transform: skew(-12deg); }\n  33.3% {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n  49.95% {\n    -webkit-transform: skew(-6deg);\n    transform: skew(-6deg); }\n  66.6% {\n    -webkit-transform: skew(4deg);\n    transform: skew(4deg); }\n  83.25% {\n    -webkit-transform: skew(-2deg);\n    transform: skew(-2deg); }\n  100% {\n    -webkit-transform: skew(0);\n    transform: skew(0); } }\n\n.hvr-wobble-bottom {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transform-origin: 100% 0;\n  transform-origin: 100% 0; }\n  .hvr-wobble-bottom:hover, .hvr-wobble-bottom:focus, .hvr-wobble-bottom:active {\n    -webkit-animation-name: hvr-wobble-bottom;\n    animation-name: hvr-wobble-bottom;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Wobble Skew */\n@-webkit-keyframes hvr-wobble-skew {\n  16.65% {\n    -webkit-transform: skew(-12deg);\n    transform: skew(-12deg); }\n  33.3% {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n  49.95% {\n    -webkit-transform: skew(-6deg);\n    transform: skew(-6deg); }\n  66.6% {\n    -webkit-transform: skew(4deg);\n    transform: skew(4deg); }\n  83.25% {\n    -webkit-transform: skew(-2deg);\n    transform: skew(-2deg); }\n  100% {\n    -webkit-transform: skew(0);\n    transform: skew(0); } }\n\n@keyframes hvr-wobble-skew {\n  16.65% {\n    -webkit-transform: skew(-12deg);\n    transform: skew(-12deg); }\n  33.3% {\n    -webkit-transform: skew(10deg);\n    transform: skew(10deg); }\n  49.95% {\n    -webkit-transform: skew(-6deg);\n    transform: skew(-6deg); }\n  66.6% {\n    -webkit-transform: skew(4deg);\n    transform: skew(4deg); }\n  83.25% {\n    -webkit-transform: skew(-2deg);\n    transform: skew(-2deg); }\n  100% {\n    -webkit-transform: skew(0);\n    transform: skew(0); } }\n\n.hvr-wobble-skew {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-wobble-skew:hover, .hvr-wobble-skew:focus, .hvr-wobble-skew:active {\n    -webkit-animation-name: hvr-wobble-skew;\n    animation-name: hvr-wobble-skew;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Buzz */\n@-webkit-keyframes hvr-buzz {\n  50% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  100% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); } }\n\n@keyframes hvr-buzz {\n  50% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  100% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); } }\n\n.hvr-buzz {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-buzz:hover, .hvr-buzz:focus, .hvr-buzz:active {\n    -webkit-animation-name: hvr-buzz;\n    animation-name: hvr-buzz;\n    -webkit-animation-duration: 0.15s;\n    animation-duration: 0.15s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite; }\n\n/* Buzz Out */\n@-webkit-keyframes hvr-buzz-out {\n  10% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  20% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  30% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  40% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  50% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  60% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  70% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  80% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  90% {\n    -webkit-transform: translateX(1px) rotate(0);\n    transform: translateX(1px) rotate(0); }\n  100% {\n    -webkit-transform: translateX(-1px) rotate(0);\n    transform: translateX(-1px) rotate(0); } }\n\n@keyframes hvr-buzz-out {\n  10% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  20% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  30% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  40% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  50% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  60% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  70% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  80% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  90% {\n    -webkit-transform: translateX(1px) rotate(0);\n    transform: translateX(1px) rotate(0); }\n  100% {\n    -webkit-transform: translateX(-1px) rotate(0);\n    transform: translateX(-1px) rotate(0); } }\n\n.hvr-buzz-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-buzz-out:hover, .hvr-buzz-out:focus, .hvr-buzz-out:active {\n    -webkit-animation-name: hvr-buzz-out;\n    animation-name: hvr-buzz-out;\n    -webkit-animation-duration: 0.75s;\n    animation-duration: 0.75s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Forward */\n.hvr-forward {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-forward:hover, .hvr-forward:focus, .hvr-forward:active {\n    -webkit-transform: translateX(8px);\n    transform: translateX(8px); }\n\n/* Backward */\n.hvr-backward {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-backward:hover, .hvr-backward:focus, .hvr-backward:active {\n    -webkit-transform: translateX(-8px);\n    transform: translateX(-8px); }\n\n/* BACKGROUND TRANSITIONS */\n/* Fade */\n.hvr-fade {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  overflow: hidden;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: color, background-color;\n  transition-property: color, background-color; }\n  .hvr-fade:hover, .hvr-fade:focus, .hvr-fade:active {\n    background-color: #2098D1;\n    color: white; }\n\n/* Back Pulse */\n@-webkit-keyframes hvr-back-pulse {\n  50% {\n    background-color: rgba(32, 152, 209, 0.75); } }\n\n@keyframes hvr-back-pulse {\n  50% {\n    background-color: rgba(32, 152, 209, 0.75); } }\n\n.hvr-back-pulse {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  overflow: hidden;\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s;\n  -webkit-transition-property: color, background-color;\n  transition-property: color, background-color; }\n  .hvr-back-pulse:hover, .hvr-back-pulse:focus, .hvr-back-pulse:active {\n    -webkit-animation-name: hvr-back-pulse;\n    animation-name: hvr-back-pulse;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-delay: 0.5s;\n    animation-delay: 0.5s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    background-color: #2098D1;\n    background-color: #2098d1;\n    color: white; }\n\n/* Sweep To Right */\n.hvr-sweep-to-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-sweep-to-right:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleX(0);\n    transform: scaleX(0);\n    -webkit-transform-origin: 0 50%;\n    transform-origin: 0 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-sweep-to-right:hover, .hvr-sweep-to-right:focus, .hvr-sweep-to-right:active {\n    color: white; }\n    .hvr-sweep-to-right:hover:before, .hvr-sweep-to-right:focus:before, .hvr-sweep-to-right:active:before {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1); }\n\n/* Sweep To Left */\n.hvr-sweep-to-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-sweep-to-left:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleX(0);\n    transform: scaleX(0);\n    -webkit-transform-origin: 100% 50%;\n    transform-origin: 100% 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-sweep-to-left:hover, .hvr-sweep-to-left:focus, .hvr-sweep-to-left:active {\n    color: white; }\n    .hvr-sweep-to-left:hover:before, .hvr-sweep-to-left:focus:before, .hvr-sweep-to-left:active:before {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1); }\n\n/* Sweep To Bottom */\n.hvr-sweep-to-bottom {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-sweep-to-bottom:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleY(0);\n    transform: scaleY(0);\n    -webkit-transform-origin: 50% 0;\n    transform-origin: 50% 0;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-sweep-to-bottom:hover, .hvr-sweep-to-bottom:focus, .hvr-sweep-to-bottom:active {\n    color: white; }\n    .hvr-sweep-to-bottom:hover:before, .hvr-sweep-to-bottom:focus:before, .hvr-sweep-to-bottom:active:before {\n      -webkit-transform: scaleY(1);\n      transform: scaleY(1); }\n\n/* Sweep To Top */\n.hvr-sweep-to-top {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-sweep-to-top:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleY(0);\n    transform: scaleY(0);\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-sweep-to-top:hover, .hvr-sweep-to-top:focus, .hvr-sweep-to-top:active {\n    color: white; }\n    .hvr-sweep-to-top:hover:before, .hvr-sweep-to-top:focus:before, .hvr-sweep-to-top:active:before {\n      -webkit-transform: scaleY(1);\n      transform: scaleY(1); }\n\n/* Bounce To Right */\n.hvr-bounce-to-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s; }\n  .hvr-bounce-to-right:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleX(0);\n    transform: scaleX(0);\n    -webkit-transform-origin: 0 50%;\n    transform-origin: 0 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.5s;\n    transition-duration: 0.5s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-bounce-to-right:hover, .hvr-bounce-to-right:focus, .hvr-bounce-to-right:active {\n    color: white; }\n    .hvr-bounce-to-right:hover:before, .hvr-bounce-to-right:focus:before, .hvr-bounce-to-right:active:before {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n      -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\n      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66); }\n\n/* Bounce To Left */\n.hvr-bounce-to-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s; }\n  .hvr-bounce-to-left:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleX(0);\n    transform: scaleX(0);\n    -webkit-transform-origin: 100% 50%;\n    transform-origin: 100% 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.5s;\n    transition-duration: 0.5s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-bounce-to-left:hover, .hvr-bounce-to-left:focus, .hvr-bounce-to-left:active {\n    color: white; }\n    .hvr-bounce-to-left:hover:before, .hvr-bounce-to-left:focus:before, .hvr-bounce-to-left:active:before {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1);\n      -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\n      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66); }\n\n/* Bounce To Bottom */\n.hvr-bounce-to-bottom {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s; }\n  .hvr-bounce-to-bottom:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleY(0);\n    transform: scaleY(0);\n    -webkit-transform-origin: 50% 0;\n    transform-origin: 50% 0;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.5s;\n    transition-duration: 0.5s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-bounce-to-bottom:hover, .hvr-bounce-to-bottom:focus, .hvr-bounce-to-bottom:active {\n    color: white; }\n    .hvr-bounce-to-bottom:hover:before, .hvr-bounce-to-bottom:focus:before, .hvr-bounce-to-bottom:active:before {\n      -webkit-transform: scaleY(1);\n      transform: scaleY(1);\n      -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\n      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66); }\n\n/* Bounce To Top */\n.hvr-bounce-to-top {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.5s;\n  transition-duration: 0.5s; }\n  .hvr-bounce-to-top:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scaleY(0);\n    transform: scaleY(0);\n    -webkit-transform-origin: 50% 100%;\n    transform-origin: 50% 100%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.5s;\n    transition-duration: 0.5s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-bounce-to-top:hover, .hvr-bounce-to-top:focus, .hvr-bounce-to-top:active {\n    color: white; }\n    .hvr-bounce-to-top:hover:before, .hvr-bounce-to-top:focus:before, .hvr-bounce-to-top:active:before {\n      -webkit-transform: scaleY(1);\n      transform: scaleY(1);\n      -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\n      transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66); }\n\n/* Radial Out */\n.hvr-radial-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden;\n  background: #e1e1e1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-radial-out:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    border-radius: 100%;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-radial-out:hover, .hvr-radial-out:focus, .hvr-radial-out:active {\n    color: white; }\n    .hvr-radial-out:hover:before, .hvr-radial-out:focus:before, .hvr-radial-out:active:before {\n      -webkit-transform: scale(2);\n      transform: scale(2); }\n\n/* Radial In */\n.hvr-radial-in {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden;\n  background: #2098D1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-radial-in:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #e1e1e1;\n    border-radius: 100%;\n    -webkit-transform: scale(2);\n    transform: scale(2);\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-radial-in:hover, .hvr-radial-in:focus, .hvr-radial-in:active {\n    color: white; }\n    .hvr-radial-in:hover:before, .hvr-radial-in:focus:before, .hvr-radial-in:active:before {\n      -webkit-transform: scale(0);\n      transform: scale(0); }\n\n/* Rectangle In */\n.hvr-rectangle-in {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  background: #2098D1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-rectangle-in:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #e1e1e1;\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-rectangle-in:hover, .hvr-rectangle-in:focus, .hvr-rectangle-in:active {\n    color: white; }\n    .hvr-rectangle-in:hover:before, .hvr-rectangle-in:focus:before, .hvr-rectangle-in:active:before {\n      -webkit-transform: scale(0);\n      transform: scale(0); }\n\n/* Rectangle Out */\n.hvr-rectangle-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  background: #e1e1e1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-rectangle-out:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-rectangle-out:hover, .hvr-rectangle-out:focus, .hvr-rectangle-out:active {\n    color: white; }\n    .hvr-rectangle-out:hover:before, .hvr-rectangle-out:focus:before, .hvr-rectangle-out:active:before {\n      -webkit-transform: scale(1);\n      transform: scale(1); }\n\n/* Shutter In Horizontal */\n.hvr-shutter-in-horizontal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  background: #2098D1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-shutter-in-horizontal:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: #e1e1e1;\n    -webkit-transform: scaleX(1);\n    transform: scaleX(1);\n    -webkit-transform-origin: 50%;\n    transform-origin: 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-shutter-in-horizontal:hover, .hvr-shutter-in-horizontal:focus, .hvr-shutter-in-horizontal:active {\n    color: white; }\n    .hvr-shutter-in-horizontal:hover:before, .hvr-shutter-in-horizontal:focus:before, .hvr-shutter-in-horizontal:active:before {\n      -webkit-transform: scaleX(0);\n      transform: scaleX(0); }\n\n/* Shutter Out Horizontal */\n.hvr-shutter-out-horizontal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  background: #e1e1e1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-shutter-out-horizontal:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: #2098D1;\n    -webkit-transform: scaleX(0);\n    transform: scaleX(0);\n    -webkit-transform-origin: 50%;\n    transform-origin: 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-shutter-out-horizontal:hover, .hvr-shutter-out-horizontal:focus, .hvr-shutter-out-horizontal:active {\n    color: white; }\n    .hvr-shutter-out-horizontal:hover:before, .hvr-shutter-out-horizontal:focus:before, .hvr-shutter-out-horizontal:active:before {\n      -webkit-transform: scaleX(1);\n      transform: scaleX(1); }\n\n/* Shutter In Vertical */\n.hvr-shutter-in-vertical {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  background: #2098D1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-shutter-in-vertical:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: #e1e1e1;\n    -webkit-transform: scaleY(1);\n    transform: scaleY(1);\n    -webkit-transform-origin: 50%;\n    transform-origin: 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-shutter-in-vertical:hover, .hvr-shutter-in-vertical:focus, .hvr-shutter-in-vertical:active {\n    color: white; }\n    .hvr-shutter-in-vertical:hover:before, .hvr-shutter-in-vertical:focus:before, .hvr-shutter-in-vertical:active:before {\n      -webkit-transform: scaleY(0);\n      transform: scaleY(0); }\n\n/* Shutter Out Vertical */\n.hvr-shutter-out-vertical {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  background: #e1e1e1;\n  -webkit-transition-property: color;\n  transition-property: color;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-shutter-out-vertical:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: #2098D1;\n    -webkit-transform: scaleY(0);\n    transform: scaleY(0);\n    -webkit-transform-origin: 50%;\n    transform-origin: 50%;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-shutter-out-vertical:hover, .hvr-shutter-out-vertical:focus, .hvr-shutter-out-vertical:active {\n    color: white; }\n    .hvr-shutter-out-vertical:hover:before, .hvr-shutter-out-vertical:focus:before, .hvr-shutter-out-vertical:active:before {\n      -webkit-transform: scaleY(1);\n      transform: scaleY(1); }\n\n/* BORDER TRANSITIONS */\n/* Border Fade */\n.hvr-border-fade {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: box-shadow;\n  transition-property: box-shadow;\n  box-shadow: inset 0 0 0 4px #e1e1e1, 0 0 1px rgba(0, 0, 0, 0);\n  /* Hack to improve aliasing on mobile/tablet devices */ }\n  .hvr-border-fade:hover, .hvr-border-fade:focus, .hvr-border-fade:active {\n    box-shadow: inset 0 0 0 4px #2098D1, 0 0 1px rgba(0, 0, 0, 0);\n    /* Hack to improve aliasing on mobile/tablet devices */ }\n\n/* Hollow */\n.hvr-hollow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: background;\n  transition-property: background;\n  box-shadow: inset 0 0 0 4px #e1e1e1, 0 0 1px rgba(0, 0, 0, 0);\n  /* Hack to improve aliasing on mobile/tablet devices */ }\n  .hvr-hollow:hover, .hvr-hollow:focus, .hvr-hollow:active {\n    background: none; }\n\n/* Trim */\n.hvr-trim {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-trim:before {\n    content: '';\n    position: absolute;\n    border: white solid 4px;\n    top: 4px;\n    left: 4px;\n    right: 4px;\n    bottom: 4px;\n    opacity: 0;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: opacity;\n    transition-property: opacity; }\n  .hvr-trim:hover:before, .hvr-trim:focus:before, .hvr-trim:active:before {\n    opacity: 1; }\n\n/* Ripple Out */\n@-webkit-keyframes hvr-ripple-out {\n  100% {\n    top: -12px;\n    right: -12px;\n    bottom: -12px;\n    left: -12px;\n    opacity: 0; } }\n\n@keyframes hvr-ripple-out {\n  100% {\n    top: -12px;\n    right: -12px;\n    bottom: -12px;\n    left: -12px;\n    opacity: 0; } }\n\n.hvr-ripple-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-ripple-out:before {\n    content: '';\n    position: absolute;\n    border: #e1e1e1 solid 6px;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s; }\n  .hvr-ripple-out:hover:before, .hvr-ripple-out:focus:before, .hvr-ripple-out:active:before {\n    -webkit-animation-name: hvr-ripple-out;\n    animation-name: hvr-ripple-out; }\n\n/* Ripple In */\n@-webkit-keyframes hvr-ripple-in {\n  100% {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    opacity: 1; } }\n\n@keyframes hvr-ripple-in {\n  100% {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    opacity: 1; } }\n\n.hvr-ripple-in {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-ripple-in:before {\n    content: '';\n    position: absolute;\n    border: #e1e1e1 solid 4px;\n    top: -12px;\n    right: -12px;\n    bottom: -12px;\n    left: -12px;\n    opacity: 0;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s; }\n  .hvr-ripple-in:hover:before, .hvr-ripple-in:focus:before, .hvr-ripple-in:active:before {\n    -webkit-animation-name: hvr-ripple-in;\n    animation-name: hvr-ripple-in; }\n\n/* Outline Out */\n.hvr-outline-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-outline-out:before {\n    content: '';\n    position: absolute;\n    border: #e1e1e1 solid 4px;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: top, right, bottom, left;\n    transition-property: top, right, bottom, left; }\n  .hvr-outline-out:hover:before, .hvr-outline-out:focus:before, .hvr-outline-out:active:before {\n    top: -8px;\n    right: -8px;\n    bottom: -8px;\n    left: -8px; }\n\n/* Outline In */\n.hvr-outline-in {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-outline-in:before {\n    pointer-events: none;\n    content: '';\n    position: absolute;\n    border: #e1e1e1 solid 4px;\n    top: -16px;\n    right: -16px;\n    bottom: -16px;\n    left: -16px;\n    opacity: 0;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: top, right, bottom, left;\n    transition-property: top, right, bottom, left; }\n  .hvr-outline-in:hover:before, .hvr-outline-in:focus:before, .hvr-outline-in:active:before {\n    top: -8px;\n    right: -8px;\n    bottom: -8px;\n    left: -8px;\n    opacity: 1; }\n\n/* Round Corners */\n.hvr-round-corners {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: border-radius;\n  transition-property: border-radius; }\n  .hvr-round-corners:hover, .hvr-round-corners:focus, .hvr-round-corners:active {\n    border-radius: 1em; }\n\n/* Underline From Left */\n.hvr-underline-from-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-underline-from-left:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    right: 100%;\n    bottom: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transition-property: right;\n    transition-property: right;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-underline-from-left:hover:before, .hvr-underline-from-left:focus:before, .hvr-underline-from-left:active:before {\n    right: 0; }\n\n/* Underline From Center */\n.hvr-underline-from-center {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-underline-from-center:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 51%;\n    right: 51%;\n    bottom: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transition-property: left, right;\n    transition-property: left, right;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-underline-from-center:hover:before, .hvr-underline-from-center:focus:before, .hvr-underline-from-center:active:before {\n    left: 0;\n    right: 0; }\n\n/* Underline From Right */\n.hvr-underline-from-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-underline-from-right:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 100%;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transition-property: left;\n    transition-property: left;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-underline-from-right:hover:before, .hvr-underline-from-right:focus:before, .hvr-underline-from-right:active:before {\n    left: 0; }\n\n/* Overline From Left */\n.hvr-overline-from-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-overline-from-left:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    right: 100%;\n    top: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transition-property: right;\n    transition-property: right;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-overline-from-left:hover:before, .hvr-overline-from-left:focus:before, .hvr-overline-from-left:active:before {\n    right: 0; }\n\n/* Overline From Center */\n.hvr-overline-from-center {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-overline-from-center:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 51%;\n    right: 51%;\n    top: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transition-property: left, right;\n    transition-property: left, right;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-overline-from-center:hover:before, .hvr-overline-from-center:focus:before, .hvr-overline-from-center:active:before {\n    left: 0;\n    right: 0; }\n\n/* Overline From Right */\n.hvr-overline-from-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-overline-from-right:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 100%;\n    right: 0;\n    top: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transition-property: left;\n    transition-property: left;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-overline-from-right:hover:before, .hvr-overline-from-right:focus:before, .hvr-overline-from-right:active:before {\n    left: 0; }\n\n/* Reveal */\n.hvr-reveal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-reveal:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    border-color: #2098D1;\n    border-style: solid;\n    border-width: 0;\n    -webkit-transition-property: border-width;\n    transition-property: border-width;\n    -webkit-transition-duration: 0.1s;\n    transition-duration: 0.1s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-reveal:hover:before, .hvr-reveal:focus:before, .hvr-reveal:active:before {\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n    border-width: 4px; }\n\n/* Underline Reveal */\n.hvr-underline-reveal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-underline-reveal:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px);\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-underline-reveal:hover:before, .hvr-underline-reveal:focus:before, .hvr-underline-reveal:active:before {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n\n/* Overline Reveal */\n.hvr-overline-reveal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  overflow: hidden; }\n  .hvr-overline-reveal:before {\n    content: \"\";\n    position: absolute;\n    z-index: -1;\n    left: 0;\n    right: 0;\n    top: 0;\n    background: #2098D1;\n    height: 4px;\n    -webkit-transform: translateY(-4px);\n    transform: translateY(-4px);\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-overline-reveal:hover:before, .hvr-overline-reveal:focus:before, .hvr-overline-reveal:active:before {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n\n/* SHADOW/GLOW TRANSITIONS */\n/* Glow */\n.hvr-glow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: box-shadow;\n  transition-property: box-shadow; }\n  .hvr-glow:hover, .hvr-glow:focus, .hvr-glow:active {\n    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6); }\n\n/* Shadow */\n.hvr-shadow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: box-shadow;\n  transition-property: box-shadow; }\n  .hvr-shadow:hover, .hvr-shadow:focus, .hvr-shadow:active {\n    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5); }\n\n/* Grow Shadow */\n.hvr-grow-shadow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: box-shadow, transform;\n  transition-property: box-shadow, transform; }\n  .hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {\n    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1); }\n\n/* Box Shadow Outset */\n.hvr-box-shadow-outset {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: box-shadow;\n  transition-property: box-shadow; }\n  .hvr-box-shadow-outset:hover, .hvr-box-shadow-outset:focus, .hvr-box-shadow-outset:active {\n    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.6); }\n\n/* Box Shadow Inset */\n.hvr-box-shadow-inset {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: box-shadow;\n  transition-property: box-shadow;\n  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0);\n  /* Hack to improve aliasing on mobile/tablet devices */ }\n  .hvr-box-shadow-inset:hover, .hvr-box-shadow-inset:focus, .hvr-box-shadow-inset:active {\n    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0);\n    /* Hack to improve aliasing on mobile/tablet devices */ }\n\n/* Float Shadow */\n.hvr-float-shadow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-float-shadow:before {\n    pointer-events: none;\n    position: absolute;\n    z-index: -1;\n    content: '';\n    top: 100%;\n    left: 5%;\n    height: 10px;\n    width: 90%;\n    opacity: 0;\n    background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);\n    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);\n    /* W3C */\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform, opacity;\n    transition-property: transform, opacity; }\n  .hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {\n    -webkit-transform: translateY(-5px);\n    transform: translateY(-5px);\n    /* move the element up by 5px */ }\n    .hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {\n      opacity: 1;\n      -webkit-transform: translateY(5px);\n      transform: translateY(5px);\n      /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */ }\n\n/* Shadow Radial */\n.hvr-shadow-radial {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-shadow-radial:before, .hvr-shadow-radial:after {\n    pointer-events: none;\n    position: absolute;\n    content: '';\n    left: 0;\n    width: 100%;\n    box-sizing: border-box;\n    background-repeat: no-repeat;\n    height: 5px;\n    opacity: 0;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: opacity;\n    transition-property: opacity; }\n  .hvr-shadow-radial:before {\n    bottom: 100%;\n    background: -webkit-radial-gradient(50% 150%, ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);\n    background: radial-gradient(ellipse at 50% 150%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%); }\n  .hvr-shadow-radial:after {\n    top: 100%;\n    background: -webkit-radial-gradient(50% -50%, ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%);\n    background: radial-gradient(ellipse at 50% -50%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 80%); }\n  .hvr-shadow-radial:hover:before, .hvr-shadow-radial:focus:before, .hvr-shadow-radial:active:before, .hvr-shadow-radial:hover:after, .hvr-shadow-radial:focus:after, .hvr-shadow-radial:active:after {\n    opacity: 1; }\n\n/* SPEECH BUBBLES */\n/* Bubble Top */\n.hvr-bubble-top {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-bubble-top:before {\n    pointer-events: none;\n    position: absolute;\n    z-index: -1;\n    content: '';\n    border-style: solid;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    left: calc(50% - 10px);\n    top: 0;\n    border-width: 0 10px 10px 10px;\n    border-color: transparent transparent #e1e1e1 transparent; }\n  .hvr-bubble-top:hover:before, .hvr-bubble-top:focus:before, .hvr-bubble-top:active:before {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); }\n\n/* Bubble Right */\n.hvr-bubble-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-bubble-right:before {\n    pointer-events: none;\n    position: absolute;\n    z-index: -1;\n    content: '';\n    border-style: solid;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    top: calc(50% - 10px);\n    right: 0;\n    border-width: 10px 0 10px 10px;\n    border-color: transparent transparent transparent #e1e1e1; }\n  .hvr-bubble-right:hover:before, .hvr-bubble-right:focus:before, .hvr-bubble-right:active:before {\n    -webkit-transform: translateX(10px);\n    transform: translateX(10px); }\n\n/* Bubble Bottom */\n.hvr-bubble-bottom {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-bubble-bottom:before {\n    pointer-events: none;\n    position: absolute;\n    z-index: -1;\n    content: '';\n    border-style: solid;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    left: calc(50% - 10px);\n    bottom: 0;\n    border-width: 10px 10px 0 10px;\n    border-color: #e1e1e1 transparent transparent transparent; }\n  .hvr-bubble-bottom:hover:before, .hvr-bubble-bottom:focus:before, .hvr-bubble-bottom:active:before {\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px); }\n\n/* Bubble Left */\n.hvr-bubble-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-bubble-left:before {\n    pointer-events: none;\n    position: absolute;\n    z-index: -1;\n    content: '';\n    border-style: solid;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    top: calc(50% - 10px);\n    left: 0;\n    border-width: 10px 10px 10px 0;\n    border-color: transparent #e1e1e1 transparent transparent; }\n  .hvr-bubble-left:hover:before, .hvr-bubble-left:focus:before, .hvr-bubble-left:active:before {\n    -webkit-transform: translateX(-10px);\n    transform: translateX(-10px); }\n\n/* Bubble Float Top */\n.hvr-bubble-float-top {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-bubble-float-top:before {\n    position: absolute;\n    z-index: -1;\n    content: '';\n    left: calc(50% - 10px);\n    top: 0;\n    border-style: solid;\n    border-width: 0 10px 10px 10px;\n    border-color: transparent transparent #e1e1e1 transparent;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform; }\n  .hvr-bubble-float-top:hover, .hvr-bubble-float-top:focus, .hvr-bubble-float-top:active {\n    -webkit-transform: translateY(10px);\n    transform: translateY(10px); }\n    .hvr-bubble-float-top:hover:before, .hvr-bubble-float-top:focus:before, .hvr-bubble-float-top:active:before {\n      -webkit-transform: translateY(-10px);\n      transform: translateY(-10px); }\n\n/* Bubble Float Right */\n.hvr-bubble-float-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-bubble-float-right:before {\n    position: absolute;\n    z-index: -1;\n    top: calc(50% - 10px);\n    right: 0;\n    content: '';\n    border-style: solid;\n    border-width: 10px 0 10px 10px;\n    border-color: transparent transparent transparent #e1e1e1;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform; }\n  .hvr-bubble-float-right:hover, .hvr-bubble-float-right:focus, .hvr-bubble-float-right:active {\n    -webkit-transform: translateX(-10px);\n    transform: translateX(-10px); }\n    .hvr-bubble-float-right:hover:before, .hvr-bubble-float-right:focus:before, .hvr-bubble-float-right:active:before {\n      -webkit-transform: translateX(10px);\n      transform: translateX(10px); }\n\n/* Bubble Float Bottom */\n.hvr-bubble-float-bottom {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-bubble-float-bottom:before {\n    position: absolute;\n    z-index: -1;\n    content: '';\n    left: calc(50% - 10px);\n    bottom: 0;\n    border-style: solid;\n    border-width: 10px 10px 0 10px;\n    border-color: #e1e1e1 transparent transparent transparent;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform; }\n  .hvr-bubble-float-bottom:hover, .hvr-bubble-float-bottom:focus, .hvr-bubble-float-bottom:active {\n    -webkit-transform: translateY(-10px);\n    transform: translateY(-10px); }\n    .hvr-bubble-float-bottom:hover:before, .hvr-bubble-float-bottom:focus:before, .hvr-bubble-float-bottom:active:before {\n      -webkit-transform: translateY(10px);\n      transform: translateY(10px); }\n\n/* Bubble Float Left */\n.hvr-bubble-float-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative;\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s;\n  -webkit-transition-property: transform;\n  transition-property: transform; }\n  .hvr-bubble-float-left:before {\n    position: absolute;\n    z-index: -1;\n    content: '';\n    top: calc(50% - 10px);\n    left: 0;\n    border-style: solid;\n    border-width: 10px 10px 10px 0;\n    border-color: transparent #e1e1e1 transparent transparent;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform; }\n  .hvr-bubble-float-left:hover, .hvr-bubble-float-left:focus, .hvr-bubble-float-left:active {\n    -webkit-transform: translateX(10px);\n    transform: translateX(10px); }\n    .hvr-bubble-float-left:hover:before, .hvr-bubble-float-left:focus:before, .hvr-bubble-float-left:active:before {\n      -webkit-transform: translateX(-10px);\n      transform: translateX(-10px); }\n\n/* ICONS */\n/* Icon Back */\n.hvr-icon-back {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.1s;\n  transition-duration: 0.1s; }\n  .hvr-icon-back .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.1s;\n    transition-duration: 0.1s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-back:hover .hvr-icon, .hvr-icon-back:focus .hvr-icon, .hvr-icon-back:active .hvr-icon {\n    -webkit-transform: translateX(-4px);\n    transform: translateX(-4px); }\n\n/* Icon Forward */\n.hvr-icon-forward {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.1s;\n  transition-duration: 0.1s; }\n  .hvr-icon-forward .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.1s;\n    transition-duration: 0.1s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-forward:hover .hvr-icon, .hvr-icon-forward:focus .hvr-icon, .hvr-icon-forward:active .hvr-icon {\n    -webkit-transform: translateX(4px);\n    transform: translateX(4px); }\n\n/* Icon Down */\n@-webkit-keyframes hvr-icon-down {\n  0%,\n  50%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  25%,\n  75% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); } }\n\n@keyframes hvr-icon-down {\n  0%,\n  50%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  25%,\n  75% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); } }\n\n/* Icon Down */\n.hvr-icon-down {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-down .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-down:hover .hvr-icon, .hvr-icon-down:focus .hvr-icon, .hvr-icon-down:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-down;\n    animation-name: hvr-icon-down;\n    -webkit-animation-duration: 0.75s;\n    animation-duration: 0.75s;\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n\n/* Icon Up */\n@-webkit-keyframes hvr-icon-up {\n  0%,\n  50%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  25%,\n  75% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); } }\n\n@keyframes hvr-icon-up {\n  0%,\n  50%,\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); }\n  25%,\n  75% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); } }\n\n/* Icon Up */\n.hvr-icon-up {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-up .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-up:hover .hvr-icon, .hvr-icon-up:focus .hvr-icon, .hvr-icon-up:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-up;\n    animation-name: hvr-icon-up;\n    -webkit-animation-duration: 0.75s;\n    animation-duration: 0.75s;\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n\n/* Icon Spin */\n.hvr-icon-spin {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-spin .hvr-icon {\n    -webkit-transition-duration: 1s;\n    transition-duration: 1s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-in-out;\n    transition-timing-function: ease-in-out; }\n  .hvr-icon-spin:hover .hvr-icon, .hvr-icon-spin:focus .hvr-icon, .hvr-icon-spin:active .hvr-icon {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); }\n\n/* Icon Drop */\n@-webkit-keyframes hvr-icon-drop {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0;\n    -webkit-transform: translateY(-100%);\n    transform: translateY(-100%); }\n  51%,\n  100% {\n    opacity: 1; } }\n\n@keyframes hvr-icon-drop {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 0;\n    -webkit-transform: translateY(-100%);\n    transform: translateY(-100%); }\n  51%,\n  100% {\n    opacity: 1; } }\n\n/* Icon Drop */\n.hvr-icon-drop {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-drop .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-drop:hover .hvr-icon, .hvr-icon-drop:focus .hvr-icon, .hvr-icon-drop:active .hvr-icon {\n    opacity: 0;\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-animation-name: hvr-icon-drop;\n    animation-name: hvr-icon-drop;\n    -webkit-animation-duration: 0.5s;\n    animation-duration: 0.5s;\n    -webkit-animation-delay: 0.3s;\n    animation-delay: 0.3s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);\n    animation-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66); }\n\n/* Icon Fade */\n.hvr-icon-fade {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-fade .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.5s;\n    transition-duration: 0.5s;\n    -webkit-transition-property: color;\n    transition-property: color; }\n  .hvr-icon-fade:hover .hvr-icon, .hvr-icon-fade:focus .hvr-icon, .hvr-icon-fade:active .hvr-icon {\n    color: #0F9E5E; }\n\n/* Icon Float Away */\n@-webkit-keyframes hvr-icon-float-away {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-1em);\n    transform: translateY(-1em); } }\n\n@keyframes hvr-icon-float-away {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-1em);\n    transform: translateY(-1em); } }\n\n/* Icon Float Away */\n.hvr-icon-float-away {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-float-away .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-animation-duration: 0.5s;\n    animation-duration: 0.5s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards; }\n  .hvr-icon-float-away:hover .hvr-icon, .hvr-icon-float-away:focus .hvr-icon, .hvr-icon-float-away:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-float-away;\n    animation-name: hvr-icon-float-away;\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n\n/* Icon Sink Away */\n@-webkit-keyframes hvr-icon-sink-away {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(1em);\n    transform: translateY(1em); } }\n\n@keyframes hvr-icon-sink-away {\n  0% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(1em);\n    transform: translateY(1em); } }\n\n/* Icon Sink Away */\n.hvr-icon-sink-away {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-sink-away .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-animation-duration: 0.5s;\n    animation-duration: 0.5s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards; }\n  .hvr-icon-sink-away:hover .hvr-icon, .hvr-icon-sink-away:focus .hvr-icon, .hvr-icon-sink-away:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-sink-away;\n    animation-name: hvr-icon-sink-away;\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n\n/* Icon Grow */\n.hvr-icon-grow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-grow .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-grow:hover .hvr-icon, .hvr-icon-grow:focus .hvr-icon, .hvr-icon-grow:active .hvr-icon {\n    -webkit-transform: scale(1.3) translateZ(0);\n    transform: scale(1.3) translateZ(0); }\n\n/* Icon Shrink */\n.hvr-icon-shrink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-shrink .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-shrink:hover .hvr-icon, .hvr-icon-shrink:focus .hvr-icon, .hvr-icon-shrink:active .hvr-icon {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); }\n\n/* Icon Pulse */\n@-webkit-keyframes hvr-icon-pulse {\n  25% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3); }\n  75% {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); } }\n\n@keyframes hvr-icon-pulse {\n  25% {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3); }\n  75% {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); } }\n\n.hvr-icon-pulse {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-pulse .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-pulse:hover .hvr-icon, .hvr-icon-pulse:focus .hvr-icon, .hvr-icon-pulse:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-pulse;\n    animation-name: hvr-icon-pulse;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite; }\n\n/* Icon Pulse Grow */\n@-webkit-keyframes hvr-icon-pulse-grow {\n  to {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3); } }\n\n@keyframes hvr-icon-pulse-grow {\n  to {\n    -webkit-transform: scale(1.3);\n    transform: scale(1.3); } }\n\n.hvr-icon-pulse-grow {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-pulse-grow .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-pulse-grow:hover .hvr-icon, .hvr-icon-pulse-grow:focus .hvr-icon, .hvr-icon-pulse-grow:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-pulse-grow;\n    animation-name: hvr-icon-pulse-grow;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    -webkit-animation-direction: alternate;\n    animation-direction: alternate; }\n\n/* Icon Pulse Shrink */\n@-webkit-keyframes hvr-icon-pulse-shrink {\n  to {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); } }\n\n@keyframes hvr-icon-pulse-shrink {\n  to {\n    -webkit-transform: scale(0.8);\n    transform: scale(0.8); } }\n\n.hvr-icon-pulse-shrink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0); }\n  .hvr-icon-pulse-shrink .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-pulse-shrink:hover .hvr-icon, .hvr-icon-pulse-shrink:focus .hvr-icon, .hvr-icon-pulse-shrink:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-pulse-shrink;\n    animation-name: hvr-icon-pulse-shrink;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite;\n    -webkit-animation-direction: alternate;\n    animation-direction: alternate; }\n\n/* Icon Push */\n@-webkit-keyframes hvr-icon-push {\n  50% {\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5); } }\n\n@keyframes hvr-icon-push {\n  50% {\n    -webkit-transform: scale(0.5);\n    transform: scale(0.5); } }\n\n.hvr-icon-push {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-push .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-push:hover .hvr-icon, .hvr-icon-push:focus .hvr-icon, .hvr-icon-push:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-push;\n    animation-name: hvr-icon-push;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Icon Pop */\n@-webkit-keyframes hvr-icon-pop {\n  50% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5); } }\n\n@keyframes hvr-icon-pop {\n  50% {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5); } }\n\n.hvr-icon-pop {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-pop .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-pop:hover .hvr-icon, .hvr-icon-pop:focus .hvr-icon, .hvr-icon-pop:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-pop;\n    animation-name: hvr-icon-pop;\n    -webkit-animation-duration: 0.3s;\n    animation-duration: 0.3s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Icon Bounce */\n.hvr-icon-bounce {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-bounce .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-bounce:hover .hvr-icon, .hvr-icon-bounce:focus .hvr-icon, .hvr-icon-bounce:active .hvr-icon {\n    -webkit-transform: scale(1.5);\n    transform: scale(1.5);\n    -webkit-transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);\n    transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36); }\n\n/* Icon Rotate */\n.hvr-icon-rotate {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-rotate .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-rotate:hover .hvr-icon, .hvr-icon-rotate:focus .hvr-icon, .hvr-icon-rotate:active .hvr-icon {\n    -webkit-transform: rotate(20deg);\n    transform: rotate(20deg); }\n\n/* Icon Grow Rotate */\n.hvr-icon-grow-rotate {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-grow-rotate .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-grow-rotate:hover .hvr-icon, .hvr-icon-grow-rotate:focus .hvr-icon, .hvr-icon-grow-rotate:active .hvr-icon {\n    -webkit-transform: scale(1.5) rotate(12deg);\n    transform: scale(1.5) rotate(12deg); }\n\n/* Icon Float */\n.hvr-icon-float {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-float .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-float:hover .hvr-icon, .hvr-icon-float:focus .hvr-icon, .hvr-icon-float:active .hvr-icon {\n    -webkit-transform: translateY(-4px);\n    transform: translateY(-4px); }\n\n/* Icon Sink */\n.hvr-icon-sink {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-sink .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: transform;\n    transition-property: transform;\n    -webkit-transition-timing-function: ease-out;\n    transition-timing-function: ease-out; }\n  .hvr-icon-sink:hover .hvr-icon, .hvr-icon-sink:focus .hvr-icon, .hvr-icon-sink:active .hvr-icon {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n\n/* Icon Bob */\n@-webkit-keyframes hvr-icon-bob {\n  0% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); }\n  50% {\n    -webkit-transform: translateY(-2px);\n    transform: translateY(-2px); }\n  100% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); } }\n\n@keyframes hvr-icon-bob {\n  0% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); }\n  50% {\n    -webkit-transform: translateY(-2px);\n    transform: translateY(-2px); }\n  100% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); } }\n\n@-webkit-keyframes hvr-icon-bob-float {\n  100% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); } }\n\n@keyframes hvr-icon-bob-float {\n  100% {\n    -webkit-transform: translateY(-6px);\n    transform: translateY(-6px); } }\n\n.hvr-icon-bob {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-bob .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-bob:hover .hvr-icon, .hvr-icon-bob:focus .hvr-icon, .hvr-icon-bob:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-bob-float, hvr-icon-bob;\n    animation-name: hvr-icon-bob-float, hvr-icon-bob;\n    -webkit-animation-duration: .3s, 1.5s;\n    animation-duration: .3s, 1.5s;\n    -webkit-animation-delay: 0s, .3s;\n    animation-delay: 0s, .3s;\n    -webkit-animation-timing-function: ease-out, ease-in-out;\n    animation-timing-function: ease-out, ease-in-out;\n    -webkit-animation-iteration-count: 1, infinite;\n    animation-iteration-count: 1, infinite;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards;\n    -webkit-animation-direction: normal, alternate;\n    animation-direction: normal, alternate; }\n\n/* Icon Hang */\n@-webkit-keyframes hvr-icon-hang {\n  0% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); }\n  50% {\n    -webkit-transform: translateY(2px);\n    transform: translateY(2px); }\n  100% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); } }\n\n@keyframes hvr-icon-hang {\n  0% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); }\n  50% {\n    -webkit-transform: translateY(2px);\n    transform: translateY(2px); }\n  100% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); } }\n\n@-webkit-keyframes hvr-icon-hang-sink {\n  100% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); } }\n\n@keyframes hvr-icon-hang-sink {\n  100% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); } }\n\n.hvr-icon-hang {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-hang .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-hang:hover .hvr-icon, .hvr-icon-hang:focus .hvr-icon, .hvr-icon-hang:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-hang-sink, hvr-icon-hang;\n    animation-name: hvr-icon-hang-sink, hvr-icon-hang;\n    -webkit-animation-duration: .3s, 1.5s;\n    animation-duration: .3s, 1.5s;\n    -webkit-animation-delay: 0s, .3s;\n    animation-delay: 0s, .3s;\n    -webkit-animation-timing-function: ease-out, ease-in-out;\n    animation-timing-function: ease-out, ease-in-out;\n    -webkit-animation-iteration-count: 1, infinite;\n    animation-iteration-count: 1, infinite;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards;\n    -webkit-animation-direction: normal, alternate;\n    animation-direction: normal, alternate; }\n\n/* Icon Wobble Horizontal */\n@-webkit-keyframes hvr-icon-wobble-horizontal {\n  16.65% {\n    -webkit-transform: translateX(6px);\n    transform: translateX(6px); }\n  33.3% {\n    -webkit-transform: translateX(-5px);\n    transform: translateX(-5px); }\n  49.95% {\n    -webkit-transform: translateX(4px);\n    transform: translateX(4px); }\n  66.6% {\n    -webkit-transform: translateX(-2px);\n    transform: translateX(-2px); }\n  83.25% {\n    -webkit-transform: translateX(1px);\n    transform: translateX(1px); }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes hvr-icon-wobble-horizontal {\n  16.65% {\n    -webkit-transform: translateX(6px);\n    transform: translateX(6px); }\n  33.3% {\n    -webkit-transform: translateX(-5px);\n    transform: translateX(-5px); }\n  49.95% {\n    -webkit-transform: translateX(4px);\n    transform: translateX(4px); }\n  66.6% {\n    -webkit-transform: translateX(-2px);\n    transform: translateX(-2px); }\n  83.25% {\n    -webkit-transform: translateX(1px);\n    transform: translateX(1px); }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n.hvr-icon-wobble-horizontal {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-wobble-horizontal .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-wobble-horizontal:hover .hvr-icon, .hvr-icon-wobble-horizontal:focus .hvr-icon, .hvr-icon-wobble-horizontal:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-wobble-horizontal;\n    animation-name: hvr-icon-wobble-horizontal;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Icon Wobble Vertical */\n@-webkit-keyframes hvr-icon-wobble-vertical {\n  16.65% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); }\n  33.3% {\n    -webkit-transform: translateY(-5px);\n    transform: translateY(-5px); }\n  49.95% {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n  66.6% {\n    -webkit-transform: translateY(-2px);\n    transform: translateY(-2px); }\n  83.25% {\n    -webkit-transform: translateY(1px);\n    transform: translateY(1px); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n@keyframes hvr-icon-wobble-vertical {\n  16.65% {\n    -webkit-transform: translateY(6px);\n    transform: translateY(6px); }\n  33.3% {\n    -webkit-transform: translateY(-5px);\n    transform: translateY(-5px); }\n  49.95% {\n    -webkit-transform: translateY(4px);\n    transform: translateY(4px); }\n  66.6% {\n    -webkit-transform: translateY(-2px);\n    transform: translateY(-2px); }\n  83.25% {\n    -webkit-transform: translateY(1px);\n    transform: translateY(1px); }\n  100% {\n    -webkit-transform: translateY(0);\n    transform: translateY(0); } }\n\n.hvr-icon-wobble-vertical {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-wobble-vertical .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-wobble-vertical:hover .hvr-icon, .hvr-icon-wobble-vertical:focus .hvr-icon, .hvr-icon-wobble-vertical:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-wobble-vertical;\n    animation-name: hvr-icon-wobble-vertical;\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* Icon Buzz */\n@-webkit-keyframes hvr-icon-buzz {\n  50% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  100% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); } }\n\n@keyframes hvr-icon-buzz {\n  50% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  100% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); } }\n\n.hvr-icon-buzz {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-buzz .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-buzz:hover .hvr-icon, .hvr-icon-buzz:focus .hvr-icon, .hvr-icon-buzz:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-buzz;\n    animation-name: hvr-icon-buzz;\n    -webkit-animation-duration: 0.15s;\n    animation-duration: 0.15s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: infinite;\n    animation-iteration-count: infinite; }\n\n/* Icon Buzz Out */\n@-webkit-keyframes hvr-icon-buzz-out {\n  10% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  20% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  30% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  40% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  50% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  60% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  70% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  80% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  90% {\n    -webkit-transform: translateX(1px) rotate(0);\n    transform: translateX(1px) rotate(0); }\n  100% {\n    -webkit-transform: translateX(-1px) rotate(0);\n    transform: translateX(-1px) rotate(0); } }\n\n@keyframes hvr-icon-buzz-out {\n  10% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  20% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  30% {\n    -webkit-transform: translateX(3px) rotate(2deg);\n    transform: translateX(3px) rotate(2deg); }\n  40% {\n    -webkit-transform: translateX(-3px) rotate(-2deg);\n    transform: translateX(-3px) rotate(-2deg); }\n  50% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  60% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  70% {\n    -webkit-transform: translateX(2px) rotate(1deg);\n    transform: translateX(2px) rotate(1deg); }\n  80% {\n    -webkit-transform: translateX(-2px) rotate(-1deg);\n    transform: translateX(-2px) rotate(-1deg); }\n  90% {\n    -webkit-transform: translateX(1px) rotate(0);\n    transform: translateX(1px) rotate(0); }\n  100% {\n    -webkit-transform: translateX(-1px) rotate(0);\n    transform: translateX(-1px) rotate(0); } }\n\n.hvr-icon-buzz-out {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  -webkit-transition-duration: 0.3s;\n  transition-duration: 0.3s; }\n  .hvr-icon-buzz-out .hvr-icon {\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0); }\n  .hvr-icon-buzz-out:hover .hvr-icon, .hvr-icon-buzz-out:focus .hvr-icon, .hvr-icon-buzz-out:active .hvr-icon {\n    -webkit-animation-name: hvr-icon-buzz-out;\n    animation-name: hvr-icon-buzz-out;\n    -webkit-animation-duration: 0.75s;\n    animation-duration: 0.75s;\n    -webkit-animation-timing-function: linear;\n    animation-timing-function: linear;\n    -webkit-animation-iteration-count: 1;\n    animation-iteration-count: 1; }\n\n/* CURLS */\n/* Curl Top Left */\n.hvr-curl-top-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-curl-top-left:before {\n    pointer-events: none;\n    position: absolute;\n    content: '';\n    height: 0;\n    width: 0;\n    top: 0;\n    left: 0;\n    background: white;\n    /* IE9 */\n    background: linear-gradient(135deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\n    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#ffffff', endColorstr='#000000');\n    /*For IE7-8-9*/\n    z-index: 1000;\n    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: width, height;\n    transition-property: width, height; }\n  .hvr-curl-top-left:hover:before, .hvr-curl-top-left:focus:before, .hvr-curl-top-left:active:before {\n    width: 25px;\n    height: 25px; }\n\n/* Curl Top Right */\n.hvr-curl-top-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-curl-top-right:before {\n    pointer-events: none;\n    position: absolute;\n    content: '';\n    height: 0;\n    width: 0;\n    top: 0;\n    right: 0;\n    background: white;\n    /* IE9 */\n    background: linear-gradient(225deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\n    box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.4);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: width, height;\n    transition-property: width, height; }\n  .hvr-curl-top-right:hover:before, .hvr-curl-top-right:focus:before, .hvr-curl-top-right:active:before {\n    width: 25px;\n    height: 25px; }\n\n/* Curl Bottom Right */\n.hvr-curl-bottom-right {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-curl-bottom-right:before {\n    pointer-events: none;\n    position: absolute;\n    content: '';\n    height: 0;\n    width: 0;\n    bottom: 0;\n    right: 0;\n    background: white;\n    /* IE9 */\n    background: linear-gradient(315deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\n    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.4);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: width, height;\n    transition-property: width, height; }\n  .hvr-curl-bottom-right:hover:before, .hvr-curl-bottom-right:focus:before, .hvr-curl-bottom-right:active:before {\n    width: 25px;\n    height: 25px; }\n\n/* Curl Bottom Left */\n.hvr-curl-bottom-left {\n  display: inline-block;\n  vertical-align: middle;\n  -webkit-transform: perspective(1px) translateZ(0);\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0);\n  position: relative; }\n  .hvr-curl-bottom-left:before {\n    pointer-events: none;\n    position: absolute;\n    content: '';\n    height: 0;\n    width: 0;\n    bottom: 0;\n    left: 0;\n    background: white;\n    /* IE9 */\n    background: linear-gradient(45deg, white 45%, #aaa 50%, #ccc 56%, white 80%);\n    box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.4);\n    -webkit-transition-duration: 0.3s;\n    transition-duration: 0.3s;\n    -webkit-transition-property: width, height;\n    transition-property: width, height; }\n  .hvr-curl-bottom-left:hover:before, .hvr-curl-bottom-left:focus:before, .hvr-curl-bottom-left:active:before {\n    width: 25px;\n    height: 25px; }\n", ""]);

// exports


/***/ }),

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _panel = __webpack_require__(165);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

    settings: {
        lastPos: 0,
        updatePos: true,
        stickyScroll: {}

    },

    init: function init() {
        module.exports.initHandler();
    },

    initHandler: function initHandler() {

        // $('.toggle-panel').off();  $('.overlay').off();
        //  $( window ).off();
        var panelMember = $('#panel-back').scotchPanel({
            containerSelector: 'body', // As a jQuery Selector
            direction: 'left', // Make it toggle in from the left
            duration: 300, // Speed in ms how fast you want it to be
            transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
            clickSelector: '.toggle-panel, .panel-click', // Enables toggling when clicking elements of this class
            distanceX: '380px', // Size fo the toggle
            enableEscapeKey: true, // Clicking Esc will close the panel

            afterPanelClose: function afterPanelClose() {
                $('#panel-back').animate({
                    width: "+=50px"
                });
            },
            afterPanelOpen: function afterPanelOpen() {
                $('#panel-back').animate({
                    width: "-=50px"
                });
            }
        });

        $('#panel-back').animate({
            width: "+=50px"
        });
        $('.container').animate({
            paddingLeft: "+=50px"
        });

        $('.navbar').animate({
            paddingLeft: "+=50px"
        });

        $('.toggle-panel').click(function () {
            //disable sticky handler default
            $(window).unbind('scroll');
            // move to top
            $('html,body').animate({ scrollTop: 0 }, 600);

            var top = $("#panel-main").css("top");

            $("#panel-main").animate({
                top: "-=" + top
            }, 150, function () {

                setTimeout(function () {
                    module.exports.settings.lastPos = 0;
                    module.exports.stickyHandler();
                }, 1000);
            });
        });

        $('.overlay').click(function () {
            // CLOSE ONLY
            panelMember.close();
        });

        module.exports.stickyHandler();
    },

    stickyHandler: function stickyHandler() {

        var stickyScroll = $(window).scroll(function () {
            var lastPos = module.exports.settings.lastPos;

            if (lastPos > $(document).scrollTop()) {
                var diff = Math.abs($(document).scrollTop() - lastPos);
                module.exports.animateMoveSticky("up", diff);
            } else {
                var _diff = Math.abs(lastPos - $(document).scrollTop());
                module.exports.animateMoveSticky("down", _diff);
            }
            module.exports.settings.lastPos = $(document).scrollTop();
        });
    },

    animateMoveSticky: function animateMoveSticky(direction, value) {

        var action = "-=" + value;
        if (direction === "down") {
            action = "+=" + value;
        }

        if (module.exports.settings.updatePos = true) {

            $("#panel-main").animate({
                top: action
            }, 150, function () {
                module.exports.settings.updatePos = false;
            });
        }

        setTimeout(function () {
            module.exports.settings.updatePos = true;
        }, 400);
    }

};

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(166);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!./panel.css", function() {
		var newContent = require("!!../../../../../../node_modules/css-loader/index.js!./panel.css");

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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "#panel-main {\n    background-color: #212529;\n    border-right: 1px solid #333333;\n    -webkit-box-shadow: 1px 1px 8px 2px rgba(0,0,0,0.12);\n    box-shadow: 1px 1px 8px 2px rgba(0,0,0,0.12);\n    position: relative;\n\n\n}\n\n\n#panel-back {\n    background: #232526;  /* fallback for old browsers */\n    background: -webkit-linear-gradient(to bottom, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */\n    background: linear-gradient(to bottom, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n    box-shadow: 0 9px 23px rgba(0, 0, 0, 0.09), 0 5px 5px rgba(0, 0, 0, 0.06) !important;\n    -webkit-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -moz-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    -o-transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n    transition: box-shadow 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) !important;\n\n\n}\n.panel-click {\n    position: absolute;\n    width: 60px;\n    height: 100vh;\n    margin-left: 380px;\n    cursor: pointer;\n    z-index: 9999999;\n}\n\n\nli.card-header {\n    color: #fff;\n    background: #232526;  /* fallback for old browsers */\n    background: -webkit-linear-gradient(to bottom, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */\n    background: linear-gradient(to bottom, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n\n}\n\n.list-group-item {\n    padding-right: 50px;\n}\n\n\n.overlay {\n    position: fixed;\n\n\n\n\n\n\n\n    width: 100%;\n    height: 100%;\n    display: none;\n    z-index: 999999;\n    -webkit-transition: all 225ms ease;\n    -moz-transition: all 225ms ease;\n    transition: all 225ms ease;\n\n    -webkit-animation-duration: 1s;\n    animation-duration: 1s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n\n    -webkit-animation-name: fadeIn;\n    animation-name: fadeIn;\n    cursor: pointer;\n}\n.scotch-is-showing .overlay {\n    display: block;\n}\n\n\n\n@-webkit-keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n\n@keyframes fadeIn {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}\n", ""]);

// exports


/***/ }),

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _notifications = __webpack_require__(168);

var _notifications2 = _interopRequireDefault(_notifications);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = __webpack_require__(5);

//Constructor
function NotificationObject(settings) {
    var self = this;
    // Attach Div ID
    this.settings = settings;

    this.display = 4;

    this.notifications = [];

    // Get Events
    api.getData('notification').then(function (valid) {
        self.notifications = valid;
        self.init();
        self.renderList();
    }, function (error) {
        console.log("Error fetching notification data.");
    });
}

NotificationObject.prototype.init = function () {
    // Do something...

};

// Top 4 items displayed... add a view all link
NotificationObject.prototype.renderList = function () {
    var self = this;
    var unreadCount = 0;
    var count = 0;

    $('#notification-menu-list').empty();

    var notifyHTML = '<ul class="list-group notification-list-group">';

    this.notifications.forEach(function (n) {

        if (n.userViewed === false) unreadCount++;

        // Limits display
        if (count < self.display) {
            notifyHTML += self.createItem(n);
        }
        count++;
    });

    if (count > self.display) notifyHTML += this.createOverflow(count);

    notifyHTML += ' </ul>';

    $('#notificaiton-unread-count').text(unreadCount);

    $('#notification-menu-list').append(notifyHTML);

    $('.notification-view').click(function () {
        if ($(this).attr('data-read') === "false") {
            console.log("unread");
            self.markRead($(this).attr('data-id'));
        }
    });

    $('.notification-delete-btn').click(function () {
        self.markRead($(this).attr('data-id'));
    });
};

NotificationObject.prototype.createItem = function (notification) {

    var n = notification;

    var badge = n.userView ? '' : '<span class="ml-2 badge badge-blue">New</span>';

    return '\n        <li class="list-group-item d-flex  align-items-left text-truncate notification-group-item" data-id="' + n.id + '">\n            <div class="icon pr-4">\n                <i class="' + n.type.icon + '"></i>\n             </div>\n             <div class="text-truncate">\n                <p class="title text-truncate">' + this.createNotificationLink(n) + ' ' + badge + '</p>\n                <p class="description text-truncate">' + n.message + '</p>\n                <span class="time">' + n.age + '</span>\n            </div>\n            <div class="ml-auto text-right">\n            <i class="fas fa-times notification-delete-btn" data-id="' + n.id + '"></i>\n</div>\n        </li>';
};

NotificationObject.prototype.createNotificationLink = function (notification) {

    var n = notification;

    var htmlLink = '<a href="' + window.location.origin;

    if (n.bill) {
        htmlLink += '/bill/view/' + n.bill.id;
    } else if (n.systemMessage) {
        htmlLink += '/system/' + n.id;
    } else if (n.income) {
        return '/income/' + n.income.id;
    } else if (n.event) {
        return '/calendar/event/' + n.event.id;
    }

    htmlLink += '" class="notification-view" data-id="' + n.id + '" data-read="' + n.userViewed + '">' + n.title + '</a>';

    return htmlLink;
};

NotificationObject.prototype.createOverflow = function (count) {

    var diff = count - this.display;

    var noun = diff > 1 ? 'notifications' : 'notification';

    return '\n        <li class="list-group-item d-flex justify-content-end align-items-right text-truncate">\n              <a href="' + window.location.origin + '/notifications"> View ' + diff + ' more ' + noun + ' </a>\n        </li>';
};

NotificationObject.prototype.markRead = function (notificationId) {

    var data = {
        identifier: notificationId
    };

    // Get Events
    api.updateData('notification/markRead', data).then(function (valid) {}, function (error) {
        console.log("Error fetching notification data.");
    });
};

NotificationObject.prototype.deleteItem = function (notificationId) {

    var data = {
        identifier: notificationId
    };

    // Get Events
    api.deleteData('notification/delete', data).then(function (valid) {}, function (error) {
        console.log("Error deleting");
    });
};

module.exports = NotificationObject;

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(169);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!./notifications.css", function() {
		var newContent = require("!!../../../../../../node_modules/css-loader/index.js!./notifications.css");

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

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".notification-list-group {\n    width: 350px;\n}\n\n.notification-list-group a {\n    color: #000000;\n}\n\n.notification-list-group .list-group-item {\n    padding-right: 10px;\n}", ""]);

// exports


/***/ }),

/***/ 3:
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

/***/ 4:
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

var	fixUrls = __webpack_require__(8);

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

/***/ 5:
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

/***/ 8:
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map