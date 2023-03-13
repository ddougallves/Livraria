

    const carousel = document.querySelector('.carousel');

    const carouselInner = carousel.querySelector('.carousel__inner');

    const arrowNext = carousel.querySelector('.carousel__control-icon--next');

    const arrowPrev = carousel.querySelector('.carousel__control-icon--prev');
    
    const indicatorsArea = carousel.querySelector('.carousel__indicators');

    let activeSlide = 0;

    let loop;

    let boundings;

    let initialPosition;

    let finalPosition;

    let x1;

    let x2;

    let isDragging = false;

    const cloneFirst = carousel.querySelectorAll('.carousel__link')[0].cloneNode(true);

    const cloneLast = carousel.querySelectorAll('.carousel__link')
    [carousel.querySelectorAll('.carousel__link').length - 1].cloneNode(true);

    carouselInner.append(cloneFirst);
    carouselInner.prepend(cloneLast);

    const allSlides = carousel.querySelectorAll('.carousel__link');

    const slideWidth = 100 / allSlides.length;

    let position = slideWidth;

    carouselInner.style.width = `${100 * allSlides.length}%`;
    carouselInner.style.transform = `translateX(-${position}%)`;

    allSlides.forEach((slide,index)=>{
        if(index <= allSlides.length - 3){
            const indicator = document.createElement('span');
            indicator.classList.add('carousel__indicator-item');
            if(index == 0){
                indicator.classList.add('carousel__indicator-item--active');
            }
            indicatorsArea.append(indicator);
        }

        slide.addEventListener('click',(e)=>{
            if(isDragging){
                e.preventDefault();
            }
        })

    });

    const allIndicators = indicatorsArea.querySelectorAll('.carousel__indicator-item');

    allIndicators.forEach((indicator,index)=>{

        if(carousel.classList.contains('carousel--active'))return;

        indicator.addEventListener('click',()=>{
            if(index > activeSlide){
                if(index - activeSlide > 1){
                    switchSlide('next',index)
                }else{
                    switchSlide('next',1)
                }
            }else if (index < activeSlide) {
                if(activeSlide - index > 1){
                    switchSlide('prev',activeSlide - index)
                }else{
                    switchSlide('prev',1)
                }
            }
        })
    })

    

    arrowNext.addEventListener('click',()=>{
        if(carousel.classList.contains('carousel--active'))return;
        switchSlide('next',1)
    })

    arrowPrev.addEventListener('click',()=>{
        if(carousel.classList.contains('carousel--active'))return;
        switchSlide('prev',1)
    })
    
    carouselInner.addEventListener('transitionend',checkIndex);

    carouselInner.addEventListener('pointerdown', e => {
        // carouselInner.setPointerCapture(e.pointerId)
        dragStart(e);

        carouselInner.addEventListener('pointermove',dragMove);
        carouselInner.addEventListener('pointerup',dragEnd);
        window.addEventListener('pointermove',dragMove);
        window.addEventListener('pointerup',dragEnd);
    })
    
    carousel.addEventListener('pointerenter',()=>{
        checkLoop('stop');
    })

    carousel.addEventListener('pointerleave',()=>{
        checkLoop('start');
    })

    checkLoop('start')

    function checkLoop(value){

        switch(value){
            case 'start':
                loop =  setInterval(()=>{
                            checkIndex();
                            switchSlide('next',1)
                        },5000)
                break;
            case 'stop':
                    clearInterval(loop)
                break;
        }
    }
    
    function dragStart(e) {

        boundings = carousel.getBoundingClientRect();
    
        x1 = e.clientX;
    
        initialPosition = position;
    
    }

    function dragMove(e) {

        if(!isDragging){
            isDragging = true;
        }

        x2 = x1 - e.clientX;

        finalPosition = initialPosition + ((x2 / carouselInner.offsetWidth) * 100);

        carouselInner.style.transform = `translateX(-${finalPosition}%)`;

        if(e.clientX >= boundings.right || e.clientX <= boundings.left) {
            dragEnd(e);
        }
        
    }

    function dragEnd(e) {

        // carouselInner.releasePointerCapture(e.pointerId);
        
        carouselInner.removeEventListener('pointerup',dragEnd,{once:true});
        carouselInner.removeEventListener('pointermove',dragMove,{once:true});
        window.removeEventListener('pointerup',dragEnd,{once:true});
        window.removeEventListener('pointermove',dragMove,{once:true});

        
        if(finalPosition > initialPosition) {

            if(x1 - e.clientX >= boundings.width / 2){
                switchSlide('next',1);
            }else {
                switchSlide('stay',1);
            }

        }else if (finalPosition < initialPosition) {
            
            if(e.clientX - x1 >= boundings.width / 2){
                switchSlide('prev',1);
            }else {
                switchSlide('stay',1);
            }
        }
        
    }

    function switchSlide(direction,jump) {

        carousel.classList.add('carousel--active');

        switch(direction) {
            case 'next':
                activeSlide += 1 * jump;
                position += slideWidth * jump;
                carouselInner.style.transform = `translateX(-${position}%)`;
                break;
            case 'prev':
                activeSlide -= 1 * jump;
                position -= slideWidth * jump;
                carouselInner.style.transform = `translateX(-${position}%)`;
                break;
            case 'stay':
                carouselInner.style.transform = `translateX(-${position}%)`;
                break;
        }

    }

    function checkIndex() {

        carousel.classList.remove('carousel--active');

        if(isDragging){
            isDragging = false;
        }

        switch(activeSlide){
            case -1:
                activeSlide = allSlides.length - 3;
                position = slideWidth * (allSlides.length - 2);
                carouselInner.style.transform = `translateX(-${position}%)`;
                break;
            case (allSlides.length - 2):
                activeSlide = 0;
                position = slideWidth;
                carouselInner.style.transform = `translateX(-${position}%)`;
                break;
        }

        indicatorsArea.querySelector('.carousel__indicator-item--active').classList.remove('carousel__indicator-item--active');
        indicatorsArea.querySelectorAll('.carousel__indicator-item')[activeSlide].classList.add('carousel__indicator-item--active');

    }


