window.addEventListener("load", () => {

    const slider = document.getElementById("slider");
    let slides = document.querySelectorAll(".slide");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    let index = 1;
    let slideWidth = slides[0].clientWidth;
    let typingInterval;

    /* Clone First & Last */
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    slides = document.querySelectorAll(".slide");

    slider.style.transform = `translateX(-${slideWidth * index}px)`;

    /* Typing Function */
    function startTyping() {

        clearInterval(typingInterval);

        const currentSlide = slides[index];
        const textElement = currentSlide.querySelector(".content");
        const fullText = textElement.getAttribute("data-text");

        textElement.textContent = "";
        let charIndex = 0;

        typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
                textElement.textContent += fullText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 60); // typing speed
    }

    /* Move Slide */
    function moveSlide() {
        slider.style.transition = "transform 0.7s ease-in-out";
        slider.style.transform = `translateX(-${slideWidth * index}px)`;
    }

    function nextSlide() {
        if (index >= slides.length - 1) return;
        index++;
        moveSlide();
    }

    function prevSlide() {
        if (index <= 0) return;
        index--;
        moveSlide();
    }

    slider.addEventListener("transitionend", () => {

        if (index === slides.length - 1) {
            slider.style.transition = "none";
            index = 1;
            slider.style.transform = `translateX(-${slideWidth * index}px)`;
        }

        if (index === 0) {
            slider.style.transition = "none";
            index = slides.length - 2;
            slider.style.transform = `translateX(-${slideWidth * index}px)`;
        }

        startTyping(); // 🔥 Sync typing after slide finishes
    });

    /* Auto Slide */
    let autoSlide = setInterval(nextSlide, 4000);

    function resetInterval() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 4000);
    }

    next.addEventListener("click", () => {
        nextSlide();
        resetInterval();
    });

    prev.addEventListener("click", () => {
        prevSlide();
        resetInterval();
    });

    window.addEventListener("resize", () => {
        slideWidth = slides[0].clientWidth;
        slider.style.transition = "none";
        slider.style.transform = `translateX(-${slideWidth * index}px)`;
    });

    /* Start typing first slide */
    startTyping();

});
