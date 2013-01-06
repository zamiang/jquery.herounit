/*! jQuery.herounit - v0.1.0 - 2013-01-06
* https://github.com/zamiang/jquery.herounit
* Copyright (c) 2013 Brennan Moore; Licensed MIT */

(function() {
  var HeroUnit, methods,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  HeroUnit = (function() {

    HeroUnit.prototype.requires = ['minHeight', '$img', '$coverArt'];

    HeroUnit.prototype.optional = ['fixedHeight', 'afterImageLoadcont'];

    function HeroUnit($el, settings) {
      this.onLoad = __bind(this.onLoad, this);

      this.centerImage = __bind(this.centerImage, this);

      this.setWidthHeight = __bind(this.setWidthHeight, this);

      this.getImageSize = __bind(this.getImageSize, this);

      var require, _i, _len, _ref;
      _ref = this.requires;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        require = _ref[_i];
        if (settings[require] == null) {
          throw "You must pass " + require;
        }
      }
      if (!($el.length > 0)) {
        throw "Herounit must be called on an element";
      }
      this.$window = $(window);
      this.settings = settings;
      this.$img = this.settings.$img;
      this.$coverArt = this.settings.$coverArt;
      this.fixedHeight = this.settings.fixedHeight;
      this.onLoad();
      if (this.fixedHeight) {
        this.$el.height(this.fixedHeight);
      }
    }

    HeroUnit.prototype.getImageSize = function() {
      this.$img.css({
        width: 'auto'
      });
      this.naturalImageHeight = this.$img.height();
      this.naturalImageWidth = this.$img.width();
      this.imageRatio = this.naturalImageWidth / this.naturalImageHeight;
      return this.minWidth = (this.fixedHeight || this.minHeight) * this.imageRatio;
    };

    HeroUnit.prototype.setWidthHeight = function() {
      this.height = this.fixedHeight || this.$el.height();
      return this.width = this.$el.width();
    };

    HeroUnit.prototype.centerImage = function() {
      var left, top;
      this.imageHeight = this.$img.height();
      if (IS_IPHONE) {
        this.$img.width('auto');
      } else {
        if (this.width < this.minWidth) {
          left = -Math.floor((this.minWidth - this.width) / 2);
          this.$img.width(this.minWidth);
        } else {
          left = 0;
          this.$img.width(this.width);
        }
      }
      if ((this.fixedHeight || this.height) > this.imageHeight) {
        top = 0;
      } else {
        top = -Math.floor((this.imageHeight - this.height) / 2);
      }
      this.coverTop = top;
      return this.$img.css({
        'margin-top': "" + top + "px",
        'margin-left': "" + left + "px"
      });
    };

    HeroUnit.prototype.onLoad = function() {
      var _this = this;
      if (!this.IS_IOS) {
        return this.$window.on('resize.coverArt', this.debounce(function() {
          _this.setWidthHeight();
          return _this.centerImage();
        }, 50));
      }
    };

    HeroUnit.prototype.onUnload = function() {
      return this.$window.off('.coverArt');
    };

    HeroUnit.prototype.debounce = function(func, wait) {
      var timeout;
      timeout = 0;
      return function() {
        var args, throttler,
          _this = this;
        args = arguments;
        throttler = function() {
          timeout = null;
          return func(args);
        };
        clearTimeout(timeout);
        return timeout = setTimeout(throttler, wait);
      };
    };

    HeroUnit.prototype.detectiOS = function() {
      var uagent;
      uagent = navigator.userAgent.toLowerCase();
      return this.IS_IOS = uagent.match(/(iPhone|iPod|iPad)/i) != null;
    };

    return HeroUnit;

  })();

  methods = {
    initialize: function(settings) {
      if (settings == null) {
        throw "You must pass settings";
      }
      this.heroUnit = new HeroUnit($(this), settings);
      return this;
    },
    destroy: function() {
      $(window).unbind('resize.herounit');
      return this.heroUnit.destroy();
    }
  };

  $.fn.herounit = function(method) {
    if (methods[method] != null) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !(method != null)) {
      return methods.initialize.apply(this, arguments);
    } else {
      return $.error("Method " + method + " does not exist on jQuery.herounit");
    }
  };

}).call(this);
