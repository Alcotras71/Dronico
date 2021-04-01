document.addEventListener("DOMContentLoaded", (e) => {
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // addAnchorsToLinks
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  const body = document.body,
    darkAnchr = document.querySelectorAll(".dark-anchr"),
    whiteAnchr = document.querySelectorAll(".white-anchr");

  if (body.classList.contains("dark")) {
    darkAnchr.forEach((anc) => {
      anc.setAttribute("href", "#header");
    });
  } else if (body.classList.contains("white")) {
    whiteAnchr.forEach((anc) => {
      anc.setAttribute("href", "#header");
    });
  }

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // smoothScrollByAnchors
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href").substr(1);
      if (blockID) {
        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // calcScroll
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // then popup is open add padding
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  let paddingScroll = calcScroll();

  fsLightboxInstances["lightbox"].props.onOpen = () => {
    document.body.style.paddingRight = `${paddingScroll}px`;
  };

  fsLightboxInstances["lightbox"].props.onClose = () => {
    document.body.style.paddingRight = `0`;
  };

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // visible header
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  const invisible = document.querySelectorAll(".invisible *");
  const headerTimeout = setTimeout(() => {
    invisible.forEach((el) => {
      el.style.opacity = 1;
    });
  }, 1500);

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // Initialize sliders
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  // ——————————————————————————————————————————————————
  // UsingAreasSlider
  // ——————————————————————————————————————————————————
  const prevUsingBtn = document.querySelector(".using-areas__pagination-prev"),
    nextUsingBtn = document.querySelector(".using-areas__pagination-next"),
    usCard = document.querySelectorAll(".using-card__card");

  const usingAreas = new Swiper(".using-card__container", {
    speed: 400,
    spaceBetween: 10,
    slidesPerView: 1,
    loop: false,
    // on: {
    //   slideChange: function () {
    //     if (this.activeIndex == 0) {
    // 			this.slideTo(6, 500);
    // 		} else if (this.activeIndex == 7) {
    // 			this.slideTo(1, 500);
    // 		}
    //   },
    // },
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

  // ——————————————————————————————————————————————————
  // DronicoSlider
  // ——————————————————————————————————————————————————
  const dronicoSlider = new Swiper(".dronico-slider__container", {
    parallax: true,
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
    parallax: true,
    speed: 500,
    slidesPerView: 1,
    loop: true,
    direction: "vertical",
    simulateTouch: false,
    mousewheelControl: false,
    freeMode: false,
    spaceBetween: 20,
  });
  const dronicoImgNumSlider = new Swiper(".dronico-slider__imgNum-container", {
    parallax: true,
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

  // ——————————————————————————————————————————————————
  // MobileDronicoSlider
  // ——————————————————————————————————————————————————
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
      el: ".dronico-slider__mobile-pagination",
      clickable: true,
    },
  });

  // ——————————————————————————————————————————————————
  // WorkSlider
  // ——————————————————————————————————————————————————
  const workSlider = new Swiper(".work__container", {
    speed: 400,
    slidesPerView: 6,
    spaceBetween: 20,
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

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // MainCode
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
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

  // ——————————————————————————————————————————————————
  // LottieSvgOnMouseOver
  // ——————————————————————————————————————————————————
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

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // FeedbackModal
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.remove("active");
  }

  function openModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("active");
  }

  function modal(triggerSelector, modalSelector) {
    const modalBtn = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector);

    modalBtn.forEach((btn) => {
      btn.addEventListener("click", () => openModal(modalSelector));
    });

    modalWindow.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-close") == "") {
        closeModal(modalSelector);
      }
    });

    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modalWindow.classList.contains("active")) {
        closeModal(modalSelector);
      }
    });
  }

  modal(".box", ".feedback");

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // Form
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  const form = document.querySelector(".feedback__form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    const formData = new FormData(form);

    if (error === 0) {
      form.classList.add("._sending");
      let response = await fetch("php/sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert("Ошибка");
        form.classList.remove("_sending");
      }
    } else {
      alert("Заполни");
    }
  }

  function formValidate(form) {
    let error = 0;
    const formReq = document.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains("_name")) {
        if (!/^\w{4,20}$/gi.test(input.value)) {
          formAddError(input);
        }
      } else if (input.classList.contains("_phone")) {
        if (!/^\d{4,12}$/g.test(input.value)) {
          formAddError(input);
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // TextScramble
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "0123456789><+-.%";
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = "";
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  const phrases = [
    "70.512323, 45.11974",
    "2.3513, -78.28398690",
    "74.32334, 24.34523",
    "-12.512323, 45.11974",
    "72.512344, 3.129043",
    "-70.512323, 20.11974",
    "83.123341, 42.75656",
  ];

  const numbers = document.querySelectorAll(".scrumble-text");

  function scrumbleText(fx, num) {
    fx = new TextScramble(num);
    let counter = 0;
    function next() {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
      });
      counter = (counter + 1) % phrases.length;
    }
    next();
  }

  numbers.forEach((num, i) => {
		scrumbleText(`fx${i}`, num);
	});

  // Modal

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // Parallax
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  const paralaxClass = ".rellax";

  const scenes = document.querySelectorAll(paralaxClass);
  scenes.forEach((scene) => {
    let parallax = new Parallax(scene, {
      relativeInput: true,
    });
  });

  const rellax = new Rellax(paralaxClass, {
    center: true,
  });

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // openVideo
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  const dronicoSliderContainer = document.querySelector(
    ".dronico-slider__img-container"
  );
});
