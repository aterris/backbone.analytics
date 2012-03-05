describe "Backbone.Analytics", ->
  beforeEach( ->
    @analytics = new Backbone.Analytics({code: 'UA-XXXXX-X'})
  )
  
  it 'can determine correct script source protocol', ->
    expect(@analytics.protocol()).toEqual('http://www')
  
  it 'can use ga.js', ->
    expect(@analytics.script()).toEqual('.google-analytics.com/ga.js')
  
  it 'can use ga_debug.js in debug mode', ->
    @debugAnalytics = new Backbone.Analytics({code: 'UA-XXXXX-X', debug: true, loadScript: false})
    expect(@debugAnalytics.script()).toEqual('.google-analytics.com/u/ga_debug.js')
  
  it 'can async load the script', ->
    gaScript = document.getElementsByTagName('script')[0]
    expect(gaScript.src).toEqual('http://www.google-analytics.com/ga.js')
  
  it 'can access _gaq via queue', ->
    expect(@analytics.queue()).toEqual(window._gaq)
  
  it 'can push', ->
    spyOn(window._gaq, 'push')
    @analytics.push('test')
    expect(window._gaq.push).toHaveBeenCalledWith('test')
  
  it 'can set account', ->
    spyOn(@analytics, 'push')
    @analytics.setAccount()
    expect(@analytics.push).toHaveBeenCalledWith(['_setAccount', 'UA-XXXXX-X'])
  
  it 'raises an error when setting account without providing a tracking code', ->
    @analytics.code = undefined
    expect( => @analytics.setAccount()).toThrow(new Error("Cannot Set Google Analytics Account: No Tracking Code Provided"))
  
  it 'can track a pageview', ->
    spyOn(@analytics, 'push')
    @analytics.trackPageview()
    expect(@analytics.push).toHaveBeenCalledWith(['_trackPageview'])
  
  it 'can track a pageview to a specific fragment', ->
    spyOn(@analytics, 'push')
    @analytics.trackPageview('/test/fragment')
    expect(@analytics.push).toHaveBeenCalledWith(['_trackPageview', '/test/fragment'])
  
  it 'can track an event', ->
    spyOn(@analytics, 'push')
    @analytics.trackEvent('Category', 'Action', 'Label')
    expect(@analytics.push).toHaveBeenCalledWith(['_trackEvent', 'Category', 'Action', 'Label'])
  
  it 'can set a custom var', ->
    spyOn(@analytics, 'push')
    @analytics.setCustomVar(1, 'Name', 'Value')
    expect(@analytics.push).toHaveBeenCalledWith(['_setCustomVar', 1, 'Name', 'Value'])
  
  it 'can track backbone navigation', ->
    spyOn(@analytics, 'push')
    Backbone.History.prototype.navigate('/test')
    expect(@analytics.push).toHaveBeenCalledWith(['_trackPageview', '/test'])
