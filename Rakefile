require 'rake/clean'
require 'jspp'
require 'colored'

NAME = 'faviconize-google.user.js'

task :default => :userjs
task :userjs do
  file = JSPP 'chrome/userscript.js'
  File.open NAME, 'w' do |f|
    f.puts file
  end
  puts NAME.green
end

CLOBBER.include NAME