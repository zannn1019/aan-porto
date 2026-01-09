<template>
  <section ref="projectsRef" class="projects" id="work">
    <div class="projects-container">
      <!-- Section header -->
      <div class="projects-header">
        <div class="section-label" ref="labelRef">
          <span class="label-number">02</span>
          <span class="label-text">SELECTED WORKS</span>
        </div>
        <h2 class="projects-title" ref="titleRef">
          Featured<br>Projects
        </h2>
      </div>

      <!-- Project cards -->
      <div class="projects-list">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-item"
          :data-index="index"
          @mouseenter="handleProjectHover(index)"
          @mouseleave="handleProjectLeave(index)"
        >
          <div class="project-card">
            <div class="card-image">
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="project-image"
                loading="lazy"
              />
              <div class="image-overlay"></div>
            </div>

            <div class="card-content">
              <div class="card-header">
                <span class="project-number">0{{ index + 1 }}</span>
                <div class="project-tags">
                  <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
              
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              
              <div class="card-footer">
                <button class="project-link">
                  <span>View Project</span>
                  <span class="link-arrow">→</span>
                </button>
                <span class="project-year">{{ project.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View all link -->
      <div class="projects-cta" ref="ctaRef">
        <button class="view-all-button">
          <span class="button-text">VIEW ALL PROJECTS</span>
          <div class="button-circle">
            <span class="circle-text">→</span>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const { gsap, animateOnScroll } = useGsap()
const { projects }   = useProject()

const projectsRef = ref(null)
const labelRef = ref(null)
const titleRef = ref(null)
const ctaRef = ref(null)

const handleProjectHover = (index) => {
  const card = document.querySelector(`[data-index="${index}"] .project-card`)
  const image = document.querySelector(`[data-index="${index}"] .project-image`)
  const overlay = document.querySelector(`[data-index="${index}"] .image-overlay`)
  
  gsap.to(card, {
    y: -10,
    duration: 0.6,
    ease: 'power3.out'
  })
  
  gsap.to(image, {
    scale: 1.1,
    duration: 0.8,
    ease: 'power2.out'
  })
  
  gsap.to(overlay, {
    opacity: 0,
    duration: 0.4
  })
}

const handleProjectLeave = (index) => {
  const card = document.querySelector(`[data-index="${index}"] .project-card`)
  const image = document.querySelector(`[data-index="${index}"] .project-image`)
  const overlay = document.querySelector(`[data-index="${index}"] .image-overlay`)
  
  gsap.to(card, {
    y: 0,
    duration: 0.6,
    ease: 'power3.out'
  })
  
  gsap.to(image, {
    scale: 1,
    duration: 0.8,
    ease: 'power2.out'
  })
  
  gsap.to(overlay, {
    opacity: 0.3,
    duration: 0.4
  })
}

onMounted(() => {
  // Section label animation
  animateOnScroll(labelRef.value, {
    x: -50,
    opacity: 0,
    duration: 1
  })

  // Title animation
  animateOnScroll(titleRef.value, {
    y: 80,
    opacity: 0,
    duration: 1.2
  })

  // Project cards stagger
  gsap.from('.project-item', {
    scrollTrigger: {
      trigger: '.projects-list',
      start: 'top 70%'
    },
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  })

  // CTA animation
  animateOnScroll(ctaRef.value, {
    y: 60,
    opacity: 0,
    duration: 1
  })

  // Initially scramble all puzzle pieces
  setTimeout(() => {
    document.querySelectorAll('.puzzle-piece').forEach((piece) => {
      const randomX = (Math.random() - 0.5) * 100
      const randomY = (Math.random() - 0.5) * 100
      const randomRotation = (Math.random() - 0.5) * 30
      
      gsap.set(piece, {
        x: randomX,
        y: randomY,
        rotation: randomRotation,
        scale: 0.95
      })
    })
  }, 100)
})
</script>

<style scoped>
.projects {
  min-height: 100vh;
  padding: 8rem 3rem;
  background: white;
  position: relative;
  overflow: hidden;
}

.projects-container {
  max-width: 1600px;
  margin: 0 auto;
}

.projects-header {
  margin-bottom: 6rem;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
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

.projects-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem 3rem;
  margin-bottom: 6rem;
}

.project-item {
  cursor: pointer;
}

.project-card {
  transition: transform 0.5s ease;
}

.card-image {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  margin-bottom: 2rem;
  overflow: hidden;
  background: #f5f5f5;
  border-radius: 0;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  will-change: transform;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0.3;
  transition: opacity 0.4s;
  pointer-events: none;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-number {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  opacity: 0.5;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  letter-spacing: 0.05em;
}

.project-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0.5rem 0;
}

.project-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  font-weight: 300;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.project-link {
  background: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: gap 0.3s ease;
}

.project-link:hover {
  gap: 1rem;
}

.link-arrow {
  font-size: 1.25rem;
  transition: transform 0.3s;
}

.project-link:hover .link-arrow {
  transform: translateX(5px);
}

.project-year {
  font-size: 0.875rem;
  opacity: 0.5;
  font-family: 'Courier New', monospace;
}

.projects-cta {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.view-all-button {
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
  gap: 2rem;
  border-radius: 50px;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

.view-all-button::before {
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

.view-all-button:hover::before {
  width: 500px;
  height: 500px;
}

.view-all-button:hover {
  color: black;
}

.button-text,
.button-circle {
  position: relative;
  z-index: 1;
}

.button-circle {
  width: 40px;
  height: 40px;
  border: 1px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: transform 0.5s ease;
}

.view-all-button:hover .button-circle {
  transform: rotate(180deg);
}

@media (max-width: 1024px) {
  .projects {
    padding: 6rem 2rem;
  }

  .projects-list {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .projects-title {
    font-size: 3rem;
  }

  .project-title {
    font-size: 1.5rem;
  }

  .project-description {
    font-size: 0.9375rem;
  }

  .view-all-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
