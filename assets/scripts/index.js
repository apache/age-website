var handleClick = function (el) {
  decorateSidebar(el);
  showMainContent(el);
  updateLocation(el);
  if (menuIsVisible()) handleMenuClick();
}

var updateLocation = function (el) {
  let loc = el.parentElement.id.split("-")[1];
  if (loc) {
    window.history.pushState(loc, '', `?l=${loc}`);
  }
}

var decorateSidebar = function (el) {
  let items = document.getElementsByClassName("sidebar-item");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("sidebar--selected");
  }
  el.parentElement.classList.add("sidebar--selected");
}

var showMainContent = function (el) {
  let items = document.getElementsByClassName("main-item");
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove("main--selected");
  }
  let divId = "main-" + el.parentElement.id.split("-")[1];
  document.getElementById(divId).classList.add("main--selected");
}

var menuIsVisible = function () {
  let menu = document.getElementById("menu");
  let display = window.getComputedStyle(menu).display;
  if (display === "none") {
    return false;
  }
  return true;
}

var handleMenuClick = function (el) {
  let sidebar = document.getElementById("sidebar");
  let display = window.getComputedStyle(sidebar).display;
  if (display === "none") {
    sidebar.style.display = "block";
    document.getElementById("sidebar-overview").scrollIntoView();
  } else {
    sidebar.style.display = "none";
  }
}

var handleJiraSearch = function () {
  let searchTerms = document.getElementById("jira-search").value;
  window.open(`https://issues.apache.org/jira/browse/AGE-1?jql=(project%3DAGE)%20and%20text%20~%20%22${searchTerms}%22`, "_blank");
}

window.onload = function() {
  let url = new URL(location.href);
  let goto = url.searchParams.get("l");
  let el = document.getElementById(`sidebar-${goto}`);
  if (el) {
    handleClick(el.firstChild);
  }
}
