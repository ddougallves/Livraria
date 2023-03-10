function navbar() {

    let nav = document.querySelector('.navbar__nav');

    let showNav = document.querySelector('.navbar__toggle--nav.navbar__toggle--show');

    let hideNav = document.querySelector('.navbar__toggle--nav.navbar__toggle--hide');

    showNav.addEventListener('click',()=>{
        nav.style.left = '0';
    })

    hideNav.addEventListener('click',()=>{
        nav.style.left = '-100%';
    }) 
    
}

navbar();