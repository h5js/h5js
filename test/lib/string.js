it('String:', function(it){
  it('isString(any)', function(it){
    it.should(isString('')).ok();
    it.should(isString('hello world')).ok();
    it.should(isString(String())).ok();
    it.should(isString(String(123))).ok();

    it.should(isString()).not.ok();
    it.should(isString(null)).not.ok();
    it.should(isString(true)).not.ok();
    it.should(isString(false)).not.ok();
    it.should(isString(0)).not.ok();
    it.should(isString(123)).not.ok();
    it.should(isString(Symbol())).not.ok();
    it.should(isString(new String())).not.ok();
    it.should(isString(new String('hello world'))).not.ok();

  });

  it('indexOf(str, substr)', function(it){
    it.should(indexOf, undefined, '', '').throw();
    it.should(indexOf, null, '', '').throw();
  });

  it('replace(str, regexp/substr, newstr/function)', function(it){
    it.should(replace, undefined, '', '').throw();
    it.should(replace, null, '', '').throw();
  });

  it('end.');
});