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
  
    x = $('.slider').rslider();
});

(function($) {
    RSlider = (function() {
        function RSlider(element, options) {
            _ = this;
            _.width =  options && options.width ? options.width : 250;
            _.element = element;
            _.slider = null;
            _.slidesCount = null;
            _.sliderMask = null;
            _.initialSlide = options && options.initialSlide ? options.initialSlide : null;
            _.currentSlide = null;
            _.currentClass = options && options.currentClass ? options.currentClass :  '';
            _.slidesPositions = [];
            _.centerPoint = _.width / 2;
            _.animTime = options && options.animationTime ? options.animationTime : 200;
            _.init();
        }
        return RSlider;
    }());

    RSlider.prototype.init = function() {
        /* Initialize classes */
        _.slides = $(_.element).children();
        _.slider = _.slides.wrapAll('<div class="rs-track" />').parent();
        _.sliderMask = _.slider.wrap('<div class="rs-mask" />').parent();
        _.sliderMask.css('width', _.width+'px');
        _.sliderMask.parent().addClass('rs');

        /* Initialize slides number, initial slide */
        _.slidesCount = _.slides.length;
        if (!_.initialSlide) { _.initialSlide = _.slidesCount / 2; }

        /* Initialize positions vector */
        for (var i = 0; i < _.slidesCount; i++) {
            var element = $(_.slides[i]);
            if (_.currentClass) { element.addClass(_.currentClass); }
            _.slidesPositions.push(
                element.position().left + 
                element.width()/2 + 
                parseInt(element.css('margin-left'), 10) + 
                parseInt(element.css('padding-left'), 10) + 
                parseInt(element.css('border-left-width'), 10)
            );
            if (_.currentClass) { $this.removeClass(_.currentClass); }
        };

        _.centerInitial();
    };

    /* Method for centering the wanted initial slide if specified or th default one if not */
    RSlider.prototype.centerInitial = function() {
        if (_.initialSlide) {
            var newOffset = _.centerPoint - _.slidesPositions[_.initialSlide];
            // _.slider.css('transform', 'translate3d('+newOffset+'px , 0px, 0px)');
            _.slider.css('margin-left', newOffset+'px');
            if (_.currentClass) { _.slides.eq(_.initialSlide).addClass(_.currentClass) }
            _.currentSlide = _.initialSlide;
        };
    };

    /* Method for moving to the next slide */
    RSlider.prototype.next = function() {
        if (_.currentSlide + 1 <= _.slidesCount - 1) {
            var newOffset = _.centerPoint - _.slidesPositions[++_.currentSlide];
            _.slider.animate({'margin-left': newOffset+'px'}, _.animTime, function() {});
            if (_.currentClass) { 
                _.slider.find('.'+_.currentClass).removeClass(_.currentClass);
                _.slider.eq(_.currentSlide).addClass(_.currentClass);
            };
        };
    };

    /* Method for moving to the previous slide */
    RSlider.prototype.prev = function() {
        if (_.currentSlide - 1 >= 0) {
            var newOffset = _.centerPoint - _.slidesPositions[--_.currentSlide];
            _.slider.animate({'margin-left': newOffset+'px'}, _.animTime, function() {});
            if (_.currentClass) { 
                _.slider.find('.'+_.currentClass).removeClass(_.currentClass);
                _.slider.eq(_.currentSlide).addClass(_.currentClass);
            };
        };
    };

    $.fn.rslider = function(options) {
        return this.each(function(index, element) {
            element.rslider = new RSlider(element, options);
        });
    };
    
    $.fn.rsNext = function() {
        return this.each(function(index, element) {
            element.rslider.next();
        });
    };
    
    $.fn.rsPrev = function() {
        return this.each(function(index, element) {
            element.rslider.prev();
        });
    };
}(jQuery));