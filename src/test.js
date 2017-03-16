(function(){

  /** SUPPORT ----------------------------------------------------------------------------------------------------------
   *
   */

  var Function_prototype = Function.prototype;
  var _call = Function_prototype.call;
  var _apply = Function_prototype.apply;
  var _bind = Function_prototype.bind;
  var func = _call.bind(_bind, _call);
  var bind = func(_bind);
  var call = func(_call);
  var apply = func(_apply);
  function partial(func, vars) {
    return function() {
      var args = arguments;
      for(var i=0; i<vars.length; i++) {
        if(i in vars) {
          splice(args, i, 0, vars[i]);
        }
      }
      return func.apply(this, args);
    }
  }
  function isFunction(any) {
    return typeof any === 'function';
  }

  var Object_prototype = Object.prototype;
  var create = Object.create;
  function isObject(any) {
    return Object(any) === any;    // typeof any === 'object' && any !== nil;
  }
  var defineProperty = Object.defineProperty;
  var defineProperties = Object.defineProperties;
  var isPrototypeOf = func(Object_prototype.isPrototypeOf);

  var String_prototype = String.prototype;
  function isString(any) {
    return typeof any === 'string';
  }
  var indexOf = func(String_prototype.indexOf);
  var replace = func(String_prototype.replace);
  var Array_prototype = Array.prototype;
  var isArray = Array.isArray;
  var seek = func(Array_prototype.indexOf);
  var join = func(Array_prototype.join);
  var unite = func(Array_prototype.concat);
  var piece = func(Array_prototype.slice);
  var splice = func(Array_prototype.splice);
  var push = func(Array_prototype.push);
  var pop = func(Array_prototype.pop);
  function peak(ary) {
    return ary[ary.length - 1];
  }


  /** TESTING ----------------------------------------------------------------------------------------------------------
   *
   */

  var levl = 0;
  var spaces = '                                                                                                      ';

  var ops = {
    ok: ['not ok', 'ok'],
    equal: ['not equal to', 'equal to', 1],
    equiv: ['not equivalent to', 'equivalent to', 1],
    same: ['not be same as', 'be same as', 1]
  };
  var states = ['%c✖ ', '%c✓ '];
  var styles = ['color:tomato', 'color:lime'];

  function test(text, func) {
    if(isFunction(func)) {
      log(text);
      levl++;
      try {
        func(test);
      }
      catch(e){
        log(e.message);
      }
      finally {
        levl--;
      }
    }
    else {
      var me = create(proto);
      me.topic = text;
      return me;
    }
  }

  var proto = test.prototype;

  test.should = should;

  proto.should = should;
  proto.expect = should;
  defineProperties(proto, {
    be: {get: be},
    not: {get: not}
  });
  proto.ok = ok;
  proto.equal = equal;
  proto.equiv = equiv;
  proto.same = same;

  function should(actual){
    var me = isPrototypeOf(proto, this) ? this : create(proto);
    me.actual = actual;
    return me;
  }

  function be() {
    return this;
  }

  function not(){
    var me = this;
    me._not = !me._not;
    return me;
  }

  function ok () {
    var me = this;
    me.op = 'ok';
    me.assert = me.actual;
    report(me);
  }

  function equal(value) {
    var me = this;
    me.op = 'equal';
    me.value = value;
    me.assert = me.actual == value;
    report(me);
  }

  function equiv(value) {
    var me = this;
    me.op = 'equiv';
    me.value = value;
    me.assert = _equiv(me.actual, value);
    report(me);
  }

  function same(value) {
    var me = this;
    me.op = 'same';
    me.value = value;
    me.assert = me.actual === value;
    report(me);
  }

  function _equiv(a, b) {
    if(isObject(a) && isObject(b)) {
      var akeys = [], ai=0, bkeys = [], bi = 0;
      for(akeys[ai++] in a);
      for(bkeys[bi++] in b);
      if(ai !== bi)
        return false;
      for(var i=0; i<ai; i++) {
        var key = akeys[i];
        if(seek(bkeys, key)<0)
          return false;
        if(!_equiv(a[key], b[key]))
          return false;
      }
      return true;
    }
    else {
      return a!==a && b!==b || a == b;
    }
  }

  function report(me) {
    var topic = me.topic;
    var assert = !!me.assert ^ !!me._not;
    var op = ops[me.op];
    var style = styles[assert], tail = '';
    var text;
    if(assert) {
      if(topic) {
        text = topic;
      }
      else {
        text = topic || 'expected ' + json(me.actual) + ' ' + op[assert];
        if(op[2]) {
          text += ' ' + json(me.value);
        }
      }
      text += '%c';
    }
    else {
      text = (topic ? topic + '\n  %c' : '') + 'expected ' + json(me.actual) + ' ' + op[!me._not&1];
      if(op[2]) {
        text += ' ' + json(me.value);
      }
      if(topic)
        tail = 'color:gray';
    }
    text = states[assert] + text;
    log(text, style, tail);
  }

  function log() {
    var args = arguments;
    args[0] = ident(args[0], spaces.slice(0, levl*2));
    apply(console.log, console, args);
  }

  window.test = test;

  var ident = partial(replace, [,/^/gm]);

  function json(any) {
    return JSON.stringify(any);
  }
})();
