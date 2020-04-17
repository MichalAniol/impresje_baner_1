const win_resize_func = [];


const line_baner = {
    start: () => {
        line_baner.resize();
        win_resize_func.push(() => {
            line_baner.resize();
        })
    },
    sizeList: [
        [0, 9999999, 1200, 'zostań impresjonistą i zdobądź <b>20%</b> zniżki dla nowych klientów!', 'kod kuponu: <b>wiatmy</b>'],
        [0, 1200, 680, 'zostań impresjonistą i zdobądź <b>20%</b><br>zniżki dla nowych klientów!', 'kod kuponu:<br><b>wiatmy</b>'],
        [0, 680, 460, 'zostań impresjonistą i<br>zdobądź <b>20%</b> zniżki dla<br>nowych klientów!', 'kod<br>kuponu:<br><b>wiatmy</b>'],
        [1, 460, 0]
    ],
    animInterwal: null,
    resize: () => {
        let libnrw = document.querySelector('.line_wrap');
        let width = libnrw.getBoundingClientRect().width;
        let libnr = libnrw.querySelector('.line_baner');
        let libnrt = libnrw.querySelector('.line_baner_tight');

        for (let sl of line_baner.sizeList) {
            if (width < sl[1] && width >= sl[2]) {
                // console.log('%c width:', 'background: #ffcc00; color: #003300', width, sl[1], sl[2])
                clearInterval(line_baner.animInterwal);

                if (sl[0] == 0) {
                    libnr.style.display = '';
                    libnrt.style.display = 'none';

                    libnr.querySelector('.line_slogan').innerHTML = sl[3];
                    libnr.querySelector('.line_code_text').innerHTML = sl[4];
                }

                if (sl[0] == 1) {
                    libnr.style.display = 'none';
                    libnrt.style.display = '';

                    const li_slo_ti = document.querySelector('.line_slogan_tight');
                    const li_cod_ti = document.querySelector('.line_code_text_tight');

                    let li_slo_ti_H = li_slo_ti.getBoundingClientRect().height;
                    let li_cod_ti_H = li_cod_ti.getBoundingClientRect().height;
                    li_slo_ti.style.top = '0';
                    li_cod_ti.style.top = '0';

                    let cycle = 1;

                    line_baner.animInterwal = setInterval(() => {

                        switch (cycle) {
                            case 0: {
                                li_slo_ti.style.top = '0';
                                li_cod_ti.style.top = '0';
                                cycle = 1;
                            } break;
                            case 1: {
                                li_slo_ti.style.top = li_cod_ti_H + 'px';
                                li_cod_ti.style.top = -li_slo_ti_H + 'px';
                                cycle = 0;
                            } break;
                        }

                        // console.log('%c cycle:', 'background: #ffcc00; color: #003300', cycle)
                    }, 5000);
                }
            }
        }
    }
}

const cbnr_first_anim = {
    anim_on: (item, left, animation) => { // 0
        let drive_img = item.querySelector('.cbnr_drive');
        drive_img.classList.add(animation || 'cbnr_drive_anim');

        setTimeout(() => {
            drive_img.style.left = left || '6%'
        }, 30);

        let promo = item.querySelector('.cbnr_promo');
        promo.classList.add('cbnr_promo_anim');
        promo.style.setProperty('animation-duration', 1.8 + Math.random() * .5 + 's');
    },
    anim_off: (item, animation) => {
        let drive_img = item.querySelector('.cbnr_drive');
        drive_img.classList.remove(animation || 'cbnr_drive_anim');
        drive_img.style.left = '-100%'

        let promo = item.querySelector('.cbnr_promo');
        promo.classList.remove('cbnr_promo_anim');
    },
    animations: [
        {
            on: item => cbnr_first_anim.anim_on(item),
            off: item => cbnr_first_anim.anim_off(item)
        },
        {
            on: item => cbnr_first_anim.anim_on(item, '1%', 'cbnr_drive_anim_2'),
            off: item => cbnr_first_anim.anim_off(item, 'cbnr_drive_anim_2')
        },
        {
            on: item => cbnr_first_anim.anim_on(item, '3%', 'cbnr_drive_anim_3'),
            off: item => cbnr_first_anim.anim_off(item, 'cbnr_drive_anim_3')
        },
        {
            on: item => cbnr_first_anim.anim_on(item, '3%', 'cbnr_drive_anim_3'),
            off: item => cbnr_first_anim.anim_off(item, 'cbnr_drive_anim_3')
        },
        {
            on: item => cbnr_first_anim.anim_on(item, '3%', 'cbnr_drive_anim_3'),
            off: item => cbnr_first_anim.anim_off(item, 'cbnr_drive_anim_3')
        },
        {
            on: item => cbnr_first_anim.anim_on(item, '1%', 'cbnr_drive_anim_2'),
            off: item => cbnr_first_anim.anim_off(item, 'cbnr_drive_anim_2')
        }
    ]
}

