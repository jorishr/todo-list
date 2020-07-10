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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/public/scripts/app-vanilla_js.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/public/scripts/app-vanilla_js.js":
/*!**********************************************!*\
  !*** ./app/public/scripts/app-vanilla_js.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ul = document.querySelector('ul'),\n    btnAdd = document.querySelector('.btnAdd'),\n    btnDelete = document.querySelectorAll('.btnDelete');\nbtnDone = document.querySelectorAll('.btnDone'), btnEdit = document.querySelectorAll('.btnEdit'), newForm = document.querySelector('#newForm'), editForm = document.querySelector('#editForm'); //  note: the parent element of the btns is the <li>\n//  apply styling for tasks marked as completed\n\nfunction done(elem) {\n  elem.parentNode.classList.toggle('doneStyles');\n}\n\nbtnDone.forEach(function (btn) {\n  btn.addEventListener('click', function (event) {\n    done(this);\n  });\n});\n/*  \r\n    input new to-do task: \r\n    - when hit enter capture input value and reset input field\r\n    - create new <li> and add eventlisteners to all three btns created inside \r\n    the <li> \r\n*/\n\nnewForm.addEventListener('keypress', function () {\n  var _this = this;\n\n  if (event.which === 13) {\n    (function () {\n      var textInput = _this.value.trim();\n\n      _this.value = '';\n      var newLi = document.createElement('li');\n      newLi.innerHTML = \"<span class=\\\"btnDone\\\"><i class=\\\"far fa-check-square\\\"></i></span><span class=\\\"btnEdit\\\"><i class='fas fa-edit'></i></span><span class=\\\"btnDelete\\\"><i class='fas fa-trash-alt'></i></span>\".concat(textInput);\n      ul.appendChild(newLi);\n\n      var _loop = function _loop(i) {\n        newLi.children[i].addEventListener('click', function () {\n          if (newLi.children[i].classList.contains('btnDone')) {\n            done(this);\n          }\n\n          ;\n\n          if (newLi.children[i].classList.contains('btnDelete')) {\n            del(this);\n          }\n\n          ;\n\n          if (newLi.children[i].classList.contains('btnEdit')) {\n            edit(this);\n          }\n\n          ;\n        });\n      };\n\n      for (var i = 0; i < newLi.children.length; i++) {\n        _loop(i);\n      }\n\n      ;\n    })();\n  }\n});\n/*  \r\n    edit btn\r\n    - on click capture original task text and show it inside the input elem \r\n    which is hidden by default (display:none)\r\n    - transform effect comes after applying the class that sets display: block;\r\n    - time out ensures the effect is better visible\r\n    - class is added for reference in the update code below\r\n*/\n\nfunction edit(elem) {\n  var taskText = elem.parentNode.textContent.trim();\n  editForm.value = taskText;\n  elem.parentNode.classList.add('selected');\n  editForm.classList.remove('fadeOut');\n  editForm.classList.add('fadeIn');\n  setTimeout(function () {\n    editForm.classList.add('transform');\n  }, 10);\n}\n\n;\nbtnEdit.forEach(function (btn) {\n  btn.addEventListener('click', function () {\n    edit(this);\n    event.stopPropagation();\n  });\n});\n/* \r\n    update task text value\r\n    - on keypress enter: capture the input value and reset the input field\r\n    - select the correct <li> using the class added when the edit btn was\r\n    clicked\r\n    - IMPORTANT, updating <li> text: since we know the fixed order of the \r\n    childNodes in the <li> we can update the text value without using \r\n    innerHTML. \r\n    - hide the editForm input field \r\n*/\n\neditForm.addEventListener('keypress', function (event) {\n  var _this2 = this;\n\n  if (event.which === 13) {\n    var newInput = this.value.trim();\n    this.value = ''; // reset\n\n    document.querySelector('.selected').childNodes[3].nodeValue = \"\".concat(newInput);\n    document.querySelector('.selected').classList.remove('selected');\n    this.classList.add('fadeOut');\n    setTimeout(function () {\n      _this2.classList.remove('fadeIn');\n\n      _this2.classList.remove('transform');\n    }, 1000);\n  }\n\n  ;\n}); //  delete button: remove the element from the dom after the fadeOut transition\n\nfunction del(elem) {\n  elem.parentNode.classList.add('fadeOut');\n  setTimeout(function () {\n    ul.removeChild(elem.parentNode);\n  }, 1000);\n}\n\n;\nbtnDelete.forEach(function (btn) {\n  btn.addEventListener('click', function (event) {\n    del(this);\n  });\n}); //  toggle visibilty new task input element\n\nbtnAdd.addEventListener('click', function () {\n  newForm.classList.toggle('fadeIn');\n  setTimeout(function () {\n    newForm.classList.toggle('transform');\n  }, 10);\n});\n\n//# sourceURL=webpack:///./app/public/scripts/app-vanilla_js.js?");

/***/ })

/******/ });