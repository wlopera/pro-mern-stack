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
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/App.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/App.js":
/*!***********************!*\
  !*** ./static/App.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _IssueAdd = __webpack_require__(/*! ./IssueAdd.js */ \"./static/IssueAdd.js\");\n\nvar _IssueAdd2 = _interopRequireDefault(_IssueAdd);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar contentNode = document.getElementById(\"contents\");\n\nvar IssueRow = function IssueRow(props) {\n  return React.createElement(\n    \"tr\",\n    null,\n    React.createElement(\n      \"td\",\n      null,\n      props.issue._id\n    ),\n    React.createElement(\n      \"td\",\n      null,\n      props.issue.status\n    ),\n    React.createElement(\n      \"td\",\n      null,\n      props.issue.owner\n    ),\n    React.createElement(\n      \"td\",\n      null,\n      props.issue.created.toDateString()\n    ),\n    React.createElement(\n      \"td\",\n      null,\n      props.issue.effort\n    ),\n    React.createElement(\n      \"td\",\n      null,\n      props.issue.completionDate ? props.issue.completionDate.toDateString() : \"\"\n    ),\n    React.createElement(\n      \"td\",\n      null,\n      props.issue.title\n    )\n  );\n};\n\nfunction IssueTable(props) {\n  var issueRows = props.issues.map(function (issue) {\n    return React.createElement(IssueRow, { key: issue._id, issue: issue });\n  });\n  return React.createElement(\n    \"table\",\n    { className: \"bordered-table\" },\n    React.createElement(\n      \"thead\",\n      null,\n      React.createElement(\n        \"tr\",\n        null,\n        React.createElement(\n          \"th\",\n          null,\n          \"Id\"\n        ),\n        React.createElement(\n          \"th\",\n          null,\n          \"Estado\"\n        ),\n        React.createElement(\n          \"th\",\n          null,\n          \"Propietario\"\n        ),\n        React.createElement(\n          \"th\",\n          null,\n          \"Fecha de creaci\\xF3n\"\n        ),\n        React.createElement(\n          \"th\",\n          null,\n          \"Esfuero\"\n        ),\n        React.createElement(\n          \"th\",\n          null,\n          \"Fecha de finalizaci\\xF3n\"\n        ),\n        React.createElement(\n          \"th\",\n          null,\n          \"T\\xEDtulo\"\n        )\n      )\n    ),\n    React.createElement(\n      \"tbody\",\n      null,\n      issueRows\n    )\n  );\n}\n\n// IssueRow.propTypes = {\n//   issue_id: React.PropTypes.number.isRequired,\n//   issue_title: React.PropTypes.string\n// };\n\n// IssueRow.defaultProps = {\n//   issue_title: \"-- Sin titulo --\"\n// };\n\nvar IssueFilter = function (_React$Component) {\n  _inherits(IssueFilter, _React$Component);\n\n  function IssueFilter() {\n    _classCallCheck(this, IssueFilter);\n\n    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));\n  }\n\n  _createClass(IssueFilter, [{\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\n        \"div\",\n        null,\n        \"Marcador para el filtro de problemas (issue's)\"\n      );\n    }\n  }]);\n\n  return IssueFilter;\n}(React.Component);\n\nvar IssueList = function (_React$Component2) {\n  _inherits(IssueList, _React$Component2);\n\n  function IssueList() {\n    _classCallCheck(this, IssueList);\n\n    var _this2 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));\n\n    _this2.state = {\n      issues: []\n    };\n\n    _this2.createIssue = _this2.createIssue.bind(_this2);\n    return _this2;\n  }\n\n  _createClass(IssueList, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.loadData();\n    }\n  }, {\n    key: \"loadData\",\n    value: function loadData() {\n      var _this3 = this;\n\n      fetch(\"/api/issues\").then(function (response) {\n        if (response.ok) {\n          response.json().then(function (data) {\n            console.log(\"total de registros: \", data._metadata.total_count);\n            data.records.forEach(function (issue) {\n              issue.created = new Date(issue.created);\n              if (issue.completionDate) {\n                issue.completionDate = new Date(issue.completionDate);\n              }\n            });\n            _this3.setState({ issues: data.records });\n          });\n        } else {\n          response.json().then(function (error) {\n            alert(\"Erroa al consultas problemas: \", error.message);\n          });\n        }\n      }).catch(function (err) {\n        alert(\"Error al recuperar datos del servidos; \", err);\n      });\n    }\n  }, {\n    key: \"createIssue\",\n    value: function createIssue(newIssue) {\n      var _this4 = this;\n\n      fetch(\"/api/issues\", {\n        method: \"POST\",\n        headers: { \"Content-Type\": \"application/json\" },\n        body: JSON.stringify(newIssue)\n      }).then(function (response) {\n        if (response.ok) {\n          response.json().then(function (updateIssue) {\n            console.log(\"1: %O\", updateIssue);\n            updateIssue.created = new Date(updateIssue.created);\n            if (updateIssue.completionDate) {\n              updateIssue.completionDate = new Date(updateIssue.completionDate);\n            }\n            var newIssues = _this4.state.issues.concat(updateIssue);\n            _this4.setState({ issues: newIssues });\n          });\n        } else {\n          response.json().then(function (error) {\n            console.log(\"error: %o\", error);\n            alert(\"Error al agregar nuevo problema [\" + response.status + \"]: \\n  \" + error.message);\n          });\n        }\n      }).catch(function (err) {\n        alert(\"Error enviando data al servidor [\" + response.status + \"]:  \\n  \" + error.message);\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"h1\",\n          null,\n          \"Explorador de problemas\"\n        ),\n        React.createElement(IssueFilter, null),\n        React.createElement(\"hr\", null),\n        React.createElement(IssueTable, { issues: this.state.issues }),\n        React.createElement(\"hr\", null),\n        React.createElement(_IssueAdd2.default, { createIssue: this.createIssue })\n      );\n    }\n  }]);\n\n  return IssueList;\n}(React.Component);\n\nReactDOM.render(React.createElement(IssueList, null), contentNode);\n\n//# sourceURL=webpack:///./static/App.js?");

