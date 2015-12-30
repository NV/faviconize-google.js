require 'rake/clean'
require 'jspp'
require 'colored'
require 'zip/zip'

EXTENSION_VERSION = '2.4'

NAME = 'faviconize-google.user.js'
CHROME_EXTENSION = 'chrome/faviconize-google.user.js'
CHROME_MANIFEST = 'chrome/manifest.json'
CHROME_MATCHES = 'chrome/matches.js'
SAFARI_EXTENSION = 'Faviconize Google.safariextension'
OPERA_ICONS_DIR = 'opera/icons'
OPERA_INCLUDES_DIR = 'opera/includes'
OPERA_EXTENSION = "FaviconizeGoogle-#{EXTENSION_VERSION}.oex"
GOOGLE_URLS = 'chrome/google-urls.txt'
GOOGLE_DOMAINS = 'chrome/google-domains.txt'

task :default => :userjs
task :userjs do
  file = JSPP 'chrome/userscript.js'
  File.open NAME, 'w' do |f|
    f.puts file
  end
  puts NAME.green
end

file CHROME_MATCHES => [GOOGLE_DOMAINS, GOOGLE_URLS] do
  urls = IO.readlines(GOOGLE_URLS).each { |s| s.chomp! }
  domains = IO.readlines(GOOGLE_DOMAINS).each { |s| s.chomp! }
  File.open CHROME_MATCHES, 'w' do |f|
    f.puts '"' + domains.map {|domain| urls.map {|url| url % domain }}.flatten.join("\",\n\"") + '"'
  end
  puts CHROME_MATCHES.green
end

file CHROME_MANIFEST => [CHROME_MATCHES, 'chrome/manifest.in.json'] do
  file = JSPP 'chrome/manifest.in.json'
  File.open CHROME_MANIFEST, 'w' do |f|
    f.puts file
  end
  puts CHROME_MANIFEST.green
end

file CHROME_EXTENSION => ['chrome/userscript.js', 'chrome/style.css', 'chrome/faviconize-google.js'] do
  file = JSPP 'chrome/userscript.js'
  File.open CHROME_EXTENSION, 'w' do |f|
    f.puts file
  end
  puts CHROME_EXTENSION.green
end

task :chrome => [CHROME_EXTENSION, CHROME_MANIFEST]

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
