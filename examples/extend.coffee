class window.App.Analytics extends window.Backbone.Analytics
  initialize: (options={}) =>
    if options.user?
      @set_custom_var(1, 'User', 'Visitor', options.user.slug)
    
  explore_city: (city) =>
    @track_event('View', 'City', city.get('slug'))
  
  view_item: (item) =>
    @track_event('View', item.get('type'), item.get('slug'))
  
  share_item: (item) =>
    @track_event('Share', item.get('type'), item.get('slug'))
  
  collect_item: (item) =>
    @track_event('Collect', item.get('type'), item.get('slug'))
