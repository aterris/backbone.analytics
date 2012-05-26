#### Backbone Analytics 0.1
#
# A small object to manage the integration of google analytics into
# a backbone application.  It is meant to be simple and implementation
# agnostic. Depends on Underscore.js and Backbone.js
#
# Created by Andrew Terris [@aterris](http://twitter.com/aterris)
#
# Hosted on [github](https://github.com/aterris/backbone.analytics)
#
#### Downloads
#
# * [Development](https://raw.github.com/aterris/backbone.analytics/master/backbone.analytics.js)
# * [Production](https://raw.github.com/aterris/backbone.analytics/master/backbone.analytics.min.js)
#
#### Example
#
#     <script src="/js/underscore.js"></script>
#     <script src="/js/backbone.js"></script>
#     <script src="/js/backbone.analytics.js"></script>
#     <script>
#       window.App = window.App || {};
#       window.App.ga = new Backbone.Analytics({code: 'UA-12345678-9'});
#     </script>
#
#### Usage
# 
# This object is meant to be simple and flexible so you can use it however
# works best for your needs and implementation.  I prefer to extend the object
# and use it to write methods that contain my specific analytics integrations.
# However, you can also use it as is.
#
#### Option Defaults
#
# * setAccount: true
# * initialPageview: true
# * trackNavigate: true
# * loadScript: true
# * debug: false
#
#### Syntactic Sugar
#
# Backbone.Analytics provides a few convience methods that wrap around common
# google analytics objects and interactions including `queue`, `push`, 
# `setAccount`, `trackPageview`, `trackEvent`, and `setCustomVar`
#
#### Debug Mode
#
# Enabling debug mode will include the debug version of the google analytics
# script instead of the standard script.  This will log debug information
# to the console.  Enable debug mode by passing `debug: true`
#
#### Extending Backbone.Analytics
#
# Extending Backbone.Analytics can help you manage and maintain your domain specific
# analytics interactions in a single location.
#

class window.Backbone.Analytics
  constructor: (options={}) ->
    @code = options.code
    @debug = options.debug

    @setAccount() unless options.setAccount == false
    @loadScript() unless options.loadScript == false

    @initialize.apply(this, arguments)

    @trackPageview() unless options.initialPageview == false
    @trackNavigate() unless options.trackNavigate == false
  
  ##### Initialize method to be overridden
  initialize: =>
  
  ##### Load Script
  # 
  # Load the google analytics script via the standard asynchronous pattern
  # 
  # By default creating a new analytics object will automatically load the
  # google analytics script via the asynchronous pattern. Passing `loadScript: false`
  # will stop this behavior if you already loaded it yourself.
  # 
  loadScript: =>
    ga = document.createElement('script')
    ga.type = 'text/javascript'
    ga.async = true
    ga.src = @protocol() + @script()
    
    s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(ga, s)
  
  ##### Script source protocol
  protocol: =>
    if document.location.protocol ==  'https:'
      'https://ssl'
    else
      'http://www'
  
  ##### Script source url
  script: =>
    if @debug == true
      '.google-analytics.com/u/ga_debug.js'
    else
      '.google-analytics.com/ga.js'
  
  ##### Global _gaq object
  queue: =>
    window._gaq ||= []
  
  ##### Push queue
  push: (args) =>
    @queue().push(args)
  
  ##### Set Account
  #
  # Trigger setAccount or throw an error if we do not have a tracking code
  # 
  # By default creating a new analytics object will automatically trigger a set
  # account event using the `code` passed to the create method. Passing 
  # `setAccount: false` will stop this behavior.
  #
  setAccount: =>
    if @code?
      @push(['_setAccount', @code])
    else
      throw new Error("Cannot Set Google Analytics Account: No Tracking Code Provided")
  
  ##### Track Pageview
  trackPageview: (fragment) =>
    command = ['_trackPageview']
    command.push(fragment) if fragment?
    @push(command)
  
  ##### Track Event
  trackEvent: (args...) =>
    @push(['_trackEvent'].concat(args))
  
  ##### Track Social
  trackSocial: (args...) =>
    @push(['_trackSocial'].concat(args))
  
  ##### Set Custom Variable
  setCustomVar: (args...) =>
    @push(['_setCustomVar'].concat(args))
  
  ##### Track Backbone Navigation
  trackNavigate: =>
    trackPageview = @trackPageview
    navigate = window.Backbone.History.prototype.navigate
    
    window.Backbone.History.prototype.navigate = (fragment, options) ->
      trackPageview(fragment)
      navigate.apply(this, arguments)
