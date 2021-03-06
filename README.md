## Backbone Analytics

 A small object to manage the integration of google analytics into
 a backbone application.  It is meant to be simple and implementation
 agnostic. Depends on [Underscore.js](http://documentcloud.github.com/underscore/) 
 and [Backbone.js](http://documentcloud.github.com/backbone/).  For more detailed
 documentation see [the docs](http://aterris.github.com/backbone.analytics/)

#### Example

     <script src="/js/underscore.js"></script>
     <script src="/js/backbone.js"></script>
     <script src="/js/backbone.analytics.js"></script>
     <script>
       window.App = window.App || {};
       window.App.ga = new Backbone.Analytics({code: 'UA-12345678-9'});
     </script>

#### Usage
 
 This object is meant to be simple and flexible so you can use it however
 works best for your needs and implementation.  I prefer to extend the object
 and use it to write methods that contain my specific analytics integrations.
 However, you can also use it as is.

#### Option Defaults

 * setAccount: true
 * initialPageview: true
 * trackNavigate: true
 * loadScript: true
 * debug: false

#### Syntactic Sugar

 Backbone.Analytics provides a few convience methods that wrap around common
 google analytics objects and interactions including `queue`, `push`, 
 `setAccount`, `trackPageview`, `trackEvent`, `trackSocial`, and `setCustomVar`

#### Debug Mode

 Enabling debug mode will include the debug version of the google analytics
 script instead of the standard script.  This will log debug information
 to the console.  Enable debug mode by passing `debug: true`

#### Extending Backbone.Analytics

 Extending Backbone.Analytics can help you manage and maintain your domain specific
 analytics interactions in a single location.
