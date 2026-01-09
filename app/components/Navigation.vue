<template>
  <nav ref="navRef" :class="['nav', { 'menu-open': isMenuOpen }]">
    <div class="nav-container">
    <NuxtLink to="/" class="logo" ref="logoRef">
      <div class="logo-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="12" height="12" stroke="currentColor" stroke-width="2"/>
          <rect x="18" y="2" width="12" height="12" fill="currentColor"/>
          <rect x="2" y="18" width="12" height="12" fill="currentColor"/>
          <rect x="18" y="18" width="12" height="12" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <span class="logo-text">
        <span class="logo-first">{{ branding.logoText.first }}</span>
        <span class="logo-dot">•</span>
        <span class="logo-last">{{ branding.logoText.last }}</span>
      </span>
    </NuxtLink>
      
      <button @click="toggleMenu" class="menu-toggle" ref="menuBtnRef">
        <span class="menu-text">{{ isMenuOpen ? 'CLOSE' : 'MENU' }}</span>
        <div class="menu-icon">
          <span :class="['line', 'line-1', { active: isMenuOpen }]"></span>
          <span :class="['line', 'line-2', { active: isMenuOpen }]"></span>
        </div>
      </button>
    </div>

    <div :class="['menu-overlay', { active: isMenuOpen }]" ref="overlayRef">
      <div class="menu-bg"></div>
      <div class="menu-content">
        <ul class="menu-items">
          <li v-for="(item, index) in menuItems" :key="item.path" class="menu-item">
            <div class="menu-item-wrapper">
              <NuxtLink :to="item.path" @click="closeMenu" class="menu-link">
                <span class="menu-number">0{{ index + 1 }}</span>
                <span class="menu-text-large">{{ item.name }}</span>
              </NuxtLink>
            </div>
          </li>
        </ul>
        
        <div class="menu-footer">
          <div class="menu-social">
            <a v-for="social in menuSocial" :key="social.name" :href="social.url" class="social-link">{{ social.name }}</a>
          </div>
          <div class="menu-info">
            <p>{{ personal.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { gsap, magneticHover, splitTextAnimation } = useGsap()
const { branding, navigation, personal } = useIdentity()

const navRef = ref(null)
const logoRef = ref(null)
const menuBtnRef = ref(null)
const overlayRef = ref(null)
const isMenuOpen = ref(false)

const menuItems = navigation.menuItems
const menuSocial = navigation.menuSocial

let cleanupMagnetic = null

onMounted(() => {
  // Navbar entrance animation
  gsap.from(navRef.value, {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2
  })

  // Magnetic effect on menu button
  if (menuBtnRef.value) {
    cleanupMagnetic = magneticHover(menuBtnRef.value, 0.5)
  }

  // Simple scroll handler
  let lastScroll = 0
  const handleScroll = () => {
    const currentScroll = window.pageYOffset
    
    // Hide/show navbar
    if (currentScroll > lastScroll && currentScroll > 100) {
      gsap.to(navRef.value, { y: -100, duration: 0.3, ease: 'power2.inOut' })
    } else {
      gsap.to(navRef.value, { y: 0, duration: 0.3, ease: 'power2.inOut' })
    }
    lastScroll = currentScroll
    
    // Check if in About section for logo color
    const aboutSection = document.querySelector('#about')
    if (aboutSection && navRef.value) {
      const aboutTop = aboutSection.offsetTop
      const aboutBottom = aboutTop + aboutSection.offsetHeight
      const scrollWithNav = currentScroll + 100
      
      if (scrollWithNav >= aboutTop && scrollWithNav <= aboutBottom) {
        navRef.value.classList.add('in-about')
      } else {
        navRef.value.classList.remove('in-about')
      }
    }
  }
  
  // Initial check
  setTimeout(handleScroll, 100)
  
  // Update on scroll
  window.addEventListener('scroll', handleScroll)
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    if (cleanupMagnetic) cleanupMagnetic()
  })
})

