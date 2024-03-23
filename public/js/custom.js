/*------------------------------------File Name: custom.js---------------------------------------------*/

/* Scroll to Top*/

$(window).on('scroll', function () {
  scroll = $(window).scrollTop();
  if (scroll >= 100) {
    $('#back-to-top').addClass('b-show_scrollBut');
  } else {
    $('#back-to-top').removeClass('b-show_scrollBut');
  }
});
$('.navbar-toggler').click(function () {
  $(this).toggleClass('active');

  $('.navbar').toggleClass('active');
  $('.menu_wrpr').toggleClass('active');
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  //>=, not <=
  if (scroll >= 50) {
    $('.main_wrapper').addClass('fixed');
  } else {
    $('.main_wrapper').removeClass('fixed');
  }
});
/*
const counter = document.getElementById("counter");
const incr = document.querySelector(".incr");
const decr = document.querySelector(".decr");
let count = 0;
incr.addEventListener("click", () => {
  count++;
  counter.innerHTML = count;
});
decr.addEventListener("click", () => {
  count--;
  counter.innerHTML = count;
});
*/
