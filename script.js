'use strict';

const toggleButton = document.getElementsByClassName('menu-button')[0];
const navBarLinks = document.getElementsByClassName('nav-list');
const openModal = document.querySelectorAll('.btn--show-modal') ;
const modalShow = document.querySelector('.modal');
const closeModal = document.querySelector('.btn--close-modal');
const overlay = document.querySelector('.overlay');

toggleButton.addEventListener('click', function(){
    for(var i=0; i<navBarLinks.length; i++)
    navBarLinks[i].classList.toggle('active');
});

function openClick(){
    modalShow.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function closeBtn(){
    modalShow.classList.add('hidden');
    overlay.classList.add('hidden');
};
for (let i = 0; i < openModal.length; i++)
 openModal[i].addEventListener('click', openClick);
closeModal.addEventListener('click', closeBtn);
overlay.addEventListener('click', closeBtn);

// smooth scroll to each section
/*document.querySelectorAll('.nav-link').forEach (
    function(curNav){
        curNav.addEventListener('click', function(e){
            e.preventDefault();
            // console.log('sjksjkfL');
            const id = this.getAttribute('href');
            // the this keyword is pointing to the queryselector selected all the same as 'currentElement'
            // console.log(id);
           document.querySelector(id).scrollIntoView({behavior: 'smooth'});

        });
         
    }
); */
// ideal method for smooth scroll
document.querySelector('.ul-navs').addEventListener(
    'click', function(e){
        e.preventDefault();
        console.log(e.target)

        // matching sretegy
        if(e.target.classList.contains('nav-link')){
            const id= e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({behavior: 'smooth'});

        }
    }
);
// sticky navbar
const head = document.querySelector('.home-title');
const nav = document.querySelector('.nav');

const callback = function(entries){
    const [entry]= entries;
    console.log(entry)
    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');

};
const observenav = new IntersectionObserver(callback, {
    root:null,
    threshold:0

}) ;
observenav.observe(head);
// reveal sections
const allSection = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
    const [entry] =entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)

};
const sectionObserve = new IntersectionObserver(revealSection, {
    root:null,
    threshold:0.15
});
allSection.forEach(function(sec){
    sectionObserve.observe(sec);
    sec.classList.add('section--hidden');
})

// tab for office section

const tabs = document.querySelectorAll('.operations-tab');
const tabContainer = document.querySelector('.operations-tab-container');
const  tabContent = document.querySelectorAll('.operations-content');

tabContainer.addEventListener('click', function(e){
    const click = e.target.closest('.operations-tab');
    console.log(click)
  
    // guard clause
    if(!click) return; 
    tabs.forEach(eachT => eachT.classList.remove('operations-tab--active'));
    tabContent.forEach(curC => curC.classList.remove('operations-content--active'));
  // activate tab
    click.classList.add('operations-tab--active');
    console.log(click.dataset.tab)
    document.querySelector(`.operations-content--${click.dataset.tab}`).classList.add('operations-content--active');

});

// testimonials
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider-btn--left');
const btnRight = document.querySelector('.slider-btn--right');

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function(slide){
  slides.forEach((s,i) => (s.style.transform = `translateX(${100
    * (i - slide)}%)`)
    );
};
goToSlide(0);

// next slide
const nextSlide = function (){
  if (curSlide === maxSlide - 1){
    curSlide = 0;
  }else{
    curSlide++;
  }
  goToSlide(curSlide);
};
// prev slide
 const prevSlide = function(){
  if ( curSlide === 0){
    curSlide = maxSlide - 1;
}else{
  curSlide--;
}
goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
})

  
