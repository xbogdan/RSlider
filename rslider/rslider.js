/*
 * RSlider
 *
 * Github source code:
 * https://github.com/xbogdan/RSlider/
 *
 * Copyright (c) 2014 - Bogdan Boamfa
 *
 * License MIT
 *
 * Version:  v1.0
 * Last update: 2015-01-20
 */
(function($) {
    RSlider = (function() {
        function RSlider(element, options) {
            var _ = this;
            _.width =  options && options.width ? options.width : 500;
            _.element = element;
            _.slides = null;
            _.slider = null;
            _.slidesCount = null;
            _.sliderMask = null;
            _.sliderOverlay = options && options.overlay ? options.overlay : null;
            _.sliderOverlayClass = options && options.overlayClass ? options.overlayClass : '';
            _.sliderBox = null;
            _.dots = options && options.dots ? options.dots : false;
            _.arrows = options && options.arrows === false ? false : (options && options.arrows === undefined ? 'sides' : options.arrows);
            _.initialSlide = options && options.initialSlide ? options.initialSlide : null;
            _.currentSlide = null;
            _.currentClass = options && options.currentClass ? options.currentClass :  '';
            _.slidesPositions = [];
            _.centerPoint = _.width / 2;
            _.animTime = options && options.animationTime ? options.animationTime : 200;
            _.prevArrow = null;
            _.nextArrow = null;
            _.transitionType = null;
            _.dotsArray = [];
            _.init();
        };
        return RSlider;
    }());

    RSlider.prototype.init = function() {
        /* Initialize variables */
        var _ = this;
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
            element.addClass('rs-track-item');
            if (element.hasClass(_.currentClass)) {
                var elementAlreadyHasCurrentClass = true;
                var elementThatAlreadyHasCurrentClass = element;
            };
            if (_.currentClass) { element.addClass(_.currentClass); };
            _.slidesPositions.push(
                element.position().left + 
                element.width()/2 + 
                parseInt(element.css('margin-left'), 10) + 
                parseInt(element.css('padding-left'), 10) + 
                parseInt(element.css('border-left-width'), 10)
            );
            if (_.currentClass) { element.removeClass(_.currentClass); };
        };

        if (elementAlreadyHasCurrentClass) { elementThatAlreadyHasCurrentClass.addClass(_.currentClass); };

        /* Center initial element */
        _.changeSlide('initial');

        /* Add overlay image */
        if (_.sliderOverlay) {
            var overlay = $('<div class="rs-overlay" />').addClass(_.sliderOverlayClass).css('height', _.slider.height());
            _.sliderMask.prepend(overlay);
        }

        /* Add arrows */
        if (_.arrows === 'bottom' || _.arrows === 'sides') {
            _.buildArrows(_.arrows);
        }

        /* Add dots */
        if (_.dots) {
            _.buildDots();
        }
    };

    RSlider.prototype.changeSlide = function(action, slideNr) {
        var _ = this;
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
                        _.slides.eq(_.currentSlide-1).removeClass(_.currentClass);
                        _.slides.eq(_.currentSlide).addClass(_.currentClass);
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
                        _.slides.eq(_.currentSlide+1).removeClass(_.currentClass);
                        _.slides.eq(_.currentSlide).addClass(_.currentClass);
                    };
                };
                break;
            case 'initial':
                if (typeof _.initialSlide == 'number') {
                    var newOffset = _.centerPoint - _.slidesPositions[_.initialSlide];
                    _.slider.animate({ whyNotToUseANonExistingProperty: newOffset }, { 
                        step: function(now) {
                            $(this).css(_.transitionType, 'translate3d('+now+'px, 0px, 0px)')
                        },
                        duration: 0
                    }, 'linear');
                    if (_.currentClass) { 
                        _.slider.find('.'+_.currentClass).removeClass(_.currentClass);
                        _.slides.eq(_.initialSlide).addClass(_.currentClass);
                    }
                    _.currentSlide = _.initialSlide;
                };
                if (typeof _.initialSlide == 'string') {
                    for (var i = 0; i < _.slidesCount; i++) {
                        if ($(_.slides[i]).hasClass(_.initialSlide)) {
                            _.initialSlide = i;
                            _.changeSlide('initial');
                            break;
                        };
                    };
                };
                break;
            case 'jump': 
                if (slideNr === undefined || slideNr < 0 || slideNr >= _.slidesCount) return;
                _.currentSlide = slideNr;
                var newOffset = _.centerPoint - _.slidesPositions[_.currentSlide];
                _.slider.animate({ whyNotToUseANonExistingProperty: newOffset }, { 
                    step: function(now) {
                        $(this).css(_.transitionType, 'translate3d('+now+'px, 0px, 0px)')
                    },
                    duration: _.animTime
                }, 'linear');
                if (_.currentClass) { 
                    _.slider.find('.'+_.currentClass).removeClass(_.currentClass);
                    _.slides.eq(_.currentSlide).addClass(_.currentClass);
                };
                break;
        };

        /* Update dots when the current slide changes */
        if (_.dots) {
            for (var i = 0; i < _.dotsArray.length; i++) {
                if (i === _.currentSlide) {
                    _.dotsArray[i].addClass('rs-dot-active');
                } else {
                    _.dotsArray[i].removeClass('rs-dot-active');
                };
            };
        };
    };

    RSlider.prototype.getCurrentSlide = function(position) {
        var _ = this;
        return $(_.slides[_.currentSlide]);
    };

    RSlider.prototype.buildArrows = function(position) {
        if (position === undefined || position === '') return;
        var _ = this;
        _.prevArrow = $('<a class="rs-arrow-left" />');
        _.nextArrow = $('<a class="rs-arrow-right" />');
        if (position === 'bottom') {
            var arrows = $('<div class="rs-arrows" />');
            arrows.append(_.prevArrow);
            arrows.append(_.nextArrow);
            _.sliderBox.append(arrows);
            _.initArrowsEvents();
        };
        if (position === 'sides') {
            _.prevArrow.addClass('rs-arrow-abs');
            _.nextArrow.addClass('rs-arrow-abs');
            _.sliderBox.append(_.prevArrow);
            _.sliderBox.append(_.nextArrow);
            _.initArrowsEvents();
        };
    };

    RSlider.prototype.initArrowsEvents = function() {
        var _ = this;
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

    RSlider.prototype.buildDots = function() {
        var _ = this;
        var dots = $('<div class="rs-dots" />');
        for (var i = 0; i < _.slidesCount; i++) {
            var dot = $('<a class="rs-dot" />').data('slide-nr', i);
            if (i === _.currentSlide) {
                dot.addClass('rs-dot-active');
            };
            dot.on('click', function(event) {
                event.preventDefault();
                _.changeSlide('jump', $(this).data('slide-nr'));
                $(this).parents('.rs-dots').find('.rs-dot-active').removeClass('rs-dot-active');
                $(this).addClass('rs-dot-active');
            });
            _.dotsArray.push(dot);
            dots.append(dot);
        }
        _.sliderBox.append(dots);
    };

    $.fn.rslider = function(options) {
        return this.each(function(index, element) {
            element.rslider = new RSlider(element, options);
        });
    };
    
    $.fn.rsNext = function() {
        return this.each(function(index, element) {
            element.rslider.changeSlide('next');
        });
    };
    
    $.fn.rsPrev = function() {
        return this.each(function(index, element) {
            element.rslider.changeSlide('prev');
        });
    };

    $.fn.rsResetSlide = function() {
        return this.each(function(index, element) {
            element.rslider.changeSlide('initial');
        });
    };

    $.fn.rsJumpTo = function(slideNr) {
        return this.each(function(index, element) {
            element.rslider.changeSlide('jump', slideNr);
        });
    };

    $.fn.rsGetCurrentSlide = function() {
        return this.get(0).rslider.getCurrentSlide();
    };    
}(jQuery));