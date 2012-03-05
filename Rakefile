require 'rubygems'

desc 'build js files'
task :build do
  begin
    require 'coffee-script'
  rescue LoadError
    puts "coffee-script not found.\nInstall it by running 'gem install coffee-script'"
    exit
  end

  system 'coffee backbone.analytics.coffee'
  system 'coffee spec/backbone.analytics_spec.coffee'

  # TODO: create minified version too
end

desc 'build docs for gh-pages'
task :build_docs do
  begin
    require 'rocco'
  rescue LoadError
    puts "rocco not found.\nInstall it by running 'gem install rocco'"
    exit
  end

  system 'git checkout gh-pages'
  system 'rocco backbone.analytics.coffee && mv backbone.analytics.html index.html'
  system 'git add index.html && git commit -m "update gh-pages" && git push origin gh-pages'
  system 'git checkout master'
end
