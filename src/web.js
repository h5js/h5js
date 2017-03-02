/** web.js -------------------------------------------------------------------------------------------------------------
 *
 */


/**
 * createElement(tagName)
 */
var createElement = bind(document.createElement, document);

/**
 * createTextNode(data)
 */
var createTextNode = bind(document.createTextNode, document);

/**
 * createDocumentFragment()
 */
var createDocumentFragment = bind(document.createDocumentFragment, document);

/**
 * addEventListener(eventTarget, type, listener[, useCapture])
 */
var addEventListener = func(document.addEventListener);

/**
 * cloneNode(node[, deep]);
 */
var cloneNode = func(document.cloneNode);

/**
 * appendChild(node, child)
 */
var appendChild = func(document.appendChild);

/**
 * insertBefore(nowNode, refNode)
 */
var insertBefore = func(document.insertBefore);

/**
 * replaceChild(node, newChild, refChild)
 */
var replaceChild = func(document.replaceChild);

/**
 * removeChild(node, child)
 */
var removeChild = func(document.removeChild);

/**
 * @type {HTMLHeadElement}
 */
var head = document.head;

/**
 * hasAttribute(node, name)
 */
var hasAttribute = func(head.hasAttribute);

/**
 * getAttribute(node, name)
 */
var getAttribute = func(head.getAttribute);

/**
 * removeAttribute(node, name)
 */
var removeAttribute = func(head.removeAttribute);

/**
 * Childie(node)
 *    创建子节点枚举函数
 */
function Childie(node) {
  node = node.firstChild;
  return function(){
    var child = node;
    node && (node = node.nextSibling);
    return child;
  }
}