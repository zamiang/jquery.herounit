describe "$.fn.herounit", ->

  it "should be chainable", ->
    item = $el.herounit
      height : 500
      $img   : $el.find('img')
    $el.should == item

  it "should require settings to be passed in", ->
    expect( -> $el.herounit()).toThrow new Error("You must pass settings")

  it "should require being called on an element", ->
    expect( -> $.fn.herounit(
      height : 500
      $img   : $el.find('img')
    )).toThrow new Error("Herounit must be called on an element")

  it "sould raise error on invalid method", ->
    expect( -> $el.herounit('invalid')).toThrow new Error("Method invalid does not exist on jQuery.herounit")