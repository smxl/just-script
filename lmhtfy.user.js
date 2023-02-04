// ==UserScript==
// @name         Let Me Hide That for You on Twitter
// @name:zh-CN   让我在 Twitter 上为你隐藏这些
// @namespace    https://github.com/smxl
// @home         https://github.com/smxl
// @version      1.0.0
// @description  LMHTFY, Hide users on Twitter if their username contains keyword, default: 🇨🇳
// @description:zh-CN   LMHTFY, 如果用户的用户名包含关键字，则在 Twitter 上隐藏用户, 默认: 🇨🇳
// @author       smxl
// @license      MIT
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const blockedUsers = ["🇨🇳"];
    const styles = blockedUsers.map(key => {
        return `
        [data-testid="cellInnerDiv"]:has([data-testid="socialContext"] [alt="${key}"]),
        [data-testid="cellInnerDiv"]:has([data-testid="User-Names"] [alt="${key}"]) {
          display: none;
        }
        `
    }).join("");

    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
})();
