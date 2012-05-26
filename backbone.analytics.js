(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  window.Backbone.Analytics = (function() {
    function Analytics(options) {
      if (options == null) {
        options = {};
      }
      this.trackNavigate = __bind(this.trackNavigate, this);
      this.setCustomVar = __bind(this.setCustomVar, this);
      this.trackSocial = __bind(this.trackSocial, this);
      this.trackEvent = __bind(this.trackEvent, this);
      this.trackPageview = __bind(this.trackPageview, this);
      this.setAccount = __bind(this.setAccount, this);
      this.push = __bind(this.push, this);
      this.queue = __bind(this.queue, this);
      this.script = __bind(this.script, this);
      this.protocol = __bind(this.protocol, this);
      this.loadScript = __bind(this.loadScript, this);
      this.initialize = __bind(this.initialize, this);
      this.code = options.code;
      this.debug = options.debug;
      if (options.setAccount !== false) {
        this.setAccount();
      }
      if (options.loadScript !== false) {
        this.loadScript();
      }
      this.initialize.apply(this, arguments);
      if (options.initialPageview !== false) {
        this.trackPageview();
      }
      if (options.trackNavigate !== false) {
        this.trackNavigate();
      }
    }
    Analytics.prototype.initialize = function() {};
    Analytics.prototype.loadScript = function() {
      var ga, s;
      ga = document.createElement('script');
      ga.type = 'text/javascript';
      ga.async = true;
      ga.src = this.protocol() + this.script();
      s = document.getElementsByTagName('script')[0];
      return s.parentNode.insertBefore(ga, s);
    };
    Analytics.prototype.protocol = function() {
      if (document.location.protocol === 'https:') {
        return 'https://ssl';
      } else {
        return 'http://www';
      }
    };
    Analytics.prototype.script = function() {
      if (this.debug === true) {
        return '.google-analytics.com/u/ga_debug.js';
      } else {
        return '.google-analytics.com/ga.js';
      }
    };
    Analytics.prototype.queue = function() {
      return window._gaq || (window._gaq = []);
    };
    Analytics.prototype.push = function(args) {
      return this.queue().push(args);
    };
    Analytics.prototype.setAccount = function() {
      if (this.code != null) {
        return this.push(['_setAccount', this.code]);
      } else {
        throw new Error("Cannot Set Google Analytics Account: No Tracking Code Provided");
      }
    };
    Analytics.prototype.trackPageview = function(fragment) {
      var command;
      command = ['_trackPageview'];
      if (fragment != null) {
        command.push(fragment);
      }
      return this.push(command);
    };
    Analytics.prototype.trackEvent = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.push(['_trackEvent'].concat(args));
    };
    Analytics.prototype.trackSocial = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.push(['_trackSocial'].concat(args));
    };
    Analytics.prototype.setCustomVar = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.push(['_setCustomVar'].concat(args));
    };
    Analytics.prototype.trackNavigate = function() {
      var navigate, trackPageview;
      trackPageview = this.trackPageview;
      navigate = window.Backbone.History.prototype.navigate;
      return window.Backbone.History.prototype.navigate = function(fragment, options) {
        trackPageview(fragment);
        return navigate.apply(this, arguments);
      };
    };
    return Analytics;
  })();
}).call(this);
