(function() {

  describe("$.fn.heroUnit", function() {
    it("should be chainable", function() {
      var item;
      item = $el.heroUnit({
        height: 500,
        $img: $el.find('img')
      });
      return $el.should === item;
    });
    it("should require settings to be passed in", function() {
      return expect(function() {
        return $el.heroUnit();
      }).toThrow(new Error("You must pass settings"));
    });
    it("should require being called on an element", function() {
      return expect(function() {
        return $.fn.heroUnit({
          height: 500,
          $img: $el.find('img')
        });
      }).toThrow(new Error("Herounit must be called on an element"));
    });
    return it("sould raise error on invalid method", function() {
      $el.heroUnit({
        height: 500,
        $img: $el.find('img')
      });
      return expect(function() {
        return $el.heroUnit('invalid');
      }).toThrow(new Error("Method 'invalid' does not exist on jQuery.heroUnit"));
    });
  });

}).call(this);
