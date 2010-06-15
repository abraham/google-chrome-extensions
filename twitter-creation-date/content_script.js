// Update created_at value on profile page.
function creation_updatePage(response) {
  if(response.created_at) {
    var created_at = new Date(response.created_at);
    $('#creation_stat').text(created_at.toDateString());
  }
}

// Identify and validate profile and initiate API call.
var page = $('meta[name=page-user-screen_name]')[0];
var primary = $('#primary_nav');
if(page && primary) {
  insertLi('http://abrah.am/', '???');
  chrome.extension.sendRequest({screen_name: page.content},  creation_updatePage);
}

// Insert <li> into profile page
function insertLi(link, text) {
  var stat = $('<span>' + text + '</span>');
  stat.addClass('stat_count');
  stat.attr('id', 'creation_stat');

  var title = $('<span>Created</span>');

  var anchor = $('<a href="' + link + '"></a>');
  anchor.attr('target', '_blank');
  anchor.attr('id', 'creation_anchor');
  anchor.attr('title', 'Twitter Creation extension built by Abraham Williams (@abraham)');
  anchor.append(stat).append(title);

  var tab = $('<li></li>');
  tab.attr('id', 'creation_tab');
  tab.append(anchor);

  var nav = $('#primary_nav');
  nav.append(tab);  
}