// ==UserScript==
// @name         YouTube Sponsor Skip
// @description  Sponsor Skip for YouTube
// @name:zh-CN          YouTube 去广告
// @description:zh-CN   YouTube 广告自动跳过
// @version      1.0.1
// @namespace    https://github.com/smxl
// @updateURL    https://github.com/smxl/just-script/raw/main/yt.sponsor.skip.user.js
// @downloadURL  https://github.com/smxl/just-script/raw/main/yt.sponsor.skip.user.js
// @icon
// @author       smxl
// @license      MIT
// @match        https://*.youtube.com/watch*
// @exclude      https://*.youtube.com/subscribe_embed?*
// ==/UserScript==

const fetchSkips = async (videoID) => {
  try {
    const response = await fetch(`https://sponsor.ajay.app/api/skipSegments?videoID=${videoID}`);
    const rJson = await response.json();
    const segments = [];
    rJson.forEach((a) => {
      if (a.actionType === 'skip') {
        segments.push(a.segment);
      }
    });
    return segments;
  } catch (e) {
    console.log(`Sponsor skip failed for ${videoID}, reason: ${e}`);
    return [];
  }
};

const skipSegments = () => {
  const url = new window.URL(document.location);
  const params = new window.URLSearchParams(url.search);
  const videoID = params.get('v');
  if (!videoID) {
    return;
  }
  const key = `segmentsToSkip-${videoID}`;
  window[key] = window[key] || fetchSkips(videoID);
  document.querySelectorAll('video').forEach((v) => {
    if (Number.isNaN(v.duration)) return;
    window[key].forEach(([start, end]) => {
      if (v.currentTime < end && v.currentTime > start) {
        v.currentTime = end;
        console.log(`Sponsor skipped to ${end}`);
      }
    });
  });
};

document.querySelectorAll('video').forEach((v) => {
  v.addEventListener('timeupdate', skipSegments);
});