const toggleMenu = () => {
  if (isMenuOpen.value) {
    // Close menu with animation
    closeMenu()
  } else {
    // Open menu
    isMenuOpen.value = true
    document.body.style.overflow = 'hidden'
    
    nextTick(() => {
      // Reset overlay opacity
      gsap.set('.menu-overlay', { opacity: 1 })
      
      // Reset and animate menu background
      gsap.fromTo('.menu-bg', 
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          duration: 0.8,
          ease: 'power4.inOut'
        }
      )

      // Reset and animate menu items stagger
      gsap.fromTo('.menu-item-wrapper',
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: 'power4.out',
          delay: 0.3
        }
      )

      // Reset and animate menu footer
      gsap.fromTo('.menu-footer > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.8
        }
      )
    })
  }
}

const closeMenu = () => {
  // Animate out menu items first
  gsap.to('.menu-item-wrapper', {
    y: -50,
    opacity: 0,
    stagger: 0.05,
    duration: 0.3,
    ease: 'power2.in'
  })
  
  // Then close overlay
  gsap.to('.menu-overlay', {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    delay: 0.2,
    onComplete: () => {
      isMenuOpen.value = false
      document.body.style.overflow = ''
      // Reset all elements to initial state for next open
      gsap.set(['.menu-bg', '.menu-item-wrapper', '.menu-footer > *'], { clearProps: 'all' })
    }
  })
}
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 2rem 3rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.3s ease, color 0.3s ease;
  position: relative;
  z-index: 1001;
  color: black;
}

/* Logo turns white in About section or when menu is open */
.nav.in-about .logo,
.nav.menu-open .logo {
  color: white;
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
}

.logo:hover .logo-icon {
  transform: rotate(180deg);
}

.logo-icon svg {
  color: currentColor;
  display: block;
  transition: color 0.3s ease;
}

.logo-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: currentColor;
}

.logo-first {
  font-weight: 700;
}

.logo-dot {
  font-size: 1.2em;
  opacity: 0.5;
}

.logo-last {
  font-weight: 300;
  letter-spacing: 0.2em;
}

.menu-toggle {
  background: white;
  border: 1px solid black;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  mix-blend-mode: difference;
  filter: invert(1);
  position: relative;
  z-index: 1001;
}

.menu-toggle:hover {
  transform: scale(1.05);
}

.menu-text {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: black;
}

.menu-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.line {
  width: 100%;
  height: 2px;
  background: black;
}

.line-1.active {
  transform: rotate(45deg) translateY(6px);
}

.line-2.active {
  transform: rotate(-45deg) translateY(-6px);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;
}

.menu-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.menu-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  transform-origin: top;
}

.menu-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem 5rem;
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  overflow: hidden;
  margin: 0.5rem 0;
}

.menu-item-wrapper {
  overflow: hidden;
}

.menu-link {
  display: flex;
  align-items: baseline;
  gap: 2rem;
  text-decoration: none;
  color: white;
  transition: all 0.4s ease;
  padding: 1rem 0;
}

.menu-link:hover {
  padding-left: 2rem;
}

.menu-number {
  font-size: 1rem;
  font-weight: 300;
  opacity: 0.5;
  font-family: 'Courier New', monospace;
}

.menu-text-large {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
  transition: transform 0.4s ease;
  display: inline-block;
}

.menu-link:hover .menu-text-large {
  transform: translateX(1rem);
}

.menu-footer {
  position: absolute;
  bottom: 5rem;
  left: 5rem;
  right: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.menu-social {
  display: flex;
  gap: 2rem;
}

.social-link {
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  opacity: 0.6;
  transition: opacity 0.3s;
  position: relative;
}

.social-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: white;
  transition: width 0.3s;
}

.social-link:hover {
  opacity: 1;
}

.social-link:hover::after {
  width: 100%;
}

.menu-info {
  color: white;
  opacity: 0.6;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .nav {
    padding: 1.5rem;
  }
  
  .menu-content {
    padding: 5rem 2rem;
  }
  
  .menu-text-large {
    font-size: 2.5rem;
  }
  
  .menu-footer {
    flex-direction: column;
    gap: 2rem;
    left: 2rem;
    right: 2rem;
    bottom: 3rem;
  }
}
</style>
