describe "$.fn.heroUnit", ->

  it "should be chainable", ->
    item = $el.heroUnit
      height : 500
      $img   : $el.find('img')
    $el.should == item

  it "should require settings to be passed in", ->
    expect( -> $el.heroUnit()).toThrow new Error("You must pass settings")

  it "should require being called on an element", ->
    expect( -> $.fn.heroUnit(
      height : 500
      $img   : $el.find('img')
    )).toThrow new Error("Herounit must be called on an element")

  it "sould raise error on invalid method", ->
    $el.heroUnit
      height : 500
      $img   : $el.find('img')
    expect( -> $el.heroUnit('invalid')).toThrow new Error("Method 'invalid' does not exist on jQuery.heroUnit")
