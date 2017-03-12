/** vary.js ------------------------------------------------------------------------------------------------------------
 * 实现数据变化监控机制。
 */

/**
 *  attachVary(it, on, me)
 */
var attachVary;

/**
 * detachVary(it, on, me)
 */
var detachVary;

(function () {
  var varies = [];
  var index = 0;
  var interval;

  attachVary = function (it, on, me) {
    if(isObject(it) && (isFunction(on) || isObject(me))) {
      var length, i, vary;
      for (length = i = varies.length; (vary = varies[--i]) && (vary[0] !== it || vary[1] !== on || vary[2] !== me););
      if (i < 0) {
        varies[length] = [it, on, me, []];
        if(!length) {
          interval = setInterval(digestVaries, 0);
        }
      }
    }
  };

  detachVary = function (it, on, me) {
    if(isObject(it) && (isFunction(on) || isObject(me))) {
      var length, i, vary;
      for (length = i = varies.length; (vary = varies[--i]) && (vary[0] !== it || vary[1] !== on || vary[2] !== me););
      if (i >= 0) {
        splice(varies, i, 1);
        if(length === 1) {
          clearInterval(interval);
        }
        if (i <= index) {
          index--;
        }
      }
    }
  };

  function digestVaries() {
    var vary;
    for (index = 0; vary = varies[index]; index++) {
      var it = vary[0], on = vary[1], me = vary[2], at = vary[3];

      if (isFunction(it)) {
        it = it();
        if(it !== at) {
          if(isFunction(on)) {
            call(on, me, it);
          }
          else {
            me[on] = it;
          }
          vary[3] = it;
        }
      }
      else {
        var varied, idx = 0, pos;
        while(idx < at.length && idx < it.length) {
          var atValue = at[idx], itValue = it[idx];
          if(atValue === itValue) {
            if(varied)
              call(on, me, 0, idx, idx);
          }
          else if((pos = seek(at, itValue, idx+1)) < 0) {
            splice(at, idx, 0, itValue);
            call(on, me, 1, idx, itValue);
            varied = 1;
          }
          else {
            splice(at, idx, 0, splice(at, pos, 1)[0]);
            call(on, me, 0, pos, idx);
            varied = 1;
          }
          idx ++;
        }
        pos = at.length;
        if(idx < pos) {
          pos -= idx;
          splice(at, idx, pos);
          call(on, me, -1, idx, pos);
        }
        else for(pos=it.length; idx<pos; idx++){
          call(on, me, 1, idx, at[idx] = it[idx]);
        }
      }
    }
  }

})();
