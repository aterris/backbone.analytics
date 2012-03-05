class window.App.Analytics extends window.Backbone.Analytics
  initialize: (options={}) =>
    if options.user?
      @setCustomVar(1, 'User', 'Visitor', options.user.slug)
    
  explore_city: (city) =>
    @trackEvent('View', 'City', city.get('slug'))
  
  view_item: (item) =>
    @trackEvent('View', item.get('type'), item.get('slug'))
  
  share_item: (item) =>
    @trackEvent('Share', item.get('type'), item.get('slug'))
  
  collect_item: (item) =>
    @trackEvent('Collect', item.get('type'), item.get('slug'))
