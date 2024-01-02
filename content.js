// content.js

function getVideoUrlFromHTML(html) {
  // 使用正则表达式匹配video标签
  var videoRegex = /<video[^>]*src=['"]([^'"]+)['"][^>]*>/;
  var match = html.match(videoRegex);
  if (match && match.length > 1) {
    var videoUrl = match[1];
    return videoUrl;
  } else {
    return null;
  }
}

function downloadVideo(videoUrl) {
  if (videoUrl) {
    console.log("downloadVideo视频链接：" + videoUrl);
    chrome.downloads.download({ url: videoUrl }, function (downloadId) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        handleVideoDownload(downloadId);
      }
    });
  } else {
    console.log("未找到视频元素");
  }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "executeContentScript") {
    // 发送消息给内容脚本

    // chrome.runtime.sendMessage({ action: "executeContentScript" });
    console.log("message===>", message); // 打印当前页面的HTML内容
    var videoUrl = getVideoUrlFromHTML(message?.content);
    if (videoUrl) {
      console.log("视频链接：" + videoUrl);
      downloadVideo(videoUrl);
    } else {
      console.log("未找到视频链接");
    }
  }
});
