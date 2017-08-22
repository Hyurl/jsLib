/**
 * Sets a event handler when a keyup event fires after a specified timeout.
 * 
 * @param {String} targets A css selector for binding the elements.
 * @param {Function} callback Event handler.
 * @param {Integer} timeout Timeout in milliseconds.
 */
function delayKeyup(targets, callback, timeout) {
    var timer,
        timeout = timeout || 1500;
    if (typeof targets == 'string')
        targets = document.querySelectorAll(targets);
    else if (targets instanceof HTMLElement)
        targets = [targets];
    for (var i in targets) {
        targets[i].onkeyup = function() {
            clearTimeout(timer);
            var _this = this;
            timer = setTimeout(function() {
                if (typeof callback == 'function')
                    callback.call(_this);
            }, timeout);
        }
    }
}

if (typeof NodeList == 'function' || (typeof NodeList == 'object')) {
    //Browsers' document NodeList
    NodeList.prototype.delayKeyup = function(callback, timeout) {
        return delayKeyup(this, callback, timeout);
    };
    //HTMLElement
    HTMLElement.prototype.delayKeyup = NodeList.prototype.delayKeyup;
    //jQuery
    if (typeof jQuery == 'function')
        jQuery.fn.delayKeyup = NodeList.prototype.delayKeyup;
    //AMD
    if (typeof define === 'function' && define.amd)
        define(delayKeyup);
} else if (typeof module === 'object' && module.exports) {
    //Nodejs/CommonJS
    module.exports = delayKeyup;
}
