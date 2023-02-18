// ==UserScript==
// @name      No Track
// @name:zh-CN   不跟踪
// @namespace https://github.com/smxl
// @home      https://github.com/smxl
// @version 0.1.0
// @description URL searchParams Remover, white list mode
// @description:zh-CN   URL 跟踪参数移除, 仅保留白名单
// @author smxl
// @include https://www.google.*/*
// @include https://*.bilibili.com/*
// @include https://*.bing.com/*
// @grant none
// @license MIT
// ==/UserScript==
(function () {
  const whitelist = ['q', 'keyword'];

  function removeQueryParams() {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const paramsToDelete = [];

    for (const key of searchParams.keys()) {
      if (!whitelist.includes(key)) {
        paramsToDelete.push(key);
      }
    }

    paramsToDelete.forEach((key) => {
      searchParams.delete(key);
    });

    const newUrl = url.origin + url.pathname + '?' + searchParams.toString();

    if (newUrl !== window.location.href) {
      window.history.replaceState(null, null, newUrl);
    }
  }

  removeQueryParams();
  window.addEventListener('popstate', removeQueryParams);
  window.addEventListener('pushstate', removeQueryParams);
  window.addEventListener('replacestate', removeQueryParams);
})();

