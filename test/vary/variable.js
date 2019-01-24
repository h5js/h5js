it('Vary of variables:', function* (it){
  it.begin
  var origin, follow;

  function get() { return origin }

  function set(value) { follow = value }

  attachVary(get, set);
  it.end

  it.should(follow).be.same(origin);

  it.begin
  origin = 123;
  yield it(0);
  it.end

  it.should(follow).be.same(origin);

  it.begin
  detachVary(get, set);
  origin = 456;
  yield it(0);
  it.end

  it.should(follow).not.be.same(origin);

  it.sum();
});