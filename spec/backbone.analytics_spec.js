(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  describe("Backbone.Analytics", function() {
    beforeEach(function() {
      return this.analytics = new Backbone.Analytics({
        code: 'UA-XXXXX-X'
      });
    });
    it('can determine correct script source protocol', function() {
      return expect(this.analytics.protocol()).toEqual('http://www');
    });
    it('can use ga.js', function() {
      return expect(this.analytics.script()).toEqual('.google-analytics.com/ga.js');
    });
    it('can use ga_debug.js in debug mode', function() {
      this.debug_analytics = new Backbone.Analytics({
        code: 'UA-XXXXX-X',
        debug: true,
        load_script: false
      });
      return expect(this.debug_analytics.script()).toEqual('.google-analytics.com/u/ga_debug.js');
    });
    it('can async load the script', function() {
      var ga_script;
      ga_script = document.getElementsByTagName('script')[0];
      return expect(ga_script.src).toEqual('http://www.google-analytics.com/ga.js');
    });
    it('can access _gaq via queue', function() {
      return expect(this.analytics.queue()).toEqual(window._gaq);
    });
    it('can push', function() {
      spyOn(window._gaq, 'push');
      this.analytics.push('test');
      return expect(window._gaq.push).toHaveBeenCalledWith('test');
    });
    it('can set account', function() {
      spyOn(this.analytics, 'push');
      this.analytics.set_account();
      return expect(this.analytics.push).toHaveBeenCalledWith(['_setAccount', 'UA-XXXXX-X']);
    });
    it('raises an error when setting account without providing a tracking code', function() {
      this.analytics.code = void 0;
      return expect(__bind(function() {
        return this.analytics.set_account();
      }, this)).toThrow(new Error("Cannot Set Google Analytics Account: No Tracking Code Provided"));
    });
    it('can track a pageview', function() {
      spyOn(this.analytics, 'push');
      this.analytics.track_pageview();
      return expect(this.analytics.push).toHaveBeenCalledWith(['_trackPageview']);
    });
    it('can track a pageview to a specific fragment', function() {
      spyOn(this.analytics, 'push');
      this.analytics.track_pageview('/test/fragment');
      return expect(this.analytics.push).toHaveBeenCalledWith(['_trackPageview', '/test/fragment']);
    });
    it('can track an event', function() {
      spyOn(this.analytics, 'push');
      this.analytics.track_event('Category', 'Action', 'Label');
      return expect(this.analytics.push).toHaveBeenCalledWith(['_trackEvent', 'Category', 'Action', 'Label']);
    });
    it('can set a custom var', function() {
      spyOn(this.analytics, 'push');
      this.analytics.set_custom_var(1, 'Name', 'Value');
      return expect(this.analytics.push).toHaveBeenCalledWith(['_setCustomVar', 1, 'Name', 'Value']);
    });
    return it('can track backbone navigation', function() {
      spyOn(this.analytics, 'push');
      Backbone.History.prototype.navigate('/test');
      return expect(this.analytics.push).toHaveBeenCalledWith(['_trackPageview', '/test']);
    });
  });
}).call(this);
