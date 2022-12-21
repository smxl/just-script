// ==UserScript==
// @name         YouTube Sponsor Skip
// @description  Sponsor Skip for YouTube
// @name:zh-CN          YouTube 去广告
// @description:zh-CN   YouTube 广告自动跳过
// @version      1.0.0
// @description  YouTube Sponsor Skip
// @updateURL    https://github.com/smxl/YouTube-Sponsor-Skip/raw/main/yt.sponsor.skip.user.js
// @downloadURL  https://github.com/smxl/YouTube-Sponsor-Skip/raw/main/yt.sponsor.skip.user.js
// @author       smxl
// @license      MIT
// @match        *://*.youtube.com/*
// @exclude      *://*.youtube.com/subscribe_embed?*
// ==/UserScript==
const tryFetchSkipSegments = async (videoID) => {
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
    console.log(`Sponsor Skip: failed fetching skip Segments for ${videoID}, reason: ${e}`);
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
  window[key] = window[key] || tryFetchSkipSegments(videoID);
  document.querySelectorAll('video').forEach((v) => {
    if (Number.isNaN(v.duration)) return;
    window[key].forEach(([start, end]) => {
      if (v.currentTime < end && v.currentTime > start) {
        v.currentTime = end;
        console.log(`Sponsor Skip: skipped video to ${end}`);
      }
    });
  });
};

document.querySelectorAll('video').forEach((v) => {
  v.addEventListener('timeupdate', skipSegments);
});
