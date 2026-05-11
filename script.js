gsap.registerPlugin(ScrollTrigger);

// 1. Cursor Engine
const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
  gsap.to(outline, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

const addHover = () => {
  const hoverables = document.querySelectorAll(
    ".nav-item, .fancy-btn, .card, .see-more, .close-modal, .email-link, .slider-nav"
  );
  hoverables.forEach((item) => {
    item.addEventListener("mouseenter", () =>
      gsap.to(outline, {
        scale: 2.5,
        backgroundColor: "rgba(0, 242, 254, 0.1)",
      })
    );
    item.addEventListener("mouseleave", () =>
      gsap.to(outline, { scale: 1, backgroundColor: "transparent" })
    );
  });
};
addHover();

// 2. Entrance & Scroll Reveals
window.addEventListener("load", () => {
  gsap.to(".hero .reveal", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out",
  });
});

document.querySelectorAll("section").forEach((section) => {
  gsap.to(section.querySelectorAll(".reveal"), {
    scrollTrigger: { trigger: section, start: "top 80%" },
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power2.out",
  });
});

// 3. Certificate Slider Logic (Fixed for Stability)
let currentSlide = 0;
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".cert-slide");

function moveSlider(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = slides.length - 1;
  if (currentSlide >= slides.length) currentSlide = 0;

  gsap.to(track, {
    xPercent: -100 * currentSlide,
    duration: 0.8,
    ease: "power2.inOut",
  });
}

// 4. Modal Logic & Data
const projectDetails = {
  win11: {
    title: "TheWin11OS",
    img: "img/thewin11.png",
    link: "https://thewin11os.netlify.app/",
    linkText: "Visit Site",
    description:
      "A clone of Windows 11 made by using HTML, CSS and JS. It is a Windows 11 clone website that helps people experience Windows 11 even if they have an old operating system. The main goal is to give people access to modern techs and also learn windows 11. Inside it there are 2 different websites which are 'DB-Learn' and 'DBxcel'. DBLearn is a platform that has 80+ textbooks from grade 1 to 12 all subjects and also model exams for grade 6 and 8 students. And DBxcel is a website that teaches Microsoft Excel with practical exercises. We won 1st place on Woreda and 2nd place on sub-city science fair cometition.",
    tech: "HTML5, CSS3, JavaScript",
  },
  rccar: {
    title: "RC CAR (ESP-32)",
    img: "img/rccar.jpg",
    description:
      "An RC CAR made by using ESP-32 without using a standard dev kit. I made this project to learn more about ESP-32 and Bluetooth Librart in C++. It is one of the cool projects I made and I didn't use the Arduino RC Car kit to build it. It is controlled on a phone and it works on Bluetooth.",
    tech: "C++, ESP-32, L298N Motor Driver, Servo Motor, Wheels",
  },
  tiltpad: {
    title: "TiltPad Joystick",
    img: "img/joystick.jpg",
    link: "https://youtube.com/shorts/Ym4DsvPRVN0?si=rRaPvmYorBOVoUjg",
    linkText: "Watch Video",
    description:
      "It is a gamepad controller I made for Craft Game Jam 2026. I made it using ESP-32 and I programmed it as a gamepad controller and it works perfectly fine. I configured it into a football game I made and I presented my Game on Adwa Museum recieving a good feedback. I wanted to use an MPU6050 Gyroscope but I didn't have the equipment. So I decided to make it uisng 2 Tilt Switch Sensors and It did the job. the Controller is tied to hand and it moves left and right when tilted.",
    tech: "Arduino, HID Library, Electronics",
  },
};

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

function openModal(id) {
  const data = projectDetails[id];
  const visitButton = data.link
    ? `<a href="${data.link}" target="_blank" class="see-more" style="margin: 0;">${data.linkText}</a>`
    : "";

  modalBody.innerHTML = `
        <img src="${data.img}" class="modal-img" alt="Project Image">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;">
            <h2 style="color:var(--accent); font-family:Syne; font-size:2rem; margin:0;">${data.title}</h2>
            ${visitButton}
        </div>
        <p style="margin-bottom: 20px; line-height: 1.6; color:#ccc; font-size:1.1rem;">${data.description}</p>
        <p style="margin-bottom: 10px;"><strong>Tech Stack:</strong> ${data.tech}</p>
    `;

  modal.style.display = "block";
  gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  gsap.fromTo(
    ".modal-content",
    { y: -30 },
    { y: 0, duration: 0.4, ease: "back.out(1.7)" }
  );
  addHover();
}

function closeModal() {
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => (modal.style.display = "none"),
  });
}

window.onclick = (e) => {
  if (e.target == modal) closeModal();
};
