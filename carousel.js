document.addEventListener('DOMContentLoaded', function () {

    let track = document.querySelector('.carousel-track');
    //let slides = document.querySelectorAll('.carousel-slide');
    let slides = Array.from(track.children);
    let nextBtn = document.querySelector('.right');
    let prevBtn = document.querySelector('.left');
    let dotsNav = document.querySelector('.carousel-nav');
    //let dots = document.querySelectorAll('.carousel-indicator');
    let dots = Array.from(dotsNav.children);
    //let dots = Array.prototype.slice.call(document.querySelectorAll('.carousel-indicator'));

    let slideWidth = slides[0].getBoundingClientRect().width; // get the first element in the array and store the width in a variable

    // arrange the slides next to each other
    let setSlidePosition = function (slide, index) {
        slide.style.left = slideWidth * index + 'px';
    }

    slides.forEach(setSlidePosition);

    let moveToSlide = function (track, currentSlide, targetSlide) {
        let amountToMove = targetSlide.style.left;

        track.style.transform = 'translateX(-' + amountToMove + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    let updateDots = function (currentDot, targetDot) {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    let updateNextPrevBtns = function (slides, targetIndex, nextBtn, prevBtn) {
        if (targetIndex === 0) {
            prevBtn.classList.add('is-hidden');
            nextBtn.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            nextBtn.classList.add('is-hidden');
            prevBtn.classList.remove('is-hidden');
        } else {
            nextBtn.classList.remove('is-hidden');
            prevBtn.classList.remove('is-hidden');
        }
    }

    // when I click left, move slides to the left
    prevBtn.addEventListener('click', function () {
        let currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        let currentDot = dotsNav.querySelector('.current-slide');
        let prevDot = currentDot.previousElementSibling;
        let prevIndex = slides.findIndex(function (slide) {
            return slide === prevSlide;
        });

        // move to the previous slide
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        updateNextPrevBtns(slides, prevIndex, nextBtn, prevBtn);
    });

    // when I click right, move slides to the right
    nextBtn.addEventListener('click', function () {
        let currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        let currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;
        let nextIndex = slides.findIndex(function (slide) {
            return slide === nextSlide;
        });

        // move to the next slide
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        updateNextPrevBtns(slides, nextIndex, nextBtn, prevBtn);
    });

    // when I click a nav indicator, move to that slide
    dotsNav.addEventListener('click', function (event) {
        // what indicator was clicked on?
        let targetDot = event.target.closest('button');
        if (!targetDot) return;

        let currentSlide = track.querySelector('.current-slide');
        let currentDot = dotsNav.querySelector('.current-slide');
        let targetIndex = dots.findIndex(function (dot) {
            return dot === targetDot;
        });
        let targetSlide = slides[targetIndex];

        // move to slide and update indicator active class
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        updateNextPrevBtns(slides, targetIndex, nextBtn, prevBtn);
    });

});