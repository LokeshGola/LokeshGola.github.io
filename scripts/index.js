/*=== Menu Show === */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && navId){
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
/*=== Scroll Reveal Animation === */

/*=== Scroll Home === */

/*=== Scroll About === */

/*=== Scroll Skills === */

/*=== Scroll Work === */