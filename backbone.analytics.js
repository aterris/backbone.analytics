(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Backbone.Analytics = (function() {
    function Analytics(options) {
      if (options == null) {
        options = {};
      }
      this.track_navigate = __bind(this.track_navigate, this);
      this.set_custom_var = __bind(this.set_custom_var, this);
      this.track_event = __bind(this.track_event, this);
      this.track_pageview = __bind(this.track_pageview, this);
      this.set_account = __bind(this.set_account, this);
      this.push = __bind(this.push, this);
      this.queue = __bind(this.queue, this);
      this.script = __bind(this.script, this);
      this.protocol = __bind(this.protocol, this);
      this.load_script = __bind(this.load_script, this);
      this.initialize = __bind(this.initialize, this);
      this.code = options.code;
      this.debug = options.debug;
      if (options.set_account !== false) {
        this.set_account();
      }
      if (options.initial_pageview !== false) {
        this.track_pageview();
      }
      if (options.track_navigate !== false) {
        this.track_navigate();
      }
      if (options.load_script !== false) {
        this.load_script();
      }
      this.initialize.apply(this, options);
    }
    Analytics.prototype.initialize = function() {};
    Analytics.prototype.load_script = function() {
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
    Analytics.prototype.set_account = function() {
      if (this.code != null) {
        return this.push(['_setAccount', this.code]);
      } else {
        throw new Error("Cannot Set Google Analytics Account: No Tracking Code Provided");
      }
    };
    Analytics.prototype.track_pageview = function(fragment) {
      var command;
      command = ['_trackPageview'];
      if (fragment != null) {
        command.push(fragment);
      }
      return this.push(command);
    };
    Analytics.prototype.track_event = function(args) {
      var command;
      command = ['_trackEvent'];
      command.push(args);
      return this.push(command);
    };
    Analytics.prototype.set_custom_var = function(args) {
      var command;
      command = ['_setCustomVar'];
      command.push(args);
      return this.push(command);
    };
    Analytics.prototype.track_navigate = function() {
      var navigate, track_pageview;
      track_pageview = this.track_pageview;
      navigate = window.Backbone.History.prototype.navigate;
      return window.Backbone.History.prototype.navigate = function(fragment, options) {
        track_pageview(fragment);
        return navigate.apply(this, arguments);
      };
    };
    return Analytics;
  })();
}).call(this);
