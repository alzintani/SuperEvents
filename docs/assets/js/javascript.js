function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
  * SuperEvents v0.1 http://superevents.org
  * Copyright 2018 SuperEvents
  * MIT License (URL)
  *
  */
(function () {
  "use strict";

  var superEventsJS = /*#__PURE__*/function () {
    function superEventsJS() {
      _classCallCheck(this, superEventsJS);
    }

    _createClass(superEventsJS, [{
      key: "init",
      value: function init() {
        var easing = 'linear';
        var ease = true;
        var duration = 0.1;
        var eventFrom;
        var eventTo;
        var source;
        var target;
        eventFrom = {
          scale: 0.5
        };
        eventTo = {
          scale: 1
        };
        source = document.querySelector('.click-example-source');
        target = document.querySelectorAll('.click-example-target');
        new SuperEvents({
          source: source,
          target: target
        }).click().fromTo(eventFrom, eventTo).easing({
          timing: 'ease-out',
          duration: 0.3,
          delay: 0.1,
          cubicBezier: false
        });
        var eventFrom2 = {
          backgroundColor: '#FF4971'
        };
        var eventTo2 = {
          backgroundColor: '#4693FF'
        };
        source = document.querySelector('.mousemove-example-source');
        target = document.querySelectorAll('.mousemove-example-target');
        source && new SuperEvents({
          source: source,
          target: target
        }).mousemove().fromTo(eventFrom2, eventTo2).easing(easing, duration, false, ease);
        eventFrom = {
          translateX: '300px',
          opacity: 0.1
        };
        eventTo = {
          translateX: '0',
          opacity: 1
        };
        source = document.querySelector('.hover-example-source');
        target = document.querySelectorAll('.hover-example-target');
        source && new SuperEvents({
          source: source,
          target: target
        }).hover().fromTo(eventFrom, eventTo).easing({
          timing: 'ease-out',
          duration: 0.3,
          delay: 0.3,
          cubicBezier: false
        });
        eventFrom = {
          backgroundColor: '#49FF8E'
        };
        eventTo = {
          backgroundColor: '#FFE846'
        };
        target = document.querySelectorAll('.scroll-example-target');
        target && new SuperEvents(target).scroll({
          indicator: '80%',
          duration: '80%'
        }).fromTo(eventFrom, eventTo).easing({
          timing: 'ease-out',
          duration: 0.5,
          delay: 0
        });
        eventFrom = {
          backgroundColor: '#FF5549',
          scale: 0.2
        };
        eventTo = {
          backgroundColor: '#464EFF',
          scale: 1
        };
        var target2 = document.querySelectorAll('.scroll-example-target-2');
        target2 && new SuperEvents(target2).scroll({
          indicator: '80%',
          duration: '20%'
        }).fromTo(eventFrom, eventTo).easing({
          timing: 'ease-out',
          duration: 0.3,
          delay: 0.1,
          cubicBezier: false
        });
        eventFrom = {
          backgroundColor: '#FFAAA4'
        };
        eventTo = {
          backgroundColor: '#9BA0FF'
        };
        var source3 = document.querySelector('.scroll-div-container');
        var target3 = source3.querySelectorAll('.scroll2-example-target');
        source3 && new SuperEvents({
          source: source3,
          target: target3
        }).scroll({
          indicator: '80%',
          duration: '60%'
        }).fromTo(eventFrom, eventTo).easing({
          timing: 'ease-out',
          duration: 0.3,
          delay: 0.15,
          cubicBezier: false
        });
      }
    }]);

    return superEventsJS;
  }();

  new superEventsJS().init();
})();