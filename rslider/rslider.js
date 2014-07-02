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
            _.arrows = options && options.arrows ? options.arrows : 'sides' ;
            _.initialSlide = options && options.initialSlide ? options.initialSlide : null;
            _.currentSlide = null;
            _.currentClass = options && options.currentClass ? options.currentClass :  '';
            _.slidesPositions = [];
            _.centerPoint = _.width / 2;
            _.animTime = options && options.animationTime ? options.animationTime : 200;
            _.prevArrow = null;
            _.nextArrow = null;
            _.transitionType = null;
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
        _.sliderBox = _.sliderMask.parent().addClass('rs').css('width', _.width+'px');
        _.slidesCount = _.slides.length;
        if (!_.initialSlide) { _.initialSlide = Math.ceil(_.slidesCount / 2); }

        if (document.body.style.MozTransform !== undefined) {
            _.transitionType = "-moz-transform";
        } else if (document.body.style.webkitTransform !== undefined) {
            _.transitionType = "-webkit-transform";
        } else if (document.body.style.msTransform !== undefined) {
            _.transitionType = "-ms-transform";
        } else {
            _.transitionType = "transform";
        }

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
        _.changeSlide('initial');
        if (_.arrows === 'bottom' || _.arrows === 'sides') {
            _.buildArrows(_.arrows);
        }
    };

    RSlider.prototype.changeSlide = function(action) {
        switch(action) {
            case 'next': 
                if (_.currentSlide + 1 < _.slidesCount) {
                    var newOffset = _.centerPoint - _.slidesPositions[++_.currentSlide];
                    _.slider.animate({ whyNotToUseANonExistingProperty: newOffset }, { 
                        step: function(now) {
                            $(this).css(_.transitionType, 'translate3d('+now+'px, 0px, 0px)')
                        },
                        duration: _.animTime
                    }, 'linear');
                    if (_.currentClass) { 
                        _.slider.find('.'+_.currentClass).removeClass(_.currentClass);
                        _.slider.eq(_.currentSlide).addClass(_.currentClass);
                    };
                };
                break;
            case 'prev': 
                if (_.currentSlide - 1 >= 0) {
                    var newOffset = _.centerPoint - _.slidesPositions[--_.currentSlide];
                    _.slider.animate({ whyNotToUseANonExistingProperty: newOffset }, { 
                        step: function(now) {
                            $(this).css(_.transitionType, 'translate3d('+now+'px, 0px, 0px)')
                        },
                        duration: _.animTime
                    }, 'linear');
                    if (_.currentClass) { 
                        _.slider.find('.'+_.currentClass).removeClass(_.currentClass);
                        _.slider.eq(_.currentSlide).addClass(_.currentClass);
                    };
                };
                break;
            case 'initial':
                if (_.initialSlide) {
                    var newOffset = _.centerPoint - _.slidesPositions[_.initialSlide];
                    _.slider.animate({ whyNotToUseANonExistingProperty: newOffset }, { 
                        step: function(now) {
                            $(this).css(_.transitionType, 'translate3d('+now+'px, 0px, 0px)')
                        },
                        duration: 0
                    }, 'linear');
                    if (_.currentClass) { _.slides.eq(_.initialSlide).addClass(_.currentClass) }
                    _.currentSlide = _.initialSlide;
                };
                break;
        }

    }
    RSlider.prototype.buildArrows = function(position) {
        if (position === undefined || position === '') return;
        _.prevArrow = $('<a class="rs-arrow-left" />');
        _.nextArrow = $('<a class="rs-arrow-right" />');
        if (position === 'bottom') {
            var arrows = $('<div class="rs-arrows" />');
            arrows.append(_.prevArrow);
            arrows.append(_.nextArrow);
            _.sliderBox.append(arrows);
            _.initArrowsEvents();
        }
        if (position === 'sides') {
            _.prevArrow.addClass('rs-arrow-abs');
            _.nextArrow.addClass('rs-arrow-abs');
            _.sliderBox.append(_.prevArrow);
            _.sliderBox.append(_.nextArrow);
            _.initArrowsEvents();
        }
    };

    RSlider.prototype.initArrowsEvents = function() {
        if (_.prevArrow === null || _.nextArrow === null) return;
        _.prevArrow.on('click', function(event) {
            event.preventDefault();
            _.changeSlide('prev');
        });
        _.nextArrow.on('click', function(event) {
            event.preventDefault();
            _.changeSlide('next');
        });
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