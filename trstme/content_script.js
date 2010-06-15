// Update trstrank to profile page
function trstme_updatePage(response) {
  if (response.trstrank) {
    trstrank = response.trstrank
    $('#trstme_stat').text(trstrank);
  }
}

// Find screen_name for profile
var page = $('meta[name=page-user-screen_name]')[0];
var primary = $('#primary_nav');
if(page && primary) {
  insertLi('http://trst.me/t/' + page.content, '???');
  chrome.extension.sendRequest({screen_name: page.content},  trstme_updatePage);
}

// Insert <li> into profile page
function insertLi(link, text) {
  var stat = $('<span>' + text + '</span>');
  stat.addClass('stat_count');
  stat.attr('id', 'trstme_stat');

  var title = $('<span>Trst.me</span>');

  var anchor = $('<a href="' + link + '"></a>');
  anchor.attr('target', '_blank');
  anchor.attr('id', 'trstme_anchor');
  anchor.attr('title', 'Trst.me extension built by Abraham Williams (@abraham)');
  anchor.append(stat).append(title);

  var tab = $('<li></li>');
  tab.attr('id', 'trstme_tab');
  tab.append(anchor);

  var nav = $('#primary_nav');
  nav.append(tab);  
}