// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"db2a2fbf335cf7f2a3c899d3f4bb755e":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "71b6d2ffa2039cc872414d7aafe3b91f";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      var newStyle = document.createElement('style');
      newStyle.innerHTML = asset.output;
      document.body.appendChild(newStyle);
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"46254651d0a95442f8526eb0731804bd":[function(require,module,exports) {
"use strict";

var _random = _interopRequireDefault(require("canvas-sketch-util/random"));

var _niceColorPalettes = _interopRequireDefault(require("nice-color-palettes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const random = require('canvas-sketch-util/random');
const makeGrid = count => {
  const points = [];

  const colorCount = _random.default.rangeFloor(1, 5);

  const palette = _random.default.shuffle(_random.default.pick(_niceColorPalettes.default)).slice(0, colorCount);

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : x / (count - 1);
      const v = count <= 1 ? 0.5 : y / (count - 1); // const radius = Math.abs(u, v) * 0.01;

      const radius = Math.abs(_random.default.noise2D(u, v)) * 0.01;
      points.push({
        position: [u, v],
        color: _random.default.pick(palette),
        // creates a much more random distribution of numbers
        // can produce a negative value.
        radius,
        rotation: _random.default.noise2D(u, v) // rotation: 1,

      });
    }
  }

  return points;
};

const buildCanvas = count => {
  const height = 750;
  const width = 750;
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height); // Create a grid

  const points = makeGrid(count);
  console.log(points);
  points.forEach(point => {
    const {
      position,
      radius,
      color,
      rotation
    } = point;
    const [u, v] = position;
    const x = u * width;
    const y = v * height;
    context.beginPath(); //radius * width is making it relative to the width of the page

    context.arc(x, y, radius * width, 0, Math.PI * 2, false);
    context.lineWidth = 5;
    context.fillStyle = color;
    context.fill();
    context.save(); //   context.fillStyle = color;
    //   context.font = `${radius * width}px "Helvetica"`;
    // create new origin point

    context.translate(x, y); // rotate at that origin point

    context.rotate(rotation); // fill text at that origin point
    //   context.fillText('.', 0, 0);
    // reset everything

    context.restore();
  });
};

const drawSomething = (x, y) => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  const colorCount = _random.default.rangeFloor(1, 5);

  const palette = _random.default.shuffle(_random.default.pick(_niceColorPalettes.default)).slice(0, colorCount);

  context.beginPath();
  context.arc(x, y, 5, 0, Math.PI * 2, false);
  context.lineWidth = 5;
  context.fillStyle = _random.default.pick(palette);
  context.fill();
  context.save();
};

const clickListener = () => {
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('mouseDown', function (e) {
    console.log(e);
    const y = e.clientY;
    const x = e.clientX;
    drawSomething(x, y);
  });
};

const sliderListener = () => {
  const slider = document.getElementById("count");
  slider.addEventListener('change', function (e) {
    console.log(e.target.value);
    const count = parseInt(e.target.value, 10);
    buildCanvas(count);
  });
};

const makeHigglePiggle = (x, y, palette) => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const count = [10, 20, 30, 40, 50];

  for (let c of count) {
    ctx.beginPath(); // ctx.moveTo(prevX, prevY);
    // ctx.lineTo(currX, currY);

    const randomx = _random.default.noise2D(x, y);

    const randomy = _random.default.noise2D(x, y);

    ctx.arc(x - c, y + c, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = _random.default.pick(palette);
    ctx.fill();
    ctx.save();
    ctx.restore();
  }
};

let flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

const draw = ctx => {
  const colorCount = _random.default.rangeFloor(1, 5);

  const palette = _random.default.shuffle(_random.default.pick(_niceColorPalettes.default)).slice(0, colorCount);

  ctx.beginPath(); // ctx.moveTo(prevX, prevY);
  // ctx.lineTo(currX, currY);

  ctx.arc(prevX, prevY, 5, 0, Math.PI * 2, false);
  ctx.fillStyle = _random.default.pick(palette);
  ctx.fill();
  ctx.save();
  makeHigglePiggle(currX, currY, palette);
};

