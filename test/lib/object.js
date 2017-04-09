it('Object:', function(it){
  it('isObject()', function(it){
    it.should(isObject({})).be.ok();
    it.should(isObject(function(){})).be.ok();
    it.should(isObject(Object.create(null))).be.ok();
    it.should(isObject([])).be.ok();
    it.should(isObject(/ /)).be.ok();

    it.should(isObject()).not.be.ok();
    it.should(isObject(null)).not.be.ok();
    it.should(isObject(true)).not.be.ok();
    it.should(isObject(123)).not.be.ok();
    it.should(isObject('abc')).not.be.ok();
    it.should(isObject(Symbol())).not.be.ok();
    
  });

  it('isObjective()', function(it){
    it.should(isObjective({})).be.ok();
    it.should(isObjective(Object.create(null))).be.ok();
    it.should(isObjective([])).be.ok();
    it.should(isObjective(/ /)).be.ok();

    it.should(isObjective()).not.be.ok();
    it.should(isObjective(null)).not.be.ok();
    it.should(isObjective(true)).not.be.ok();
    it.should(isObjective(123)).not.be.ok();
    it.should(isObjective('abc')).not.be.ok();
    it.should(isObjective(Symbol())).not.be.ok();
    it.should(isObjective(function(){})).not.be.ok();

  });

  it.sum();
});