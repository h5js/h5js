it('Array:', function(it){
  it('isArray(any)', function(it){
    it.should(isArray([])).ok();
    it.should(isArray(Array())).ok();
    it.should(isArray(''.split())).ok();

    it.should(isArray()).not.ok();
    it.should(isArray(null)).not.ok();
    it.should(isArray(true)).not.ok();
    it.should(isArray(false)).not.ok();
    it.should(isArray(0)).not.ok();
    it.should(isArray(123)).not.ok();
    it.should(isArray(Symbol())).not.ok();
    it.should(isArray({})).not.ok();
    it.should(isArray(arguments)).not.ok();
  });

  it('seek(ary, item)', function(it){
    it.should(seek, undefined, 0).throw();
    it.should(seek, null, 0).throw();
  });

  it('join(ary, separator)', function(it){
    it.should(join, undefined, '').throw();
    it.should(join, null, '').throw();
  });

  it('unite(ary, ...)', function(it){
    it.should(unite, undefined, []).throw();
    it.should(unite, null, []).throw();
  });

  it('piece(ary, begin, end)', function(it){
    it.should(piece, undefined, 1, 2).throw();
    it.should(piece, null, 1, 2).throw();
  });

  it('splice(ary, idx, len)', function(it){
    it.should(splice, undefined, 1, 2).throw();
    it.should(splice, null, 1, 2).throw();
  });

  it('push(ary, item, ...)', function(it){
    it.should(push, undefined, 0).throw();
    it.should(push, null, 0).throw();
  });

  it('pop(ary)', function(it){
    it.should(pop, undefined).throw();
    it.should(pop, null).throw();
  });

  it('peak(ary)', function(it){
    it.should(peak([])).be.undefined();
    it.should(peak([0,1,2,3])).equal(3);
    it.should(peak, undefined).throw();
    it.should(peak, null).throw();
  });

  it('reverse(ary)', function(it){
    it.should(reverse, undefined).throw();
    it.should(reverse, null).throw();
  });

  it('forEach(ary, func)', function(it){
    it.should(forEach, undefined, String).throw();
    it.should(forEach, null, String).throw();
  });

  it('map(ary, func)', function(it){
    it.should(map, undefined, String).throw();
    it.should(map, null, String).throw();
  });

  it('reduce(ary, func, [initialValue])', function(it){
    it.should(reduce, undefined).throw();
    it.should(reduce, null).throw();
  });

  it('end.');
});