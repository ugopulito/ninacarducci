document.addEventListener('DOMContentLoaded',function() {
    let currentIndex = 0;
    let items = Array.from(document.querySelectorAll('.gallery-item'));
    let activeFilter = 'Tous';
    
    const createFilters = () => {
        let filters = new Set()
        for (let i of items){
            filters.add(i.dataset.galleryTag)
        }
        for (let f of filters) {
            let filter = document.createElement('li');
            filter.classList.add('nav-link');
            filter.innerText=f;
            document.querySelector('.filters').append(filter);
        }
    };
    
    const changeActiveFilter = () => {
        let filters = document.querySelectorAll('.nav-link');
        for (const f of filters) {
            f.addEventListener('click', (e) => {
                items = Array.from(document.querySelectorAll('.gallery-item'));
                //Remove active class on old filter
                for (const f of filters) {
                    if(f.classList.contains('active')){
                        f.classList.remove('active')
                    }
                }
                //Set new filter
                e.target.classList.add('active');
                activeFilter = e.target.innerText;
                //Hide items
                for (const i of items) {
                    i.removeAttribute('style');
                    if(activeFilter === 'Tous'){
                        i.removeAttribute('style');
                    }
                    else if(i.dataset.galleryTag != activeFilter){
                        i.style.display = 'none'
                    }
                }
                filterGalleryItems();
            })
        }
    }

    const filterGalleryItems = () => {
        //Filter gallery items
        let filteredItems = [];
        for (const i of items) {
            if(activeFilter === 'Tous'){
                filteredItems = items;
            }
            else if(i.dataset.galleryTag === activeFilter){
                filteredItems.push(i);
            }
        }
        //Update items list for modale preview
        items = filteredItems;
    }
    
    const targetItem = () => {
        for (const element of items) {
            element.addEventListener('click', () => {
                currentIndex = items.indexOf(element);
                initModale(items);
            });
        }
    };
    
    const initModale = (e) => {
        //Init modale container
        let modale = document.createElement('div');
        modale.classList.add('modale');
        document.querySelector('.gallery').append(modale);
        //Init image preview
        let preview = document.createElement('img');
        preview.classList.add('preview');
        preview.setAttribute('src', e[currentIndex].src);
        preview.setAttribute('alt', e[currentIndex].alt);
        //Freeze body on modale opening
        let body = document.querySelector('body')
        body.style.overflow = 'hidden';
        body.style.paddingRight = '17px';
        body.style.paddingTop = '15px';
        //Display modale
        modale.append(preview);
        preview.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
        })
        modale.addEventListener('click', () => {
            modale.remove();
            body.removeAttribute('style');
        })
        //Modale navigation
        let leftChevron = document.createElement('div');
        leftChevron.classList.add('chevron', 'previous')
        leftChevron.innerText = '<';
        modale.prepend(leftChevron);
        leftChevron.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            if(currentIndex>0){
                currentIndex = currentIndex-1;
            }
            else{
                currentIndex = items.length-1;
            }
            preview.setAttribute('src', e[currentIndex].src);
            preview.setAttribute('alt', e[currentIndex].alt);
        })

        let rightChevron = document.createElement('div');
        rightChevron.classList.add('chevron', 'next')
        rightChevron.innerText = '>';
        modale.append(rightChevron);
        rightChevron.addEventListener('click', (event) => {
            event.stopImmediatePropagation();        
            if(currentIndex<items.length-1)
            {
                currentIndex++;
            }
            else{
                currentIndex = 0;
            }
            preview.setAttribute('src', e[currentIndex].src);
            preview.setAttribute('alt', e[currentIndex].alt);
        });        
    }
    
    
    createFilters(); 
    changeActiveFilter();
    targetItem();
    
    });