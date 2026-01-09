<template>
  <section ref="sectionRef" class="experience-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Experience</h2>
        <div class="title-line"></div>
      </div>

      <div class="timeline">
        <div class="timeline-line"></div>
        
        <div 
          v-for="(item, index) in about.experienceTimeline" 
          :key="index"
          class="timeline-item"
          :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }"
        >
          <div class="timeline-content" ref="itemsRef">
            <div class="timeline-date">{{ item.period }}</div>
            <h3 class="timeline-role">{{ item.role }}</h3>
            <div class="timeline-company">{{ item.company }}</div>
            <p class="timeline-description">{{ item.description }}</p>
          </div>
          <div class="timeline-dot"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { about } = useIdentity()
const { gsap, animateOnScroll } = useGsap()

const sectionRef = ref(null)
const itemsRef = ref([])

onMounted(() => {
  // Animate timeline line
  gsap.from('.timeline-line', {
    scrollTrigger: {
      trigger: '.timeline',
      start: 'top 80%',
      end: 'bottom 80%',
      scrub: 1
    },
    scaleY: 0,
    transformOrigin: 'top',
    ease: 'none'
  })

  // Animate timeline items
  itemsRef.value.forEach((item, index) => {
    const direction = index % 2 === 0 ? -50 : 50
    
    animateOnScroll(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%'
      },
      x: direction,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  })
})
</script>

<style scoped>
.experience-section {
  padding: 8rem 2rem;
  background: var(--black);
  color: var(--white);
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 6rem;
  text-align: center;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.title-line {
  width: 60px;
  height: 4px;
  background: var(--white);
  margin: 0 auto;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  justify-content: center;
  padding-bottom: 4rem;
  position: relative;
  width: 100%;
}

.timeline-content {
  width: 45%;
  background: rgba(255, 255, 255, 0.03);
  padding: 2.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, background 0.3s ease;
}

.timeline-content:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-5px);
}

.timeline-item.left {
  justify-content: flex-start;
}

.timeline-item.right {
  justify-content: flex-end;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 2.5rem;
  width: 16px;
  height: 16px;
  background: var(--white);
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 8px rgba(0, 0, 0, 1);
  z-index: 1;
}

.timeline-date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.timeline-role {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--white);
}

.timeline-company {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.timeline-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-item {
    justify-content: flex-end !important;
    padding-left: 50px;
  }

  .timeline-content {
    width: 100%;
  }

  .timeline-dot {
    left: 20px;
  }
}
</style>
