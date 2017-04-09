it('Function:', function(it){
  it('func()', function(it){
    it.begin
    function method(world) {
      return this + ' ' + world;
    }
    var fn = func(method);
    it.end
    it.should(fn('hello', 'world')).equal('hello world');
  });

  it('bind()', function(it){
    it.begin
    function say(hello, world) {
      return this + ': ' + hello + ' ' + world;
    }
    var leadzen = bind(say, 'leadzen', 'hello');
    it.end
    it.should(leadzen('world')).equal('leadzen: hello world');
  });

  it('call()', function(it){
    it.begin
    function say(hello, world) {
      return this + ': ' + hello + ' ' + world;
    }
    it.end
    it.should(call(say, 'leadzen', 'hello', 'world')).equal('leadzen: hello world');
  });

  it('apply()', function(it){
    it.begin
    function say(hello, world) {
      return this + ': ' + hello + ' ' + world;
    }
    it.end
    it.should(apply(say, 'leadzen', ['hello', 'world'])).equal('leadzen: hello world');
  });

  it('isFunction()', function(it){
    it.begin
    function normalFunc(){}
    function* genFunc(){}
    // async function asyncFunc(){}
    it.end

    it.should(isFunction(normalFunc)).be.ok();
    it.should(isFunction(genFunc)).be.ok();
    // it.should(isFunction(asyncFunc)).be.ok();
    it.should(isFunction(x=>{})).be.ok();
    it.should(isFunction()).not.be.ok();
    it.should(isFunction(null)).not.be.ok();
    it.should(isFunction(true)).not.be.ok();
    it.should(isFunction(123)).not.be.ok();
    it.should(isFunction('abc')).not.be.ok();
    it.should(isFunction(Symbol())).not.be.ok();
    it.should(isFunction({})).not.be.ok();

  });

  it.sum();
});