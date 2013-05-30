# jquery.herounit
# https://github.com/zamiang/jquery.herounit
#
# Copyright (c) 2013 Brennan Moore, Artsy
# Licensed under the MIT license.

(($, window, document) ->

  pluginName = "heroUnit"

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
      @$img.show()
      @settings.afterImageLoadcont?()

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
        $(window).on "resize.#{pluginName}", @debounce =>
          @render()
        , 100

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

    destroy: ->
      $(window).off ".#{pluginName}"
      @$img.fadeOut()
      $.removeData @$el, "plugin_#{pluginName}"

  $.fn[pluginName] = (options) ->
    if !$.data(@, "plugin_#{pluginName}")
      throw "You must pass settings" unless options?
      $.data(@, "plugin_#{pluginName}", new HeroUnit(@, options))
    else if $.data(@, "plugin_#{pluginName}")[options]?
      $.data(@, "plugin_#{pluginName}")[options] Array::slice.call(arguments, 1)[0], Array::slice.call(arguments, 1)[1]
    else
      throw "Method '#{options}' does not exist on jQuery.#{pluginName}"

)(jQuery, window, document)
