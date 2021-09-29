import {TimelineMax} from 'gsap';
import PubSub from 'pubsub-js';
import 'jquery-validation';

let validator;
const scaleX = $('.js-form-toggle').width()/$('.js-form').width();

export function form() {

  // events
  let mouseover = e => {
    if (!$('.js-form').hasClass('is-active')) {
      let tl = new TimelineMax();
      tl
        .to('.js-form-line', 1, {scaleX: 1});
    }
  };

  let mouseout = e => {
    if (!$('.js-form').hasClass('is-active')) {
      let tl = new TimelineMax();
      tl
        .to('.js-form-line', 1, {scaleX: scaleX});
    }
  };

  let click = e => {
    e.preventDefault();

    validateForm();

    $('.js-form').addClass('is-active');

    let tl = new TimelineMax({
      onComplete: () => {
        PubSub.publish('FORM.IS.OPENED');
      }
    });

    tl
      .to('.js-form', 1, {height: 370});
  };

  let close = e => {
    if ($('.form').length !== 0 && $(e.target).closest('.form').length === 0) {
      onClose($('.js-form form')[0]);
    }
  };




  $('.js-form-toggle').on('mouseover', mouseover);
  $('.js-form-toggle').on('mouseout', mouseout);
  $('.js-form-toggle').on('click', click);
  $('body').on('click', close);



  // default state
  $('.js-form-success').fadeOut(300);
  let tl = new TimelineMax();
  tl
    .set('.js-form-line', {scaleX: scaleX});




  // inputs
  $('input[type="file"]').on('change', function(e) {
    e.preventDefault();
    let filename = this.files[0].name;
    $('.js-file').html(filename);
    $('.js-file').parent().addClass('is-active');
    $('.js-file').closest('.js-input').find('label').hide();
  });

  $('.js-file-remove').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.js-input').find('.js-file').html('');
    $(this).parent().removeClass('is-active');

    $(this).closest('.js-input').find('label').show();
  });

  $('.js-input input:not([type="file"])').on('focus', function(e) {
    $(this).parent().addClass('is-ready');
  });

  $('.js-input input:not([type="file"])').on('focusout', function(e) {
    if ($(this).val() === '') {
      $(this).parent().removeClass('is-ready');
    }
  });

}



function validateForm() {
  validator = $('.js-form form').validate({
    rules: {
      name: {
        minlength: 2,
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        digits: true
      },
      message: {
        minlength: 2,
        required: true
      }
    },
    submitHandler: function(form) {
      console.log($(form).attr('action'));

      $.ajax({
        type: $(form).attr('method'),
        url: $(form).attr('action'),
        data: $(form).serialize(),
        success: onSuccess(form)
      });
      onSuccess(form);
    }
  });
}

function onSuccess(form) {
  $(form).closest('.js-form').removeClass('is-active');
  $('.js-form-success').fadeIn(300);

  setTimeout(() => {
    $('.js-form-success').fadeOut(300);
  }, 500);

  let tl = new TimelineMax({
    onComplete: () => {
      resetForm(form);
    }
  });
  tl
    .to('.js-form', 1, {height: 2}, 1)
    .to('.js-form-line', 1, {scaleX: scaleX});
}

function onClose(form) {
  $(form).closest('.js-form').removeClass('is-active');

  let tl = new TimelineMax({
    onComplete: () => {
      resetForm(form);
      if (validator) {
        validator.destroy();
      }
    }
  });
  tl
    .to('.js-form', 1, {height: 2})
    .to('.js-form-line', 1, {scaleX: scaleX});
}

function resetForm(form) {
  form.reset();
  $('.js-form-success').fadeOut(300);
  $('.js-input').removeClass('is-ready');
}
