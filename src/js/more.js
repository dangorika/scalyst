export default () => {
  let maxHeight = 0;

  $('.js-fixed-height ul').each(function() {

    let wrapper = $(this).closest('.js-fixed-height');
    let li = $(this).find('li');
    let l = li.length;

    let maxItems = wrapper.data('max-items');

    if (l <= maxItems) {
      return false;
    }
    else {
      // count max height
      li.each((n) => {
        if (n < maxItems) {
          maxHeight += $(li[n]).outerHeight();
        }
      });



      if ($(this).height() > maxHeight) {
        $(this).css('height', maxHeight+'px');
        wrapper.addClass('is-limited');
      }

      $('.js-show-more').on('click', function(e) {
        e.preventDefault();

        PubSub.publish('CURSOR.RECOUNT.POSITION');

        let moreText = $(this).data('more');
        let lessText = $(this).data('less');

        let el = $(this).closest('.js-fixed-height');

        $(el).toggleClass('is-active');

        if ($(el).hasClass('is-active')) {
          $(this).find('span').text(lessText);
        }
        else {
          $(this).find('span').text(moreText);
        }

      });

    }
  });

};

