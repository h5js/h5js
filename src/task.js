/** task.js ------------------------------------------------------------------------------------------------------------
 * 任务管理
 * 任务是在 JavaScript 空闲时间执行的函数。
 */

/**
 * appendTask(task)
 *   增加任务
 */
var appendTask;

/**
 * appendTask(task)
 *   增加任务
 */
var removeTask;

(function (global) {
  var tasks;

  appendTask = function (task) {
    if (seek(tasks, task) < 0) {
      tasks.push(task);
    }
  };

  removeTask = function (task) {
    var index = seek(tasks, task);
    if (index >= 0) {
      splice(tasks, index, 1);
    }
  };

  function doTasks() {
    for (var i = 0, task; task = tasks[i]; i++) {
      task();
    }
  }

  /**
   * patch(func)
   *    创建补丁函数, 强制其第一个参数为替身函数
   */
  function patch(func) {
    return function(arg) {
      if(isFunction(arg)) {
        arguments[0] = wrap(arg);
      }
      return apply(func, this, arguments);
    }
  }

  /**
   * wrap(func)
   *   创建替身函数，该函数先运行任务列表，再执行原函数功能。
   */
  function wrap(func){
    return function() {
      doTasks();
      return apply(func, this, arguments);
    }
  }

  global.setTimeout = patch(global.setTimeout);
  global.setInterval = patch(global.setInterval);
  global.setImmediate = patch(global.setImmediate);

  global.requestAnimationFrame = global.patch(requestAnimationFrame);

  global.alert = wrap(global.alert);
  global.prompt = wrap(global.prompt);
  global.confirm = wrap(global.confirm);

})(window);