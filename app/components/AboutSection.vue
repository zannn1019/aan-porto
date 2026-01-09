<template>
  <section ref="aboutRef" class="about" id="about">
    <div class="about-container">
      <!-- Section label -->
      <div class="section-label" ref="labelRef">
        <span class="label-number">{{ about.sectionNumber }}</span>
        <span class="label-text">{{ about.sectionLabel }}</span>
      </div>

      <div class="about-content">
        <!-- Large statement -->
        <div class="about-statement">
          <h2 class="statement-text" ref="statementRef">
            I'm a <span class="highlight">{{ about.highlights[0] }}</span> with deep expertise in 
            <span class="highlight">{{ about.highlights[1] }}</span> and <span class="highlight">{{ about.highlights[2] }}</span>, 
            building modern web applications with solid architecture and optimal performance.
          </h2>
        </div>

        <!-- Two column layout -->
        <div class="about-grid">
          <!-- Left: Image reveal -->
          <div class="about-image-wrapper" ref="imageWrapperRef">
            <div class="image-reveal">
              <div class="image-placeholder">
                <div class="image-text">
                  <span v-for="label in about.imagePlaceholderLabels" :key="label" class="image-label">{{ label }}</span>
                </div>
              </div>
            </div>
            <div class="image-decoration"></div>
          </div>

          <!-- Right: Content -->
          <div class="about-details">
            <div class="detail-block" ref="detail1Ref">
              <h3 class="detail-title">{{ about.expertise.title }}</h3>
              <p class="detail-text">
                {{ about.expertise.description }}
              </p>
            </div>

            <div class="detail-block" ref="detail2Ref">
              <h3 class="detail-title">Technical Skills</h3>
              <div class="skills-list">
                <div v-for="skill in about.skills" :key="skill.name" class="skill-item">
                  <span class="skill-name">{{ skill.name }}</span>
                  <div class="skill-bar">
                    <div class="skill-fill" :data-width="skill.level"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="detail-block" ref="detail3Ref">
              <div class="experience-grid">
                <div v-for="exp in experienceData" :key="exp.label" class="exp-item">
                  <span class="exp-number">{{ exp.number }}</span>
                  <span class="exp-label">{{ exp.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { gsap, animateOnScroll, clipPathReveal } = useGsap()
const { projects } = useProject()
const { about } = useIdentity()

const aboutRef = ref(null)
const labelRef = ref(null)
const statementRef = ref(null)
const imageWrapperRef = ref(null)
const detail1Ref = ref(null)
const detail2Ref = ref(null)
const detail3Ref = ref(null)
const badgeRef = ref(null)

const experienceData = computed(() => {
  return about.experience.map(exp => {
    if (exp.number === '' && exp.label === 'Major Projects') {
      return {
        ...exp,
        number: `${projects.value.length}+`
      }
    }
    return exp
  })
})

onMounted(() => {
  // Section label animation
  animateOnScroll(labelRef.value, {
    x: -50,
    opacity: 0,
    duration: 1
  })

  // Statement text reveal
  animateOnScroll(statementRef.value, {
    scrollTrigger: {
      trigger: statementRef.value,
      start: 'top 75%'
    },
    y: 80,
    opacity: 0,
    duration: 1.2
  })

  // Highlight words animation
  const highlights = statementRef.value.querySelectorAll('.highlight')
  gsap.from(highlights, {
    scrollTrigger: {
      trigger: statementRef.value,
      start: 'top 70%'
    },
    backgroundPosition: '100% 0',
    duration: 1.5,
    stagger: 0.2,
    ease: 'power2.inOut'
  })

  // Image reveal animation
  animateOnScroll('.image-reveal', {
    scrollTrigger: {
      trigger: imageWrapperRef.value,
      start: 'top 70%'
    },
    clipPath: 'inset(0% 100% 0% 0%)',
    duration: 1.5,
    ease: 'power4.inOut'
  })

  // Detail blocks stagger
  animateOnScroll([detail1Ref.value, detail2Ref.value, detail3Ref.value], {
    scrollTrigger: {
      trigger: '.about-details',
      start: 'top 70%'
    },
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 1
  })

  // Skill bars animation
  gsap.from('.skill-fill', {
    scrollTrigger: {
      trigger: '.skills-list',
      start: 'top 75%'
    },
    scaleX: 0,
    transformOrigin: 'left',
    stagger: 0.15,
    duration: 1.5,
    ease: 'power3.out',
    onStart: function() {
      this.targets().forEach(target => {
        const width = target.getAttribute('data-width')
        gsap.to(target, { width: `${width}%`, duration: 1.5, ease: 'power3.out' })
      })
    }
  })

  // Rotating badge
  gsap.to('.rotating-svg', {
    rotation: 360,
    duration: 15,
    repeat: -1,
    ease: 'none'
  })

  animateOnScroll(badgeRef.value, {
    scale: 0,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
  })

  // Image decoration parallax
  gsap.to('.image-decoration', {
    scrollTrigger: {
      trigger: imageWrapperRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: -100
  })
})
</script>

<style scoped>
.about {
  min-height: 100vh;
  padding: 8rem 3rem;
  background: black;
  color: white;
  position: relative;
  overflow: hidden;
}

.about-container {
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.label-number {
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  opacity: 0.5;
}

.label-text {
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  font-weight: 500;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.about-statement {
  max-width: 1200px;
}

.statement-text {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1.4;
  letter-spacing: -0.02em;
}

.highlight {
  font-weight: 700;
  color: white;
  background: linear-gradient(90deg, white 0%, white 50%, rgba(255, 255, 255, 0.5) 50%);
  background-size: 200% 100%;
  background-position: 200% 0;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 6rem;
  align-items: start;
}

.about-image-wrapper {
  position: relative;
  position: sticky;
  top: 150px;
}

.image-reveal {
  width: 100%;
  aspect-ratio: 3/4;
  background: #222;
  position: relative;
  overflow: hidden;
  clip-path: inset(0% 0% 0% 0%);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #000 100%);
}

.image-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}

.image-label {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  opacity: 0.1;
}

.image-decoration {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 150px;
  height: 150px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: -1;
}

.about-details {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.detail-block {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.detail-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.detail-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-name {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.skill-bar {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: white;
  width: 0;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}

.exp-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.exp-number {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
}

.exp-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
}

.rotating-badge {
  position: absolute;
  bottom: 8rem;
  right: 5rem;
  width: 150px;
  height: 150px;
}

.rotating-svg {
  width: 100%;
  height: 100%;
}

.rotating-text {
  fill: white;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.badge-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: white;
  color: black;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
}

.badge-center:hover {
  transform: translate(-50%, -50%) scale(1.1);
}

@media (max-width: 1024px) {
  .about {
    padding: 6rem 2rem;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .about-image-wrapper {
    position: relative;
    top: 0;
  }

  .experience-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .rotating-badge {
    position: static;
    margin: 4rem auto 0;
  }
}

@media (max-width: 768px) {
  .statement-text {
    font-size: 1.75rem;
  }

  .detail-title {
    font-size: 1.25rem;
  }

  .detail-text {
    font-size: 1rem;
  }

  .exp-number {
    font-size: 2rem;
  }

  .image-decoration {
    display: none;
  }
}
</style>
