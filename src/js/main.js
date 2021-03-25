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
			400: {
				slidesPerView: 2
			},
      769: {
				slidesPerView: 3,
				spaceBetween: 11
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
