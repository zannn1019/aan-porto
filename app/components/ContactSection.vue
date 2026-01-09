<template>
  <section ref="contactRef" class="contact" id="contact">
    <div class="contact-container">
      <!-- Section label -->
      <div class="section-label" ref="labelRef">
        <span class="label-number">{{ contact.sectionNumber }}</span>
        <span class="label-text">{{ contact.sectionLabel }}</span>
      </div>

      <!-- Large title -->
      <div class="contact-title-wrapper">
        <h2 class="contact-title">
          <div class="title-line" ref="title1Ref">
            <span>{{ contact.title.lines[0] }}</span>
          </div>
          <div class="title-line" ref="title2Ref">
            <span>{{ contact.title.lines[1] }}</span>
          </div>
          <div class="title-line" ref="title3Ref">
            <span> <i class="fas fa-star"> {{ contact.title.lines[2] }}</i></span>
          </div>
        </h2>
      </div>

      <!-- Contact grid -->
      <div class="contact-grid">
        <!-- Left: Contact info -->
        <div class="contact-info" ref="infoRef">
          <div class="info-block">
            <h3 class="info-title">Email</h3>
            <a :href="`mailto:${contact.email}`" class="info-link">
              {{ contact.email }}
            </a>
          </div>

          <div class="info-block">
            <h3 class="info-title">Education</h3>
            <p class="info-text">
              {{ contact.education.school }}<br>
              {{ contact.education.major }}<br>
              {{ contact.education.years }}
            </p>
          </div>

          <div class="info-block">
            <h3 class="info-title">Social</h3>
            <div class="social-links">
              <a v-for="social in contact.social" :key="social.name" :href="social.url" class="social-link">{{ social.name }}</a>
            </div>
          </div>

          <div class="info-block">
            <h3 class="info-title">Certifications</h3>
            <p class="info-text">
              <span v-for="(cert, index) in contact.certifications" :key="cert">
                • {{ cert }}<br v-if="index < contact.certifications.length - 1">
              </span>
            </p>
          </div>
        </div>

        <!-- Right: Contact form -->
        <div class="contact-form-wrapper" ref="formRef">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <!-- Success/Error Messages -->
            <div v-if="formStatus.message" :class="['form-message', formStatus.type]">
              {{ formStatus.message }}
            </div>

            <div class="form-group">
              <label class="form-label">Name</label>
              <input 
                v-model="formData.name"
                type="text" 
                class="form-input" 
                placeholder="John Doe" 
                required
                :disabled="formStatus.loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Email</label>
              <input 
                v-model="formData.email"
                type="email" 
                class="form-input" 
                placeholder="john@example.com" 
                required
                :disabled="formStatus.loading"
              >
            </div>

            <div class="form-group">
              <label class="form-label">Project Type</label>
              <select 
                v-model="formData.projectType"
                class="form-select" 
                required
                :disabled="formStatus.loading"
              >
                <option v-for="type in contact.form.projectTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea 
                v-model="formData.message"
                class="form-textarea" 
                placeholder="Tell me about your project..." 
                rows="5" 
                required
                :disabled="formStatus.loading"
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="form-submit" 
              ref="submitBtnRef"
              :disabled="formStatus.loading"
            >
              <span class="submit-text">
                {{ formStatus.loading ? 'SENDING...' : contact.form.submitButtonText }}
              </span>
              <div class="submit-circle">
                <span class="circle-arrow">{{ formStatus.loading ? '⏳' : '→' }}</span>
              </div>
            </button>
          </form>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="contact-decoration">
        <div class="deco-circle deco-1"></div>
        <div class="deco-circle deco-2"></div>
        <div class="deco-line"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { gsap, animateOnScroll, magneticHover } = useGsap()
const { contact } = useIdentity()

const contactRef = ref(null)
const labelRef = ref(null)
const title1Ref = ref(null)
const title2Ref = ref(null)
const title3Ref = ref(null)
const infoRef = ref(null)
const formRef = ref(null)
const submitBtnRef = ref(null)

let cleanupMagnetic = null

// Form data
const formData = ref({
  name: '',
  email: '',
  projectType: '',
  message: ''
})

// Form status
const formStatus = ref({
  loading: false,
  message: '',
  type: '' // 'success' or 'error'
})

