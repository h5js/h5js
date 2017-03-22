(function () {

  /** SUPPORT ----------------------------------------------------------------------------------------------------------
   *
   */

  var nop = Function.prototype;
  var _call = nop.call;
  var _apply = nop.apply;
  var _bind = nop.bind;
  var func = _call.bind(_bind, _call);
  var bind = func(_bind);
  var call = func(_call);
  var apply = func(_apply);

  function partial(func, vars) {
    return function () {
      var args = arguments;
      for (var i = 0; i < vars.length; i++) {
        if (i in vars) {
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

  var isInteger = Number.isInteger;

  var getPrototype = Object.getPrototypeOf;
  var setPrototype = Object.setPrototypeOf;
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

  var RegExp_prototype = RegExp.prototype;
  var _test = RegExp_prototype.test;


  /** TESTING ----------------------------------------------------------------------------------------------------------
   *
   */

  function main() {
    go(it);
  }

  async function go(it) {
    var me = getPrototype(it);
    for(var i=0; i<me.length; i++) {
      var func = me[i];
      if(func.title) {
        me.log(func.title);
      }
      var it = It(me.ident + '  ');
      await func(it);
      await go(it);
    }
  }

  function It(ident) {
    var me = create(itProto);
    me.ident = ident;
    function it() {
      var args = arguments, arg, func;
      if(args.length) {
        arg = args[0];
        if (isString(arg)) {
          if (isFunction(func = args[1])) {
            func.title = arg;
            push(me, func);
          }
          else {
            me.title = arg;
          }
        }
        else if (isFunction(arg)) {
          push(me, arg);
        }
        else if (isInteger(arg)){
          return delay(arg);
        }
      }
      else {
        return tick();
      }
      return me;
    }
    setPrototype(it, me);
    return it;
  }

  /** it methods: --------------------------------------------------------------------------------------- */
  var itProto = {
    log: log,
    delay: delay,
    wait: wait,
    second: wait,
    seconds: wait,
    should: actual,
  };

  function actual(actual) {
    var me = create(proto);
    me.title = this.title;
    me.ident = this.ident;
    me.actual = actual;
    return me;
  }

  function delay(ms) {
    return new Promise(partial(setTimeout,[,ms]));
  }

  function wait(s) {
    return delay(s*1000);
  }

  var tick = bind(Promise.resolve, Promise);

  /** assert methods: --------------------------------------------------------------------------------------- */
  var proto = {
    log: log,

    get be() {
      return this;
    },

    get not() {
      var me = this;
      me._not = !me._not;
      return me;
    },

    get ok() {
      var me = this;
      me.op = 'ok';
      me.assert = me.actual;
      report(me);
      return nop;
    },

    equal: function (value) {
      var me = this;
      me.op = 'equal';
      me.value = value;
      me.assert = me.actual == value;
      report(me);
    },

    equiv: function (value) {
      var me = this;
      me.op = 'equiv';
      me.value = value;
      me.assert = _equiv(me.actual, value);
      report(me);
    },

    same: function (value) {
      var me = this;
      me.op = 'same';
      me.value = value;
      me.assert = me.actual === value;
      report(me);
    }
  };


  var ops = {
    ok: ['not ok', 'ok'],
    equal: ['not equal to', 'equal to', 1],
    equiv: ['not equivalent to', 'equivalent to', 1],
    same: ['not be same as', 'be same as', 1]
  };
  var tips = ['%c✖ ', '%c✓ '];
  var styles = ['color:tomato', 'color:lime'];

  function report(me) {
    var title = me.title;
    var assert = !!me.assert ^ !!me._not;
    var op = ops[me.op];
    var style = styles[assert], tail = '';
    var text;
    if (assert) {
      if (title) {
        text = title;
      }
      else {
        text = title || 'expected ' + toJson(me.actual) + ' ' + op[assert];
        if (op[2]) {
          text += ' ' + toJson(me.value);
        }
      }
      text += '%c';
    }
    else {
      text = (title ? title + '\n  %c' : '') + 'expected ' + toJson(me.actual) + ' ' + op[!me._not & 1];
      if (op[2]) {
        text += ' ' + toJson(me.value);
      }
      if (title)
        tail = 'color:gray';
    }
    text = tips[assert] + text;
    me.log(text, style, tail);
  }

  var ident = partial(replace, [, /^/gm]);

  function log() {
    var args = arguments;
    args[0] = ident(args[0], this.ident);
    apply(console.log, console, args);
  }

  var isIdx = bind(_test, /^\d+$/);
  var isIdentifier = bind(_test, /^[A-Za-z_$][\w$]*$/);

  function toJson(any) {
    var json, i, key;
    if (isFunction(any)) {
      json = any.toString();
    }
    else if (isArray(any)) {
      json = [];
      i = 0;
      for (key in any) {
        if (isIdx(key)) {
          json[i++] = toJson(any[key]);
        }
        else if (isIdentifier(key)) {
          json[i++] = key + ':' + toJson(any[key]);
        }
        else {
          json[i++] = JSON.stringify(key) + ":" + toJson(any[key]);
        }
      }
      json = '[' + join(json) + ']';
    }
    else if (isObject(any)) {
      json = [];
      i = 0;
      for (key in any) {
        if (isIdentifier(key)) {
          json[i++] = key + ':' + toJson(any[key]);
        }
        else {
          json[i++] = JSON.stringify(key) + ":" + toJson(any[key]);
        }
      }
      json = '{' + join(json) + '}';
    }
    else {
      json = JSON.stringify(any);
    }
    return json;
  }

  window.it = It('');
  document.addEventListener('DOMContentLoaded', main);

})();
