require 'rubygems'

desc 'build docs for gh-pages'
task :build_docs do
  begin
    require 'rocco'
  rescue LoadError
    puts "rocco not found.\nInstall it by running 'gem install rocco"
    exit
  end

  system 'git checkout gh-pages'
  system 'rocco backbone.analytics.coffee && mv backbone.analytics.html index.html'
  system 'git add index.html && git commit -m "update gh-pages" && git push origin gh-pages'
  system 'git checkout master'
end
