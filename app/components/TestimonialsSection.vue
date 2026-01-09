<template>
  <section ref="sectionRef" class="testimonials-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Testimonials</h2>
        <div class="title-line"></div>
      </div>

      <div class="testimonials-grid">
        <div 
          v-for="(item, index) in about.testimonials" 
          :key="index"
          class="testimonial-card"
          ref="cardsRef"
        >
          <div class="quote-icon">"</div>
          <p class="testimonial-content">{{ item.content }}</p>
          <div class="testimonial-author">
            <div class="author-name">{{ item.name }}</div>
            <div class="author-role">{{ item.role }} at {{ item.company }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { about } = useIdentity()
const { animateOnScroll } = useGsap()

const sectionRef = ref(null)
const cardsRef = ref([])

onMounted(() => {
  animateOnScroll(cardsRef.value, {
    scrollTrigger: {
      trigger: '.testimonials-grid',
      start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
  })
})
</script>

<style scoped>
.testimonials-section {
  padding: 8rem 2rem;
  background: #0a0a0a;
  color: var(--white);
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 3rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  transition: transform 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.05);
}

.quote-icon {
  font-size: 4rem;
  font-family: serif;
  color: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 1rem;
  left: 2rem;
  line-height: 1;
}

.testimonial-content {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
}

.author-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.author-role {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}
</style>
