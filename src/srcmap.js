/** srcmap.js ----------------------------------------------------------------------------------------------------------
 *
 */

/**
 * srcmap(file)
 */
var srcmap;

/**
 * mapsrc(source, code,
 */

(function(){

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  function vlq64() {
    var vlq = "", args = arguments;
    for (var i = 0, len = args.length; i < len; i++) {
      var num = args[i];
      num = num < 0 ? -num << 1 | 1 : num << 1;
      do {
        var byte = num & 31;
        if (num = num >>> 5)
          byte = byte | 32;
        vlq += chars[byte];
      } while (num);
    }
    return vlq;
  }

})();
