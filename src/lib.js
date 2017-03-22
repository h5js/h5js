/** lib.js -------------------------------------------------------------------------------------------------------------
 *
 */

/** Constants: -------------------------------------------------------------- */
var undefined;
var nil = null;

/** Functions：--------------------------------------------------------------- */
var Function_prototype = Function.prototype;
var _call = Function_prototype.call;
var _apply = Function_prototype.apply;
var _bind = Function_prototype.bind;

/**
 * func(method)
 *    将方法转换为函数。若fn = func(method), 则 fn(obj, ...) 等价于 obj.method(...)
 */
var func = _call.bind(_bind, _call);

/**
 * bind(func, this, ...)
 *    创建函数 func 的绑定函数.
 */
var bind = func(_bind);

/**
 * call(func, thisArg, ...)
 *    调用函数 func, 一般参数形式.
 */
var call = func(_call);

/**
 * apply(func, thisArg, [...])
 *    调用函数 func, 数组参数形式.
 */
var apply = func(_apply);

/**
 * isFunction(any)
 *    判断目标是否是函数。
 */
function isFunction(any) {
  return typeof any === 'function';
}


/** Object: ----------------------------------------------------------------- */

/**
 * isObject(any)
 *    判断目标是否是对象。
 */
function isObject(any) {
  return Object(any) === any;
}

/**
 * isObjective(any)
 *    判断目标是否是非函数的对象。
 */
function isObjective(any) {
    return isObject(any) && !isFunction(any);
}

/**
 * defineProperty(obj, prop, desc)
 */
var defineProperty = Object.defineProperty;

/** String: ----------------------------------------------------------------- */

/**
 * isString(any)
 */
var String_prototype = String.prototype;

function isString(any) {
  return typeof any === 'string';
}

/**
 * indexOf(str, substr)
 */
var indexOf = func(String_prototype.indexOf);

/**
 * replace(str, regexp/substr, newStr/function)
 */
var replace = func(String_prototype.replace);

/** Array: ------------------------------------------------------------------ */
var Array_prototype = Array.prototype;

/**
 * isArray(any)
 */
var isArray = Array.isArray;

/**
 * seek(ary, item)
 *    返回元素item在数组ary中的索引，未找到返回-1;
 */
var seek = func(Array_prototype.indexOf);

/**
 * join(ary, separator)
 *    返回用separator将在数组ary元素连接起来的字符串;
 */
var join = func(Array_prototype.join);

/**
 *  unite(ary, ...)
 */
var unite = func(Array_prototype.concat);

/**
 *  piece(ary, begin, end)
 */
var piece = func(Array_prototype.slice);

/**
 *  splice(ary, idx, len)
 */
var splice = func(Array_prototype.splice);

/**
 *  push(ary, item, ...)
 */
var push = func(Array_prototype.push);

/**
 *  pop(ary)
 */
var pop = func(Array_prototype.pop);

/**
 * peak(ary)
 */
function peak(ary) {
  return ary[ary.length - 1];
}

/**
 *  reverse(ary)
 */
var reverse = func(Array_prototype.reverse);

/**
 * forEach(ary, func)
 */
var forEach = func(Array_prototype.forEach);

/**
 *  map(ary, func)
 */
var map = func(Array_prototype.map);

/**
 * reduce(ary, func, [initialValue])
 */
var reduce = func(Array_prototype.reduce);

/** RegExp: -------------------------------------------------------------------- */
var RegExp_prototype = RegExp.prototype;

/**
 * scan(regexp, str): matches[]
 */
var scan = func(RegExp_prototype.exec);

/** Error: --------------------------------------------------------------------- */
var _Error = Error;

/**
 * Error(msg, ...args)
 */
Error = bind(function (msg) {
    if(msg) {
      var args = arguments, length = args.length, i = 1;
      msg = replace(msg, this, function(s) {
        return i < length ? args[i++] : s;
      });
    }
    return _Error(msg);
  },
  /%[sd]/g
);

/** Encoding: ------------------------------------------------------------------ */

/**
 * base64(src)
 */
var base64;

/**
 * vlq64(...numbers)
 */
var vlq64;

(function () {
  var char64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  base64 = function (src) {
    var desIdx = 0, last = 0, gap = 0, des = "";
    for (var srcIdx = 0, srcLen = src.length; srcIdx < srcLen; srcIdx++) {
      var code = src.codePointAt(srcIdx);
      if (code < 0x80) {
        gap = (gap + 2) & 7;
        des += char64[(last << (8 - gap) | code >> gap) & 0x3F];
        if (gap < 6) {
          last = code;
          desIdx++;
        }
        else {
          des += char64[code & 0x3F];
          last = gap = 0;
          desIdx += 2;
        }
      }
      else {
        var sixLen = 1 + (code >= 0x80) + (code >= 0x800) + (code >= 0x10000);
        if (sixLen > 3) srcIdx++;
        var byte = (0xF00 >> sixLen) & 0xF0;
        var bitIdx = (sixLen << 2) + (sixLen << 1); // sixLen*6;
        while (bitIdx) {
          bitIdx -= 6;
          if (!byte) byte = 0x80;
          byte |= code >> bitIdx & 0x3F;

          gap = (gap + 2) & 7;
          des += char64[(last << (8 - gap) | byte >> gap) & 0x3F];
          if (gap < 6) {
            last = byte;
            desIdx++;
          }
          else {
            des += char64[byte & 0x3F];
            last = gap = 0;
            desIdx += 2;
          }
          byte = 0;
        }
      }
    }
    if (gap) {
      des += char64[last << (6 - gap) & 0x3F];
      for (; gap < 6; gap += 2) {
        des += "=";
      }
    }
    return des;
  };

  vlq64 = function () {
    var vlq = "", args = arguments;
    for (var i = 0, len = args.length; i < len; i++) {
      var num = args[i];
      num = num < 0 ? -num << 1 | 1 : num << 1;
      do {
        var byte = num & 31;
        if (num = num >>> 5)
          byte = byte | 32;
        vlq += char64[byte];
      } while (num);
    }
    return vlq;
  }

})();
