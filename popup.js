document.addEventListener("DOMContentLoaded", function () {
  var downloadButton = document.getElementById("downloadButton");

  downloadButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      console.log("激活标签页信息：", activeTab);
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: function () {
          // 发送消息给内容脚本
          var pageHTML = document.documentElement.outerHTML;
          chrome.runtime.sendMessage({
            action: "executeContentScript",
            content: pageHTML,
          });
          // 在内容脚本中触发DOM查询
          // 这将触发content.js中的代码执行
        },
      });
    });
  });

  // 接收来自内容脚本的消息
  // chrome.runtime.onMessage.addListener(function (message) {
  //   var videoUrl = message.videoUrl;
  //   console.log("接收到的videoUrl==>", videoUrl);
  //   if (videoUrl) {
  //     // 使用chrome.downloads.download方法下载视频
  //     chrome.downloads.download({ url: videoUrl }, function (downloadId) {
  //       if (chrome.runtime.lastError) {
  //         console.error(chrome.runtime.lastError);
  //       } else {
  //         console.log("视频下载已启动，下载ID：" + downloadId);
  //       }
  //     });
  //   } else {
  //     console.log("未找到视频元素");
  //   }
  // });
});
