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
      this.detectPhone();
      this.$img.load((function() {
        return _this.render();
      }));
      this.onLoad();
      this.$el.height(this.settings.height);
    }

    HeroUnit.prototype.render = function() {
      this.neutralizeImageSize();
      this.setImageAttrs();
      this.centerImage();
      if (this.settings.afterImageLoadcont) {
        return this.settings.afterImageLoadcont();
      } else {
        return this.$img.show();
      }
    };

    HeroUnit.prototype.neutralizeImageSize = function() {
      return this.$img.css({
        height: 'auto',
        width: 'auto'
      });
    };

    HeroUnit.prototype.setImageAttrs = function() {
      this.naturalImageHeight = this.$img.height();
      this.naturalImageWidth = this.$img.width();
      this.imageRatio = this.naturalImageWidth / this.naturalImageHeight;
      this.minWidth = Math.floor(this.settings.height * this.imageRatio);
      this.height = this.settings.height || this.$el.height();
      return this.width = this.$el.width();
    };

    HeroUnit.prototype.centerImage = function() {
      var left, top;
      if (this.IS_PHONE) {
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
      if (this.height >= this.$img.height()) {
        top = 0;
      } else {
        top = -Math.abs(Math.floor((this.height - this.$img.height()) / 2));
      }
      return this.$img.css({
        'margin-top': "" + top + "px",
        'margin-left': "" + left + "px"
      });
    };

    HeroUnit.prototype.onLoad = function() {
      var _this = this;
      if (!this.IS_PHONE) {
        $(window).on('resize.herounit', this.debounce(function() {
          return _this.render();
        }, 100));
      }
      return this.render();
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

    HeroUnit.prototype.detectPhone = function() {
      this.uagent = navigator.userAgent.toLowerCase();
      return this.IS_PHONE = this.uagent.search('iphone') > -1 || this.uagent.search('ipod') > -1 || (this.uagent.search('android') > -1 && this.uagent.search('mobile') > -1);
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
    render: function() {
      return this.heroUnit.render();
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
