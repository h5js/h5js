it('Error:', function(it){
  it('Error()', function(it) {
    it.should(Error()).be.Error();
    it.should(Error('oops').message).equal('oops');
    it.should(Error('%s oops', 'Wow').message).equal('Wow oops');
    it.should(Error('%s oops%s', 'Wow', '!').message).equal('Wow oops!');
    it.should(Error('%s %d oops%s', 'Wow', 404, '!').message).equal('Wow 404 oops!');
  });

  it('end.');
});