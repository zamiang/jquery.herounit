# jquery.herounit
# https://github.com/zamiang/jquery.herounit
#
# Copyright (c) 2012 Brennan Moore
# Licensed under the MIT license.

class HeroUnit

  requires: ['height', '$img']
  optional: ['afterImageLoadcont']

  constructor: ($el, settings) ->
    for require in @requires
      throw "You must pass #{require}" unless settings[require]?
    throw "Herounit must be called on an element" unless $el.length > 0

    @$el = $el
    @settings = settings
    @$img = @settings.$img
    @$img.load (=> @onImageLoad() )

    @onLoad()
    @$el.height @settings.height

  # background image must be sized auto
  # sizes image
  getImageSize: ->
    @$img.css width: 'auto'
    @naturalImageHeight = @$img.height()
    @naturalImageWidth = @$img.width()
    @imageRatio = @naturalImageWidth / @naturalImageHeight
    @minWidth = Math.floor(@settings.height * @imageRatio)

  setWidthHeight: ->
    @height = @settings.height or @$el.height()
    @width = @$el.width()

  # vertically centers image
  centerImage: ->
    @imageHeight = @$img.height()

    if window.IS_IPHONE # todo fix
      @$img.width 'auto'
    else
      if @width < @minWidth
        left = - Math.floor((@minWidth - @width) /2)
        @$img.width @minWidth
      else
        left = 0
        @$img.width @width

    if (@settings.height or @height) > @imageHeight
      top = 0
    else 
      top = - Math.floor((@imageHeight - @height) /2)

    @coverTop = top

    @$img.css
      'margin-top': "#{top}px"
      'margin-left': "#{left}px"

  onImageLoad: ->
    @getImageSize()
    @setWidthHeight()
    @centerImage()
    @centerImage()

    if @settings.afterImageLoadcont then @settings.afterImageLoadcont() else @$img.show()

  onLoad: ->
    unless @IS_IOS
      $(window).on 'resize.herounit', @debounce =>
        @setWidthHeight()
        @centerImage()
      , 50


  ##
  ## Helpers 
  # from underscore.js
  debounce: (func, wait) ->
    timeout = 0
    return ->
      args = arguments
      throttler = =>
        timeout = null
        func args

      clearTimeout timeout
      timeout = setTimeout(throttler, wait)

  # iOS resize event fires when document height or width change (such as when items are added to the dom)
  # we need to detect iOS and take an alternative path
  detectiOS: ->
    uagent = navigator.userAgent.toLowerCase()
    @IS_IOS = uagent.match(/(iPhone|iPod|iPad)/i)?


methods =

  initialize: (settings) ->
    throw "You must pass settings" unless settings?
    @heroUnit = new HeroUnit($(@), settings)
    @

  destroy: ->
    $(window).off '.herounit'
    @heroUnit.destroy()

  centerImage: -> @heroUnit.centerImage()

  onLoad: -> @heroUnit.onLoad()


$.fn.herounit = (method) ->
  if methods[method]?
    methods[method].apply @, Array::slice.call(arguments, 1)
  else if typeof method is "object" or not method?
    methods.initialize.apply @, arguments
  else
    $.error "Method #{method} does not exist on jQuery.herounit"
