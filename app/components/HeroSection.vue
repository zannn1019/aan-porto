<template>
  <section ref="heroRef" class="hero">
    <!-- Animated background grid -->
    <div class="hero-bg">
      <div class="grid-lines">
        <div v-for="i in 20" :key="i" class="grid-line" :style="{ left: `${i * 5}%` }"></div>
      </div>
    </div>

    <div class="hero-container">
      <!-- Main title with split text animation -->
      <div class="hero-content">
        <div class="hero-label" ref="labelRef">
          <span class="label-line"></span>
          <span class="label-text">{{ hero.label }}</span>
        </div>

        <h1 class="hero-title">
          <div class="title-line" ref="title1Ref">
            <span class="title-word">{{ personal.firstName }}</span>
          </div>
          <div class="title-line" ref="title2Ref">
            <span class="title-word">{{ personal.lastName }}</span>
          </div>
        </h1>

        <div class="hero-description" ref="descRef">
          <p class="description-text">
            {{ hero.description }}
          </p>
        </div>

        <div class="hero-cta" ref="ctaRef">
          <button class="cta-button" ref="ctaButtonRef">
            <span class="cta-text">{{ hero.ctaButtonText }}</span>
            <span class="cta-icon">→</span>
          </button>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">{{ projects.length }}+</span>
              <span class="stat-label">Projects</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ hero.stats.years }}</span>
              <span class="stat-label">{{ hero.stats.yearsLabel }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" ref="scrollRef">
        <div class="scroll-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" class="scroll-circle-path" />
          </svg>
          <span class="scroll-text">SCROLL</span>
        </div>
        <div class="scroll-arrow">↓</div>
      </div>
    </div>

    <!-- Floating elements for depth -->
    <div class="floating-elements">
      <div class="float-circle float-1"></div>
      <div class="float-circle float-2"></div>
      <div class="float-square float-3"></div>
    </div>
  </section>
</template>

<script setup>
const { gsap, magneticHover, parallaxScroll } = useGsap()
const { projects } = useProject()
const { hero, personal } = useIdentity()

const heroRef = ref(null)
const labelRef = ref(null)
const title1Ref = ref(null)
const title2Ref = ref(null)
const descRef = ref(null)
const ctaRef = ref(null)
const ctaButtonRef = ref(null)
const scrollRef = ref(null)

let cleanupMagnetic = null

onMounted(() => {
  const isLoaded = useState('isLoaded')
  
  // Wait for loading screen to finish before starting animations
  const startAnimations = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Animated entrance sequence
    tl.from('.hero-bg', {
      opacity: 0,
      duration: 1
    })
    .from('.label-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8
    }, '-=0.5')
    .from('.label-text', {
      opacity: 0,
      x: -20,
      duration: 0.6
    }, '-=0.4')
    .from('.title-word', {
      yPercent: 120,
      opacity: 0,
      rotationX: -90,
      stagger: 0.2,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=0.3')
    .from('.description-text', {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from('.hero-cta > *', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    }, '-=0.4')
    .from('.scroll-indicator', {
      y: -30,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')

    // Grid lines animation
    gsap.from('.grid-line', {
      scaleY: 0,
      transformOrigin: 'top',
      stagger: 0.02,
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.5
    })

    // Floating elements parallax
    gsap.to('.float-1', {
      y: -50,
      x: 30,
      rotation: 180,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to('.float-2', {
      y: 30,
      x: -40,
      rotation: -180,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to('.float-3', {
      y: -40,
      x: 20,
      rotation: 360,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }

  // Continuous animations (independent of loading)
  // Scroll circle rotation
  gsap.to('.scroll-circle', {
    rotation: 360,
    duration: 8,
    repeat: -1,
    ease: 'none'
  })

  // Scroll arrow bounce
  gsap.to('.scroll-arrow', {
    y: 10,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  })

  // Magnetic hover on CTA button
  if (ctaButtonRef.value) {
    cleanupMagnetic = magneticHover(ctaButtonRef.value, 0.4)
  }

  // Mouse move parallax
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const moveX = (clientX - window.innerWidth / 2) * 0.01
    const moveY = (clientY - window.innerHeight / 2) * 0.01

    gsap.to('.hero-title', {
      x: moveX,
      y: moveY,
      duration: 1,
      ease: 'power2.out'
    })

    gsap.to('.floating-elements', {
      x: moveX * 2,
      y: moveY * 2,
      duration: 1.5,
      ease: 'power2.out'
    })
  }

  window.addEventListener('mousemove', handleMouseMove)

  // Start animations when loading is complete
  if (isLoaded.value) {
    startAnimations()
  } else {
    watch(isLoaded, (newVal) => {
      if (newVal) {
        startAnimations()
      }
    })
  }

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    if (cleanupMagnetic) cleanupMagnetic()
  })
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  padding: 8rem 3rem 5rem;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  z-index: 1;
}

.grid-lines {
  position: relative;
  width: 100%;
  height: 100%;
}

.grid-line {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: black;
}

.hero-container {
  position: relative;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  z-index: 2;
}

.hero-content {
  max-width: 1200px;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow: hidden;
}

.label-line {
  width: 60px;
  height: 1px;
  background: black;
  display: block;
}

.label-text {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  font-weight: 500;
  opacity: 0.6;
}

.hero-title {
  margin-bottom: 3rem;
  line-height: 0.9;
}

.title-line {
  overflow: hidden;
  padding: 0.5rem 0;
}

.title-word {
  font-size: clamp(4rem, 12vw, 12rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  display: inline-block;
  background: linear-gradient(135deg, #000 0%, #333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  max-width: 600px;
  margin-bottom: 4rem;
}

.description-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #666;
  font-weight: 300;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.cta-button {
  background: black;
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 50px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.cta-button:hover::before {
  width: 400px;
  height: 400px;
}

.cta-button:hover {
  color: black;
}

.cta-text,
.cta-icon {
  position: relative;
  z-index: 1;
}

.cta-icon {
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.cta-button:hover .cta-icon {
  transform: translateX(10px);
}

.hero-stats {
  display: flex;
  gap: 3rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.5;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.scroll-circle {
  width: 80px;
  height: 80px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-circle svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.scroll-circle-path {
  fill: none;
  stroke: black;
  stroke-width: 1;
  stroke-dasharray: 10 5;
}

.scroll-text {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  font-weight: 600;
}

.scroll-arrow {
  font-size: 1.5rem;
  opacity: 0.5;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.float-circle,
.float-square {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.float-circle {
  border-radius: 50%;
}

.float-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 10%;
}

.float-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 15%;
}

.float-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 20%;
  border-radius: 0;
}

@media (max-width: 1024px) {
  .hero {
    padding: 6rem 2rem 4rem;
  }

  .title-word {
    font-size: 6rem;
  }

  .hero-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .title-word {
    font-size: 3.5rem;
  }

  .description-text {
    font-size: 1rem;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }

  .hero-stats {
    width: 100%;
    justify-content: space-around;
  }

  .floating-elements {
    opacity: 0.3;
  }

  .float-1 {
    width: 150px;
    height: 150px;
  }

  .float-2 {
    width: 100px;
    height: 100px;
  }

  .float-3 {
    width: 120px;
    height: 120px;
  }
}
</style>