const cool_baner = {
    breakWidth: 757,
    isItPhone: () => {
        let portrait = document.getElementById('phone_orientation_tester').getBoundingClientRect().width;
        let ua = navigator.userAgent;
        return ua.match(/(iPhone|Android)/) && portrait;
    },
    showTwo: () => !((window.innerWidth < cool_baner.breakWidth
        || window.screen.availWidth < cool_baner.breakWidth)
        || cool_baner.isItPhone()),
    getStep: () => cool_baner.showTwo() ? 50 : 100,
    isVisible: (item) => { // sprawdza czy obszar jest widoczny na ekranie
        let pos = item.getBoundingClientRect();
        if (((pos.top > 0 && pos.top < window.innerHeight)
            || (pos.bottom > 0 && pos.bottom < window.innerHeight))) {

            return true
        }
        return false
    },
    showItems: (bnr, items) => {
        let radio = bnr.querySelectorAll('.cbnr_radio');
        let anim;
        // console.log('%c bnr.id:', 'background: #ffcc00; color: #003300', items[0].closest('.cool_baner').id)
        switch (items[0].closest('.cool_baner').id) {
            case 'cbnr_first': anim = cbnr_first_anim.animations; break;
            case 'cbnr_second': anim = cbnr_first_anim.animations; break;
            default: anim = null;
        }
        // console.log('%c anim:', 'background: #ffcc00; color: #003300', anim)

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            active = it.getAttribute('data-active');
            if (anim && anim[i]) {
                anim[i].off(it);
            }
            if (active == 'yes') {
                if (radio.length > 1) {
                    radio[i].classList.add('cbnr_radio_on');
                }
                it.style.visibility = 'visible';
                it.style.opacity = '1';
                if (anim && anim[i]) {
                    let order = it.getAttribute('data-order');

                    // console.log('%c anim:', 'background: #ffcc00; color: #003300', anim)
                    setTimeout(() => {
                        anim[i].on(it);
                    }, !(order == '1' && cool_baner.showTwo()) ? 300 : 1000);
                }
            } else {
                if (radio.length > 0) {
                    radio[i].classList.remove('cbnr_radio_on');
                }
                it.style.opacity = '0';
                setTimeout(() => {
                    if (it.getAttribute('data-active') != 'yes') {
                        it.style.visibility = 'hidden';
                    }
                }, 520);
            }
        }
    },
    expandActiv: (items) => {
        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            let many = cool_baner.showTwo();

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
    autoShow: true,
    resize: (bnr) => {
        let showTwo = cool_baner.showTwo();
        let items = bnr.querySelectorAll('.cbnr_item');
        let rect = bnr.getBoundingClientRect();
        let w = rect.width;
        let d = Number(bnr.getAttribute('data-h')) / 100;
        let p = showTwo ? d : d * 2;
        let h = w * p + 'px';
        let nav = bnr.querySelector('.cbnr_navigation');
        // console.log('%c showTwo:', 'background: #ffcc00; color: #003300', showTwo)

        let bnrL = bnr.querySelector('.cbnr_left');
        let bnrR = bnr.querySelector('.cbnr_right');
        let butto = bnr.querySelector('.cbnr_buttons');
        bnr.style.height = h;
        bnrL.style.height = h;
        bnrR.style.height = h;
        if (!(showTwo && items.length <= 2)) {
            butto.style.top = h;
            bnr.style.marginBottom = '26px';
            nav.style.display = '';
            cool_baner.autoShow = true;
        } else {
            bnr.style.marginBottom = '0';
            nav.style.display = 'none';
            cool_baner.autoShow = false;
            clearInterval(cool_baner.autoSwitch[bnr.id]);
        }

        let step = cool_baner.getStep();
        let iW = showTwo ? '50%' : '100%';

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            let order = Number(it.getAttribute('data-order'));
            items[i].style.left = (showTwo ? order * step : 0) + '%';
            items[i].style.width = iW;

        }
        cool_baner.expandActiv(items);
        cool_baner.showItems(bnr, items);
        bnr.style.fontSize = document.body.getBoundingClientRect().width / (showTwo ? 50 : 25) + 'px'
        cool_baner.setProportions();
    },
    touchStartX: null,
    autoSwitch: {},
    autoSwitchTime: 10000,
    proportions: [],
    setProportions: () => { // ustawianie proporcji
        for (let prop of cool_baner.proportions) {
            for (let p of prop) {
                let h = p.getAttribute('data-h');
                if (h != null) {
                    let prop = Number(h) / 100;
                    let orygin_w = p.getBoundingClientRect().width;

                    p.style.height = orygin_w * prop + 'px';
                }
            }
        }
    },
    start: () => {
        let allImg = document.querySelectorAll('.cool_baner img');
        for (let img of allImg) {
            let src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
        }

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

            cool_baner.proportions.push(bnr.querySelectorAll('.proportions'));

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

                if (items.length > 1) {
                    // tworzenie przycisków
                    let newBut = document.createElement('div');
                    newBut.className = 'cbnr_radio' + (i % 2 ? ' cbnr_second' : '');
                    newBut.setAttribute('onclick', 'cool_baner.click(this, ' + i + ')');
                    buto.appendChild(newBut);
                }

                setTimeout(() => {
                    it.style.setProperty('transition', 'opacity .5s');
                }, 20);
            }
            cool_baner.resize(bnr);

            if (cool_baner.autoShow) {
                cool_baner.autoSwitch[bnr.id] = setInterval(() => {
                    let child = bnr.querySelector('.cbnr_item');
                    cool_baner.right(child);
                }, cool_baner.autoSwitchTime);
            }
        }

        setInterval(() => {
            for (let bnr of cbnrs) {
                checkVisibility(bnr)
            }
        }, 300);

        win_resize_func.push(() => {
            let cbnrs = document.querySelectorAll('.cool_baner')

            for (let bnr of cbnrs) {
                cool_baner.resize(bnr);
            }
        })
    },
    coolDown: false,
    right: item => {
        let bnr = item.closest('.cool_baner');
        let items = bnr.querySelectorAll('.cbnr_item');
        let many = cool_baner.showTwo();
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

        if (cool_baner.autoShow) {
            clearInterval(cool_baner.autoSwitch[bnr.id]);
            cool_baner.autoSwitch[bnr.id] = setInterval(() => {
                let child = bnr.querySelector('.cbnr_item');
                cool_baner.right(child);
            }, cool_baner.autoSwitchTime);
        }
    },
    left: item => {
        let bnr = item.closest('.cool_baner');
        let items = bnr.querySelectorAll('.cbnr_item');
        let many = cool_baner.showTwo();
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

        if (cool_baner.autoShow) {
            clearInterval(cool_baner.autoSwitch[bnr.id]);
            cool_baner.autoSwitch[bnr.id] = setInterval(() => {
                let child = bnr.querySelector('.cbnr_item');
                cool_baner.right(child);
            }, cool_baner.autoSwitchTime);
        }
    },
    click: (item, num) => {
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

        if (cool_baner.autoShow) {
            clearInterval(cool_baner.autoSwitch[bnr.id]);
            cool_baner.autoSwitch[bnr.id] = setInterval(() => {
                let child = bnr.querySelector('.cbnr_item');
                cool_baner.right(child);
            }, cool_baner.autoSwitchTime);
        }
    }
}

