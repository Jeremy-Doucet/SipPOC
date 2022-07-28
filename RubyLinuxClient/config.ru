require 'rubygems'
require 'bundler'
require 'dotenv'

Dotenv.load
Bundler.require

require './server'
run Application