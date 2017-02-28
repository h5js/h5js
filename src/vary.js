/** vary.js ------------------------------------------------------------------------------------------------------------
 * 实现数据变化监控机制。
 */

/**
 *  attachValueVary(at, it, to, me)
 */
var attachValueVary;

/**
 * detachValueVary(at, it, to, me)
 */
var detachValueVary;

/**
 * attachArrayVary(it, to, me)
 */
var attachArrayVary;

/**
 * detachArrayVary(it, to, me);
 */
var detachArrayVary;

(function () {
  var valueVaries = [];
  var valueIdx = 0;

  attachValueVary = function (at, it, to, me) {
    if((isFunction(at) || isObject(it)) && (isFunction(to) || isObject(me))) {
      for (var i = valueVaries.length, vary; (vary = valueVaries[--i]) && (vary[0] !== at || vary[1] !== it || vary[2] !== to || vary[3] !== me););
      if (i < 0) {
        push(valueVaries, [at, it, to, me]);
      }
    }
  };

  detachValueVary = function (at, it, to, me) {
    for (var i = valueVaries.length, vary; (vary = valueVaries[--i]) && (vary[0] !== at || vary[1] !== it || vary[2] !== to || vary[3] !== me););
    if (i >= 0) {
      splice(valueVaries, i, 1);
      if (i <= valueIdx) {
        valueIdx--;
      }
    }
  };

  function digestValueVaries() {
    var vary;
    for (valueIdx = 0; vary = valueVaries[valueIdx]; valueIdx++) {
      var oldValue = vary[4], newValue;
      var at = vary[0], it = vary[1];

      if (isFunction(at)) {
        newValue = call(at, it);
      }
      else {
        newValue = it[at];
      }

      if (oldValue !== newValue) {
        var to = vary[2], me = vary[3];
        if (isFunction(to)) {
          call(to, me, newValue);
        }
        else {
          me[to] = newValue;
        }
        vary[4] = newValue;
      }
    }
  }


  var arrayVaries = [];
  var arrayIdx = 0;

  attachArrayVary = function(it, to, me) {
    if(isObject(it) && isFunction(to)) {
      for (var i = arrayVaries.length, vary; (vary = arrayVaries[--i]) && (vary[0] !== it || vary[1] !== to || vary[2] !== me););
      if (i < 0) {
        push(arrayVaries, [it, to, me, bind(to, me), piece(it)]);
      }
    }
  };

  detachArrayVary = function(it, to, me) {
    for (var i = arrayVaries.length, vary; (vary = arrayVaries[--i]) && (vary[0] !== it || vary[1] !== to || vary[2] !== me););
    if (i >= 0) {
      splice(arrayVaries, i, 1);
      if (i <= arrayIdx) {
        arrayIdx--;
      }
    }
  };

  function digestArrayVaries() {
    var vary;
    for (arrayIdx = 0; vary = arrayVaries[arrayIdx]; arrayIdx++) {
      var newArray = vary[0], oldArray = vary[4], notify = vary[3], varied, newIdx = 0, oldIdx;

      while (newIdx < oldArray.length && newIdx < newArray.length) {
        var oldValue = oldArray[newIdx];
        var newValue = newArray[newIdx];
        if (oldValue === newValue) {
          if(varied)
            notify(0, newIdx, newIdx);
        }
        else if ((oldIdx = seek(oldArray, newValue, newIdx + 1)) < 0) {
          splice(oldArray, newIdx, 0, newValue);
          notify(1, newIdx, newValue);
          varied = 1;
        }
        else {
          splice(oldArray, newIdx, 0, splice(oldArray, oldIdx, 1)[0]);
          notify(0, oldIdx, newIdx);
          varied = 1;
        }
        newIdx++;
      }
      oldIdx = oldArray.length;
      if(newIdx < oldIdx) {
        splice(oldArray, newIdx, oldIdx - newIdx);
        notify(-1, newIdx, oldIdx - newIdx);
      }
      else for(oldIdx = newArray.length; newIdx < oldIdx; newIdx++) {
        notify(1, newIdx, oldArray[newIdx] = newArray[newIdx]);
      }
    }
  }

  setInterval(function(){
    digestValueVaries();
    digestArrayVaries();
  }, 0);

})();
