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
    @detectPhone()
    @$img.load (=> @render() )
    @onLoad()
    @$el.height @settings.height

  render: ->
    @neutralizeImageSize()
    @setImageAttrs()
    @centerImage()
    if @settings.afterImageLoadcont then @settings.afterImageLoadcont() else @$img.show()

  neutralizeImageSize: ->
    @$img.css
      height: 'auto'
      width: 'auto'

  # background image must be sized auto
  # sizes image
  setImageAttrs: ->
    @naturalImageHeight = @$img.height()
    @naturalImageWidth = @$img.width()
    @imageRatio = @naturalImageWidth / @naturalImageHeight
    @minWidth = Math.floor(@settings.height * @imageRatio)
    @height = @settings.height or @$el.height()
    @width = @$el.width()

  # vertically centers image
  centerImage: ->
    if @IS_PHONE
      @$img.width 'auto'
    else
      if @width < @minWidth
        left = - Math.floor((@minWidth - @width) /2)
        @$img.width @minWidth
      else
        left = 0
        @$img.width @width

    if @height >= @$img.height()
      top = 0
    else 
      top = - Math.abs(Math.floor((@height - @$img.height()) /2))

    @$img.css
      'margin-top' : "#{top}px"
      'margin-left': "#{left}px"

  onLoad: ->
    unless @IS_PHONE
      $(window).on 'resize.herounit', @debounce =>
        @render()
      , 100
    @render()

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

  # do not bind resize events for 2 reasons
  # - iOS resize event fires when document height or width change (such as when items are added to the dom)
  # - phones don't exactly 'resize' like browsers do (todo: bind on rotate)
  detectPhone: ->
    @uagent = navigator.userAgent.toLowerCase()
    @IS_PHONE =
      @uagent.search('iphone') > -1 or
      @uagent.search('ipod') > -1 or
      (@uagent.search('android') > -1 and @uagent.search('mobile') > -1)


methods =

  initialize: (settings) ->
    throw "You must pass settings" unless settings?
    @heroUnit = new HeroUnit($(@), settings)
    @

  destroy: ->
    $(window).off '.herounit'
    @heroUnit.destroy()

  centerImage: -> @heroUnit.centerImage()
  render: -> @heroUnit.render()
  onLoad: -> @heroUnit.onLoad()


$.fn.herounit = (method) ->
  if methods[method]?
    methods[method].apply @, Array::slice.call(arguments, 1)
  else if typeof method is "object" or not method?
    methods.initialize.apply @, arguments
  else
    $.error "Method #{method} does not exist on jQuery.herounit"
