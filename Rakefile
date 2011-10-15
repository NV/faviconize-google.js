require 'rake/clean'
require 'jspp'
require 'colored'
require 'zip/zip'

EXTENSION_VERSION = '1.9'

NAME = 'faviconize-google.user.js'
CHROME_EXTENSION = 'chrome/faviconize-google.user.js'
SAFARI_EXTENSION = 'Faviconize Google.safariextension'
OPERA_ICONS_DIR = 'opera/icons'
OPERA_INCLUDES_DIR = 'opera/includes'
OPERA_EXTENSION = "FaviconizeGoogle-#{EXTENSION_VERSION}.oex"

task :default => :userjs
task :userjs do
  file = JSPP 'chrome/userscript.js'
  File.open NAME, 'w' do |f|
    f.puts file
  end
  puts NAME.green
end

task :chrome do
  file = JSPP 'chrome/userscript.js'
  File.open CHROME_EXTENSION, 'w' do |f|
    f.puts file
  end
  puts NAME.green
end

task :safari do
  cp 'chrome/faviconize-google.js', SAFARI_EXTENSION
  cp 'chrome/style.css', SAFARI_EXTENSION
  puts SAFARI_EXTENSION.green
end

directory OPERA_ICONS_DIR
directory OPERA_INCLUDES_DIR

file OPERA_EXTENSION => [:userjs, OPERA_ICONS_DIR, OPERA_INCLUDES_DIR] do
  cp NAME, "#{OPERA_INCLUDES_DIR}/#{NAME}"
  cp 'chrome/icon_64.png', "#{OPERA_ICONS_DIR}/icon_64.png"
  Zip::ZipOutputStream.open(OPERA_EXTENSION) do |z|
    Dir.glob('opera/**/*.*') do |f|
      z.put_next_entry(f.sub(/^opera\//, ''))
      z.print IO.read(f)
    end
  end
  puts OPERA_EXTENSION.green
end

task :opera => OPERA_EXTENSION

CLOBBER.include [
  NAME,
  CHROME_EXTENSION,
    OPERA_ICONS_DIR,
    OPERA_INCLUDES_DIR,
    OPERA_EXTENSION,
  "#{SAFARI_EXTENSION}/faviconize-google.js",
  "#{SAFARI_EXTENSION}/style.css"
]