const abnr_animations_1 = {
    anim_1: {
        start: [
            ['.abnr_tk1a1', [['left', '-60%']]],
            ['.abnr_tk1a2', [['opacity', '0'], ['left', '50%']]],
            ['.abnr_tk1a3', [['left', '160%']]],
            ['.abnr_text_kb', [['opacity', '0']]],
            ['.abnr_pseudo_button', [['opacity', '0']]]
        ],
        anim: [
            ['.abnr_tk1a1', 'abnr_tk1a1_anim'],
            ['.abnr_tk1a2', 'abnr_tk1a2_anim'],
            ['.abnr_tk1a3', 'abnr_tk1a3_anim'],
            ['.abnr_text_kb', 'abnr_text_kb_anim'],
            ['.abnr_pseudo_button', 'abnr_pseudo_button_anim']
        ],
        end: [
            ['.abnr_tk1a1', [['left', '50%']]],
            ['.abnr_tk1a2', [['opacity', '1'], ['left', '50%']]],
            ['.abnr_tk1a3', [['left', '50%']]],
            ['.abnr_text_kb', [['opacity', '1']]],
            ['.abnr_pseudo_button', [['opacity', '1']]]
        ]
    },
    anim_2: {
        start: [
            ['.abnr_tk1a2a', [['left', '160%']]],
            ['.abnr_tk1a2b', [['left', '160%']]],
            ['.abnr_tk1a2c', [['left', '160%']]],
            ['.abnr_text_kb', [['opacity', '0']]],
            ['.abnr_pseudo_button', [['opacity', '0']]]
        ],
        anim: [
            ['.abnr_tk1a2a', 'abnr_tk1a2a_anim'],
            ['.abnr_tk1a2b', 'abnr_tk1a2b_anim'],
            ['.abnr_tk1a2c', 'abnr_tk1a2c_anim'],
            ['.abnr_text_kb', 'abnr_text_kb_anim'],
            ['.abnr_pseudo_button', 'abnr_pseudo_button_anim']
        ],
        end: [
            ['.abnr_tk1a2a', [['left', '33%']]],
            ['.abnr_tk1a2b', [['left', '35%']]],
            ['.abnr_tk1a2c', [['left', '64%']]],
            ['.abnr_text_kb', [['opacity', '1']]],
            ['.abnr_pseudo_button', [['opacity', '1']]]
        ]
    },
    anim_3: {
        start: [
            ['.abnr_tk1a3a', [['opacity', '0']]],
            ['.abnr_tk1a3b', [['left', '160%']]],
            ['.abnr_tk1a3c', [['left', '160%']]],
            ['.abnr_text_kb', [['opacity', '0']]],
            ['.abnr_pseudo_button', [['opacity', '0']]]
        ],
        anim: [
            ['.abnr_tk1a3a', 'abnr_tk1a3a_anim'],
            ['.abnr_tk1a3b', 'abnr_tk1a3b_anim'],
            ['.abnr_tk1a3c', 'abnr_tk1a3c_anim'],
            ['.abnr_text_kb', 'abnr_text_kb_anim'],
            ['.abnr_pseudo_button', 'abnr_pseudo_button_anim']
        ],
        end: [
            ['.abnr_tk1a3a', [['opacity', '1']]],
            ['.abnr_tk1a3b', [['left', '50%']]],
            ['.abnr_tk1a3c', [['left', '50%']]],
            ['.abnr_text_kb', [['opacity', '1']]],
            ['.abnr_pseudo_button', [['opacity', '1']]]
        ]
    },
    anim_on: (item, animations) => {
        for (let start of animations.start) {
            for (let p of start[1]) {
                item.querySelector(start[0]).style.setProperty(p[0], p[1])
            }
        }

        for (let a of animations.anim) {
            item.querySelector(a[0]).classList.add(a[1]);
        }

        setTimeout(() => {
            for (let end of animations.end) {
                for (let p of end[1]) {
                    item.querySelector(end[0]).style.setProperty(p[0], p[1])
                }
            }
        }, 50);
    },
    anim_off: (item, animations) => {
        for (let start of animations.start) {
            for (let p of start[1]) {
                item.querySelector(start[0]).style.setProperty(p[0], p[1])
            }
        }

        for (let a of animations.anim) {
            item.querySelector(a[0]).classList.remove(a[1]);
        }
    }
}

