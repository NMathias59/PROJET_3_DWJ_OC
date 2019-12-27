class Carousel {
    currentItem;
    options;

    /**
     * @param {HTMLElement} element
     * @param {object} options
     * @param {object} [options.slideToScroll=1] Number of items to scroll
     * @param {object} [options.slideVisible=1] Number of visible element in a slide
     * @param {boolean} [options.loop=false] must we buckle at the end of the slide

     */


    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1,
            loop: false
        }, options);

        let children = [].slice.call(element.children);
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');

        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.moveCallback = [];
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item
        });
        this.setStyle();
        this.createNavigation();
        this.moveCallback.forEach(cb => cb(0));
        this.startTimerSlide();
        ``
    }

    /**
     * Applies the right dimensions to the carousel elements
     */
    setStyle() {
        let ratio = this.items.length / this.options.slideVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => {
            item.style.width = ((100 / this.options.slideVisible) / ratio) + "%"

        });
    }

    /**
     *
     */
    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        this.pauseButtonHandler();
        if (this.options.loop === true) {
            return
        }
        this.onMove(index => {
            if (index === 0) {
                prevButton.classList.add('carousel__prev--hidden')
            } else {
                prevButton.classList.remove('carousel__prev--hidden')
            }
            if (this.items[this.currentItem + this.options.slideVisible] === undefined) {
                nextButton.classList.add('carousel__next--hidden')
            } else {
                nextButton.classList.remove('carousel__next--hidden')
            }
        });
    }

    next() {
        this.gotoItem(this.currentItem + this.options.slideToScroll)
    }

    prev() {
        this.gotoItem(this.currentItem - this.options.slideToScroll)
    }

    /*
    *
    */

    startTimerSlide() {
        this.interval = setInterval(this.next.bind(this), 5000);

    }

    stopTimerSlide() {
        if (this.isTimerSlideStarted()) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    isTimerSlideStarted() {
        return this.interval !== undefined && this.interval !== null;
    }

    pauseButtonHandler() {
        let pauseSlide = document.getElementById('pause_slide');

        pauseSlide.addEventListener('click', () => {

            if (this.isTimerSlideStarted()) {
                this.stopTimerSlide();
                pauseSlide.innerText = 'Démarrer';
            } else {
                this.startTimerSlide();
                pauseSlide.innerText = 'Arrêter';
            }
        });
    }


    /**
     * Move the carousel to the targeted element :
     * @param {number} index
     */
    gotoItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.slideVisible;
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slideVisible] === undefined && index > this.currentItem) {
            index = 0
        }
        let translateX = index * -100 / this.items.length

        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index
        this.moveCallback.forEach(cb => cb(index))
    }

    /**
     * @param {Carousel-moveCallback} cb
     */
    onMove(cb) {
        this.moveCallback.push(cb)
    }


    /**
     * @param {string} className
     * @returns {HTMLElement}
     */
    createDivWithClass(className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
}




    new Carousel(document.querySelector('#carousel1'), {
        slideVisible: 2,
        slideToScroll: 1,
        loop: true
    })

