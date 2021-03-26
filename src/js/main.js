document.addEventListener("DOMContentLoaded", (e) => {
  // initialize using-areas-slider
  const usingAreas = new Swiper(".using-card__container", {
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".using-areas__pagination-next",
      prevEl: ".using-areas__pagination-prev",
    },
    breakpoints: {
      551: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      769: {
        slidesPerView: 3,
        spaceBetween: 11,
      },
      1026: {
        slidesPerView: 4,
      },
    },
  });

  // Initialize dronico slider
  const dronicoSlider = new Swiper(".dronico-slider__container", {
    speed: 500,
    slidesPerView: 1,
    loop: true,
    spaceBetween: 100,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    grabCursor: true,
    navigation: {
      nextEl: ".dronico-slider__pagination-next",
      prevEl: ".dronico-slider__pagination-prev",
    },
  });
  const dronicoImgSlider = new Swiper(".dronico-slider__img-container", {
    speed: 500,
    slidesPerView: 1,
    loop: true,
    direction: "vertical",
    simulateTouch: false,
    mousewheelControl: false,
    freeMode: false,
  });
  const dronicoImgNumSlider = new Swiper(".dronico-slider__imgNum-container", {
    speed: 500,
    slidesPerView: 1,
    loop: true,
    mousewheelControl: false,
    freeMode: false,
    simulateTouch: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    breakpoints: {
      769: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1441: {
        spaceBetween: 100,
      },
    },
  });

  dronicoSlider.controller.control = dronicoImgNumSlider;
  dronicoImgNumSlider.controller.control = dronicoImgSlider;

  // Initialize mobile dronico slider
  const dronicoMobileSlider = new Swiper(".dronico-slider__mobile-container", {
    speed: 500,
    slidesPerView: 1,
    loop: true,
    mousewheelControl: false,
    freeMode: false,
    simulateTouch: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
		},
		pagination: {
			el: '.dronico-slider__mobile-pagination',
			clickable: true
		}
  });

  // Initialize work slider
  const workSlider = new Swiper(".work__container", {
    speed: 400,
    slidesPerView: 6,
    spaceBetween: 23,
    navigation: {
      nextEl: ".work__navigation-next",
      prevEl: ".work__navigation-prev",
    },
  });

  const workContainer = document.createElement("div"),
    workCards = document.querySelectorAll(".work__slide"),
    workWrapper = document.querySelector(".work__wrapper");

  // check resize slider
  // function handleTabletChange(e) {
  //   if (e.matches) {
  //     workSlider.destroy(false, true);

  //     workContainer.className = "work__cards";
  //     workCards.forEach((card) => {
  //       workContainer.append(card);
  //     });
  // 		workWrapper.append(workContainer);

  //   } else {
  // 		workSlider.init();

  // 		workCards.forEach((card) => {
  // 			workWrapper.append(card);
  // 		});
  //   }
  // }
  // const mediaQuery = window.matchMedia("(max-width: 1251px)");
  // mediaQuery.addListener(handleTabletChange);
  // handleTabletChange(mediaQuery);

  // Main code
  const dronsContainer = document.querySelector(".tech-dronico__img-container"),
    dronsBtns = document.querySelectorAll(".tech-dronico__btn"),
    dronTexts = document.querySelectorAll(".tech-dronico__text"),
    active = "active-btn";

  if (dronsContainer) {
    dronsContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("tech-dronico__btn")) {
        dronsBtns.forEach((btn) => {
          btn.classList.remove(active);
        });
        dronTexts.forEach((text) => {
          text.classList.remove(active);
          if (text.dataset.text == target.dataset.text) {
            text.classList.add(active);
            target.classList.add(active);
          }
        });
      }
    });
  }

  //Lottie svg handlers
  const techTab = document.querySelector(".technologies__tabs");
  if (techTab) {
    techTab.onmouseover = techTab.onmouseout = (e) => {
      const target = e.target;
      if (target.classList.contains("technologies__tab")) {
        const techLottie = target.querySelector(".lottie-tech");
        if (techLottie) {
          if (e.type == "mouseover") {
            techLottie.play();
            techLottie.setLooping(true);
          } else {
            techLottie.setLooping(false);
          }
        }
      }
    };
  }
});


// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '0123456789><+-.%'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}
const phrases = [
  '70.512323, 45.11974',
  '2.3513, -78.28398690',
  '74.32334, 24.34523',
  '-12.512323, 45.11974',
  '72.512344, 3.129043',
  '-70.512323, 20.11974',
  '83.123341, 42.75656'
]

const el = document.querySelectorAll('.scrumble-text');

const fx1 = new TextScramble(el[0])
let counter1 = 0;
const next1 = () => {
  fx1.setText(phrases[counter1]).then(() => {
    setTimeout(next1, 800)
  })
  counter1 = (counter1 + 1) % phrases.length
}
next1();

const fx2 = new TextScramble(el[1])
let counter2 = 0;
const next2 = () => {
  fx2.setText(phrases[counter2]).then(() => {
    setTimeout(next2, 800)
  })
  counter2 = (counter2 + 1) % phrases.length
}
next2();