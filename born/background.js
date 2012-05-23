chrome.extension.onRequest.addListener(handleUserId); 

function handleUserId(request, sender, sendResponse) {
  // Return cached date if present
  if (sessionStorage.getItem(getCacheName(request.userId))) {
    var data = { createdAt: sessionStorage.getItem(getCacheName(request.userId)), userId: request.userId };
    sendResponse({ status: 200, data: data });
    return;
  }
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitter.com/1/users/show.json?user_id=" + request.userId, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var response = { status: xhr.status };
      if (xhr.status === 200) {
        var profile = JSON.parse(xhr.responseText);
        response.createdAt = profile.created_at;
        response.userId = profile.id;
        sessionStorage.setItem(getCacheName(profile.id), profile.created_at);
      }
      sendResponse({ status: xhr.status, data: response });
    }
  }
}

// Diplay notification if new install
// TODO: remove at some point in the future
if (localStorage.getItem('installed') !== 'true') {
  var url = chrome.extension.getURL('cracked-twitter.png');
  var body = 'The extension Twitter Creation Date is now Born for Twitter and has been updated to work with #newtwitter.';
  var popup = window.webkitNotifications.createNotification(url, 'Twitter Creation Date Reborn', body);
  popup.show();
  localStorage.setItem('installed', 'true');
}

function getCacheName(id) {
  return 'cache_' + id + '_created_at';
}