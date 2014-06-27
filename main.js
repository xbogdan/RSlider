$(document).ready(function() {
    var slider = $('.rs-elements');
    var centerLine = $('.rs-container').width()/2;
    var currentClass = 'rs-active';
    var elemNr = slider.children().length;
    var elemPos = [];
    var currentIndex = 2;

    slider.children().each(function(index, el) {
        if (currentClass) { $(this).addClass(currentClass) }
        elemPos.push($(this).position().left + $(this).width()/2 + parseInt($(this).css('margin-left'), 10) + parseInt($(this).css('padding-left'), 10));
        if (currentClass) { $(this).removeClass(currentClass) }
    });

    if (currentIndex) {
        var add = centerLine - elemPos[currentIndex];
        slider.css('margin-left', add+'px');
        if (currentClass) { slider.find('> *:eq('+currentIndex+')').addClass(currentClass) }
    }

    $('.rs-inc').click(function(e) {
        e.preventDefault();
        if (currentIndex + 1 <= elemNr-1) {
            var add = centerLine - elemPos[++currentIndex];
            slider.animate({'margin-left': add+'px'}, 200, function() {});
            if (currentClass) {
                slider.find('.'+currentClass).removeClass(currentClass);
                slider.find('> *:eq('+(currentIndex)+')').addClass(currentClass);
            }
        }
    });

    $('.rs-dec').click(function(e) {
        e.preventDefault();
        if (currentIndex - 1 >= 0) {
            var add = centerLine - elemPos[--currentIndex];
            slider.animate({'margin-left': add+'px'}, 200, function() {});
            if (currentClass) {
                slider.find('.'+currentClass).removeClass(currentClass);
                slider.find('> *:eq('+(currentIndex)+')').addClass(currentClass);
            }
        }
    });
  
});