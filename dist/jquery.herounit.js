/*! jQuery.herounit - v0.1.0 - 2013-05-30
* https://github.com/zamiang/jquery.herounit
* Copyright (c) 2013 Brennan Moore; Licensed MIT */

(function() {

  (function($, window, document) {
    var HeroUnit, pluginName;
    pluginName = "heroUnit";
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
        var _base;
        this.neutralizeImageSize();
        this.setImageAttrs();
        this.centerImage();
        this.$img.show();
        return typeof (_base = this.settings).afterImageLoadcont === "function" ? _base.afterImageLoadcont() : void 0;
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
          return $(window).on("resize." + pluginName, this.debounce(function() {
            return _this.render();
          }, 100));
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

      HeroUnit.prototype.detectPhone = function() {
        this.uagent = navigator.userAgent.toLowerCase();
        return this.IS_PHONE = this.uagent.search('iphone') > -1 || this.uagent.search('ipod') > -1 || (this.uagent.search('android') > -1 && this.uagent.search('mobile') > -1);
      };

      HeroUnit.prototype.destroy = function() {
        $(window).off("." + pluginName);
        this.$img.fadeOut();
        return $.removeData(this.$el, "plugin_" + pluginName);
      };

      return HeroUnit;

    })();
    return $.fn[pluginName] = function(options) {
      if (!$.data(this, "plugin_" + pluginName)) {
        if (options == null) {
          throw "You must pass settings";
        }
        return $.data(this, "plugin_" + pluginName, new HeroUnit(this, options));
      } else if ($.data(this, "plugin_" + pluginName)[options] != null) {
        return $.data(this, "plugin_" + pluginName)[options](Array.prototype.slice.call(arguments, 1)[0], Array.prototype.slice.call(arguments, 1)[1]);
      } else {
        throw "Method '" + options + "' does not exist on jQuery." + pluginName;
      }
    };
  })(jQuery, window, document);

}).call(this);
