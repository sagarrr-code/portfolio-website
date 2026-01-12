// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.querySelector(".preloader")

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      preloader.style.visibility = "hidden"
    }, 2000)
  })

  // Custom Cursor
  const cursor = document.querySelector(".custom-cursor")

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.display = "block"
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })

    document.addEventListener("mousedown", () => {
      cursor.style.width = "15px"
      cursor.style.height = "15px"
    })

    document.addEventListener("mouseup", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
    })

    const links = document.querySelectorAll("a, button")

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.width = "30px"
        cursor.style.height = "30px"
        cursor.style.borderColor = "var(--primary)"
      })

      link.addEventListener("mouseleave", () => {
        cursor.style.width = "20px"
        cursor.style.height = "20px"
        cursor.style.borderColor = "var(--primary)"
      })
    })

    document.addEventListener("mouseleave", () => {
      cursor.style.display = "none"
    })
  }

  // Mobile Menu
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Typed Text Effect
  const typedTextElement = document.querySelector(".typed-text")
  const textArray = ["Computer Engineering Student", "AI/ML Enthusiast", "Data Science", "Circuit Designer"]
  let textIndex = 0

  function typeText() {
    if (typedTextElement) {
      const currentText = textArray[textIndex]
      typedTextElement.textContent = ""

      let charIndex = 0
      const typeInterval = setInterval(() => {
        if (charIndex < currentText.length) {
          typedTextElement.textContent += currentText.charAt(charIndex)
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(eraseText, 2000)
        }
      }, 100)
    }
  }

  function eraseText() {
    if (typedTextElement) {
      const currentText = typedTextElement.textContent

      const eraseInterval = setInterval(() => {
        if (typedTextElement.textContent.length > 0) {
          typedTextElement.textContent = typedTextElement.textContent.substring(
            0,
            typedTextElement.textContent.length - 1,
          )
        } else {
          clearInterval(eraseInterval)
          textIndex = (textIndex + 1) % textArray.length
          setTimeout(typeText, 500)
        }
      }, 50)
    }
  }

  typeText()

  // Binary Rain Animation
  const binaryCanvas = document.getElementById("binaryRain")

  if (binaryCanvas) {
    const binaryCtx = binaryCanvas.getContext("2d")

    binaryCanvas.width = binaryCanvas.offsetWidth
    binaryCanvas.height = binaryCanvas.offsetHeight

    const binary = "01"
    const fontSize = 14
    const columns = binaryCanvas.width / fontSize

    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    function drawBinaryRain() {
      binaryCtx.fillStyle = "rgba(26, 26, 46, 0.05)"
      binaryCtx.fillRect(0, 0, binaryCanvas.width, binaryCanvas.height)

      binaryCtx.fillStyle = "#00ff99"
      binaryCtx.font = fontSize + "px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length))
        binaryCtx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > binaryCanvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    setInterval(drawBinaryRain, 100)
  }

  // Particle Animation
  const particleCanvas = document.getElementById("particleCanvas")

  if (particleCanvas) {
    const particleCtx = particleCanvas.getContext("2d")

    particleCanvas.width = window.innerWidth
    particleCanvas.height = window.innerHeight

    const particlesArray = []
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * particleCanvas.width
        this.y = Math.random() * particleCanvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = this.getRandomColor()
      }

      getRandomColor() {
        const colors = [
          "rgba(0, 255, 153, 0.5)",
          "rgba(0, 229, 255, 0.5)",
          "rgba(162, 155, 254, 0.5)",
          "rgba(255, 107, 107, 0.5)",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.01

        if (this.x < 0 || this.x > particleCanvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > particleCanvas.height) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        particleCtx.fillStyle = this.color
        particleCtx.beginPath()
        particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        particleCtx.fill()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animateParticles() {
      particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()

        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            particleCtx.beginPath()
            particleCtx.strokeStyle = particlesArray[i].color
            particleCtx.lineWidth = 0.2
            particleCtx.moveTo(particlesArray[i].x, particlesArray[i].y)
            particleCtx.lineTo(particlesArray[j].x, particlesArray[j].y)
            particleCtx.stroke()
          }
        }

        if (particlesArray[i].size <= 0.2) {
          particlesArray.splice(i, 1)
          i--
          particlesArray.push(new Particle())
        }
      }

      requestAnimationFrame(animateParticles)
    }

    init()
    animateParticles()

    window.addEventListener("resize", () => {
      particleCanvas.width = window.innerWidth
      particleCanvas.height = window.innerHeight
      init()
    })
  }

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  })

  // Skill Progress Animation
  const progressBars = document.querySelectorAll(".progress-bar")

  function animateProgressBars() {
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width")
      bar.style.width = width
    })
  }

  // Scroll Animation
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    // Animate progress bars when skills section is in view
    const skillsSection = document.querySelector(".skills")

    if (skillsSection) {
      const skillsSectionTop = skillsSection.offsetTop
      const skillsSectionHeight = skillsSection.offsetHeight

      if (
        scrollPosition > skillsSectionTop - window.innerHeight / 2 &&
        scrollPosition < skillsSectionTop + skillsSectionHeight
      ) {
        animateProgressBars()
      }
    }

    // Update active nav link based on scroll position
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active")
          }
        })
      }
    })

    // Show/hide back to top button
    const backToTopButton = document.querySelector(".back-to-top")

    if (scrollPosition > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  // Back to Top Button
  const backToTopButton = document.querySelector(".back-to-top")

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Form Submission
  const contactForm = document.querySelector(".contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For now, we'll just log it to the console
      console.log("Form submitted:", { name, email, subject, message })

      // Reset form
      contactForm.reset()

      // Show success message (you could create a more sophisticated notification)
      alert("Message sent successfully!")
    })
  }

  // Window resize event
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      cursor.style.display = "none"
    }
  })
})

