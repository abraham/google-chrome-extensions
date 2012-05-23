chrome.extension.onRequest.addListener(handleUserId); 

function handleUserId(request, sender, sendResponse) {
  // TODO: check for cached data
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitter.com/1/users/show.json?user_id=" + request.userId, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // TODO: cache success data
      sendResponse({ status: xhr.status, response: JSON.parse(xhr.responseText) });
    }
  }
}

if (localStorage.getItem('installed') !== 'true') {
  var url = chrome.extension.getURL('cracked-twitter.png');
  var body = 'The extension Twitter Creation Date is now Born for Twitter and has been updated to work with #newtwitter.';
  var popup = window.webkitNotifications.createNotification(url, 'Twitter Creation Date Reborn', body);
  popup.show();
  localStorage.setItem('installed', 'true');
}