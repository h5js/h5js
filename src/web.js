/** web.js -------------------------------------------------------------------------------------------------------------
 *
 */

/**
 * wget(url) 获取URL指定的文本。
 *
 */
function wget(url) {
  var http = new XMLHttpRequest;
  http.open('GET', url, false);
  http.send();
  return http.status / 100 ^ 2 ? '' : http.responseText;
}
