it('Encoding:', function(it){
  it('base64(str)', function(it){
    it.should(base64('')).equal('');
    it.should(base64('A')).equal('QQ==');
    it.should(base64('AB')).equal('QUI=');
    it.should(base64('ABC')).equal('QUJD');
    it.should(base64('凌')).equal('5YeM');
    it.should(base64('凌琴')).equal('5YeM55C0');
    it.should(base64('✔ her name is 凌琴.')).equal('4pyUIGhlciBuYW1lIGlzIOWHjOeQtC4=');
  });

  it('vlq64(int, ...)', function(it){
    it.should(vlq64(0)).equal('A');
    it.should(vlq64(1)).equal('C');
    it.should(vlq64(12)).equal('Y');
    it.should(vlq64(123)).equal('2H');
    it.should(vlq64(1234)).equal('ktC');
    it.should(vlq64(12345)).equal('yjY');
    it.should(vlq64(123456)).equal('gkxH');
    it.should(vlq64(1234567)).equal('uorrC');
    it.should(vlq64(12345678)).equal('80wxX');
    it.should(vlq64(123456789)).equal('qxmvrH');
    it.should(vlq64(0,0,0)).equal('AAA');
    it.should(vlq64(1,12,123,1234,12345,123456,1234567,12345678,123456789)).equal('CY2HktCyjYgkxHuorrC80wxXqxmvrH');
  });

  it('.end');
});