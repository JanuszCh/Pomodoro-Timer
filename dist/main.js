/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	document.addEventListener("DOMContentLoaded", function () {
	    __webpack_require__(1);
	    __webpack_require__(5);

	    var app = document.getElementById('app'),
	        increaseMinBtn = app.querySelector('#increaseMinBtn'),
	        decreaseMinBtn = app.querySelector('#decreaseMinBtn'),
	        increaseSecBtn = app.querySelector('#increaseSecBtn'),
	        decreaseSecBtn = app.querySelector('#decreaseSecBtn'),
	        startBtn = app.querySelector('#startBtn'),
	        resetBtn = app.querySelector('#resetBtn'),
	        defaultBtn = app.querySelector('#defaultBtn'),
	        workBtn = app.querySelector('#workBtn'),
	        breakBtn = app.querySelector('#breakBtn'),
	        timer = app.querySelector('#timer'),
	        timerMin = app.querySelector('#timerMin'),
	        timerSec = app.querySelector('#timerSec'),
	        timerTitle = app.querySelector('#timerTitle'),
	        buttons = app.querySelectorAll('.jsButton'),
	        alarmSound = new Audio('sounds/alarm.mp3');
	    var userMinBreak = '05',
	        userSecBreak = '00',
	        userMinWork = '20',
	        userSecWork = '00',
	        counting = '';

	    function toSeconds() {
	        var minutesToSeconds = parseInt(timerMin.innerText) * 60;
	        return minutesToSeconds + parseInt(timerSec.innerText);
	    }

	    function toMinutes(sec) {
	        var seconds = sec % 60;
	        var minutes = (sec - seconds) / 60;
	        return [minutes, seconds];
	    }

	    function showTime(min, sec) {
	        if (min.toString().length < 2) {
	            timerMin.innerText = '0' + min;
	        } else {
	            timerMin.innerText = min;
	        }
	        timerSec.innerText = ('0' + sec).substr(-2, 2);
	    }

	    function increaseMin() {
	        var secondsCount = toSeconds() + 60;
	        var time = toMinutes(secondsCount);
	        showTime(time[0], time[1]);
	    }

	    function decreaseMin() {
	        var secondsCount = toSeconds();
	        if (secondsCount >= 60) {
	            secondsCount -= 60;
	            var time = toMinutes(secondsCount);
	            showTime(time[0], time[1]);
	        }
	    }

	    function increaseSec() {
	        var secondsCount = toSeconds() + 5;
	        var time = toMinutes(secondsCount);
	        showTime(time[0], time[1]);
	    }

	    function decreaseSec() {
	        var secondsCount = toSeconds();
	        if (secondsCount > 0) {
	            secondsCount -= 5;
	            var time = toMinutes(secondsCount);
	            showTime(time[0], time[1]);
	        }
	    }

	    function removeEvents() {
	        increaseMinBtn.removeEventListener('click', increaseMin);
	        decreaseMinBtn.removeEventListener('click', decreaseMin);
	        increaseSecBtn.removeEventListener('click', increaseSec);
	        decreaseSecBtn.removeEventListener('click', decreaseSec);
	        workBtn.removeEventListener('click', workMode);
	        breakBtn.removeEventListener('click', breakMode);
	        startBtn.removeEventListener('click', startTimer);
	    }

	    function countdownLayout() {
	        for (var i = 0; i < buttons.length; i++) {
	            buttons[i].classList.add("inactive");
	        }
	        timer.classList.add("active");
	        timerTitle.classList.add("active");
	    }

	    function startCountdown() {
	        counting = setInterval(function () {
	            var secondsCount = toSeconds() - 1;
	            var time = toMinutes(secondsCount);
	            showTime(time[0], time[1]);
	            if (secondsCount === 0) {
	                clearInterval(counting);
	                alarmSound.play();
	            }
	        }, 1000);
	    }

	    function isWorkMode() {
	        return timerTitle.dataset.id === "work";
	    }

	    function saveUserSettings() {
	        if (isWorkMode()) {
	            userMinWork = timerMin.innerText;
	            userSecWork = timerSec.innerText;
	        } else {
	            userMinBreak = timerMin.innerText;
	            userSecBreak = timerSec.innerText;
	        }
	    }

	    function startTimer() {
	        if (toSeconds() > 0) {
	            countdownLayout();
	            removeEvents();
	            saveUserSettings();
	            startCountdown();
	        }
	    }

	    function settingsLayout() {
	        for (var i = 0; i < buttons.length; i++) {
	            buttons[i].classList.remove("inactive");
	        }
	        timer.classList.remove("active");
	        timerTitle.classList.remove("active");
	    }

	    function resetTimer() {
	        settingsLayout();
	        addEvents();
	        clearInterval(counting);
	        alarmSound.pause();

	        if (isWorkMode()) {
	            showTime(userMinWork, userSecWork);
	        } else {
	            showTime(userMinBreak, userSecBreak);
	        }
	    }

	    function defaultTimer() {
	        settingsLayout();
	        addEvents();
	        clearInterval(counting);
	        alarmSound.pause();

	        if (isWorkMode()) {
	            showTime(20, 0);
	        } else {
	            showTime(5, 0);
	        }
	    }

	    function workModeLayout() {
	        timerTitle.dataset.id = 'work';
	        timerTitle.innerText = 'Work';
	        timerMin.innerText = userMinWork;
	        timerSec.innerText = userSecWork;
	    }

	    function breakModeLayout() {
	        timerTitle.dataset.id = 'break';
	        timerTitle.innerText = 'Break';
	        timerMin.innerText = userMinBreak;
	        timerSec.innerText = userSecBreak;
	    }

	    function workMode() {
	        saveUserSettings();
	        workModeLayout();
	    }

	    function breakMode() {
	        saveUserSettings();
	        breakModeLayout();
	    }

	    function addEvents() {
	        increaseMinBtn.addEventListener('click', increaseMin);
	        decreaseMinBtn.addEventListener('click', decreaseMin);
	        increaseSecBtn.addEventListener('click', increaseSec);
	        decreaseSecBtn.addEventListener('click', decreaseSec);
	        startBtn.addEventListener('click', startTimer);
	        workBtn.addEventListener('click', workMode);
	        breakBtn.addEventListener('click', breakMode);
	    }

	    addEvents();
	    resetBtn.addEventListener('click', resetTimer);
	    defaultBtn.addEventListener('click', defaultTimer);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./reset.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "html, body, body div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, figure, footer, header, menu, nav, section, time, mark, audio, video, details, summary {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    font-size: 100%;\r\n    font-weight: normal;\r\n    vertical-align: baseline;\r\n    background: transparent;\r\n}\r\n\r\narticle, aside, figure, footer, header, nav, section, details, summary {\r\n    display: block;\r\n}\r\nhtml {\r\n    box-sizing: border-box;\r\n}\r\n\r\n*, *:before, *:after {\r\n    box-sizing: inherit;\r\n}\r\nimg, object, embed {\r\n    max-width: 100%;\r\n}\r\n\r\nhtml {\r\n    overflow-y: scroll;\r\n}\r\n\r\nul {\r\n    list-style: none;\r\n}\r\n\r\nblockquote, q {\r\n    quotes: none;\r\n}\r\n\r\nblockquote:before, blockquote:after, q:before, q:after {\r\n    content: '';\r\n    content: none;\r\n}\r\n\r\na {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-size: 100%;\r\n    vertical-align: baseline;\r\n    background: transparent;\r\n}\r\n\r\ndel {\r\n    text-decoration: line-through;\r\n}\r\n\r\nabbr[title], dfn[title] {\r\n    border-bottom: 1px dotted #000;\r\n    cursor: help;\r\n}\r\n\r\ntable {\r\n    border-collapse: separate;\r\n    border-spacing: 0;\r\n}\r\n\r\nth {\r\n    font-weight: bold;\r\n    vertical-align: bottom;\r\n}\r\n\r\ntd {\r\n    font-weight: normal;\r\n    vertical-align: top;\r\n}\r\n\r\nhr {\r\n    display: block;\r\n    height: 1px;\r\n    border: 0;\r\n    border-top: 1px solid #ccc;\r\n    margin: 1em 0;\r\n    padding: 0;\r\n}\r\n\r\ninput, select {\r\n    vertical-align: middle;\r\n}\r\n\r\npre {\r\n    white-space: pre;\r\n    white-space: pre-wrap;\r\n    white-space: pre-line;\r\n    word-wrap: break-word;\r\n}\r\n\r\ninput[type=\"radio\"] {\r\n    vertical-align: text-bottom;\r\n}\r\n\r\ninput[type=\"checkbox\"] {\r\n    vertical-align: bottom;\r\n}\r\n\r\n.ie7 input[type=\"checkbox\"] {\r\n    vertical-align: baseline;\r\n}\r\n\r\n.ie6 input {\r\n    vertical-align: text-bottom;\r\n}\r\n\r\nselect, input, textarea {\r\n    font: 99% sans-serif;\r\n}\r\n\r\ntable {\r\n    font-size: inherit;\r\n    font: 100%;\r\n}\r\n\r\nsmall {\r\n    font-size: 85%;\r\n}\r\n\r\nstrong {\r\n    font-weight: bold;\r\n}\r\n\r\ntd, td img {\r\n    vertical-align: top;\r\n}\r\n\r\nsub, sup {\r\n    font-size: 75%;\r\n    line-height: 0;\r\n    position: relative;\r\n}\r\n\r\nsup {\r\n    top: -0.5em;\r\n}\r\n\r\nsub {\r\n    bottom: -0.25em;\r\n}\r\n\r\npre, code, kbd, samp {\r\n    font-family: monospace, sans-serif;\r\n}\r\n\r\n.clickable, label, input[type=button], input[type=submit], input[type=file], button {\r\n    cursor: pointer;\r\n}\r\n\r\nbutton, input, select, textarea {\r\n    margin: 0;\r\n}\r\n\r\nbutton, input[type=button] {\r\n    width: auto;\r\n    overflow: visible;\r\n}\r\n\r\n.ie7 img {\r\n    -ms-interpolation-mode: bicubic;\r\n}\r\n\r\n.clearfix:after {\r\n    content: \" \";\r\n    display: block;\r\n    clear: both;\r\n}\r\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\r\n    background-color: #9D2D30;\r\n    font-family: 'Orbitron', sans-serif;\r\n}\r\n\r\n.app {\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    width: 300px;\r\n    margin: 5% auto 0 auto;\r\n    border: 2px solid #C34D4B;\r\n    border-radius: 3px;\r\n    padding: 10px;\r\n    text-align: center;\r\n    cursor: default;\r\n}\r\n\r\n.timer {\r\n    font-size: 42px;\r\n    color: #C34D4B;\r\n}\r\n\r\n.timer span {\r\n    font-weight: 800;\r\n}\r\n\r\n.button {\r\n    border: 2px solid white;\r\n    border-radius: 3px;\r\n    display: inline-block;\r\n    cursor: pointer;\r\n    color: white;\r\n}\r\n\r\n.timerTitle {\r\n    font-size: 32px;\r\n    color: #C34D4B;\r\n    font-weight: 800;\r\n}\r\n\r\n.increaseMinBtn, .decreaseMinBtn, .increaseSecBtn, .decreaseSecBtn {\r\n    border: 1px solid transparent;\r\n    margin: 10px 23px;\r\n    width: 50px;\r\n    font-size: 28px;\r\n}\r\n\r\n.increaseMinBtn:hover, .decreaseMinBtn:hover, .increaseSecBtn:hover, .decreaseSecBtn:hover {\r\n    border-color: white;\r\n}\r\n\r\n.startBtn {\r\n    width: 200px;\r\n    font-size: 22px;\r\n    padding: 10px;\r\n    margin: 15px auto 0 auto;\r\n    display: block;\r\n}\r\n\r\n.workBtn, .breakBtn, .resetBtn, .defaultBtn {\r\n    width: 90px;\r\n    margin: 20px 10px;\r\n    padding: 5px;\r\n}\r\n\r\n.startBtn:hover, .workBtn:hover, .breakBtn:hover, .resetBtn:hover, .defaultBtn:hover {\r\n    background-color: white;\r\n    color: #9D2D30;\r\n}\r\n\r\n.inactive {\r\n    border-color: #C34D4B;\r\n    color: #BE2D30;\r\n}\r\n.inactive:hover {\r\n    background-color: #9D2D30;\r\n    border-color: #C34D4B;\r\n    color: #BE2D30;\r\n}\r\n\r\n.active {\r\n    color: white;\r\n}\r\n", ""]);

	// exports


/***/ }
/******/ ]);