const findxy = (res, e) => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  if (res === 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    flag = true;
    dot_flag = true; // if (dot_flag) {
    //     ctx.beginPath();
    //     ctx.fillStyle = 'green';
    //     ctx.fillRect(currX, currY, 2, 2);
    //     ctx.closePath();
    //     dot_flag = false;
    // }
  }

  if (res == 'up' || res == "out") {
    flag = false;
  }

  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw(ctx);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // buildCanvas(60)
  // sliderListener()
  // clickListener()
  const canvas = document.getElementById('canvas');
  canvas.addEventListener("mousemove", function (e) {
    findxy('move', e);
  }, false);
  canvas.addEventListener("mousedown", function (e) {
    findxy('down', e);
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    findxy('up', e);
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    findxy('out', e);
  }, false);
});
},{"canvas-sketch-util/random":"041b488fe3cf320d16b3cc47a2ae9936","nice-color-palettes":"3993b9ec5c6054f029232c0514e22610"}],"041b488fe3cf320d16b3cc47a2ae9936":[function(require,module,exports) {
var seedRandom = require('seed-random');
var SimplexNoise = require('simplex-noise');
var defined = require('defined');

function createRandom (defaultSeed) {
  defaultSeed = defined(defaultSeed, null);
  var defaultRandom = Math.random;
  var currentSeed;
  var currentRandom;
  var noiseGenerator;
  var _nextGaussian = null;
  var _hasNextGaussian = false;

  setSeed(defaultSeed);

  return {
    value: value,
    createRandom: function (defaultSeed) {
      return createRandom(defaultSeed);
    },
    setSeed: setSeed,
    getSeed: getSeed,
    getRandomSeed: getRandomSeed,
    valueNonZero: valueNonZero,
    permuteNoise: permuteNoise,
    noise1D: noise1D,
    noise2D: noise2D,
    noise3D: noise3D,
    noise4D: noise4D,
    sign: sign,
    boolean: boolean,
    chance: chance,
    range: range,
    rangeFloor: rangeFloor,
    pick: pick,
    shuffle: shuffle,
    onCircle: onCircle,
    insideCircle: insideCircle,
    onSphere: onSphere,
    insideSphere: insideSphere,
    quaternion: quaternion,
    weighted: weighted,
    weightedSet: weightedSet,
    weightedSetIndex: weightedSetIndex,
    gaussian: gaussian
  };

  function setSeed (seed, opt) {
    if (typeof seed === 'number' || typeof seed === 'string') {
      currentSeed = seed;
      currentRandom = seedRandom(currentSeed, opt);
    } else {
      currentSeed = undefined;
      currentRandom = defaultRandom;
    }
    noiseGenerator = createNoise();
    _nextGaussian = null;
    _hasNextGaussian = false;
  }

  function value () {
    return currentRandom();
  }

  function valueNonZero () {
    var u = 0;
    while (u === 0) u = value();
    return u;
  }

  function getSeed () {
    return currentSeed;
  }

  function getRandomSeed () {
    var seed = String(Math.floor(Math.random() * 1000000));
    return seed;
  }

  function createNoise () {
    return new SimplexNoise(currentRandom);
  }

  function permuteNoise () {
    noiseGenerator = createNoise();
  }

  function noise1D (x, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise2D(x * frequency, 0);
  }

  function noise2D (x, y, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise2D(x * frequency, y * frequency);
  }

  function noise3D (x, y, z, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    if (!isFinite(z)) throw new TypeError('z component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise3D(
      x * frequency,
      y * frequency,
      z * frequency
    );
  }

  function noise4D (x, y, z, w, frequency, amplitude) {
    if (!isFinite(x)) throw new TypeError('x component for noise() must be finite');
    if (!isFinite(y)) throw new TypeError('y component for noise() must be finite');
    if (!isFinite(z)) throw new TypeError('z component for noise() must be finite');
    if (!isFinite(w)) throw new TypeError('w component for noise() must be finite');
    frequency = defined(frequency, 1);
    amplitude = defined(amplitude, 1);
    return amplitude * noiseGenerator.noise4D(
      x * frequency,
      y * frequency,
      z * frequency,
      w * frequency
    );
  }

  function sign () {
    return boolean() ? 1 : -1;
  }

  function boolean () {
    return value() > 0.5;
  }

  function chance (n) {
    n = defined(n, 0.5);
    if (typeof n !== 'number') throw new TypeError('expected n to be a number');
    return value() < n;
  }

  function range (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }

    return value() * (max - min) + min;
  }

  function rangeFloor (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }

    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Expected all arguments to be numbers');
    }

    return Math.floor(range(min, max));
  }

  function pick (array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  function shuffle (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('Expected Array, got ' + typeof arr);
    }

    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();
    while (len) {
      rand = Math.floor(value() * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }
    return ret;
  }

  function onCircle (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var theta = value() * 2.0 * Math.PI;
    out[0] = radius * Math.cos(theta);
    out[1] = radius * Math.sin(theta);
    return out;
  }

  function insideCircle (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    onCircle(1, out);
    var r = radius * Math.sqrt(value());
    out[0] *= r;
    out[1] *= r;
    return out;
  }

  function onSphere (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var u = value() * Math.PI * 2;
    var v = value() * 2 - 1;
    var phi = u;
    var theta = Math.acos(v);
    out[0] = radius * Math.sin(theta) * Math.cos(phi);
    out[1] = radius * Math.sin(theta) * Math.sin(phi);
    out[2] = radius * Math.cos(theta);
    return out;
  }

  function insideSphere (radius, out) {
    radius = defined(radius, 1);
    out = out || [];
    var u = value() * Math.PI * 2;
    var v = value() * 2 - 1;
    var k = value();

    var phi = u;
    var theta = Math.acos(v);
    var r = radius * Math.cbrt(k);
    out[0] = r * Math.sin(theta) * Math.cos(phi);
    out[1] = r * Math.sin(theta) * Math.sin(phi);
    out[2] = r * Math.cos(theta);
    return out;
  }

  function quaternion (out) {
    out = out || [];
    var u1 = value();
    var u2 = value();
    var u3 = value();

    var sq1 = Math.sqrt(1 - u1);
    var sq2 = Math.sqrt(u1);

    var theta1 = Math.PI * 2 * u2;
    var theta2 = Math.PI * 2 * u3;

    var x = Math.sin(theta1) * sq1;
    var y = Math.cos(theta1) * sq1;
    var z = Math.sin(theta2) * sq2;
    var w = Math.cos(theta2) * sq2;
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }

  function weightedSet (set) {
    set = set || [];
    if (set.length === 0) return null;
    return set[weightedSetIndex(set)].value;
  }

  function weightedSetIndex (set) {
    set = set || [];
    if (set.length === 0) return -1;
    return weighted(set.map(function (s) {
      return s.weight;
    }));
  }

  function weighted (weights) {
    weights = weights || [];
    if (weights.length === 0) return -1;
    var totalWeight = 0;
    var i;

    for (i = 0; i < weights.length; i++) {
      totalWeight += weights[i];
    }

    if (totalWeight <= 0) throw new Error('Weights must sum to > 0');

    var random = value() * totalWeight;
    for (i = 0; i < weights.length; i++) {
      if (random < weights[i]) {
        return i;
      }
      random -= weights[i];
    }
    return 0;
  }

  function gaussian (mean, standardDerivation) {
    mean = defined(mean, 0);
    standardDerivation = defined(standardDerivation, 1);

    // https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/classes/java/util/Random.java#L496
    if (_hasNextGaussian) {
      _hasNextGaussian = false;
      var result = _nextGaussian;
      _nextGaussian = null;
      return mean + standardDerivation * result;
    } else {
      var v1 = 0;
      var v2 = 0;
      var s = 0;
      do {
        v1 = value() * 2 - 1; // between -1 and 1
        v2 = value() * 2 - 1; // between -1 and 1
        s = v1 * v1 + v2 * v2;
      } while (s >= 1 || s === 0);
      var multiplier = Math.sqrt(-2 * Math.log(s) / s);
      _nextGaussian = (v2 * multiplier);
      _hasNextGaussian = true;
      return mean + standardDerivation * (v1 * multiplier);
    }
  }
}

