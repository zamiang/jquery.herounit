describe "$.fn.herounit", ->

  it "should be chainable", ->
    item = $el.herounit
      feedItems      : $el.children(),
      columnSelector : '.',
      margin         : 10
    $el.should == item

  it "should require settings to be passed in", ->
    expect( -> $el.herounit()).toThrow new Error("You must pass settings")

  it "should require being called on an element", ->
    expect( -> $.fn.herounit(
      feedItems      : $el.children(),
      columnSelector : '.',
      margin         : 10
    )).toThrow new Error("Herounit must be called on an element")

  it "sould raise error on invalid method", ->
    expect( -> $el.herounit('invalid')).toThrow new Error("Method invalid does not exist on jQuery.herounit")
