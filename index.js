




// document.addEventListener('mouseover', e => {
//     let tar = e.target;
//     console.log('%c tar:', 'background: #ffcc00; color: #003300', tar)
// })



// ---------------------------------------
// ---------------------------------------
// ---------------------------------------


let caniSee = item => { // sprawdza czy obszar jest widoczny na ekranie
    let pos = item.getBoundingClientRect();
    if (item.getAttribute('data-a') != 'on'
        && ((pos.top > 0 && pos.top < window.innerHeight)
            && (pos.bottom > 0 && pos.bottom < window.innerHeight))) {

        item.setAttribute('data-a', 'on');
        return true
    }
    return false
}
let caniSeeIcon = item => { // sprawdza czy obszar jest widoczny na ekranie
    let pos = item.getBoundingClientRect();
    if (item.getAttribute('data-i') != 'on'
        && ((pos.top > 0 && pos.top < window.innerHeight)
            || (pos.bottom > 0 && pos.bottom < window.innerHeight))) {

        item.setAttribute('data-i', 'on');
        return true
    }
    return false
}


let f_fit_imgs = () => { // dopasowywanie zjęć do wielkości parenta
    for (let fi of fit_imgs) {
        // console.log('%c fi:', 'background: #ffcc00; color: #003300', fi)
        let rect = fi.parentElement.getBoundingClientRect();
        let h = rect.height;
        let w = rect.width;
        let p = fi.naturalHeight / fi.naturalWidth;

        if (h > w) {
            if (p > h / w) {
                fi.style.width = h + 'px';
                fi.style.height = h * p + 'px';
            } else {
                fi.style.width = h / p + 'px';
                fi.style.height = h + 'px';
            }
        } else {
            if (p > h / w) {
                fi.style.width = w + 'px';
                fi.style.height = w * p + 'px';
            } else {
                fi.style.width = w / p + 'px';
                fi.style.height = w + 'px';
            }
        }
    }
}


let allImg = document.querySelectorAll('img');
for (let img of  allImg) {
    let src = img.getAttribute('data-src');
    if (src) {
        img.src = src;
    }
}


// ---tests----

document.addEventListener('keypress', e => {
    // let key = e.code;
    // console.log('%c key:', 'background: #ffcc00; color: #003300', e)

    const elems = document.querySelectorAll('.let_anim');
    let list = [];
    for (let e of elems) {
        let pos = e.getBoundingClientRect();
        list.push([pos.top, pos.bottom]);
        let test = e.querySelector('.text').innerHTML;
        // console.log('%c test:', 'background: #ffcc00; color: #003300', test)
    }
    // console.table(list)

});

const win_resize_func = [];

const cbnr_animations = {
    anim_on_1: (item, left, animation) => { // 0
        let drive_img = item.querySelector('.cbnr_drive');
        drive_img.classList.add(animation || 'cbnr_drive_anim');

        setTimeout(() => {
            drive_img.style.left = left || '6%'
        }, 30);

        let promo = item.querySelector('.cbnr_promo');
        promo.classList.add('cbnr_promo_anim');
        promo.style.setProperty('animation-duration', 1.8 + Math.random() * .5 + 's');
    },
    anim_off_1: (item, animation) => {
        let drive_img = item.querySelector('.cbnr_drive');
        drive_img.classList.remove(animation || 'cbnr_drive_anim');
        drive_img.style.left = '-100%'

        let promo = item.querySelector('.cbnr_promo');
        promo.classList.remove('cbnr_promo_anim');
    }
}

