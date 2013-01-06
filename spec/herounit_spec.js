(function() {

  describe("$.fn.herounit", function() {
    it("should be chainable", function() {
      var item;
      item = $el.herounit({
        minHeight: 500,
        $img: $el.find('img'),
        $coverArt: $el.find('.coverArt')
      });
      return $el.should === item;
    });
    it("should require settings to be passed in", function() {
      return expect(function() {
        return $el.herounit();
      }).toThrow(new Error("You must pass settings"));
    });
    it("should require being called on an element", function() {
      return expect(function() {
        return $.fn.herounit({
          minHeight: 500,
          $img: $el.find('img'),
          $coverArt: $el.find('.coverArt')
        });
      }).toThrow(new Error("Herounit must be called on an element"));
    });
    return it("sould raise error on invalid method", function() {
      return expect(function() {
        return $el.herounit('invalid');
      }).toThrow(new Error("Method invalid does not exist on jQuery.herounit"));
    });
  });

}).call(this);
