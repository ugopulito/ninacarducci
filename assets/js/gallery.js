document.addEventListener('DOMContentLoaded',function() {
    let currentIndex = 0;
    let items = Array.from(document.querySelectorAll('.gallery-item'));
    let activeFilter = 'Tous';
    
    const createFilters = () => {
        let filters = new Set()
        for (let i of items){
            filters.add(i.dataset.galleryTag)
        }
        console.log(filters);
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
                //Remove active class on old filter
                for (const f of filters) {
                    if(f.classList.contains('active')){
                        f.classList.remove('active')
                    }
                }
                //Set new filter
                e.target.classList.add('active');
                activeFilter = e.target.innerText;
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
                console.log(items);
                console.log(filteredItems);
            })
        }
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
        document.querySelector('body').style.overflow = 'hidden';
        //init modale container
        let modale = document.createElement('div');
        modale.classList.add('modale');
        document.querySelector('.gallery').append(modale);
        //init image preview
        let preview = document.createElement('img');
        preview.classList.add('preview');
        preview.setAttribute('src', e[currentIndex].src);
        //modale display
        modale.append(preview);
        preview.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
        })
        modale.addEventListener('click', () => {
            modale.remove();
            document.querySelector('body').removeAttribute('style');
        })
        //modale navigation
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
        });
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
        })
        
    }
    
    
    createFilters(); 
    targetItem();
    changeActiveFilter();
    
    });