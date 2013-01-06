/*! jQuery.herounit - v0.1.0 - 2013-01-06
* https://github.com/zamiang/jquery.herounit
* Copyright (c) 2013 Brennan Moore; Licensed MIT */

(function() {
  var methods;

  methods = {
    initialize: function(settings) {
      if (settings == null) {
        throw "You must pass settings";
      }
      this.feed = new Feed($(this), settings);
      return this;
    },
    destroy: function() {
      $(window).unbind('resize.herounit');
      return this.feed.destroy();
    },
    recompute: function() {
      var column, feedItem, _i, _len, _ref, _results;
      _ref = this.feed.feedItems;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        feedItem = _ref[_i];
        feedItem.setDimensions();
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = feedItem.columns;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            column = _ref1[_j];
            _results1.push(colum.setDimensions(feedItem.height));
          }
          return _results1;
        })());
      }
      return _results;
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
