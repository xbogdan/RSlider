$(document).ready(function() {
    x = $('.slider').rslider();
});

(function($) {
    RSlider = (function() {
        function RSlider(element, options) {
            _ = this;
            _.width =  options && options.width ? options.width : 500;
            _.element = element;
            _.slider = null;
            _.slidesCount = null;
            _.sliderMask = null;
            _.sliderBox = null;
            _.initialSlide = options && options.initialSlide ? options.initialSlide : null;
            _.currentSlide = null;
            _.currentClass = options && options.currentClass ? options.currentClass :  '';
            _.slidesPositions = [];
            _.centerPoint = _.width / 2;
            _.animTime = options && options.animationTime ? options.animationTime : 200;
            _.prevArrow = null;
            _.nextArrow = null;
            _.init();
        };
        return RSlider;
    }());

    RSlider.prototype.init = function() {
        /* Initialize variables */
        _.slides = $(_.element).children();
        _.slider = _.slides.wrapAll('<div class="rs-track" />').parent();
        _.sliderMask = _.slider.wrap('<div class="rs-mask" />').parent();
        _.sliderMask.css('width', _.width+'px');
        _.sliderBox = _.sliderMask.parent().addClass('rs');
        _.slidesCount = _.slides.length;
        if (!_.initialSlide) { _.initialSlide = Math.ceil(_.slidesCount / 2); }

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

        /* Center initial element */
        _.centerInitial();
        _.buildArrows();
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

    RSlider.prototype.buildArrows = function() {
        var arrows = $('<div class="rs-arrows" />');
        _.prevArrow = $('<a class="rs-arrow-left" />');
        _.nextArrow = $('<a class="rs-arrow-right" />');
        arrows.append(_.prevArrow);
        arrows.append(_.nextArrow);
        _.prevArrow.on('click', function(event) {
            event.preventDefault();
            _.prev();
        });
        _.nextArrow.on('click', function(event) {
            event.preventDefault();
            _.next();
        });
        _.sliderBox.append(arrows);
    };

    RSlider.prototype.initArrowsEvents = function() {

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