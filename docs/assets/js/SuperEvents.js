/*!
 * SuperEvents v0.2.1 (https://github.com/alzintani/SuperEvents#readme)
 * Copyright 2018 SuperEvents
 * MIT License (URL)
 * 
 * 
 * @link https://github.com/alzintani/SuperEvents#readme
 * @version v0.2.1
 * @license MIT
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (window, factory) {
  'use strict'; // AMD. Register as an anonymous module.  Wrap in function so we have access
  // to root via `this`.

  if (typeof define === 'function' && define.amd) {
    define([], function () {
      window.SuperEvents = factory.call(window);
      return window.SuperEvents;
    });
  } // Node. Does not work with strict CommonJS, but only CommonJS-like
  // environments that support module.exports, like Node.
  else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
      module.exports = factory.call(window);
    } // Browser globals.
    else {
        window.SuperEvents = factory.call(window);
      }
})((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' ? global : this, function () {
  'use strict';
  /**
   * This class describes SuperEvents.
   *
   * @class      SuperEvents (name)
   */

  var SuperEvents = /*#__PURE__*/function () {
    /**
     * The current version of SuperEvents
     */

    /**
     * The current version of SuperEvents
     */

    /**
     * Description of SuperEvents
     */

    /**
     * the license of SuperEvents
     */

    /**
     * Parameters that will pass to event functions {object}
     */

    /**
     * Constructs a new instance.
     *
     * @param      {object}  elements  The elements
     */
    function SuperEvents(elements) {
      _classCallCheck(this, SuperEvents);

      _defineProperty(this, "version", '0.2.0');

      _defineProperty(this, "name", 'SuperEvents');

      _defineProperty(this, "description", 'SuperEvents is a JavaScript library that handling any events in websites. Support all events action like:- Scrolling, Clicking, Hovering, Mouse Moving, Tapping.');

      _defineProperty(this, "license", 'MIT');

      _defineProperty(this, "params", {});

      // Exit if error in elements
      if (_typeof(elements) !== 'object' || elements.length < 1) {
        throw new TypeError('You must use correct HTML elements.');
      } // start initialize SuperEvents


      this.initialize(elements);
    }
    /**
     * Initializes the given elements.
     *
     * @param      {<type>}  elements  The elements
     */


    _createClass(SuperEvents, [{
      key: "initialize",
      value: function initialize(elements) {
        // Set source and target elements
        try {
          // source elements
          this.eventSource = typeof elements.source !== 'undefined' ? elements.source : window; // target elements

          this.eventTarget = elements instanceof Element || elements instanceof HTMLDocument || elements[0] instanceof Element ? elements : elements.target;
          this.actions();
        } catch (e) {
          console.log('ERROR01:', e);
        }
      }
      /**
       * { function_description }
       *
       * @return     {boolean}  { description_of_the_return_value }
       */

    }, {
      key: "runEvent",
      value: function runEvent(playCallBack) {
        this._sourceEvent(playCallBack);
      }
      /**
       * helper function
       */

    }, {
      key: "helper",
      value: function helper() {
        var _this = this;

        var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        this.helper.object = object;
        /**
         * { function_description }
         *
         * @param    {<type>}  [params={}]  The parameters
         */

        this.helper.easing = function () {
          var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var duration = params.duration;
          var cubic = params.cubic;
          var delay = params.delay;

          if (object instanceof Element) {
            object.style.transition = "all ".concat(duration, "s cubic-bezier(").concat(cubic, ")");
          } else if (object[0] instanceof Element) {
            var tmpDelay = 0;
            Array.prototype.forEach.call(object, function (el) {
              var d = " ".concat(tmpDelay.toFixed(1), "s");

              if (delay !== 0) {
                tmpDelay = tmpDelay + delay;
              }

              el.style.transition = "all ".concat(duration, "s").concat(d, " cubic-bezier(").concat(cubic, ")");
            });
          }
        };
        /**
         * { function_description }
         *
         * @param    {<type>}  [style1={}]  The style 1
         * @param    {<type>}  [style2={}]  The style 2
         * @return   {<type>}  { description_of_the_return_value }
         */


        this.helper.css = function () {
          var style1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var style2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var object = _this.helper.object;

          var setStyle = function setStyle(element) {
            if (!element) {
              return;
            }

            if (style1 && _typeof(style1) === 'object') {
              for (var key in style1) {
                element.style[key] = style1[key];
              }
            }

            if (style2 && _typeof(style2) === 'object') {
              for (var _key in style2) {
                element.style[_key] = style2[_key];
              }
            }
          };

          if (object[0] instanceof Element) {
            Array.prototype.forEach.call(object, function (el) {
              setStyle(el);
            });
          } else if (object instanceof Element) {
            setStyle(object);
          }

          return _this.helper;
        };
        /**
         * manage class for elements
         *
         * @param    {<type>}  c     { parameter_description }
         * @return   {<type>}  { description_of_the_return_value }
         */


        this.helper.addClass = function (c) {
          if (typeof c !== 'string') {
            return _this.helper;
          }

          var object = _this.helper.object;

          if ('function' === typeof object.forEach) {
            Array.prototype.forEach.call(object, function (el) {
              el.classList && el.classList.add(c);
            });
          } else {
            object.classList && object.classList.add(c);
          }

          return _this.helper;
        };
        /**
         * remove class for elements
         *
         * @param    {<type>}  c     { parameter_description }
         * @return   {<type>}  { description_of_the_return_value }
         */


        this.helper.removeClass = function (c) {
          if (typeof c !== 'string') {
            return _this.helper;
          }

          var object = _this.helper.object;

          if ('function' === typeof object.forEach) {
            Array.prototype.forEach.call(object, function (el) {
              el.classList && el.classList.remove(c);
            });
          } else {
            object.classList && object.classList.remove(c);
          }

          return _this.helper;
        };
        /**
         * adding text to element
         *
         * @param    {<type>}  text  The text
         * @return   {<type>}  { description_of_the_return_value }
         */


        this.helper.text = function (text) {
          var textNode = document.createTextNode(text);

          _this.helper.object.appendChild(textNode);

          return _this.helper;
        };
        /**
         * Calculate color changes
         *
         * @param    {string}  fromValue  The from value
         * @param    {string}  toValue  To value
         * @param    {number}  _progress  The progress
         * @return   {<type>}  { description_of_the_return_value }
         */


        this.helper.colorCalculater = function (fromValue, toValue, _progress) {
          fromValue = fromValue.trim();
          toValue = toValue.trim();
          _progress = _progress / 100;

          if ((fromValue.indexOf('#') !== 0 || toValue.indexOf('#') !== 0) && (fromValue.indexOf('rgb') !== 0 || toValue.indexOf('rgb') !== 0)) {
            return;
          }

          if (fromValue.indexOf('#') === 0) {
            fromValue = _this.helper.hexToRgb(fromValue);
          }

          if (toValue.indexOf('#') === 0) {
            toValue = _this.helper.hexToRgb(toValue);
          }

          var getValue = function getValue(fromRGB, toRGB) {
            if (fromRGB && toRGB && fromRGB.indexOf('rgb') !== 0 || toRGB.indexOf('rgb') !== 0) {
              return fromRGB;
            }

            var fromSubstr = fromRGB.indexOf('rgba') === 0 ? 5 : 4;
            var toSubstr = toRGB.indexOf('rgba') === 0 ? 5 : 4;
            var value = [];
            fromRGB = fromRGB.substr(fromSubstr).split(")")[0].split(',');
            toRGB = toRGB.substr(toSubstr).split(")")[0].split(',');

            if (fromRGB.length === toRGB.length) {
              var i = 0;
              fromRGB.forEach(function (v) {
                if (i !== 3) {
                  value[i] = (fromRGB[i] - _progress * fromRGB[i] + _progress * toRGB[i]).toFixed(0);
                } else {
                  value[i] = (fromRGB[i] - _progress * fromRGB[i] + _progress * toRGB[i]).toFixed(2);
                }

                i++;
              });
            }

            var type = fromRGB.length === 4 ? 'rgba' : 'rgb';
            return "".concat(type, "(").concat(value.join(','), ")");
          };

          return getValue(fromValue, toValue);
        };
        /**
         * Convert HEX color to RGB color
         *
         * @param    {string}   hex   The hexadecimal
         * @return   {(string)}       { description_of_the_return_value }
         */


        this.helper.hexToRgb = function (h) {
          var r = 0,
              g = 0,
              b = 0; // 3 digits

          if (h.length == 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3]; // 6 digits
          } else if (h.length == 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
          }

          return "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
        };
        /**
         * Convert RBG color to HEX
         *
         * @param    {string}   rgb     The rgb color
         * @return   {string}         HEX color
         */


        this.helper.rgbToHex = function (rgb) {
          // Choose correct separator
          var sep = rgb.indexOf(",") > -1 ? "," : " "; // Turn "rgb(r,g,b)" into [r,g,b]

          rgb = rgb.substr(4).split(")")[0].split(sep);
          var r = (+rgb[0]).toString(16);
          var g = (+rgb[1]).toString(16);
          var b = (+rgb[2]).toString(16);
          if (r.length == 1) r = "0" + r;
          if (g.length == 1) g = "0" + g;
          if (b.length == 1) b = "0" + b;
          return "#" + r + g + b;
        };

        return this.helper;
      }
      /**
       * Actions
       */

    }, {
      key: "actions",
      value: function actions() {
        var _this2 = this;

        /**
         * call function
         * 
         * @api        call       call( {function} callback, {boolean} instance ): {object}
         * 
         * @callback      {object}   [callback={function}]   callback function. you can pass three parameters to the callback function (progress from 0 to 1, event source, events target)
         * @instance      {boolean}   [instance={boolean}]   set instance to true if you want to return current instance
         * @return        {Object}   instance            This function will return SuperEvent instance
         * 
         * @example    example    event.call(p => document.querySelector('.class').style.top(`${p}px`))
         */
        this.actions.call = function (callback) {
          var instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          _this2.runEvent(function () {
            var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (typeof callback === 'function') {
              callback(progress, _this2.eventSource, _this2.eventTarget);
            }
          });

          if (instance === true) {
            return _this2;
          }
        };
        /**
         * (From/To) function description
         *
         * @api        call       fromTo( scrollEventFrom = {}, scrollEventTo = {} ): {object}
         * 
         * @param      {object}   [params={object}]   The parameters
         * @return     {Object}   instance            This function will return SuperEvent instance
         * 
         * @example    example    event.fromTo({ color: '#FFF' }, { color: '#999' })
         */


        this.actions.fromTo = function (scrollEventFrom, scrollEventTo) {
          var toValue,
              v,
              ex = '',
              value = '',
              css = {},
              trans_value = '';
          var _TRANS = ['translateY', 'translateX', 'scale', 'rotateY', 'rotateX']; // transform effects

          var _DEG = ['rotateY', 'rotateX']; // degrees effects

          var _PX = ['translateX', 'translateY']; // pixels effects

          var _ALL = ['opacity', 'backgroundPosition', 'backgroundSize', 'backgroundColor', 'color', 'borderColor'].concat(_TRANS, _DEG, _PX); // all supported effects


          var _EX = ['px', '%', 'deg', 'rem', 'em', 'vh', 'vw'];

          var getValue = function getValue(fromValue, toValue, i) {
            return fromValue - i / 100 * fromValue + i / 100 * toValue;
          };

          if (Object.keys(scrollEventFrom).length) {
            var _loop = function _loop(i) {
              css[i] = {};
              Array.prototype.forEach.call(Object.keys(scrollEventFrom), function (key) {
                var fromValue = scrollEventFrom[key];

                if (_typeof(scrollEventTo[key]) === undefined) {
                  return;
                }

                if (_ALL.indexOf(key) > -1 && scrollEventFrom.hasOwnProperty(key) && scrollEventTo.hasOwnProperty(key)) {
                  toValue = scrollEventTo[key]; // to value

                  ex = 'function' === typeof fromValue.match ? fromValue.match(/\D+$/) : '';
                  ex = ex && ex.length ? ex[0] : '';
                  v = i < 50 ? fromValue : toValue;

                  if (!isNaN(fromValue) || !isNaN(toValue)) {
                    value = getValue(fromValue, toValue, i);
                    v = value.toFixed(2);
                  }

                  if (key === 'borderColor' || key === 'color' || key === 'backgroundColor') {
                    v = _this2.helper().colorCalculater(fromValue, toValue, i);
                  } else {
                    fromValue = parseFloat(fromValue);
                    toValue = parseFloat(toValue);
                    value = getValue(fromValue, toValue, i);

                    if (key === 'backgroundPosition') {
                      v = "50% ".concat(value.toFixed(2)).concat(ex);
                    } else if (_TRANS.indexOf(key) > -1) {
                      trans_value += " ".concat(key, "( ").concat(value.toFixed(2)).concat(ex, " )");
                    }
                  }

                  if (v !== undefined && _TRANS.indexOf(key) < 0) {
                    css[i][key] = v;
                  }
                }
              });

              if (trans_value !== '') {
                css[i]['transform'] = trans_value;
                trans_value = '';
              }
            };

            for (var i = 0; i <= 100; i++) {
              _loop(i);
            }
          }

          _this2.runEvent(function () {
            var _progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            _progress = (_progress * 100).toFixed(0);
            css[_progress] && _this2.helper(_this2.eventTarget).css(css[_progress]);
          });

          return _this2;
        };

        return this;
      }
      /**
       * Easing
       */

      /**
       * easing function description
       * 
       * @api        easing       easing( params = {} ): {object}
       * 
       * @params      {object}   [params={object}]   The parameters
       * @return     {Object}   instance            This function will return SuperEvent instance
       * 
       * @example    example    event.click().fromTo({ color: '#FFF' }, { color: '#999' }).easing({ timing: 'linear', duration: 0.5, delay: 0, cubicBezier: false})
       * 
       */

    }, {
      key: "easing",
      value: function easing() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var timing = params.timing || 'linear';
        var duration = params.duration || 0;
        var delay = params.delay || 0;
        var cubicBezier = !!params.cubicBezier || false;

        var _cubic;

        duration = duration > 10 || duration < 0 ? 0.5 : duration;
        _cubic = timing;

        if (cubicBezier === false) {
          switch (timing) {
            case 'ease':
              _cubic = '.25, .1, .25, 1';
              break;

            case 'linear':
              _cubic = '.25, .25, .75, .75';
              break;

            case 'ease-in':
              _cubic = '.42, 0, 1, 1';
              break;

            case 'ease-out':
              _cubic = '0, 0, .58, 1';
              break;

            case 'ease-in-out':
              _cubic = '.42, 0, .58, 1';
              break;

            case 'easeInQuad':
              _cubic = '.55, .085, .68, .53';
              break;

            case 'easeInCubic':
              _cubic = '.55, .055, .675, .19';
              break;

            case 'easeInQuart':
              _cubic = '.895, .03, .685, .22';
              break;

            case 'easeInQuint':
              _cubic = '.755, .05, .855, .06';
              break;

            case 'easeInSine':
              _cubic = '.47, 0, .745, .715';
              break;

            case 'easeInExpo':
              _cubic = '.95, .05, .795, .035';
              break;

            case 'easeInCirc':
              _cubic = '.6, .04, .98, .335';
              break;

            case 'easeInBack':
              _cubic = '.6, -.280, .735, .045';
              break;

            case 'easeOutQuad':
              _cubic = '.25, .46, .45, .94';
              break;

            case 'easeOutCubic':
              _cubic = '.215, .61, .355, 1';
              break;

            case 'easeOutQuart':
              _cubic = '.165, .84, .44, 1';
              break;

            case 'easeOutQuint':
              _cubic = '.23, 1, .32, 1';
              break;

            case 'easeOutSine':
              _cubic = '.39, .575, .565, 1';
              break;

            case 'easeOutExpo':
              _cubic = '.19, 1, .22, 1';
              break;

            case 'easeOutCirc':
              _cubic = '.075, .82, .165, 1';
              break;

            case 'easeOutBack':
              _cubic = '.175, .885, .32, 1.275';
              break;

            case 'easeInOutQuad':
              _cubic = '.455, .03, .515, .955';
              break;

            case 'easeInOutCubic':
              _cubic = '.645, .045, .355, 1';
              break;

            case 'easeInOutQuart':
              _cubic = '.770, 0, .175, 1';
              break;

            case 'easeInOutQuint':
              _cubic = '.86, 0, .07, 1';
              break;

            case 'easeInOutSine':
              _cubic = '.445, .05, 0.55, 0.95';
              break;

            case 'easeInOutExpo':
              _cubic = '1, 0, 0, 1';
              break;

            case 'easeInOutCirc':
              _cubic = '.785, .135, .15, .86';
              break;

            case 'easeInOutBack':
              _cubic = '.68, -.55, .265, 1.55';
              break;

            default:
              _cubic = '.25, .25, .75, .75';
          }
        }

        _cubic && this.helper(this.eventTarget).easing({
          duration: duration,
          cubic: _cubic,
          delay: delay
        });
        return this;
      }
      /**
       * Scroll Event
       */

      /**
       * The scroll event fires when the document view or an element has been scrolled.
       * 
       * @api        scroll       scroll( params = {} ): {object}
       *
       * @params      {object}   [params={object}]   The parameters
       * @return     {Object}   instance            This function will return SuperEvent instance
       * 
       * @example    example    event.scroll({ indicator: '90%', duration: '60%', debug: false }).fromTo({ color: '#FFF' }, { color: '#999' })
       * 
       */

    }, {
      key: "scroll",
      value: function scroll() {
        var _this3 = this;

        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var listener = false;
        /*
         * { function_description }
         *
         * @params      {Function}  playCallBack  The play call back
         */

        this._sourceEvent = function (playCallBack) {
          document.addEventListener(params.listener && params.listener !== 'load' ? params.listener : 'DOMContentLoaded', function () {
            return runScrollEvent(playCallBack);
          });
          window.addEventListener('load', getScrollingPosition);
          window.addEventListener('resize', getScrollingPosition);
        };
        /*
         * 
         * { function_description }
         * 
         */


        var runScrollEvent = function runScrollEvent(call) {
          getScrollingPosition();
          scrollEvent(call);
        };
        /*
         * { function_description }
         *
         * @param      {Function}  call    The call
         * @param      {number}    top     The top
         */


        var eventScrollTop = function eventScrollTop(call) {
          var _this3$params$_source = _this3.params._sourceScrolling,
              indicator = _this3$params$_source.indicator,
              runnigArea = _this3$params$_source.runnigArea,
              start = _this3$params$_source.start;
          var top = (typeof _this3.eventSource.scrollY === 'number' ? _this3.eventSource.scrollY : _this3.eventSource.scrollTop) + indicator;

          var _progress = (top - start) / runnigArea; // get _progress when start element in viewport from 0 to 1


          if (_progress > 1) {
            _progress = 1;
          } else if (_progress < 0) {
            _progress = 0;
          }

          call(_progress.toFixed(5));
        };
        /*
         * 
         * { function_description }
         * 
         */


        var scrollEvent = function scrollEvent(call) {
          eventScrollTop(call);

          var eventListener = function eventListener() {
            var _this3$params$_source2 = _this3.params._sourceScrolling,
                indicator = _this3$params$_source2.indicator,
                start = _this3$params$_source2.start,
                end = _this3$params$_source2.end;
            var top = (typeof _this3.eventSource.scrollY === 'number' ? _this3.eventSource.scrollY : _this3.eventSource.scrollTop) + indicator;

            if (top < start) {
              call(0);
            } else if (top > end) {
              call(1);
            } else {
              eventScrollTop(call);
            }

            listener = true;
          };

          !listener && _this3.eventSource.addEventListener('scroll', eventListener, true);
        };
        /*
         * Gets the scrolling position.
         *
         * @param      {<type>}  params       The parameters
         * @param      {<type>}  eventTarget  The event target
         */


        var getScrollingPosition = function getScrollingPosition() {
          var _params$indicator;

          var scrollableHeight = typeof _this3.eventSource.innerHeight === 'number' ? _this3.eventSource.innerHeight : _this3.eventSource.offsetHeight;
          var el = _this3.eventTarget instanceof Element ? _this3.eventTarget : _this3.eventTarget[0];
          var rect = el.getBoundingClientRect();
          var indicator = getIndicatorsPosition((_params$indicator = params.indicator) !== null && _params$indicator !== void 0 ? _params$indicator : 90); // get indicator value

          var duration = getIndicatorsPosition(isNaN(parseInt(params.duration)) ? 0 : params.duration);
          var start = el.offsetTop;
          var end = start + el.offsetHeight;

          var _end = isNaN(parseInt(params.duration)) ? end + scrollableHeight : start + duration;

          _this3.params._sourceScrolling = {
            indicator: indicator,
            runnigArea: _end - start,
            start: start,
            end: _end
          };
          params.debug === true && scrollDebugging();
        };
        /*
         * claculate indicators Position from percentage of window height
         *
         * @param    {number}  num   The number
         * @return   {<type>}  The indicators position.
         */


        var getIndicatorsPosition = function getIndicatorsPosition(num) {
          var height = typeof _this3.eventSource.innerHeight === 'number' ? _this3.eventSource.innerHeight : _this3.eventSource.offsetHeight;
          num = Math.abs(parseInt(num));
          num = num <= 100 ? num : 0;
          return Math.round(num / 100 * height);
        };
        /*
         * 
         * debug.
         * 
         */


        var scrollDebugging = function scrollDebugging() {
          var debug = document.querySelectorAll('.suprescrolling-debug');

          if (debug) {
            Array.prototype.forEach.call(debug, function (el) {
              el.parentNode.removeChild(el);
            });
          }

          scrollingPositionDebug();
          targetPositionDebug();
        };
        /*
         * DEBUG
         *
         * @param    {string}  id    The identifier
         * @param    {<type>}  args  The arguments
         * @return   {Object}  { description_of_the_return_value }
         */


        var scrollingPositionDebug = function scrollingPositionDebug() {
          var _this3$params$_source3 = _this3.params._sourceScrolling,
              indicator = _this3$params$_source3.indicator,
              duration = _this3$params$_source3.duration;

          var _indicator = document.createElement('HR');

          var parent = document.body;
          var style = {
            textAlign: 'left',
            position: 'absolute',
            color: '#FF0000',
            border: '0',
            borderBottom: '1px solid #FF0000',
            zIndex: '99999',
            width: '95%',
            opacity: '0.9',
            left: '0',
            height: '20px',
            padding: '0 10px',
            fontSize: '14px'
          };

          _this3.helper(_indicator).addClass('suprescrolling-debug').css(style, {
            top: indicator - 20 + 'px'
          }).text('Indicator');

          if (typeof _this3.eventSource.parentNode !== 'undefined') {
            parent = _this3.eventSource.parentNode;

            _this3.helper(parent).css({
              position: 'relative'
            });
          } else {
            _this3.helper(_indicator).css({
              position: 'fixed'
            });
          }

          parent.appendChild(_indicator);
        };
        /*
         * DEBUG
         * { function_description }
         */


        var targetPositionDebug = function targetPositionDebug() {
          var style = {
            textAlign: 'left',
            position: 'absolute',
            width: '50px',
            border: 'none',
            borderTop: '1px solid #FF0000',
            zIndex: '99999',
            opacity: '0.7',
            margin: '0',
            padding: '0',
            color: '#FF0000',
            left: '50px',
            top: '0',
            fontSize: '0.8rem'
          };
          var parent = document.body;
          var start = document.createElement('HR');
          var end = document.createElement('HR');
          var _start = _this3.params._sourceScrolling.start;
          var _end = _this3.params._sourceScrolling.end;

          _this3.helper(start).addClass('suprescrolling-debug').css(style, {
            top: "".concat(_start, "px")
          }).text('Start');

          _this3.helper(end).addClass('suprescrolling-debug').css(style, {
            top: "".concat(_end, "px")
          }).text('End');

          if (_this3.eventTarget instanceof Element) {
            parent = _this3.eventTarget.parentNode;
          } else {
            parent = _this3.eventTarget[0].parentNode;
          }

          parent.appendChild(start);
          parent.appendChild(end);
        };

        return this.actions;
      }
      /**
       * Click Event
       */

      /**
       *
       * Execute a JavaScript when moving the mouse pointer onto an image:
       * 
       * @api        click      click(): {object}
       *
       * @return     {Object}   instance            This function will return SuperEvent instance
       * 
       * @example    example    event.click().fromTo({ color: '#FFF' }, { color: '#999' })
       * 
       */

    }, {
      key: "click",
      value: function click() {
        var _this4 = this;

        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._sourceEvent = function (playCallBack) {
          var toggle = typeof params.toggle !== 'undefined' ? params.toggle : true;
          _this4._click_progress = 1;
          playCallBack(0);

          var click = function click() {
            playCallBack(_this4._click_progress);

            if (toggle) {
              _this4._click_progress = +!_this4._click_progress;
            }
          };

          _this4.eventSource.addEventListener('click', click);
        };

        return this.actions;
      }
      /**
       * Mouseover Event
       */

      /**
       *
       * The hover function occurs when the mouse pointer is over the selected element.
       * 
       * @api        hover      hover(): {object}
       *
       * @return     {Object}   instance            This function will return SuperEvent instance
       * 
       * @example    example    event.hover().fromTo({ color: '#FFF' }, { color: '#999' })
       * 
       */

    }, {
      key: "hover",
      value: function hover() {
        var _this5 = this;

        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._sourceEvent = function (playCallBack) {
          playCallBack(0);

          _this5.eventSource.addEventListener('mouseover', function () {
            return playCallBack(1);
          });

          _this5.eventSource.addEventListener('mouseleave', function () {
            return playCallBack(0);
          });
        };

        return this.actions;
      }
      /**
       * Mouseover Event
       */

      /**
       *
       * The mousemove function occurs when the mouse move over the selected element.
       * 
       * @api        mousemove  mousemove(): {object}
       *
       * @return     {Object}   instance            This function will return SuperEvent instance
       * 
       * @example    example    event.mousemove().fromTo({ color: '#FFF' }, { color: '#999' })
       */

    }, {
      key: "mousemove",
      value: function mousemove() {
        var _this6 = this;

        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var mousemove = function mousemove(event, playCallBack) {
          var width = window.innerWidth / 2;
          var height = window.innerHeight / 2;
          var x = event.clientX;
          var y = event.clientY;

          if (_this6.eventSource && 'function' === typeof _this6.eventSource.getBoundingClientRect) {
            var rect = _this6.eventSource.getBoundingClientRect();

            width = rect.width / 2;
            height = rect.height / 2;
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
          }

          var positionX = (width - x) / width;
          positionX = positionX < 0 ? 1 + positionX : 1 - positionX;
          var positionY = (height - y) / height;
          positionY = positionY < 0 ? 1 + positionY : 1 - positionY;
          playCallBack(positionX < positionY ? positionX : positionY);
        };

        this._sourceEvent = function (playCallBack) {
          _this6.eventSource.addEventListener('mousemove', function (event) {
            return mousemove(event, playCallBack);
          });

          _this6.eventSource.addEventListener('mouseleave', function () {
            return playCallBack(0);
          });

          playCallBack(0);
        };

        return this.actions;
      }
    }]);

    return SuperEvents;
  }();

  return SuperEvents;
});