/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic */ \"./src/logic.js\");\n\n\ndocument.getElementById('start-btn').addEventListener('click', _logic__WEBPACK_IMPORTED_MODULE_1__.startGame);\ndocument.getElementById('leaderboard-btn').addEventListener('click', _logic__WEBPACK_IMPORTED_MODULE_1__.displayLeaderboard);\ndocument.getElementById('submit-btn').addEventListener('click', _logic__WEBPACK_IMPORTED_MODULE_1__.submitScore);\ndocument.getElementById('close-leaderboard-btn').addEventListener('click', () => {\n  document.getElementById('leaderboard-screen').classList.toggle('hidden');\n});\n\n//# sourceURL=webpack://wheres-that-pokemon/./src/index.js?");

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/*! namespace exports */
/*! export displayLeaderboard [provided] [no usage info] [missing usage info prevents renaming] */
/*! export startGame [provided] [no usage info] [missing usage info prevents renaming] */
/*! export submitScore [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"startGame\": () => /* binding */ startGame,\n/* harmony export */   \"submitScore\": () => /* binding */ submitScore,\n/* harmony export */   \"displayLeaderboard\": () => /* binding */ displayLeaderboard\n/* harmony export */ });\nconst store = firebase.firestore();\nconst storage = firebase.storage();\nlet targets = [];\nlet timerInterval;\nlet time; // Game elements -----------------\n\nconst game = document.getElementById('game-main');\nconst gameInfo = document.getElementById('game-info');\nconst startBtn = document.getElementById('start-btn'); // Game click functionality ---------------------\n\nfunction drawCircle(x, y) {\n  if (document.getElementById('circle')) {\n    game.removeChild(document.getElementById('circle'));\n  }\n\n  const img = document.createElement('img');\n  img.id = 'circle';\n  img.src = './assets/circle.png';\n  img.alt = 'Targeting circle';\n  img.style.left = x - 15 + 'px';\n  img.style.top = y - 15 + 'px';\n  game.appendChild(img);\n  console.log('circle placed');\n}\n\nfunction getClickLocation(e) {\n  const rect = e.target.getBoundingClientRect();\n  const cursorX = e.clientX - rect.left;\n  const cursorY = e.clientY - rect.top;\n  console.log(cursorX, cursorY);\n  drawCircle(cursorX + rect.left, cursorY + rect.top);\n  return [cursorX, cursorY];\n}\n\nfunction updateTarget() {\n  targets.forEach(obj => {\n    if (obj.isFound) {\n      const target = document.getElementById(`${obj.character}`);\n      target.classList.add('found');\n    }\n  });\n}\n\nfunction checkCoords(e) {\n  const [x, y] = getClickLocation(e);\n  targets.forEach(obj => {\n    if (obj.x < x + 15 && obj.x > x - 15 && obj.y < y + 15 && obj.y > y - 15) {\n      console.log('Success', obj);\n      obj.isFound === false ? obj.isFound = true : '';\n    }\n  });\n  updateTarget();\n}\n\nfunction checkWin() {\n  if (targets.every(obj => obj.isFound === true)) {\n    console.log('YOU WON!!!');\n    clearInterval(timerInterval);\n    document.getElementById('score-screen').classList.toggle('hidden');\n    ;\n    const diffInHours = time / 3600000;\n    const hours = Math.floor(diffInHours);\n    const diffInMins = (diffInHours - hours) * 60;\n    const mins = Math.floor(diffInMins);\n    const formattedMins = mins.toString().padStart(2, '0');\n    const diffInSecs = (diffInMins - mins) * 60;\n    const secs = Math.floor(diffInSecs);\n    const formattedSecs = secs.toString().padStart(2, '0');\n    const diffInMs = (diffInSecs - secs) * 100;\n    const ms = Math.floor(diffInMs);\n    const formattedMs = ms.toString().padStart(2, '0');\n    document.getElementById('score').textContent = `${formattedMins}:${formattedSecs}:${formattedMs}`;\n  }\n}\n\nfunction handleGameClick(e) {\n  checkCoords(e);\n  checkWin();\n} // Setting up game ----------------------------------\n\n\nfunction displayCharacterTargets() {\n  targets.forEach(obj => {\n    const targetImg = document.createElement('img');\n    targetImg.id = obj.character;\n    targetImg.classList.add('target-img');\n    targetImg.src = `./assets/${obj.character}.png`;\n    console.log(targetImg);\n    gameInfo.appendChild(targetImg);\n    requestAnimationFrame(() => {\n      targetImg.classList.add('fade-in');\n    });\n  });\n}\n\nfunction getCharacterLocations() {\n  store.collection('coordinates').get().then(coords => {\n    coords.forEach(obj => {\n      console.log(obj.data());\n      targets.push(obj.data());\n    });\n  }).then(() => displayCharacterTargets());\n}\n\nfunction startTimer() {\n  const timerElement = document.createElement('div');\n  timerElement.id = 'timer';\n  timerElement.classList.add('timer');\n  gameInfo.appendChild(timerElement);\n  requestAnimationFrame(() => {\n    timerElement.classList.add('fade-in');\n  });\n  const timerBegin = performance.now();\n  timerInterval = setInterval(() => {\n    const timerNow = performance.now();\n    const difference = timerNow - timerBegin;\n    const diffInHours = difference / 3600000;\n    const hours = Math.floor(diffInHours);\n    const diffInMins = (diffInHours - hours) * 60;\n    const mins = Math.floor(diffInMins);\n    const formattedMins = mins.toString().padStart(2, '0');\n    const diffInSecs = (diffInMins - mins) * 60;\n    const secs = Math.floor(diffInSecs);\n    const formattedSecs = secs.toString().padStart(2, '0');\n    const diffInMs = (diffInSecs - secs) * 100;\n    const ms = Math.floor(diffInMs);\n    const formattedMs = ms.toString().padStart(2, '0');\n    timerElement.textContent = `${formattedMins}:${formattedSecs}:${formattedMs}`;\n    time = difference;\n  }, 10);\n}\n\nfunction fetchGameScene() {\n  const gsRef = storage.refFromURL('gs://wheres-that-pokemon-77670.appspot.com/pokemon-scene.png');\n  const img = document.createElement('img');\n  img.id = 'game-canvas';\n  img.classList.add('game-canvas');\n  img.alt = 'An image of many difference pokemon';\n  gsRef.getDownloadURL().then(url => {\n    console.log(url);\n    img.src = url;\n  }).catch(error => {\n    console.log('Failed to fetch scene.', error);\n  });\n  img.addEventListener('click', handleGameClick);\n  game.appendChild(img);\n\n  img.onload = () => {\n    startTimer();\n    requestAnimationFrame(() => {\n      img.classList.add('fade-in');\n    });\n  };\n}\n\nfunction startGame() {\n  targets = [];\n  time = '';\n  game.removeChild(startBtn);\n  gameInfo.innerHTML = '';\n  getCharacterLocations();\n  fetchGameScene();\n} // Game end functionality -------------------\n\n\nfunction submitScore(e) {\n  e.preventDefault();\n  const score = time;\n  const name = document.getElementById('name-input').value;\n  store.collection('scores').add({\n    name: name,\n    score: score,\n    date: new Date()\n  }).then(() => {\n    console.log('Document successfully written!');\n    document.getElementById('score-screen').classList.toggle('hidden');\n  }).catch(error => {\n    console.log('Error writing document', error);\n  });\n} // Leaderboard funtionality -----------------------------\n\n\nfunction displayLeaderboard() {\n  const leaderboard = document.getElementById('leaderboard-screen');\n  const leaderboardDiv = document.getElementById('leaderboard-div');\n  leaderboardDiv.innerHTML = '';\n  store.collection('scores').get().then(scores => {\n    scores.forEach(obj => {\n      const score = obj.data();\n      console.log(score);\n      const leaderDiv = document.createElement('div');\n      leaderDiv.classList.add('leaderboard-score');\n      const nameDiv = document.createElement('div');\n      const timeDiv = document.createElement('div');\n      nameDiv.textContent = score.name;\n      const diffInHours = score.score / 3600000;\n      const hours = Math.floor(diffInHours);\n      const diffInMins = (diffInHours - hours) * 60;\n      const mins = Math.floor(diffInMins);\n      const formattedMins = mins.toString().padStart(2, '0');\n      const diffInSecs = (diffInMins - mins) * 60;\n      const secs = Math.floor(diffInSecs);\n      const formattedSecs = secs.toString().padStart(2, '0');\n      const diffInMs = (diffInSecs - secs) * 100;\n      const ms = Math.floor(diffInMs);\n      const formattedMs = ms.toString().padStart(2, '0');\n      timeDiv.textContent = `${formattedMins}:${formattedSecs}:${formattedMs}`;\n      leaderDiv.appendChild(nameDiv);\n      leaderDiv.appendChild(timeDiv);\n      leaderboardDiv.appendChild(leaderDiv);\n      leaderboardDiv.appendChild(document.createElement('hr'));\n    });\n    leaderboard.classList.toggle('hidden');\n  }).catch(error => {\n    console.log('Error getting scores', error);\n  });\n}\n\n\n\n//# sourceURL=webpack://wheres-that-pokemon/./src/logic.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, module.id, __webpack_require__.d, __webpack_require__.*, module */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _assets_pokemon_bg_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/pokemon-bg.png */ \"./src/assets/pokemon-bg.png\");\n// Imports\n\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_assets_pokemon_bg_png__WEBPACK_IMPORTED_MODULE_2__.default);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* ----------CSS RESET-------------- */\\nhtml, body, div, span, applet, object, iframe,\\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\\na, abbr, acronym, address, big, cite, code,\\ndel, dfn, em, img, ins, kbd, q, s, samp,\\nsmall, strike, strong, sub, sup, tt, var,\\nb, u, i, center,\\ndl, dt, dd, ol, ul, li,\\nfieldset, form, label, legend,\\ntable, caption, tbody, tfoot, thead, tr, th, td,\\narticle, aside, canvas, details, embed,\\nfigure, figcaption, footer, header, hgroup,\\nmenu, nav, output, ruby, section, summary,\\ntime, mark, audio, video {\\n\\tmargin: 0;\\n\\tpadding: 0;\\n\\tborder: 0;\\n\\tfont-size: 100%;\\n\\tfont: inherit;\\n\\tvertical-align: baseline;\\n}\\n/* HTML5 display-role reset for older browsers */\\narticle, aside, details, figcaption, figure,\\nfooter, header, hgroup, menu, nav, section {\\n\\tdisplay: block;\\n}\\nbody {\\n\\tline-height: 1;\\n}\\nol, ul {\\n\\tlist-style: none;\\n}\\nblockquote, q {\\n\\tquotes: none;\\n}\\nblockquote:before, blockquote:after,\\nq:before, q:after {\\n\\tcontent: none;\\n}\\ntable {\\n\\tborder-collapse: collapse;\\n\\tborder-spacing: 0;\\n}\\n\\n/* ------------MAIN CSS---------------- */\\nhtml {\\n  box-sizing: border-box;\\n  font-size: 62.5%;\\n  font-family: 'Anton', sans-serif;\\n  color: white;\\n}\\n\\nbody {\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") no-repeat center center fixed;\\n  -webkit-background-size: cover;\\n  -moz-background-size: cover;\\n  -o-background-size: cover;\\n  background-size: cover;\\n}\\n\\n#root {\\n  width: 100vw;\\n  height: 100vh;\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: space-around;\\n  align-items: center;\\n}\\n\\n#game-side {\\n  width: 300px;\\n  height: 95%;\\n\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-between;\\n  align-items: center;\\n\\n  font-size: 2rem;\\n\\n  background-color: rgba(0, 0, 0, 0.5);\\n  border-radius: 5px;\\n}\\n\\n.logo {\\n  font-size: 4rem;\\n  padding: 2rem;\\n  text-align: center;\\n}\\n\\n#game-info {\\n  font-family: 'Roboto', sans-serif;\\n  height: 100%;\\n\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: flex-start;\\n  align-items: center;\\n}\\n\\n#game-info p {\\n  padding: 2rem;\\n  text-align: center;\\n}\\n\\n.timer {\\n  background-color: rgb(2, 63, 2);\\n  border-radius: 5px;\\n  margin: 2rem;\\n  padding: 1rem;\\n\\n  transition: .4s;\\n  transform: scale(0);\\n}\\n\\n.target-img {\\n  max-width: 75px;\\n  max-height: 75px;\\n  margin: 1rem;\\n  padding: 1rem;\\n  transition: .4s;\\n  transform: scale(0);\\n}\\n\\n.found {\\n  background-color: rgb(2, 63, 2);\\n  border-radius: 5px;\\n}\\n\\n#leaderboard-btn {\\n  width: calc(80%);\\n  height: 4rem;\\n\\n  margin: 2rem;\\n\\n  font-size: 1.75rem;\\n}\\n\\n#game-main {\\n  width: 1000px;\\n  height: 95%;\\n\\n  font-size: 2rem;\\n  text-align: center;\\n\\n  background-color: rgba(0, 0, 0, 0.5);\\n  border-radius: 5px;\\n\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\n#start-btn {\\n  width: 400px;\\n  height: 100px;\\n\\n  font-size: 4rem;\\n}\\n\\n#circle {\\n  position: absolute;\\n  width: 30px;\\n  height: 30px;\\n}\\n\\n.game-canvas {\\n  position: relative;\\n  transform: scale(0);\\n  transition: .4s;\\n\\n  max-width: 100%;\\n  max-height: 650px;\\n}\\n\\n.btn {\\n  background-color: rgb(2, 63, 2);\\n  font-family: 'Anton', sans-serif;\\n  color: white;\\n  border: none;\\n  border-radius: 5px;\\n}\\n\\n.fade-in {\\n  transform: scale(1);\\n}\\n\\n.hidden {\\n  display: none;\\n  transition: .4s;\\n}\\n\\n#score-screen {\\n  transition: .4s;\\n}\\n\\n.score-div {\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n\\n  padding: 2rem;\\n\\n  width: 50%;\\n  height: 50%;\\n\\n  background-color: rgb(2, 63, 2);\\n  border-radius: 5px;\\n\\n  box-shadow: 0 0 1rem black;\\n}\\n\\n.score-div h1 {\\n  font-size: 5rem;\\n  margin-bottom: 2rem;\\n}\\n\\n.score-div p {\\n  font-family: 'Roboto', sans-serif;\\n  font-size: 3rem;\\n  margin: .5rem;\\n}\\n\\n.score-div form {\\n  margin: 2rem;\\n}\\n\\n.score-div input {\\n  width: 400px;\\n\\n  font-size: 2rem;\\n  font-family: 'Roboto', sans-serif;\\n\\n  padding: 1rem;\\n\\n  border-radius: 5px;\\n}\\n\\n.score-div button {\\n  width: 100px;\\n  font-size: 2rem;\\n  font-family: 'Roboto', sans-serif;\\n\\n  padding: 1rem;\\n  border-radius: 5px;\\n}\\n\\n#leaderboard-screen {\\n  position: absolute;\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n\\n  width: 50%;\\n  height: 50%;\\n\\n  padding: 2rem;\\n\\n  background-color: rgb(2, 63, 2);\\n  border-radius: 5px;\\n\\n  box-shadow: 0 0 1rem black;\\n}\\n\\n#leaderboard-screen h1 {\\n  font-size: 5rem;\\n  text-align: center;\\n}\\n\\n#leaderboard-screen hr {\\n  width: 100%;\\n}\\n\\n.leaderboard-div {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: flex-start;\\n\\n  margin: 0 auto;\\n  width: 50%;\\n  height: 100%;\\n\\n  margin-top: 2rem;\\n\\n  font-size: 2rem;\\n  font-family: 'Roboto', sans-serif;\\n\\n  overflow-y: auto;\\n  overflow-x: hidden;\\n}\\n\\n.leaderboard-score {\\n  width: 100%;\\n\\n  display: flex;\\n  flex-direction: row;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n\\n.leaderboard-score hr {\\n  width: 100%;\\n}\\n\\n#close-leaderboard-btn {\\n  position: absolute;\\n  top: 20px;\\n  right: 20px;\\n\\n  border: none;\\n  height: 2rem;\\n  width: 2rem;\\n  border-radius: 1rem;\\n  color: rgb(2, 63, 2);\\n  background-color: white;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://wheres-that-pokemon/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://wheres-that-pokemon/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url && url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://wheres-that-pokemon/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/assets/pokemon-bg.png":
/*!***********************************!*\
  !*** ./src/assets/pokemon-bg.png ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.p, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"b1ee00cc6fd3a24ee0db07a3cf305c38.png\");\n\n//# sourceURL=webpack://wheres-that-pokemon/./src/assets/pokemon-bg.png?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://wheres-that-pokemon/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__.nc, __webpack_require__.* */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://wheres-that-pokemon/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;