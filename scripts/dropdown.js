function dropdown() {

    let allDropdown = document.querySelectorAll('.dropdown');

    function dropdownCollapse(dropdown,collapse,icon,height) {
        dropdown.classList.remove('dropdown--active');
        icon.classList.remove('fa-caret-up');
        icon.classList.add('fa-caret-down');
        collapse.style.display = 'none';
    }

    function dropdownExpand(dropdown,collapse,icon,height) {
        dropdown.classList.add('dropdown--active');
        icon.classList.remove('fa-caret-down');
        icon.classList.add('fa-caret-up');
        collapse.style.display = 'block';

    }

    allDropdown.forEach((item,index)=>{

        let toggle = item.querySelector('.dropdown__toggle');
        let collapse = item.querySelector('.dropdown__collapse');
        let nav = item.querySelector('.dropdown__nav');
        let height = nav.offsetHeight;
        let icon = item.querySelector('.dropdown__toggle-icon');

        item.setAttribute('data-Index',index);

        toggle.addEventListener('click',()=>{

            if(document.querySelector('.dropdown--active')){
                let current = document.querySelector('.dropdown--active');
                if(current.dataset.index != index) {
                    let collapse = current.querySelector('.dropdown__collapse');
                    let nav = current.querySelector('.dropdown__nav');
                    let height = nav.offsetHeight;
                    let icon = current.querySelector('.dropdown__toggle-icon');
                    dropdownCollapse(current,collapse,icon,height);
                } 
            }

            if(item.classList.contains('dropdown--active')){
                dropdownCollapse(item,collapse,icon,height);
            }else{
                dropdownExpand(item,collapse,icon,height);
            }

        })

    })

}


dropdown();