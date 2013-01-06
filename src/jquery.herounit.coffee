# jquery.herounit
# https://github.com/zamiang/jquery.herounit
#
# Copyright (c) 2012 Brennan Moore
# Licensed under the MIT license.



methods =

  initialize: (settings) ->
    throw "You must pass settings" unless settings?
    @feed = new Feed($(@), settings)
    @

  destroy: ->
    $(window).unbind 'resize.herounit'
    @feed.destroy()

  # recomputes position
  recompute: ->
    for feedItem in @feed.feedItems
      feedItem.setDimensions()
      for column in feedItem.columns
        colum.setDimensions feedItem.height

$.fn.herounit = (method) ->
  if methods[method]?
    methods[method].apply @, Array::slice.call(arguments, 1)
  else if typeof method is "object" or not method?
    methods.initialize.apply @, arguments
  else
    $.error "Method #{method} does not exist on jQuery.herounit"
