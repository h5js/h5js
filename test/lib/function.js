it('Function:', function(it){
  it('func()', function(it){
    function method(world) {
      return this + ' ' + world;
    }
    var fn = func(method);
    it.should(fn('hello', 'world')).equal('hello world');
  });

  it('bind()', function(it){
    function say(hello, world) {
      return this + ': ' + hello + ' ' + world;
    }
    var leadzen = bind(say, 'leadzen', 'hello');
    it.should(leadzen('world')).equal('leadzen: hello world');
  });

  it('call()', function(it){
    function say(hello, world) {
      return this + ': ' + hello + ' ' + world;
    }
    it.should(call(say, 'leadzen', 'hello', 'world')).equal('leadzen: hello world');
  });

  it('apply()', function(it){
    function say(hello, world) {
      return this + ': ' + hello + ' ' + world;
    }
    it.should(apply(say, 'leadzen', ['hello', 'world'])).equal('leadzen: hello world');
  });

  it('isFunction()', function(it){
    function normalFunc(){}
    function* genFunc(){}
    // async function asyncFunc(){}

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

  it('end.');
});