const cool_baner = {
    breakWidth: 757,
    isItPhone: () => {
        let portrait = document.getElementById('phone_orientation_tester').getBoundingClientRect().width;
        let ua = navigator.userAgent;
        return ua.match(/(iPhone|Android)/) && portrait;
    },
    showOne: () => !((window.innerWidth < cool_baner.breakWidth
        || window.screen.availWidth < cool_baner.breakWidth)
        || cool_baner.isItPhone()),
    getStep: () => cool_baner.showOne() ? 50 : 100,
    isVisible: (item) => { // sprawdza czy obszar jest widoczny na ekranie
        let pos = item.getBoundingClientRect();
        if (((pos.top > 0 && pos.top < window.innerHeight)
            || (pos.bottom > 0 && pos.bottom < window.innerHeight))) {

            return true
        }
        return false
    },
    animations_1: [
        {
            on: item => cbnr_animations.anim_on_1(item),
            off: cbnr_animations.anim_off_1
        },
        {
            on: item => cbnr_animations.anim_on_1(item, '1%', 'cbnr_drive_anim_2'),
            off: item => cbnr_animations.anim_off_1(item, 'cbnr_drive_anim_2')
        },
        {
            on: item => cbnr_animations.anim_on_1(item, '3%', 'cbnr_drive_anim_3'),
            off: item => cbnr_animations.anim_off_1(item, 'cbnr_drive_anim_3')
        },
        {
            on: item => cbnr_animations.anim_on_1(item, '3%', 'cbnr_drive_anim_3'),
            off: item => cbnr_animations.anim_off_1(item, 'cbnr_drive_anim_3')
        },
        {
            on: item => cbnr_animations.anim_on_1(item, '3%', 'cbnr_drive_anim_3'),
            off: item => cbnr_animations.anim_off_1(item, 'cbnr_drive_anim_3')
        },
        {
            on: item => cbnr_animations.anim_on_1(item, '1%', 'cbnr_drive_anim_2'),
            off: item => cbnr_animations.anim_off_1(item, 'cbnr_drive_anim_2')
        }
    ],
    showItems: (bnr, items) => {
        let radio = bnr.querySelectorAll('.cbnr_radio');
        let anim;
        // console.log('%c bnr.id:', 'background: #ffcc00; color: #003300', items[0].closest('.cool_baner').id)
        switch (items[0].closest('.cool_baner').id) {
            case 'cbnr_first': anim = cool_baner.animations_1; break;
            default: anim = null;
        }
        // console.log('%c anim:', 'background: #ffcc00; color: #003300', anim)

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            active = it.getAttribute('data-active');
            if (active == 'yes') {
                radio[i].classList.add('cbnr_radio_on')
                it.style.visibility = 'visible';
                it.style.opacity = '1';
                if (anim && anim[i]) {
                    let order = it.getAttribute('data-order');

                    // console.log('%c anim:', 'background: #ffcc00; color: #003300', anim)
                    setTimeout(() => {
                        anim[i].on(it)
                    }, !(order == '1' && cool_baner.showOne()) ? 300 : 1200);
                }
            } else {
                radio[i].classList.remove('cbnr_radio_on')
                it.style.opacity = '0';
                setTimeout(() => {
                    it.style.visibility = 'hidden';
                    if (anim && anim[i]) {
                        anim[i].off(it)
                    }
                }, 520);
            }
        }
    },
    expandActiv: (items) => {
        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            let many = cool_baner.showOne();

            let active = it.getAttribute('data-active');
            // console.log('%c active:', 'background: #ffcc00; color: #003300', active)
            if (active == 'yes') {
                if (many) {
                    if (!(i % 2)) {
                        items[i + 1].setAttribute('data-active', 'yes')
                    } else {
                        items[i - 1].setAttribute('data-active', 'yes')
                    }
                } else {
                    if (items[i + 1]) {
                        items[i + 1].setAttribute('data-active', '')
                    }
                    if (items[i - 1]) {
                        items[i - 1].setAttribute('data-active', '')
                    }
                }
            }
        }
    },
    replaceItems: (bnr) => {
        let step = cool_baner.getStep();
        let many = cool_baner.showOne();
        let iW = many ? '50%' : '100%';
        let items = bnr.querySelectorAll('.cbnr_item');

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            let order = Number(it.getAttribute('data-order'));
            items[i].style.left = (many ? order * step : 0) + '%';
            items[i].style.width = iW;

        }
        cool_baner.expandActiv(items);
        cool_baner.showItems(bnr, items);
        bnr.style.fontSize = document.body.getBoundingClientRect().width / (many ? 50 : 25) + 'px'
    },
    fit: (bnr) => {
        // let cbnr = document.querySelector('.cool_baner')
        let bnrL = bnr.querySelector('.cbnr_left');
        let bnrR = bnr.querySelector('.cbnr_right');
        let butto = bnr.querySelector('.cbnr_buttons');
        let rect = bnr.getBoundingClientRect();
        let w = rect.width;
        let d = Number(bnr.getAttribute('data-h')) / 100;

        let p = cool_baner.showOne() ? d : d * 2;
        let h = w * p + 'px';
        bnr.style.height = h;
        bnrL.style.height = h;
        bnrR.style.height = h;

        // let butoH = w * .1 + 'px';
        // butto.style.height = butoH;
        butto.style.top = h;
        bnr.style.marginBottom = '26px';

        cool_baner.replaceItems(bnr);
        // cool_baner.isItPhone
        // console.log('%c cool_baner.isItPhone:', 'background: #ffcc00; color: #003300', cool_baner.isItPhone())
        // window.screen.width
    },
    touchStartX: null,
    start: () => {
        let cbnrs = document.querySelectorAll('.cool_baner')

        const checkVisibility = item => {
            let anim = cool_baner.isVisible(item) ? 'on' : '';
            item.setAttribute('data-anim', anim);
        }

        for (let bnr of cbnrs) {
            let touchend = e => {
                // console.log('%c clientX:', 'background: red; color: #003300', e)
                bnr.removeEventListener('touchmove', touchmove)
                bnr.removeEventListener('touchend', touchend)
            }

            let touchmove = e => {
                // console.log('%c clientX:', 'background: yellow; color: #003300', e.changedTouches[0].clientX)
                let distance = cool_baner.touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(distance) > window.innerWidth / 5) {
                    // console.log('%c jest OK !!! ', 'background: green; color: #003300', distance)
                    if (distance > 0) {

                        cool_baner.left(e.originalTarget);
                    } else {

                        cool_baner.right(e.originalTarget);
                    }
                    touchend(e);
                }
            }
            let touchstart = e => {
                // console.log('%c clientX:', 'background: green; color: #003300', e)
                cool_baner.touchStartX = e.changedTouches[0].clientX;

                bnr.addEventListener('touchmove', touchmove)
                bnr.addEventListener('touchend', touchend)
            }
            bnr.addEventListener('touchstart', touchstart);

            checkVisibility(bnr);

            let buto = bnr.querySelector('.cbnr_buttons');
            // console.log('%c buto:', 'background: #ffcc00; color: #003300', buto)
            let items = bnr.querySelectorAll('.cbnr_item');

            let index = 0;
            for (let i = 0; i < items.length; i++) {
                if (index > 1) { index = 0 }

                let it = items[i];
                it.setAttribute('data-order', index);
                index++;

                let active = i == 0 ? 'yes' : '';
                it.setAttribute('data-active', active);

                // tworzenie przycisków
                let newBut = document.createElement('div');
                newBut.className = 'cbnr_radio' + (i % 2 ? ' cbnr_second' : '');
                newBut.setAttribute('onclick', 'cool_baner.click(this, ' + i + ')');
                buto.appendChild(newBut);


                setTimeout(() => {
                    it.style.setProperty('transition', 'opacity .5s');
                }, 20);
            }
            cool_baner.fit(bnr);
        }

        setInterval(() => {
            for (let bnr of cbnrs) {
                checkVisibility(bnr)
            }
        }, 300);

        win_resize_func.push(() => {
            let cbnrs = document.querySelectorAll('.cool_baner')

            for (let bnr of cbnrs) {
                cool_baner.fit(bnr);
            }
        })
    },
    coolDown: false,
    right: item => {
        // if (cool_baner.coolDown == true) { return }
        // cool_baner.coolDown = true;
        let bnr = item.closest('.cool_baner');
        let items = bnr.querySelectorAll('.cbnr_item');
        let many = cool_baner.showOne();
        let move = many ? 2 : 1;

        let active;
        for (let i = 0; i < items.length; i++) {
            let it = items[i];

            if (it.getAttribute('data-active') == 'yes') {
                active = i;
                // console.log('%c i:', 'background: #ffcc00; color: #003300', i)
            }
        }

        if (active >= items.length - move) {
            items[0].setAttribute('data-active', 'yes')
        } else {
            items[active + move].setAttribute('data-active', 'yes')
            // console.log('%c move:', 'background: #ffcc00; color: #003300', move, many)
        }

        items[active].setAttribute('data-active', '')
        if (many) {
            items[active - 1].setAttribute('data-active', '')
        }

        setTimeout(() => {
            cool_baner.expandActiv(items);
            cool_baner.showItems(bnr, items);
        }, 20);
    },
    left: item => {
        // console.log('%c right:', 'background: #ffcc00; color: #003300')
        // if (cool_baner.coolDown == true) { return }
        // cool_baner.coolDown = true;
        let bnr = item.closest('.cool_baner');
        let items = bnr.querySelectorAll('.cbnr_item');
        let many = cool_baner.showOne();
        let move = many ? 2 : 1;

        let active;
        for (let i = 0; i < items.length; i++) {
            let it = items[i];

            if (it.getAttribute('data-active') == 'yes') {
                active = i;
                // console.log('%c i:', 'background: #ffcc00; color: #003300', i)
            }
        }

        // console.log('%c active:', 'background: #ffcc00; color: #003300', active)

        if (active == 0 || (many && active == 1)) {
            items[items.length - 1].setAttribute('data-active', 'yes')
        } else {
            items[active - move].setAttribute('data-active', 'yes')
            // console.log('%c move:', 'background: #ffcc00; color: #003300', move, many)
        }

        items[active].setAttribute('data-active', '')
        if (many) {
            items[active - 1].setAttribute('data-active', '')
        }

        setTimeout(() => {
            cool_baner.expandActiv(items);
            cool_baner.showItems(bnr, items);
        }, 20);
    },
    click: (item, num) => {
        // console.log('%c num:', 'background: #ffcc00; color: #003300', num)

        let bnr = item.closest('.cool_baner');
        let items = bnr.querySelectorAll('.cbnr_item');

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            if (i == num) {
                it.setAttribute('data-active', 'yes')
            } else {
                it.setAttribute('data-active', '')
            }
        }

        setTimeout(() => {
            cool_baner.expandActiv(items);
            cool_baner.showItems(bnr, items);
        }, 20);
    }
}

cool_baner.start();

window.onresize = () => {
    for (let wrf of win_resize_func) {
        wrf();
    }
}