const handleSubmit = async () => {
  // Reset status
  formStatus.value.message = ''
  formStatus.value.loading = true

  // Button animation
  gsap.to('.form-submit', {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  })

  try {
    // Send email via API
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: formData.value
    })

    // Success
    formStatus.value.type = 'success'
    formStatus.value.message = '✓ Message sent successfully! I\'ll get back to you soon.'
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      projectType: '',
      message: ''
    }

    // Clear success message after 5 seconds
    setTimeout(() => {
      formStatus.value.message = ''
    }, 5000)

  } catch (error) {
    // Error
    formStatus.value.type = 'error'
    formStatus.value.message = '✗ Failed to send message. Please try again or email me directly.'
    console.error('Contact form error:', error)
  } finally {
    formStatus.value.loading = false
  }
}

onMounted(() => {
  // Section label animation
  animateOnScroll(labelRef.value, {
    x: -50,
    opacity: 0,
    duration: 1
  })

  // Title animation
  const titleLines = [title1Ref.value, title2Ref.value, title3Ref.value]
  titleLines.forEach((line, index) => {
    animateOnScroll(line, {
      scrollTrigger: {
        trigger: '.contact-title-wrapper',
        start: 'top 70%'
      },
      yPercent: 100,
      opacity: 0,
      duration: 1.2,
      delay: index * 0.15,
      ease: 'power4.out'
    })
  })

  // Info blocks animation
  gsap.from('.info-block', {
    scrollTrigger: {
      trigger: infoRef.value,
      start: 'top 70%'
    },
    x: -50,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out'
  })

  // Form animation
  gsap.from('.form-group', {
    scrollTrigger: {
      trigger: formRef.value,
      start: 'top 70%'
    },
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'power3.out'
  })

  // Submit button magnetic effect
  if (submitBtnRef.value) {
    cleanupMagnetic = magneticHover(submitBtnRef.value, 0.5)
  }

  // Decorative elements animation
  gsap.to('.deco-1', {
    x: 30,
    y: -30,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.deco-2', {
    x: -40,
    y: 20,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.deco-line', {
    scaleX: 1.2,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  onBeforeUnmount(() => {
    if (cleanupMagnetic) cleanupMagnetic()
  })
})
</script>

<style scoped>
.contact {
  min-height: 100vh;
  padding: 8rem 3rem;
  background: white;
  position: relative;
  overflow: hidden;
}

.contact-container {
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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

.contact-title-wrapper {
  margin-bottom: 5rem;
}

.contact-title {
  line-height: 0.9;
}

.title-line {
  overflow: visible;
  padding: 0.5rem 0;
}

.title-line span {
  display: inline-block;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.03em;
}

.title-highlight {
  font-style: italic;
  background: linear-gradient(135deg, #000 0%, #333 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 6rem;
  margin-bottom: 4rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.info-block {
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info-title {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.info-link {
  color: black;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.info-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: black;
  transition: width 0.3s ease;
}

.info-link:hover::after {
  width: 100%;
}

.info-text {
  font-size: 1rem;
  line-height: 1.8;
  color: #666;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  color: black;
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  padding-left: 1.5rem;
}

.social-link::before {
  content: '→';
  position: absolute;
  left: 0;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.social-link:hover {
  padding-left: 2rem;
}

.social-link:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.contact-form-wrapper {
  background: #f5f5f5;
  padding: 3rem;
  border-radius: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-message {
  padding: 1rem 1.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  animation: slideDown 0.3s ease;
}

.form-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-message.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.form-input,
.form-select,
.form-textarea {
  padding: 1rem 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  border-radius: 0;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-submit {
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
  justify-content: center;
  gap: 2rem;
  transition: all 0.5s ease;
  align-self: flex-start;
  position: relative;
  overflow: hidden;
}

.form-submit::before {
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

.form-submit:hover::before {
  width: 500px;
  height: 500px;
}

.form-submit:hover {
  color: black;
}

.submit-text,
.submit-circle {
  position: relative;
  z-index: 1;
}

.submit-circle {
  width: 40px;
  height: 40px;
  border: 1px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
}

.form-submit:hover .submit-circle {
  transform: rotate(180deg);
}

.form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-submit:disabled:hover::before {
  width: 0;
  height: 0;
}

.circle-arrow {
  font-size: 1.25rem;
}

.contact-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.deco-circle {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.deco-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  right: 5%;
}

.deco-2 {
  width: 250px;
  height: 250px;
  bottom: 15%;
  left: 10%;
}

.deco-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.05);
}

@media (max-width: 1024px) {
  .contact {
    padding: 6rem 2rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .contact-form-wrapper {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .title-line span {
    font-size: 3rem;
  }

  .info-link {
    font-size: 1.125rem;
  }

  .form-submit {
    width: 100%;
  }

  .deco-1 {
    width: 200px;
    height: 200px;
  }

  .deco-2 {
    width: 150px;
    height: 150px;
  }
}
</style>
