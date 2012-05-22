// TODO: adds support for modals
var observer = new MutationSummary({
  callback: handleProfileChange,
  queries: [{ element: 'div.profile-card-inner' }]
});

function handleProfileChange(summaries) {
  // TODO: loop through summaries?
  var summary = summaries[0];

  summary.added.forEach(function(profile) {
    var userId = profile.getAttribute('data-user-id');
    profile.className += ' born-profile-' + userId;
    chrome.extension.sendRequest(null, { userId: userId },  handleResponse);
  });
}

function handleResponse(response) {
  if (response.status === 200) {
    // TODO: Clean up code
    var d = document.createElement('span');
    d.className = 'divider';
    d.innerText = '·';
    var profile = response.response;
    var profilesOnPage = document.getElementsByClassName('born-profile-' + profile.id);
    var s = document.createElement('span');
    var createdAt = new Date(profile.created_at);
    s.innerText = 'Born ' + createdAt.toDateString();
    s.setAttribute('title', 'Born created by @abraham');
    var lnu = profilesOnPage[0].getElementsByClassName('location-and-url');
    lnu[0].appendChild(d).parentNode.appendChild(s);
  } else {
    // TODO: display rate limit errors
    // console.log('Error response');
    // console.log(response);
  }
}