module.exports = createRandom();

},{"seed-random":"88888ac76f0ba67a2c3e6a6962e41e1a","simplex-noise":"75d166e66052e8939c17410b82de6c5e","defined":"42b66f012dada053f5d1b4b59937c4b1"}],"88888ac76f0ba67a2c3e6a6962e41e1a":[function(require,module,exports) {
'use strict';

var global = arguments[3];
var width = 256; // each RC4 output is 0 <= x < 256

var chunks = 6; // at least six RC4 outputs for each double

var digits = 52; // there are 52 significant digits in a double

var pool = []; // pool: entropy pool starts empty

var GLOBAL = typeof global === 'undefined' ? window : global; //
// The following constants are related to IEEE 754 limits.
//

var startdenom = Math.pow(width, chunks),
    significance = Math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1;
var oldRandom = Math.random; //
// seedrandom()
// This is the seedrandom function described above.
//

module.exports = function (seed, options) {
  if (options && options.global === true) {
    options.global = false;
    Math.random = module.exports(seed, options);
    options.global = true;
    return Math.random;
  }

  var use_entropy = options && options.entropy || false;
  var key = []; // Flatten the seed string or build one from local entropy if needed.

  var shortseed = mixkey(flatten(use_entropy ? [seed, tostring(pool)] : 0 in arguments ? seed : autoseed(), 3), key); // Use the seed to initialize an ARC4 generator.

  var arc4 = new ARC4(key); // Mix the randomness into accumulated entropy.

  mixkey(tostring(arc4.S), pool); // Override Math.random
  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  return function () {
    // Closure to return a random double:
    var n = arc4.g(chunks),
        // Start with a numerator n < 2 ^ 48
    d = startdenom,
        //   and denominator d = 2 ^ 48.
    x = 0; //   and no 'extra last byte'.

    while (n < significance) {
      // Fill up all significant digits by
      n = (n + x) * width; //   shifting numerator and

      d *= width; //   denominator and generating a

      x = arc4.g(1); //   new least-significant-byte.
    }

    while (n >= overflow) {
      // To avoid rounding up, before adding
      n /= 2; //   last byte, shift everything

      d /= 2; //   right using integer Math until

      x >>>= 1; //   we have exactly the desired bits.
    }

    return (n + x) / d; // Form the number within [0, 1).
  };
};

module.exports.resetGlobal = function () {
  Math.random = oldRandom;
}; //
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//

/** @constructor */


function ARC4(key) {
  var t,
      keylen = key.length,
      me = this,
      i = 0,
      j = me.i = me.j = 0,
      s = me.S = []; // The empty key [] is treated as [0].

  if (!keylen) {
    key = [keylen++];
  } // Set up S using the standard key scheduling algorithm.


  while (i < width) {
    s[i] = i++;
  }

  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
    s[j] = t;
  } // The "g" method returns the next (count) outputs as one number.


  (me.g = function (count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t,
        r = 0,
        i = me.i,
        j = me.j,
        s = me.S;

    while (count--) {
      t = s[i = mask & i + 1];
      r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
    }

    me.i = i;
    me.j = j;
    return r; // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
} //
// flatten()
// Converts an object tree to nested arrays of strings.
//


function flatten(obj, depth) {
  var result = [],
      typ = (typeof obj)[0],
      prop;

  if (depth && typ == 'o') {
    for (prop in obj) {
      try {
        result.push(flatten(obj[prop], depth - 1));
      } catch (e) {}
    }
  }

  return result.length ? result : typ == 's' ? obj : obj + '\0';
} //
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//


function mixkey(seed, key) {
  var stringseed = seed + '',
      smear,
      j = 0;

  while (j < stringseed.length) {
    key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
  }

  return tostring(key);
} //
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//

/** @param {Uint8Array=} seed */


function autoseed(seed) {
  try {
    GLOBAL.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date(), GLOBAL, GLOBAL.navigator && GLOBAL.navigator.plugins, GLOBAL.screen, tostring(pool)];
  }
} //
// tostring()
// Converts an array of charcodes to a string
//


function tostring(a) {
  return String.fromCharCode.apply(0, a);
} //
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call Math.random on its own again after
// initialization.
//


mixkey(Math.random(), pool);
},{}],"75d166e66052e8939c17410b82de6c5e":[function(require,module,exports) {
var define;

/*
 * A fast javascript implementation of simplex noise by Jonas Wagner

Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
Better rank ordering method by Stefan Gustavson in 2012.


 Copyright (c) 2018 Jonas Wagner

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function () {
  'use strict';

  var F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  var G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
  var F3 = 1.0 / 3.0;
  var G3 = 1.0 / 6.0;
  var F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
  var G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

  function SimplexNoise(randomOrSeed) {
    var random;

    if (typeof randomOrSeed == 'function') {
      random = randomOrSeed;
    } else if (randomOrSeed) {
      random = alea(randomOrSeed);
    } else {
      random = Math.random;
    }

    this.p = buildPermutationTable(random);
    this.perm = new Uint8Array(512);
    this.permMod12 = new Uint8Array(512);

    for (var i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
      this.permMod12[i] = this.perm[i] % 12;
    }
  }

  SimplexNoise.prototype = {
    grad3: new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0, 1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, -1, 0, 1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1]),
    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1, -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1, 1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1, -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
    noise2D: function (xin, yin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0 = 0; // Noise contributions from the three corners

      var n1 = 0;
      var n2 = 0; // Skew the input space to determine which simplex cell we're in

      var s = (xin + yin) * F2; // Hairy factor for 2D

      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var X0 = i - t; // Unskew the cell origin back to (x,y) space

      var Y0 = j - t;
      var x0 = xin - X0; // The x,y distances from the cell origin

      var y0 = yin - Y0; // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.

      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords

      if (x0 > y0) {
        i1 = 1;
        j1 = 0;
      } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      else {
          i1 = 0;
          j1 = 1;
        } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6


      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords

      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1.0 + 2.0 * G2; // Offsets for last corner in (x,y) unskewed coords

      var y2 = y0 - 1.0 + 2.0 * G2; // Work out the hashed gradient indices of the three simplex corners

      var ii = i & 255;
      var jj = j & 255; // Calculate the contribution from the three corners

      var t0 = 0.5 - x0 * x0 - y0 * y0;

      if (t0 >= 0) {
        var gi0 = permMod12[ii + perm[jj]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0); // (x,y) of grad3 used for 2D gradient
      }

      var t1 = 0.5 - x1 * x1 - y1 * y1;

      if (t1 >= 0) {
        var gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
      }

      var t2 = 0.5 - x2 * x2 - y2 * y2;

      if (t2 >= 0) {
        var gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
      } // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].


      return 70.0 * (n0 + n1 + n2);
    },
    // 3D simplex noise
    noise3D: function (xin, yin, zin) {
      var permMod12 = this.permMod12;
      var perm = this.perm;
      var grad3 = this.grad3;
      var n0, n1, n2, n3; // Noise contributions from the four corners
      // Skew the input space to determine which simplex cell we're in

      var s = (xin + yin + zin) * F3; // Very nice and simple skew factor for 3D

      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var k = Math.floor(zin + s);
      var t = (i + j + k) * G3;
      var X0 = i - t; // Unskew the cell origin back to (x,y,z) space

      var Y0 = j - t;
      var Z0 = k - t;
      var x0 = xin - X0; // The x,y,z distances from the cell origin

      var y0 = yin - Y0;
      var z0 = zin - Z0; // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
      // Determine which simplex we are in.

      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords

      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords

      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } // X Y Z order
        else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } // X Z Y order
          else {
              i1 = 0;
              j1 = 0;
              k1 = 1;
              i2 = 1;
              j2 = 0;
              k2 = 1;
            } // Z X Y order

      } else {
        // x0<y0
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } // Z Y X order
        else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } // Y Z X order
          else {
              i1 = 0;
              j1 = 1;
              k1 = 0;
              i2 = 1;
              j2 = 1;
              k2 = 0;
            } // Y X Z order

      } // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
      // c = 1/6.


      var x1 = x0 - i1 + G3; // Offsets for second corner in (x,y,z) coords

      var y1 = y0 - j1 + G3;
      var z1 = z0 - k1 + G3;
      var x2 = x0 - i2 + 2.0 * G3; // Offsets for third corner in (x,y,z) coords

      var y2 = y0 - j2 + 2.0 * G3;
      var z2 = z0 - k2 + 2.0 * G3;
      var x3 = x0 - 1.0 + 3.0 * G3; // Offsets for last corner in (x,y,z) coords

      var y3 = y0 - 1.0 + 3.0 * G3;
      var z3 = z0 - 1.0 + 3.0 * G3; // Work out the hashed gradient indices of the four simplex corners

      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255; // Calculate the contribution from the four corners

      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) n0 = 0.0;else {
        var gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
        t0 *= t0;
        n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) n1 = 0.0;else {
        var gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
        t1 *= t1;
        n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) n2 = 0.0;else {
        var gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
        t2 *= t2;
        n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) n3 = 0.0;else {
        var gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
        t3 *= t3;
        n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
      } // Add contributions from each corner to get the final noise value.
      // The result is scaled to stay just inside [-1,1]

      return 32.0 * (n0 + n1 + n2 + n3);
    },
    // 4D simplex noise, better simplex rank ordering method 2012-03-09
    noise4D: function (x, y, z, w) {
      var perm = this.perm;
      var grad4 = this.grad4;
      var n0, n1, n2, n3, n4; // Noise contributions from the five corners
      // Skew the (x,y,z,w) space to determine which cell of 24 simplices we're in

      var s = (x + y + z + w) * F4; // Factor for 4D skewing

      var i = Math.floor(x + s);
      var j = Math.floor(y + s);
      var k = Math.floor(z + s);
      var l = Math.floor(w + s);
      var t = (i + j + k + l) * G4; // Factor for 4D unskewing

      var X0 = i - t; // Unskew the cell origin back to (x,y,z,w) space

      var Y0 = j - t;
      var Z0 = k - t;
      var W0 = l - t;
      var x0 = x - X0; // The x,y,z,w distances from the cell origin

      var y0 = y - Y0;
      var z0 = z - Z0;
      var w0 = w - W0; // For the 4D case, the simplex is a 4D shape I won't even try to describe.
      // To find out which of the 24 possible simplices we're in, we need to
      // determine the magnitude ordering of x0, y0, z0 and w0.
      // Six pair-wise comparisons are performed between each possible pair
      // of the four coordinates, and the results are used to rank the numbers.

      var rankx = 0;
      var ranky = 0;
      var rankz = 0;
      var rankw = 0;
      if (x0 > y0) rankx++;else ranky++;
      if (x0 > z0) rankx++;else rankz++;
      if (x0 > w0) rankx++;else rankw++;
      if (y0 > z0) ranky++;else rankz++;
      if (y0 > w0) ranky++;else rankw++;
      if (z0 > w0) rankz++;else rankw++;
      var i1, j1, k1, l1; // The integer offsets for the second simplex corner

      var i2, j2, k2, l2; // The integer offsets for the third simplex corner

      var i3, j3, k3, l3; // The integer offsets for the fourth simplex corner
      // simplex[c] is a 4-vector with the numbers 0, 1, 2 and 3 in some order.
      // Many values of c will never occur, since e.g. x>y>z>w makes x<z, y<w and x<w
      // impossible. Only the 24 indices which have non-zero entries make any sense.
      // We use a thresholding to set the coordinates in turn from the largest magnitude.
      // Rank 3 denotes the largest coordinate.

      i1 = rankx >= 3 ? 1 : 0;
      j1 = ranky >= 3 ? 1 : 0;
      k1 = rankz >= 3 ? 1 : 0;
      l1 = rankw >= 3 ? 1 : 0; // Rank 2 denotes the second largest coordinate.

      i2 = rankx >= 2 ? 1 : 0;
      j2 = ranky >= 2 ? 1 : 0;
      k2 = rankz >= 2 ? 1 : 0;
      l2 = rankw >= 2 ? 1 : 0; // Rank 1 denotes the second smallest coordinate.

      i3 = rankx >= 1 ? 1 : 0;
      j3 = ranky >= 1 ? 1 : 0;
      k3 = rankz >= 1 ? 1 : 0;
      l3 = rankw >= 1 ? 1 : 0; // The fifth corner has all coordinate offsets = 1, so no need to compute that.

      var x1 = x0 - i1 + G4; // Offsets for second corner in (x,y,z,w) coords

      var y1 = y0 - j1 + G4;
      var z1 = z0 - k1 + G4;
      var w1 = w0 - l1 + G4;
      var x2 = x0 - i2 + 2.0 * G4; // Offsets for third corner in (x,y,z,w) coords

      var y2 = y0 - j2 + 2.0 * G4;
      var z2 = z0 - k2 + 2.0 * G4;
      var w2 = w0 - l2 + 2.0 * G4;
      var x3 = x0 - i3 + 3.0 * G4; // Offsets for fourth corner in (x,y,z,w) coords

      var y3 = y0 - j3 + 3.0 * G4;
      var z3 = z0 - k3 + 3.0 * G4;
      var w3 = w0 - l3 + 3.0 * G4;
      var x4 = x0 - 1.0 + 4.0 * G4; // Offsets for last corner in (x,y,z,w) coords

      var y4 = y0 - 1.0 + 4.0 * G4;
      var z4 = z0 - 1.0 + 4.0 * G4;
      var w4 = w0 - 1.0 + 4.0 * G4; // Work out the hashed gradient indices of the five simplex corners

      var ii = i & 255;
      var jj = j & 255;
      var kk = k & 255;
      var ll = l & 255; // Calculate the contribution from the five corners

      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
      if (t0 < 0) n0 = 0.0;else {
        var gi0 = perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32 * 4;
        t0 *= t0;
        n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
      if (t1 < 0) n1 = 0.0;else {
        var gi1 = perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32 * 4;
        t1 *= t1;
        n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
      if (t2 < 0) n2 = 0.0;else {
        var gi2 = perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32 * 4;
        t2 *= t2;
        n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
      if (t3 < 0) n3 = 0.0;else {
        var gi3 = perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32 * 4;
        t3 *= t3;
        n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
      }
      var t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
      if (t4 < 0) n4 = 0.0;else {
        var gi4 = perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32 * 4;
        t4 *= t4;
        n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
      } // Sum up and scale the result to cover the range [-1,1]

      return 27.0 * (n0 + n1 + n2 + n3 + n4);
    }
  };

  function buildPermutationTable(random) {
    var i;
    var p = new Uint8Array(256);

    for (i = 0; i < 256; i++) {
      p[i] = i;
    }

    for (i = 0; i < 255; i++) {
      var r = i + ~~(random() * (256 - i));
      var aux = p[i];
      p[i] = p[r];
      p[r] = aux;
    }

    return p;
  }

  SimplexNoise._buildPermutationTable = buildPermutationTable;

  function alea() {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;
    var mash = masher();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < arguments.length; i++) {
      s0 -= mash(arguments[i]);

      if (s0 < 0) {
        s0 += 1;
      }

      s1 -= mash(arguments[i]);

      if (s1 < 0) {
        s1 += 1;
      }

      s2 -= mash(arguments[i]);

      if (s2 < 0) {
        s2 += 1;
      }
    }

    mash = null;
    return function () {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
  }

  function masher() {
    var n = 0xefc8249d;
    return function (data) {
      data = data.toString();

      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }

      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };
  } // amd


  if (typeof define !== 'undefined' && define.amd) define(function () {
    return SimplexNoise;
  }); // common js

  if (typeof exports !== 'undefined') exports.SimplexNoise = SimplexNoise; // browser
  else if (typeof window !== 'undefined') window.SimplexNoise = SimplexNoise; // nodejs

  if (typeof module !== 'undefined') {
    module.exports = SimplexNoise;
  }
})();
},{}],"42b66f012dada053f5d1b4b59937c4b1":[function(require,module,exports) {
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],"3993b9ec5c6054f029232c0514e22610":[function(require,module,exports) {
module.exports = JSON.parse("[[\"#69d2e7\",\"#a7dbd8\",\"#e0e4cc\",\"#f38630\",\"#fa6900\"],[\"#fe4365\",\"#fc9d9a\",\"#f9cdad\",\"#c8c8a9\",\"#83af9b\"],[\"#ecd078\",\"#d95b43\",\"#c02942\",\"#542437\",\"#53777a\"],[\"#556270\",\"#4ecdc4\",\"#c7f464\",\"#ff6b6b\",\"#c44d58\"],[\"#774f38\",\"#e08e79\",\"#f1d4af\",\"#ece5ce\",\"#c5e0dc\"],[\"#e8ddcb\",\"#cdb380\",\"#036564\",\"#033649\",\"#031634\"],[\"#490a3d\",\"#bd1550\",\"#e97f02\",\"#f8ca00\",\"#8a9b0f\"],[\"#594f4f\",\"#547980\",\"#45ada8\",\"#9de0ad\",\"#e5fcc2\"],[\"#00a0b0\",\"#6a4a3c\",\"#cc333f\",\"#eb6841\",\"#edc951\"],[\"#e94e77\",\"#d68189\",\"#c6a49a\",\"#c6e5d9\",\"#f4ead5\"],[\"#3fb8af\",\"#7fc7af\",\"#dad8a7\",\"#ff9e9d\",\"#ff3d7f\"],[\"#d9ceb2\",\"#948c75\",\"#d5ded9\",\"#7a6a53\",\"#99b2b7\"],[\"#ffffff\",\"#cbe86b\",\"#f2e9e1\",\"#1c140d\",\"#cbe86b\"],[\"#efffcd\",\"#dce9be\",\"#555152\",\"#2e2633\",\"#99173c\"],[\"#343838\",\"#005f6b\",\"#008c9e\",\"#00b4cc\",\"#00dffc\"],[\"#413e4a\",\"#73626e\",\"#b38184\",\"#f0b49e\",\"#f7e4be\"],[\"#ff4e50\",\"#fc913a\",\"#f9d423\",\"#ede574\",\"#e1f5c4\"],[\"#99b898\",\"#fecea8\",\"#ff847c\",\"#e84a5f\",\"#2a363b\"],[\"#655643\",\"#80bca3\",\"#f6f7bd\",\"#e6ac27\",\"#bf4d28\"],[\"#00a8c6\",\"#40c0cb\",\"#f9f2e7\",\"#aee239\",\"#8fbe00\"],[\"#351330\",\"#424254\",\"#64908a\",\"#e8caa4\",\"#cc2a41\"],[\"#554236\",\"#f77825\",\"#d3ce3d\",\"#f1efa5\",\"#60b99a\"],[\"#5d4157\",\"#838689\",\"#a8caba\",\"#cad7b2\",\"#ebe3aa\"],[\"#8c2318\",\"#5e8c6a\",\"#88a65e\",\"#bfb35a\",\"#f2c45a\"],[\"#fad089\",\"#ff9c5b\",\"#f5634a\",\"#ed303c\",\"#3b8183\"],[\"#ff4242\",\"#f4fad2\",\"#d4ee5e\",\"#e1edb9\",\"#f0f2eb\"],[\"#f8b195\",\"#f67280\",\"#c06c84\",\"#6c5b7b\",\"#355c7d\"],[\"#d1e751\",\"#ffffff\",\"#000000\",\"#4dbce9\",\"#26ade4\"],[\"#1b676b\",\"#519548\",\"#88c425\",\"#bef202\",\"#eafde6\"],[\"#5e412f\",\"#fcebb6\",\"#78c0a8\",\"#f07818\",\"#f0a830\"],[\"#bcbdac\",\"#cfbe27\",\"#f27435\",\"#f02475\",\"#3b2d38\"],[\"#452632\",\"#91204d\",\"#e4844a\",\"#e8bf56\",\"#e2f7ce\"],[\"#eee6ab\",\"#c5bc8e\",\"#696758\",\"#45484b\",\"#36393b\"],[\"#f0d8a8\",\"#3d1c00\",\"#86b8b1\",\"#f2d694\",\"#fa2a00\"],[\"#2a044a\",\"#0b2e59\",\"#0d6759\",\"#7ab317\",\"#a0c55f\"],[\"#f04155\",\"#ff823a\",\"#f2f26f\",\"#fff7bd\",\"#95cfb7\"],[\"#b9d7d9\",\"#668284\",\"#2a2829\",\"#493736\",\"#7b3b3b\"],[\"#bbbb88\",\"#ccc68d\",\"#eedd99\",\"#eec290\",\"#eeaa88\"],[\"#b3cc57\",\"#ecf081\",\"#ffbe40\",\"#ef746f\",\"#ab3e5b\"],[\"#a3a948\",\"#edb92e\",\"#f85931\",\"#ce1836\",\"#009989\"],[\"#300030\",\"#480048\",\"#601848\",\"#c04848\",\"#f07241\"],[\"#67917a\",\"#170409\",\"#b8af03\",\"#ccbf82\",\"#e33258\"],[\"#aab3ab\",\"#c4cbb7\",\"#ebefc9\",\"#eee0b7\",\"#e8caaf\"],[\"#e8d5b7\",\"#0e2430\",\"#fc3a51\",\"#f5b349\",\"#e8d5b9\"],[\"#ab526b\",\"#bca297\",\"#c5ceae\",\"#f0e2a4\",\"#f4ebc3\"],[\"#607848\",\"#789048\",\"#c0d860\",\"#f0f0d8\",\"#604848\"],[\"#b6d8c0\",\"#c8d9bf\",\"#dadabd\",\"#ecdbbc\",\"#fedcba\"],[\"#a8e6ce\",\"#dcedc2\",\"#ffd3b5\",\"#ffaaa6\",\"#ff8c94\"],[\"#3e4147\",\"#fffedf\",\"#dfba69\",\"#5a2e2e\",\"#2a2c31\"],[\"#fc354c\",\"#29221f\",\"#13747d\",\"#0abfbc\",\"#fcf7c5\"],[\"#cc0c39\",\"#e6781e\",\"#c8cf02\",\"#f8fcc1\",\"#1693a7\"],[\"#1c2130\",\"#028f76\",\"#b3e099\",\"#ffeaad\",\"#d14334\"],[\"#a7c5bd\",\"#e5ddcb\",\"#eb7b59\",\"#cf4647\",\"#524656\"],[\"#dad6ca\",\"#1bb0ce\",\"#4f8699\",\"#6a5e72\",\"#563444\"],[\"#5c323e\",\"#a82743\",\"#e15e32\",\"#c0d23e\",\"#e5f04c\"],[\"#edebe6\",\"#d6e1c7\",\"#94c7b6\",\"#403b33\",\"#d3643b\"],[\"#fdf1cc\",\"#c6d6b8\",\"#987f69\",\"#e3ad40\",\"#fcd036\"],[\"#230f2b\",\"#f21d41\",\"#ebebbc\",\"#bce3c5\",\"#82b3ae\"],[\"#b9d3b0\",\"#81bda4\",\"#b28774\",\"#f88f79\",\"#f6aa93\"],[\"#3a111c\",\"#574951\",\"#83988e\",\"#bcdea5\",\"#e6f9bc\"],[\"#5e3929\",\"#cd8c52\",\"#b7d1a3\",\"#dee8be\",\"#fcf7d3\"],[\"#1c0113\",\"#6b0103\",\"#a30006\",\"#c21a01\",\"#f03c02\"],[\"#000000\",\"#9f111b\",\"#b11623\",\"#292c37\",\"#cccccc\"],[\"#382f32\",\"#ffeaf2\",\"#fcd9e5\",\"#fbc5d8\",\"#f1396d\"],[\"#e3dfba\",\"#c8d6bf\",\"#93ccc6\",\"#6cbdb5\",\"#1a1f1e\"],[\"#f6f6f6\",\"#e8e8e8\",\"#333333\",\"#990100\",\"#b90504\"],[\"#1b325f\",\"#9cc4e4\",\"#e9f2f9\",\"#3a89c9\",\"#f26c4f\"],[\"#a1dbb2\",\"#fee5ad\",\"#faca66\",\"#f7a541\",\"#f45d4c\"],[\"#c1b398\",\"#605951\",\"#fbeec2\",\"#61a6ab\",\"#accec0\"],[\"#5e9fa3\",\"#dcd1b4\",\"#fab87f\",\"#f87e7b\",\"#b05574\"],[\"#951f2b\",\"#f5f4d7\",\"#e0dfb1\",\"#a5a36c\",\"#535233\"],[\"#8dccad\",\"#988864\",\"#fea6a2\",\"#f9d6ac\",\"#ffe9af\"],[\"#2d2d29\",\"#215a6d\",\"#3ca2a2\",\"#92c7a3\",\"#dfece6\"],[\"#413d3d\",\"#040004\",\"#c8ff00\",\"#fa023c\",\"#4b000f\"],[\"#eff3cd\",\"#b2d5ba\",\"#61ada0\",\"#248f8d\",\"#605063\"],[\"#ffefd3\",\"#fffee4\",\"#d0ecea\",\"#9fd6d2\",\"#8b7a5e\"],[\"#cfffdd\",\"#b4dec1\",\"#5c5863\",\"#a85163\",\"#ff1f4c\"],[\"#9dc9ac\",\"#fffec7\",\"#f56218\",\"#ff9d2e\",\"#919167\"],[\"#4e395d\",\"#827085\",\"#8ebe94\",\"#ccfc8e\",\"#dc5b3e\"],[\"#a8a7a7\",\"#cc527a\",\"#e8175d\",\"#474747\",\"#363636\"],[\"#f8edd1\",\"#d88a8a\",\"#474843\",\"#9d9d93\",\"#c5cfc6\"],[\"#046d8b\",\"#309292\",\"#2fb8ac\",\"#93a42a\",\"#ecbe13\"],[\"#f38a8a\",\"#55443d\",\"#a0cab5\",\"#cde9ca\",\"#f1edd0\"],[\"#a70267\",\"#f10c49\",\"#fb6b41\",\"#f6d86b\",\"#339194\"],[\"#ff003c\",\"#ff8a00\",\"#fabe28\",\"#88c100\",\"#00c176\"],[\"#ffedbf\",\"#f7803c\",\"#f54828\",\"#2e0d23\",\"#f8e4c1\"],[\"#4e4d4a\",\"#353432\",\"#94ba65\",\"#2790b0\",\"#2b4e72\"],[\"#0ca5b0\",\"#4e3f30\",\"#fefeeb\",\"#f8f4e4\",\"#a5b3aa\"],[\"#4d3b3b\",\"#de6262\",\"#ffb88c\",\"#ffd0b3\",\"#f5e0d3\"],[\"#fffbb7\",\"#a6f6af\",\"#66b6ab\",\"#5b7c8d\",\"#4f2958\"],[\"#edf6ee\",\"#d1c089\",\"#b3204d\",\"#412e28\",\"#151101\"],[\"#9d7e79\",\"#ccac95\",\"#9a947c\",\"#748b83\",\"#5b756c\"],[\"#fcfef5\",\"#e9ffe1\",\"#cdcfb7\",\"#d6e6c3\",\"#fafbe3\"],[\"#9cddc8\",\"#bfd8ad\",\"#ddd9ab\",\"#f7af63\",\"#633d2e\"],[\"#30261c\",\"#403831\",\"#36544f\",\"#1f5f61\",\"#0b8185\"],[\"#aaff00\",\"#ffaa00\",\"#ff00aa\",\"#aa00ff\",\"#00aaff\"],[\"#d1313d\",\"#e5625c\",\"#f9bf76\",\"#8eb2c5\",\"#615375\"],[\"#ffe181\",\"#eee9e5\",\"#fad3b2\",\"#ffba7f\",\"#ff9c97\"],[\"#73c8a9\",\"#dee1b6\",\"#e1b866\",\"#bd5532\",\"#373b44\"],[\"#805841\",\"#dcf7f3\",\"#fffcdd\",\"#ffd8d8\",\"#f5a2a2\"]]");
},{}]},{},["db2a2fbf335cf7f2a3c899d3f4bb755e","46254651d0a95442f8526eb0731804bd"], null)

//# sourceMappingURL=script.f8e8c4e7.js.map