const ave_baner = {
    breakWidth: 757,
    isItPhone: () => {
        let portrait = document.getElementById('phone_orientation_tester').getBoundingClientRect().width;
        let ua = navigator.userAgent;
        return ua.match(/(iPhone|Android)/) && portrait;
    },
    getWidth: () => !(window.innerWidth < ave_baner.breakWidth
        || window.screen.availWidth < ave_baner.breakWidth)
        || !(document.getElementById('phone_orientation_tester').getBoundingClientRect().width == 1),
    // getStep: () => ave_baner.getWidth() ? 50 : 100,
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
            on: item => abnr_animations_1.anim_on(item, abnr_animations_1.anim_1),
            off: item => abnr_animations_1.anim_off(item, abnr_animations_1.anim_1)
        },
        {
            on: item => abnr_animations_1.anim_on(item, abnr_animations_1.anim_2),
            off: item => abnr_animations_1.anim_off(item, abnr_animations_1.anim_2)
        },
        {
            on: item => abnr_animations_1.anim_on(item, abnr_animations_1.anim_3),
            off: item => abnr_animations_1.anim_off(item, abnr_animations_1.anim_3)
        },
    ],
    showItems: (bnr, items) => {
        let radio = bnr.querySelectorAll('.abnr_radio');
        let anim;
        // console.log('%c bnr.id:', 'background: #ffcc00; color: #003300', items[0].closest('.cool_baner').id)
        switch (items[0].closest('.ave_baner').id) {
            case 'abnr_first': anim = ave_baner.animations_1; break;
            default: anim = null;
        }
        // console.log('%c anim:', 'background: #ffcc00; color: #003300', anim)

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            active = it.getAttribute('data-active');
            if (anim && anim[i]) {
                anim[i].off(it);
            }
            if (active == 'yes') {
                if (radio.length > 1) {
                    radio[i].classList.add('abnr_radio_on');
                }
                it.style.visibility = 'visible';
                it.style.opacity = '1';
                if (anim && anim[i]) {
                    // console.log('%c anim:', 'background: #ffcc00; color: #003300', anim)
                    anim[i].on(it);
                }
            } else {
                if (radio.length > 1) {
                    radio[i].classList.remove('abnr_radio_on');
                }
                it.style.opacity = '0';
                setTimeout(() => {
                    if (it.getAttribute('data-active') != 'yes') {
                        it.style.visibility = 'hidden';
                    }
                }, 520);
            }

        }
    },
    replaceItems: (bnr) => {
        let items = bnr.querySelectorAll('.abnr_item');
        ave_baner.showItems(bnr, items);

        let size = ave_baner.getWidth() ? 55 : 34;
        bnr.style.fontSize = document.body.getBoundingClientRect().width / size + 'px'
        // console.log('%c size:', 'background: #ffcc00; color: #003300', size)
    },
    fit: (bnr) => {
        let bnrL = bnr.querySelector('.abnr_left');
        let bnrR = bnr.querySelector('.abnr_right');
        let butto = bnr.querySelector('.abnr_buttons');
        let abnr_over_wrap = bnr.querySelector('.abnr_over_wrap');
        let wrapH = abnr_over_wrap.querySelector('.abnr_item').getBoundingClientRect().height + 'px';

        abnr_over_wrap.style.height = wrapH;
        bnrL.style.height = wrapH;
        bnrR.style.height = wrapH;

        butto.style.top = wrapH;
        bnr.style.marginBottom = '20px';

        ave_baner.replaceItems(bnr);
    },
    imgToFit: [],
    fit_imgs: () => { // dopasowywanie zjęć do wielkości parenta
        for (let fitimg of ave_baner.imgToFit) {
            for (let fi of fitimg) {
                // console.log('%c fi:', 'background: #ffcc00; color: #003300', fi)
                let rect = fi.parentElement.getBoundingClientRect();
                // console.log('%c rect:', 'background: #ffcc00; color: #003300', rect)
                let h = rect.height;
                let w = rect.width;
                let pI = h / w;
                let pN = fi.naturalHeight / fi.naturalWidth;
                // console.log('%c p:', 'background: #ffcc00; color: #003300', pN, pI, h, w)

                if (pN > pI) {
                    fi.style.top = -(w * pN - h) / 2 + 'px';
                    fi.style.width = w + 'px';
                    fi.style.height = w * pN + 'px';
                    // console.log('%c p:', 'background: green; color: #003300', 3)
                } else {
                    fi.style.left = -(h / pN - w) / 2 + 'px';
                    fi.style.width = h / pN + 'px';
                    fi.style.height = h + 'px';
                    // console.log('%c p:', 'background: green; color: #003300', 4)
                }
                // }
            }
        }
    },
    proportions: [],
    setProportions: () => { // ustawianie proporcji
        for (let prop of ave_baner.proportions) {
            for (let p of prop) {
                let h = p.getAttribute('data-h');
                if (h != null) {
                    let prop = Number(h) / 100;
                    let orygin_w = p.getBoundingClientRect().width;

                    p.style.height = orygin_w * prop + 'px';
                }
            }
        }
    },
    touchStartX: null,
    autoSwitch: {},
    autoSwitchTime: 10000,
    start: () => {
        let allImg = document.querySelectorAll('.ave_baner img');
        for (let img of allImg) {
            let src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
            }
        }

        let abnrs = document.querySelectorAll('.ave_baner')

        const checkVisibility = item => {
            let anim = ave_baner.isVisible(item) ? 'on' : '';
            item.setAttribute('data-anim', anim);
        }

        for (let bnr of abnrs) {
            // for (let k = 0; k < abnrs.length; k++) {
            //     let bnr = abnrs[k];

            let touchend = e => {
                // console.log('%c clientX:', 'background: red; color: #003300', e)
                bnr.removeEventListener('touchmove', touchmove)
                bnr.removeEventListener('touchend', touchend)
            }

            let touchmove = e => {
                // console.log('%c clientX:', 'background: yellow; color: #003300', e.changedTouches[0].clientX)
                let distance = ave_baner.touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(distance) > window.innerWidth / 5) {
                    // console.log('%c jest OK !!! ', 'background: green; color: #003300', distance)
                    if (distance > 0) {

                        ave_baner.left(e.originalTarget);
                    } else {

                        ave_baner.right(e.originalTarget);
                    }
                    touchend(e);
                }
            }
            let touchstart = e => {
                // console.log('%c clientX:', 'background: green; color: #003300', e)
                ave_baner.touchStartX = e.changedTouches[0].clientX;


                bnr.addEventListener('touchmove', touchmove)
                bnr.addEventListener('touchend', touchend)
            }
            bnr.addEventListener('touchstart', touchstart);

            checkVisibility(bnr);

            ave_baner.rearrange(bnr);

            ave_baner.proportions.push(bnr.querySelectorAll('.proportions'));
            ave_baner.setProportions();

            ave_baner.imgToFit.push(bnr.querySelectorAll('.abnr_k_left img'));
            // console.log('%c ave_baner.imgToFit:', 'background: #ffcc00; color: #003300', ave_baner.imgToFit)
            setTimeout(() => {
                ave_baner.fit_imgs();
            }, 30);

            let buto = bnr.querySelector('.abnr_buttons');
            let items = bnr.querySelectorAll('.abnr_item');

            let index = 0;
            for (let i = 0; i < items.length; i++) {
                if (index > 1) { index = 0 }

                let it = items[i];
                it.setAttribute('data-order', index);
                index++;

                let active = i == 0 ? 'yes' : '';
                it.setAttribute('data-active', active);

                if (items.length > 1) {
                    // tworzenie przycisków
                    let newBut = document.createElement('div');
                    newBut.className = 'abnr_radio';
                    newBut.setAttribute('onclick', 'ave_baner.click(this, ' + i + ')');
                    buto.appendChild(newBut);
                }

                setTimeout(() => {
                    it.style.setProperty('transition', 'opacity .5s');
                }, 20);
            }
            ave_baner.fit(bnr);

            if (items.length > 1) {
                ave_baner.autoSwitch[bnr.id] = setInterval(() => {
                    let child = bnr.querySelector('.abnr_item');
                    ave_baner.right(child);
                }, ave_baner.autoSwitchTime);
            } else {
                bnr.querySelector('.abnr_navigation').style.display = 'none';
            }
        }

        setInterval(() => {
            for (let bnr of abnrs) {
                checkVisibility(bnr)
            }
        }, 300);

        win_resize_func.push(() => {
            let abnrs = document.querySelectorAll('.ave_baner')

            for (let bnr of abnrs) {
                ave_baner.rearrange(bnr);
                ave_baner.setProportions();
                ave_baner.fit_imgs();
                ave_baner.fit(bnr);
            }
        })
    },
    rearrange: bnr => {
        let over_wrap = bnr.querySelectorAll('.abnr_item')

        for (let item of over_wrap) {
            let left = item.querySelector('.abnr_k_left');
            // let item = bnr.querySelector('.abnr_item');
            let right = item.querySelector('.abnr_k_right');
            let text = item.querySelector('.abnr_k_text');

            if (ave_baner.getWidth()) {
                left.style.width = '43%';
                right.style.left = '47%';
                right.style.top = '7%';
                right.style.width = '43%';
                text.style.left = '47%';
                text.style.top = '7%';
                text.style.width = '43%';
                item.setAttribute('data-h', '60');
            } else {
                left.style.width = '70%';
                right.style.left = '20%';
                right.style.top = '48.3%';
                right.style.width = '70%';
                text.style.left = '20%';
                text.style.top = '48.3%';
                text.style.width = '70%';
                item.setAttribute('data-h', '176');
            }
        }
    },
    aveDown: false,
    right: item => {
        let bnr = item.closest('.ave_baner');
        let items = bnr.querySelectorAll('.abnr_item');

        let active;
        for (let i = 0; i < items.length; i++) {
            let it = items[i];

            if (it.getAttribute('data-active') == 'yes') {
                active = i;
            }
        }

        if (active >= items.length - 1) {
            items[0].setAttribute('data-active', 'yes')
        } else {
            items[active + 1].setAttribute('data-active', 'yes')
        }

        items[active].setAttribute('data-active', '')

        setTimeout(() => {
            ave_baner.showItems(bnr, items);
        }, 20);

        clearInterval(ave_baner.autoSwitch[bnr.id]);
        ave_baner.autoSwitch[bnr.id] = setInterval(() => {
            let child = bnr.querySelector('.abnr_item');
            ave_baner.right(child);
        }, ave_baner.autoSwitchTime);
    },
    left: item => {
        let bnr = item.closest('.ave_baner');
        let items = bnr.querySelectorAll('.abnr_item');

        let active;
        for (let i = 0; i < items.length; i++) {
            let it = items[i];

            if (it.getAttribute('data-active') == 'yes') {
                active = i;
            }
        }

        if (active == 0) {
            items[items.length - 1].setAttribute('data-active', 'yes')
        } else {
            items[active - 1].setAttribute('data-active', 'yes')
        }

        items[active].setAttribute('data-active', '')

        setTimeout(() => {
            ave_baner.showItems(bnr, items);
        }, 20);

        clearInterval(ave_baner.autoSwitch[bnr.id]);
        ave_baner.autoSwitch[bnr.id] = setInterval(() => {
            let child = bnr.querySelector('.abnr_item');
            ave_baner.right(child);
        }, ave_baner.autoSwitchTime);
    },
    click: (item, num) => {
        let bnr = item.closest('.ave_baner');
        let items = bnr.querySelectorAll('.abnr_item');

        for (let i = 0; i < items.length; i++) {
            let it = items[i];
            if (i == num) {
                it.setAttribute('data-active', 'yes')
            } else {
                it.setAttribute('data-active', '')
            }
        }

        setTimeout(() => {
            ave_baner.showItems(bnr, items);
        }, 20);

        clearInterval(ave_baner.autoSwitch[bnr.id]);
        ave_baner.autoSwitch[bnr.id] = setInterval(() => {
            let child = bnr.querySelector('.abnr_item');
            ave_baner.right(child);
        }, ave_baner.autoSwitchTime);
    }
}

const promo_baner = {
    wrap: null,
    border: null,
    text: null,
    start: () => {
        promo_baner.wrap = document.querySelector('.promo_baner_wrap');
        promo_baner.border = promo_baner.wrap.querySelector('.promo_baner_border');
        promo_baner.text = promo_baner.wrap.querySelector('.promo_baner_text');

        promo_baner.resize();

        win_resize_func.push(() => {
            promo_baner.resize();
        })
    },
    resize: () => {
        let h = promo_baner.wrap.getBoundingClientRect().width;
        promo_baner.wrap.style.height = h / 9 + 'px';
        console.log('%c h / 9:', 'background: #ffcc00; color: #003300', h / 500)
        let b = h / 400;
        if (b < 1) { b = 1 }
        promo_baner.border.style.border = b + 'px solid #333333';
        promo_baner.border.style.top = -b + 'px';
        promo_baner.border.style.fontSize = h / 17 + 'px';
    }
}


ave_baner.start();
cool_baner.start();
line_baner.start();
promo_baner.start()

window.onresize = () => {
    for (let wrf of win_resize_func) {
        wrf();
    }
}
