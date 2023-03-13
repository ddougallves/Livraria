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

    let cart = ()=>{
        const offCanvas = document.querySelector('.cart--offcanvas');
        const show = document.querySelector('.navbar__toggle--cart.navbar__toggle--show')
        const hide = document.querySelector('.cart__toggle.cart__toggle--hide');

        show.addEventListener('click',()=>{
            offCanvas.style.left = '0';
        })

        hide.addEventListener('click',()=>{
            offCanvas.style.left = '-100%';
        })

    }

    cart();
    
}



navbar();