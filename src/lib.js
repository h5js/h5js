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
 *    判断目标是否是非函数的对象。
 */
function isObject(any) {
  return  typeof any === 'object' && any !== nil;
}

/**
 * defineProperty(obj, prop, desc)
 */
var defineProperty = Object.defineProperty;


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
 *  map(ary, func)
 */
var map = func(Array_prototype.map);

