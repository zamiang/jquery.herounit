(function() {
  var HeroUnit, methods;

  HeroUnit = (function() {

    HeroUnit.prototype.requires = ['height', '$img'];

    HeroUnit.prototype.optional = ['afterImageLoadcont'];

    function HeroUnit($el, settings) {
      var require, _i, _len, _ref,
        _this = this;
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
      this.$el = $el;
      this.settings = settings;
      this.$img = this.settings.$img;
      this.$img.load((function() {
        return _this.onImageLoad();
      }));
      this.onLoad();
      this.$el.height(this.settings.height);
    }

    HeroUnit.prototype.getImageSize = function() {
      this.$img.css({
        width: 'auto'
      });
      this.naturalImageHeight = this.$img.height();
      this.naturalImageWidth = this.$img.width();
      this.imageRatio = this.naturalImageWidth / this.naturalImageHeight;
      return this.minWidth = Math.floor(this.settings.height * this.imageRatio);
    };

    HeroUnit.prototype.setWidthHeight = function() {
      this.height = this.settings.height || this.$el.height();
      return this.width = this.$el.width();
    };

    HeroUnit.prototype.centerImage = function() {
      var left, top;
      this.imageHeight = this.$img.height();
      if (window.IS_IPHONE) {
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
      if ((this.settings.height || this.height) > this.imageHeight) {
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

    HeroUnit.prototype.onImageLoad = function() {
      this.getImageSize();
      this.setWidthHeight();
      this.centerImage();
      this.centerImage();
      if (this.settings.afterImageLoadcont) {
        return this.settings.afterImageLoadcont();
      } else {
        return this.$img.show();
      }
    };

    HeroUnit.prototype.onLoad = function() {
      var _this = this;
      if (!this.IS_IOS) {
        return $(window).on('resize.herounit', this.debounce(function() {
          _this.setWidthHeight();
          return _this.centerImage();
        }, 50));
      }
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
      $(window).off('.herounit');
      return this.heroUnit.destroy();
    },
    centerImage: function() {
      return this.heroUnit.centerImage();
    },
    onLoad: function() {
      return this.heroUnit.onLoad();
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
