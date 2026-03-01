document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const nav = document.querySelector(".nav");
    const mobileToggle = document.querySelector(".mobile-toggle");
    const themeToggle = document.getElementById("theme-toggle");
    const langToggle = document.getElementById("lang-toggle");
    const typewriterText = document.getElementById("typewriter-text");
    const revealElements = document.querySelectorAll(".reveal");
    const translatableElements = document.querySelectorAll("[data-i18n]");
    const metaDescription = document.querySelector('meta[name="description"]');
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const translations = {
        en: {
            title: "Tanima Garg | Data Analyst",
            description: "Tanima Garg portfolio featuring data analytics, BI dashboarding, SQL, Python, Power BI, and Tableau projects.",
            typewriter: [
                "decision-ready dashboards",
                "clean KPI frameworks",
                "reliable SQL reporting",
                "insightful business analysis"
            ]
        },
        fr: {
            title: "Tanima Garg | Analyste de donnees",
            description: "Portfolio de Tanima Garg presentant l'analyse de donnees, les tableaux de bord BI, SQL, Python, Power BI et Tableau.",
            typewriter: [
                "tableaux de bord decisifs",
                "cadres KPI clairs",
                "rapports SQL fiables",
                "analyse d'affaires pertinente"
            ]
        }
    };

    let currentLanguage = localStorage.getItem("portfolio-language") || "en";

    const applyLanguage = (language) => {
        currentLanguage = language;
        document.documentElement.lang = language;
        document.title = translations[language].title;
        if (metaDescription) {
            metaDescription.setAttribute("content", translations[language].description);
        }

        translatableElements.forEach((element) => {
            const value = element.dataset[language];
            if (!value) {
                return;
            }

            const hasArrow = element.classList.contains("inline-cta");
            if (hasArrow) {
                const arrow = element.querySelector("span");
                element.childNodes[0].textContent = `${value} `;
                if (arrow) {
                    arrow.textContent = "→";
                }
                return;
            }

            element.textContent = value;
        });

        if (langToggle) {
            langToggle.textContent = language === "en" ? "FR" : "EN";
            langToggle.setAttribute("aria-label", language === "en" ? "Passer en francais" : "Switch to English");
        }
    };

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            nav.classList.toggle("nav-open");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            nav.classList.remove("nav-open");
            const offset = 88;
            const position = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));

    const storedTheme = localStorage.getItem("portfolio-theme");
    if (storedTheme === "dark") {
        body.classList.add("dark");
    }

    applyLanguage(currentLanguage);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark");
            localStorage.setItem("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
        });
    }

    if (langToggle) {
        langToggle.addEventListener("click", () => {
            const nextLanguage = currentLanguage === "en" ? "fr" : "en";
            localStorage.setItem("portfolio-language", nextLanguage);
            applyLanguage(nextLanguage);
            if (typewriterText) {
                phraseIndex = 0;
                charIndex = 0;
                deleting = false;
                typewriterText.textContent = "";
            }
        });
    }

    if (typewriterText) {
        const tick = () => {
            const phrases = translations[currentLanguage].typewriter;
            const phrase = phrases[phraseIndex];
            typewriterText.textContent = deleting
                ? phrase.slice(0, charIndex--)
                : phrase.slice(0, charIndex++);

            let delay = deleting ? 40 : 85;

            if (!deleting && charIndex > phrase.length) {
                deleting = true;
                delay = 1400;
            } else if (deleting && charIndex < 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                charIndex = 0;
                delay = 350;
            }

            window.setTimeout(tick, delay);
        };

        tick();
    }

    const canvas = document.getElementById("particle-field");
    if (!canvas) {
        return;
    }

    const context = canvas.getContext("2d");
    const particles = [];
    const particleCount = 90;

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.6,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.55 + 0.2
    });

    resizeCanvas();
    for (let i = 0; i < particleCount; i += 1) {
        particles.push(createParticle());
    }

    const drawParticles = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = body.classList.contains("dark");
        const color = isDark ? "121, 166, 255" : "79, 136, 255";

        particles.forEach((particle) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }

            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }

            context.beginPath();
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fillStyle = `rgba(${color}, ${particle.alpha})`;
            context.fill();
        });

        requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    drawParticles();
});
