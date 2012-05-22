<script>
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.twitter.com/1/users/show/"+ request.screen_name + ".json", true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200)  {
          sendResponse(JSON.parse(xhr.responseText));	  
        } else {
          sendResponse({});
        }
      }
    }
  }
);

</script>