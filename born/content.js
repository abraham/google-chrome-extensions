var observer = new MutationSummary({
  callback: handleProfileChange,
  queries: [
    { element: 'div.profile-card-inner' },
    { element: 'div.profile-modal' }
  ]
});

function handleProfileChange(summaries) {
  // Full profile
  summaries[0].added.forEach(function(profile) {
    var userId = profile.getAttribute('data-user-id');
    profile.className += ' ' + getProfileClassName(userId);
    chrome.extension.sendRequest(null, { userId: userId },  handleResponse);
  });
  // Profile modal
  summaries[1].added.forEach(function(modal) {
    var userId = modal.getElementsByClassName('js-action-follow')[0].getAttribute('data-user-id');
    modal.getElementsByClassName('profile-modal-extended')[0].className += ' ' + getProfileClassName(userId);
    chrome.extension.sendRequest(null, { userId: userId },  handleResponse);
  });
}

function handleResponse(response) {
  if (response.status === 200) {
    // TODO: clean up code
    var profilesOnPage = document.getElementsByClassName(getProfileClassName(response.data.userId));
    var s = document.createElement('span');
    s.innerText = 'Born ' + (new Date(response.data.createdAt)).toDateString();
    s.setAttribute('title', 'Born for Twitter created by @abraham');
    var lnu = profilesOnPage[0].getElementsByClassName('location-and-url');
    
    // TODO: clean up if
    // Only add divider if there is a URL present
    if (lnu[0].getElementsByClassName('url')[0].getElementsByTagName('a')[0].getAttribute('href') !== '') {
      var d = document.createElement('span');
      d.className = 'divider';
      d.innerText = '· ';
      lnu[0].appendChild(d);
    }
    
    lnu[0].appendChild(s);
  } else {
    // TODO: display rate limit errors
    // console.log('Error response');
    // console.log(response);
  }
}

function getProfileClassName(id) {
  return 'born-profile-' + id;
}
