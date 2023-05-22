/*=== Menu Show === */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener("click", ()=>{
            nav.classList.toggle("show");
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*=== ACTIVE AND REMOVE MENU === */
const navLink = document.querySelectorAll(".nav-link");

function linkAction(){
    // active link
    navLink.forEach( n => n.classList.remove("active"));
    this.classList.add('active');
    // remove menu mobile
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach( n => n.addEventListener('click', linkAction))

/*==================== SHOW SCROLL TOP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=== Scroll Reveal Animation === */


/*=== Scroll Home === */
// sr.reveal('.home__title',{})
// sr.reveal('.button',{delay: 200})
// sr.reveal('.home-img',{delay: 400})
// sr.reveal('.home__social-icon',{interval: 200})

/*=== Scroll About === */
// sr.reveal('.about__img',{})
// sr.reveal('.about__subtitle',{delay: 200})
// sr.reveal('.about__text',{delay: 400})

/*=== Scroll Skills === */
// sr.reveal('.skills__subtitle',{})
// sr.reveal('.skills__text',{delay: 200})
// sr.reveal('.skills__data',{interval: 200})
// sr.reveal('.skills__img',{delay: 400})

/*=== Scroll Work === */
// sr.reveal('.work__img', {interval:200})

/*=== Scroll contact === */
// sr.reveal('.contact__input', {interval:200})