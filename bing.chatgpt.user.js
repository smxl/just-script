// ==UserScript==
// @name         Modify User-Agent on Bing
// @name:zh-CN   修改 bing 的 User-Agent
// @namespace    https://github.com/smxl
// @home         https://github.com/smxl
// @version      1.0.0
// @description  Modify User-Agent on Bing, to use Bing ChatGPT with any browser
// @description:zh-CN   修改 bing 的 User-Agent 以在任意浏览器使用 Bing ChatGPT
// @author       smxl
// @license      MIT
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Get the original user agent
    const originalUserAgent = navigator.userAgent;
    
    // Modify the user agent to include " Edg/110.0.1587.46"
    const modifiedUserAgent = originalUserAgent + " Edg/110.0.1587.46";
    
    // Define a getter for userAgent to protect against overwriting
    if (Object.getOwnPropertyDescriptor(navigator, "userAgent").get) {
        Object.defineProperty(navigator, "userAgent", {
            get: function() { return modifiedUserAgent; }
        });
    }
})();
