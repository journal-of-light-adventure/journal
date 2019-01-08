/*
 * Copyright (c) 2019 Richard L. McNeary II
 *
 * MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

"use strict";

setTimeout(function () {
    var e = document.getElementsByClassName("replace");
    for (var i = 0; i < e.length; i++) {
        var ih = "alexmcneary";
        ih += "@";
        ih += "gmail.";
        ih += "com";
        e[i].innerHTML = ih;
    }
}, 200);

function getScrollingElement() {
    var d = document;
    return d.documentElement.scrollHeight > d.body.scrollHeight &&
        d.compatMode.indexOf("CSS1") === 0 ? d.documentElement : d.body;
}


var _HIDDEN_CLASS = "hidden";
var isIncrementing = true;
var changeScrollTop = 0;
var lastScrollTop = 0;
window.addEventListener("scroll", function (evt) {
    var scroller = evt.target.scrollingElement ? evt.target.scrollingElement : getScrollingElement();
    var targetName = scroller.nodeName.toLowerCase();
    if (targetName !== "body" && targetName !== "html") {
        return;
    }

    var targetElement = document.getElementsByTagName(targetName)[0];
    var currentScrollTop = targetElement.scrollTop;

    var diff = currentScrollTop - lastScrollTop;
    if (isIncrementing) {
        if (diff < 0) {
            isIncrementing = false;
            changeScrollTop = lastScrollTop;
        }
    } else {
        if (0 < diff) {
            isIncrementing = true;
            changeScrollTop = lastScrollTop;
        }
    }

    lastScrollTop = currentScrollTop;

    var m = document.getElementsByClassName("menu-container")[0];
    if (!isIncrementing) {
        if (100 <= changeScrollTop - currentScrollTop || currentScrollTop === 0 && m.classList.contains(_HIDDEN_CLASS)) {
            m.classList.remove(_HIDDEN_CLASS);
        }
    } else {
        if (100 <= currentScrollTop && !m.classList.contains(_HIDDEN_CLASS)) {
            m.classList.add(_HIDDEN_CLASS);
        }
    }
});
