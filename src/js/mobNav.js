export default () => {
  $('.js-nav-toggle').on('click', function() {
    $('body').toggleClass('is-modal');
    $(this).find('.burger').toggleClass('is-active');
    $('.js-mob-nav').fadeToggle(300);

    $('body').hasClass('is-modal') ? stopBodyScrolling(true) : stopBodyScrolling(false);
  });


  $('.js-mob-anchor').on('click', function() {
    $('body').toggleClass('is-modal');
    $('.burger').toggleClass('is-active');
    $('.js-mob-nav').fadeOut(300);

    $('body').hasClass('is-modal') ? stopBodyScrolling(true) : stopBodyScrolling(false);
  });


  function stopBodyScrolling(bool) {
    if (bool === true) {
      document.body.addEventListener('touchmove', freezeVp, false);
    } else {
      document.body.removeEventListener('touchmove', freezeVp, false);
    }
  }

  var freezeVp = function(e) {
    let target = $(e.target);

    if (target.hasClass('popup') || target.closest('.popup')) {
      return false;
    }
    e.preventDefault();
  };
};
