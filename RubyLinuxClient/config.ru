require 'rubygems'
require 'bundler'
require 'dotenv'

Bundler.require
Dotenv.load

require './server'
run Sinatra::Application