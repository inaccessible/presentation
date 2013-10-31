
function Slider() {

    var self = this;

    self.selectedPres = null;


    self.opt = {
        multipleView: false,
        slideView: false
    };

    self.init = function () {

        self.buidPresintation();
        
        self.bindEvents();
    };

    self.buidPresintation = function () {
        // prev, current, next
        var $presentations = $('.sliderContainer');
        
        if(!$presentations.length > 0 ){
            console.error('No presentations were found.');
        }

        var selected = $presentations.filter('.selected');
        
        self.selectedPres = (selected.length > 0) ? selected : $($presentations.get(0));

        $.each($presentations, function () {

            var slides = $(this).find('.slide');

            if (slides.length < 1) {
                console.error("No slides were found");
            }

            $(slides.get(0)).addClass('current');
            $(slides.get(1)).addClass('next');
        });
    };

    self.moveBack = function () {
        var current = self.selectedPres.find('.slide.current');

        if (current)
            self.setCurrentSlide(current.prev('.slide'));
        
    };

    self.moveForward = function () {
        var current = self.selectedPres.find('.slide.current');

        var hidden = current.find('.nextStep');
        if (hidden.length > 0) {
            $(hidden.get(0)).removeClass('nextStep');
        } else {
            if (current)
                self.setCurrentSlide(current.next('.slide'));
        }

        
    };

    self.setCurrentSlide = function (slide) {
        if (slide.length > 0) {
            self.selectedPres.find('.slide').removeClass('prev next current slideView');

            slide.next('.slide').addClass('next');
            slide.prev('.slide').addClass('prev');

            slide.addClass('current');

            if (self.opt.slideView) {
                slide.addClass('slideView');
            }
        }
    };

    self.nextPresentation = function () {
        self.setCurrentPresentation(self.selectedPres.next('.sliderContainer'));
    };

    self.prevPresentation = function() {
        self.setCurrentPresentation(self.selectedPres.prev('.sliderContainer'));
    };

    self.setCurrentPresentation = function (presentation) {

        if (presentation.length > 0) {
            $('.sliderContainer').removeClass('prev next');
            presentation.addClass('selected');

            presentation.next('.sliderContainer').addClass('next').removeClass('prev selected');
            presentation.prev('.sliderContainer').addClass('prev').removeClass('next selected');

            self.selectedPres = presentation;
        }
    };

    self.toggleMultiple = function (e) {
        var isMultiple = self.opt.multipleView = !self.opt.multipleView;
        var $presentations = $('.sliderContainer');
        
        if (isMultiple) {
            $presentations.addClass('multiple');
            
            var next = self.selectedPres.next('.sliderContainer');
            
            if(next.length > 0)
                next.addClass('next');
            
        } else {
            $presentations.removeClass('multiple');
        }
    };
    
    self.setSlideView = function () {
        var isSlideView = self.opt.slideView = !self.opt.slideView;

        if (isSlideView) {
            self.selectedPres.find('.slide.current').addClass('slideView');
        } else {
            self.selectedPres.find('.slide.current').removeClass('slideView');
        }
    };

    self.bindEvents = function () {
        $(document).keydown(function (e) {
            switch (e.which) {
                case 37:
                    self.moveBack();
                    event.preventDefault();
                    break;

                case 38: // up
                    self.prevPresentation();
                    event.preventDefault();
                    break;

                case 39: // right
                    self.moveForward();
                    event.preventDefault();
                    break;

                case 40: // down
                    self.nextPresentation();
                    event.preventDefault();
                    break;
                case 32: // space
                    self.setSlideView();
                    event.preventDefault();
                    break;
            }
        });
 
        $('.toggleMultipleView').on('click', self.toggleMultiple);
        $('.prevSildeBtn').on('click', self.moveBack);
        $('.nextSlideBtn').on('click', self.moveForward);
        $('.fullViewBtn').on('click', self.setSlideView);
       
    };

    self.init();
    
    return self;
}

$(document).ready(function () {
    var sl = new Slider('test');
});
