/**
 * vanilla-pjax - A lightweight PJAX library for modern browsers
 * https://github.com/MoOx/vanilla-pjax
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Pjax = factory());
}(this, (function () {
 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var util = {
    ready: function ready(fn) {
      if (document.readyState != 'loading') {
        fn();
      } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
      } else {
        document.attachEvent('onreadystatechange', function () {
          if (document.readyState != 'loading') fn();
        });
      }
    },
    extend: _extends,
    matches: function matches(element, selector) {
      var p = Element.prototype;
      return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector).call(element, selector);
    },
    closest: function closest(element, selector) {
      var node = element;

      while (node) {
        if (util.matches(node, selector)) {
          break;
        }

        node = node.parentElement;
      }

      return node;
    },
    fetch: function fetch(url, options) {
      return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.open(options.method || 'GET', url);

        if (options.headers) {
          Object.keys(options.headers).forEach(function (key) {
            req.setRequestHeader(key, options.headers[key]);
          });
        }

        req.onload = function () {
          resolve(req);
        };

        req.onerror = function () {
          reject(Error(req.statusText));
        };

        req.send(options.body);
      });
    },
    parseHTML: function parseHTML(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');
      return doc;
    }
  };

  var defaultOptions = {
    selectors: [
      'title',
      '.main'
    ],
    elements: 'a',
    ignoreClass: 'no-pjax',
    timeout: 6500,
    cacheBust: false,
    scrollToTop: true,
    history: true
  };

  var Pjax = function () {
    function Pjax(options) {
      _classCallCheck(this, Pjax);

      this.options = util.extend({}, defaultOptions, options);
      this.state = {
        currentUrl: window.location.href,
        previousUrl: null
      };

      this.bindEvents();
    }

    _createClass(Pjax, [{
      key: 'bindEvents',
      value: function bindEvents() {
        var _this = this;

        document.addEventListener('click', function (event) {
          _this.handleClick(event);
        });

        window.addEventListener('popstate', function (event) {
          if (event.state) {
            _this.handlePopState(event);
          }
        });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(event) {
        var _this2 = this;

        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        var link = util.closest(event.target, this.options.elements);

        if (!link || link.getAttribute('target') || link.classList.contains(this.options.ignoreClass) || !link.href || link.origin !== window.location.origin) {
          return;
        }

        var url = link.href;

        if (url === this.state.currentUrl) {
          event.preventDefault();
          return;
        }

        event.preventDefault();

        this.loadUrl(url, {
          pushState: true
        });
      }
    }, {
      key: 'handlePopState',
      value: function handlePopState(event) {
        this.loadUrl(window.location.href, {
          pushState: false
        });
      }
    }, {
      key: 'loadUrl',
      value: function loadUrl(url, options) {
        var _this3 = this;

        var requestUrl = url;

        if (this.options.cacheBust) {
          requestUrl = requestUrl + (requestUrl.indexOf('?') === -1 ? '?' : '&') + '_pjax=' + Date.now();
        }

        this.emit('pjax:send', { url: url });

        util.fetch(requestUrl, {
          method: 'GET',
          headers: {
            'X-PJAX': 'true',
            'X-PJAX-URL': url
          }
        }).then(function (req) {
          if (req.status === 200) {
            _this3.state.previousUrl = _this3.state.currentUrl;
            _this3.state.currentUrl = url;

            if (options.pushState && _this3.options.history) {
              history.pushState({ url: url }, '', url);
            }

            _this3.swapContent(req.responseText);
          }
        }).catch(function (error) {
          console.error('PJAX error:', error);
          window.location = url;
        }).finally(function () {
          _this3.emit('pjax:complete', { url: url });
        });
      }
    }, {
      key: 'swapContent',
      value: function swapContent(html) {
        var doc = util.parseHTML(html);

        this.options.selectors.forEach(function (selector) {
          var from = doc.querySelector(selector);
          var to = document.querySelector(selector);

          if (from && to) {
            to.parentNode.replaceChild(from, to);
          }
        });

        if (this.options.scrollToTop) {
          window.scrollTo(0, 0);
        }

        this.emit('pjax:success', { html: html });
      }
    }, {
      key: 'emit',
      value: function emit(eventName, data) {
        var event = new CustomEvent(eventName, {
          bubbles: true,
          cancelable: true,
          detail: data
        });

        document.dispatchEvent(event);
      }
    }]);

    return Pjax;
  }();

  return Pjax;

})));

// 初始化PJAX
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function() {
    var pjax = new Pjax({
      selectors: [
        'title',
        '.main'
      ],
      elements: 'a',
      ignoreClass: 'no-pjax',
      timeout: 6500,
      cacheBust: false,
      scrollToTop: true,
      history: true
    });
  });
}
