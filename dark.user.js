// ==UserScript==
// @name         Dark Mode
// @name:zh-CN   暗黑模式
// @namespace    https://github.com/smxl
// @home         https://github.com/smxl
// @version      1.0.0
// @description:zh-CN   自动在没有暗黑主题的网站增加暗黑模式, 需要手动增加目标网站到 match
// @author       smxl
// @license      MIT
// @description  Automatically add dark mode to websites that do not have it by default. Please add your target site in match
// @match        *://yandex.*/*
// ==/UserScript==

(function() {
    'use strict';

    // Check if prefers-color-scheme: dark is supported by the browser
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check if the website already has a color scheme defined
        const html = document.getElementsByTagName('html')[0];
        const colorScheme = html.getAttribute('data-color-scheme');
        if (colorScheme && (colorScheme === 'light' || colorScheme === 'dark')) {
            return;
        }

        // Add dark mode
        const darkModeCSS = document.createElement('style');
        darkModeCSS.type = 'text/css';
        darkModeCSS.innerHTML = ' body,#b_results>li {background-color: #222 !important;color: #eee !important;}a {color: #9cf !important;}';
        html.setAttribute('data-color-scheme', 'dark');
        document.head.appendChild(darkModeCSS);
    }
})();
