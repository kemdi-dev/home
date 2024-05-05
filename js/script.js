//back to top button behaviour
let mybutton = document.getElementById("mybtn");
function topFunction() {
  //document.getElementsByTagName("html")[0].classList.add("testsss");
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//scrolling functionality
(function () {
  var prevScrollpos = window.pageYOffset;

  var htmlsec = document.getElementsByTagName("html")[0];
  //var bodysec = document.getElementsByTagName("body")[0];
  var hero = document.getElementById("home");
  var section = document.querySelectorAll("section");
  var projectid = document.getElementById("projects");
  var aboutid = document.getElementById("about");
  var projects = document.getElementsByClassName("project");
  var projecth2 = document.querySelectorAll(".project h2");
  var thumbnail = document.querySelector(".project-bkgimg");
  var carousel = document.querySelectorAll(".project-carousel");

  var scroll = document.querySelectorAll(".scrollbar .dot");
  var scrollsec = document.querySelectorAll("section > .container");

  function onScroll() {
    var visible = document.querySelector(".visible");

    var currentScrollPos = window.pageYOffset;
    prevScrollpos = currentScrollPos;

    if (hero) {
      if (elementInViewport(hero)) {
        htmlsec.classList.add("hero-view");
      } else {
        htmlsec.classList.remove("hero-view");
      }
    }
    if (projectid) {
      if (elementInViewport(projectid) && !elementInViewport(aboutid)) {
        htmlsec.classList.add("fixed");
      } else {
        htmlsec.classList.remove("fixed");
      }
    }
    if (htmlsec) {
      if (elementInViewport(hero) || elementInViewport(aboutid)) {
        htmlsec.classList.add("scroll-snap");
      } else {
        htmlsec.classList.remove("scroll-snap");
      }
    }
    var list = [];
    for (var i = 0; i < projects.length; i++) {
      var projh2 = projecth2[i];
      var carousels = carousel[i];
      var projs = projects[i];

      if (visible) {
        var imgsource = document.querySelectorAll(".visible img");
        thumbnail.style.backgroundImage = "url(" + imgsource[0].src + ")";
      }
    }

    var slideIndex = 1;
    showDivs(slideIndex);

    function plusDivs(n) {
      showDivs((slideIndex += n));
    }

    function showDivs(n) {
      var ii;
      var x = document.querySelectorAll("#div0 .project-carousel img");
      if (visible) {
        x = document.querySelectorAll(".visible .project-carousel img");
      }

      if (n > x.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = x.length;
      }
      for (ii = 0; ii < x.length; ii++) {
        x[ii].classList.remove("active");
      }
      x[slideIndex - 1].classList.add("active");
    }

    if (scroll[0]) {
      scroll[0].classList.add("active");
    }

    for (var i = 0; i < scrollsec.length; i++) {
      var scrolls = scroll[i];

      if (elementInViewport(scrollsec[0])) {
        scrolls.classList.remove("active");
        scroll[0].classList.add("active");
      }
      if (elementInViewport(scrollsec[1])) {
        scrolls.classList.remove("active");
        scroll[1].classList.add("active");
      }
      if (elementInViewport(scrollsec[2])) {
        scrolls.classList.remove("active");
        scroll[2].classList.add("active");
      }
    }
  }

  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }
  window.onscroll = onScroll;
})();

//adds id name to project onload and adds 'visible' class to project when project is in viewport
var projects = document.getElementsByClassName("project");
var list = [];
for (var i = 0; i < projects.length; i++) {
  var projs = projects[i];

  list.push("div" + i);

  var listindex = list.length;

  if (listindex > 0) {
    projs.setAttribute("id", "div" + i);
  }
}

let callback = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
};
let observer = new IntersectionObserver(callback, {
  threshold: [0.5], // If 50% of the element is in the screen, we count it!
  // Can change the thresholds based on your needs. The default is 0 - it'll run only when the element first comes into view
});

list.forEach((d) => {
  const div = document.getElementById(d);
  if (div) observer.observe(div);
});

//make carousel images visible when in viewport
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var ii;
  var x = document.querySelectorAll(".visible .project-carousel img");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (ii = 0; ii < x.length; ii++) {
    x[ii].classList.remove("active");
  }
  x[slideIndex - 1].classList.add("active");
}
