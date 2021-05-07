document.addEventListener("DOMContentLoaded", (e) => {
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // addAnchorsToLinks
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  const body = document.body,
    redAnchr = document.querySelectorAll(".red-anchr");

  if (body.classList.contains("red")) {
    lottie.loadAnimation({
      container: document.querySelector(".presentation__title"),
      renderer: "svg",
      rendererSettings: {
        className: "red-logo",
      },
      loop: false,
      autoplay: true,
      path: "images/lottie-json/bg-dark.json",
    });

    redAnchr.forEach((anc) => {
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

  if (fsLightboxInstances["lightbox"]) {
    fsLightboxInstances["lightbox"].props.onOpen = () => {
      document.body.style.paddingRight = `${paddingScroll}px`;
    };

    fsLightboxInstances["lightbox"].props.onClose = () => {
      document.body.style.paddingRight = `0`;
    };
  }

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // visible header
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  const invisible = document.querySelectorAll(".invisible *"),
    coords = document.querySelectorAll(".presentation__coords *");
  const headerTimeout = setTimeout(() => {
    invisible.forEach((el) => {
      el.style.opacity = 1;
    });
    coords.forEach((el) => {
      el.style.opacity = 0.3;
    });
  }, 1500);

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // Initialize sliders
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // UsingAreasSlider
  // ——————————————————————————————————————————————————

  const usingAreasRed = new Swiper(".using-areas__slider--red", {
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
        loop: false,
        slidesPerView: 2,
        spaceBetween: 40,
      },
      769: {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 11,
      },
      1026: {
        loop: false,
        slidesPerView: 4,
      },
    },
  });

  // check resize slider
  function handleTabletChange(e) {
    if (e.matches) {
      usingAreasRed.on("slideChange", function (e) {
        if (this.activeIndex == 0) {
          this.slideTo(5, 1000);
        } else if (this.activeIndex == 6) {
          this.slideTo(1, 1000);
        }
      });
    }
  }
  const mediaQuery = window.matchMedia("(max-width: 551px)");
  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // MainCode
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // FeedbackModal
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    document.body.style.paddingRight = `0`;
    document.body.style.overflow = "visible";
    modalWindow.classList.remove("active");
  }

  function openModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    document.body.style.paddingRight = `${paddingScroll}px`;
    document.body.style.overflow = "hidden";
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

  // ——————————————————————————————————————————————————
  // InputMask
  // ——————————————————————————————————————————————————

  const inputsTel = document.querySelectorAll('input[type="tel"]');
  const inputmask = new Inputmask("+7(999) 999-99-99");
  inputmask.mask(inputsTel);

  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  // Form
  // ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
  const form = document.querySelector(".feedback__form"),
    errorText = document.querySelector(".feedback__error"),
    successText = document.querySelector(".feedback__success"),
    feedbackWindow = document.querySelector(".feedback");

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    const formData = new FormData(form);

    console.log(error);

    if (error === 0) {
      feedbackWindow.classList.add("_sending");
      let response = await fetch("php/sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        form.reset();
        feedbackWindow.classList.remove("_sending");
        showMessage(form, successText, 5);
      } else {
        feedbackWindow.classList.remove("_sending");
        showMessage(form, errorText, 2.5);
      }
    }
  }

  function showMessage(form, messageSelector, delay) {
    form.style.opacity = "0";
    form.style.pointerEvents = "none";
    messageSelector.style.opacity = "1";
    setTimeout(function () {
      form.style.opacity = "1";
      form.style.pointerEvents = "auto";
      messageSelector.style.opacity = "0";
    }, delay * 1000);
  }

  function formValidate(form) {
    let error = 0;
    const formReq = document.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains("_name")) {
        if (!/^[\s\D]{2,20}$/gi.test(input.value)) {
          formAddError(input);
          error++;
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
    if (input.value.length == 0 || input.getAttribute("type") === "checkbox") {
      input.parentElement.classList.add("_error");
      input.classList.add("_error");
      input.nextSibling.nextElementSibling.classList.add("_error");
    } else {
      input.parentElement.classList.add("_errorValid");
      input.classList.add("_errorValid");
      input.nextSibling.nextElementSibling.classList.add("_errorValid");
    }
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
    input.nextSibling.nextElementSibling.classList.remove("_error");
    input.parentElement.classList.remove("_errorValid");
    input.classList.remove("_errorValid");
    input.nextSibling.nextElementSibling.classList.remove("_errorValid");
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
});
