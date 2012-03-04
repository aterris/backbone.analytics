#### Backbone.Analytics

 A small object to manage the integration of google analytics into
 a backbone application.  It is meant to be simple and implementation
 agnostic.

## Dependencies

 Backbone.js ( requires Underscore.js )

## Example

     <script src="/js/underscore.js"></script>
     <script src="/js/backbone.js"></script>
     <script src="/js/backbone.analytics.js"></script>
     <script>
       window.App = window.App || {};
       window.App.analytics = new Backbone.Analytics({code: 'UA-12345678-9'});
     </script>

## Usage
 
 This object is meant to be simple and flexible so you can use it however
 works best for your needs and implementation.  I prefer to extend the object
 and use it to write methods that contain my specific analytics integrations.
 However, you can also use it as is.

## Syntax Sugar

 Backbone.Analytics provides a few convience methods that wrap around common
 google analytics objects and interactions. These are `queue`, `push`, 
 `set_account`, `track_pageview`, `track_event`, and `set_custom_var`

## Setting the Account

 By default creating a new analytics object will automatically trigger a set
 account event using the `code` passed to the create method. Passing 
 `set_account: false` will stop this behavior.

## Script Loading
 
 By default creating a new analytics object will automatically load the
 google analytics script via the asynchronous pattern. Passing `load_script: false`
 will stop this behavior if you already loaded it yourself.

## Navigation Tracking

 By default all calls to Backbone.history.navigate will be tracked as pageviews.
 Passing `track_navigate: false` will disable this behavior

# Track Initial Pageview

 Depending on your Backbone setup and implementation you may or may not wish
 to fire off an initial page view. By default, it will trigger a plan
 pageview event 

## Debug Mode

 pass `debug: true` to the constructor to enable debug mode.
 This will load the debug version of google analytics `ga_debug.js` which
 provides console output to help debug issues.

## Extending Backbone.Analytics

 Extending Backbone.Analytics can help you manage and maintain your domain specific
 analytics interactions in a single location.  I extend the object to create a home
 for my interactions.  I create methods on this object that I can later bind events
 to.  For example, when a model triggers a change event, I can then have my semantic
 function to bind to.

     @model.on('change:name', App.analytics.edit_model_name)

