/** lib.js -------------------------------------------------------------------------------------------------------------
 *
 */

/**
 * func(method)
 *    将方法转换为函数。若fn = func(method), 则 fn(obj, ...) 等价于 obj.method(...)
 */
var func;

/**
 * bind(func, this, ...)
 *    创建函数 func 的绑定函数.
 */
var bind;

/**
 * call(func, thisArg, ...)
 *    调用函数 func, 一般参数形式.
 */
var call;

/**
 * apply(func, thisArg, [...])
 *    调用函数 func, 数组参数形式.
 */
var apply;


(function () {

  /** 函数式编程支持：----------------------------------------------------------------- */
  var Function_prototype = Function.prototype;
  var _call = Function_prototype.call;
  var _apply = Function_prototype.apply;
  var _bind = Function_prototype.bind;

  /* export */ func = _call.bind(_bind, _call);
  /* export */ bind = func(_bind);
  /* export */ call = func(_call);
  /* export */ apply = func(_apply);


})();

