(function() {

  describe("$.fn.herounit", function() {
    it("should be chainable", function() {
      var item;
      item = $el.herounit({
        feedItems: $el.children(),
        columnSelector: '.',
        margin: 10
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
          feedItems: $el.children(),
          columnSelector: '.',
          margin: 10
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