/***/ }),

/***/ "./static/IssueAdd.js":
/*!****************************!*\
  !*** ./static/IssueAdd.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar IssueAdd = function (_React$Component) {\n  _inherits(IssueAdd, _React$Component);\n\n  function IssueAdd() {\n    _classCallCheck(this, IssueAdd);\n\n    var _this = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));\n\n    _this.handleSubmit = _this.handleSubmit.bind(_this);\n    return _this;\n  }\n\n  _createClass(IssueAdd, [{\n    key: \"handleSubmit\",\n    value: function handleSubmit(e) {\n      e.preventDefault();\n      var form = document.forms.issueAdd;\n      this.props.createIssue({\n        status: \"New\",\n        created: new Date(),\n        owner: form.owner.value,\n        title: form.title.value\n      });\n      // Limpiar el formulario\n      form.owner.value = \"\";\n      form.title.value = \"\";\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\n        \"div\",\n        null,\n        React.createElement(\n          \"form\",\n          { name: \"issueAdd\", onSubmit: this.handleSubmit },\n          React.createElement(\"input\", { type: \"text\", name: \"owner\", placeholder: \"Propietario\" }),\n          React.createElement(\"input\", { type: \"text\", name: \"title\", placeholder: \"T\\xEDtulo\" }),\n          React.createElement(\n            \"button\",\n            null,\n            \"Add\"\n          )\n        )\n      );\n    }\n  }]);\n\n  return IssueAdd;\n}(React.Component);\n\nexports.default = IssueAdd;\n\n//# sourceURL=webpack:///./static/IssueAdd.js?");

/***/ })

/******/ });