<template>
  <div v-if="!isMobile" class="custom-cursor">
    <div ref="cursorRef" class="cursor"></div>
    <div ref="cursorDotRef" class="cursor-dot"></div>
  </div>
</template>

<script setup>
const cursorRef = ref(null)
const cursorDotRef = ref(null)
const isMobile = ref(false)

let cursorX = 0
let cursorY = 0
let cursorDotX = 0
let cursorDotY = 0

// Helper function to determine if background is dark
const isBackgroundDark = (element) => {
  if (!element) return true // Default to dark
  
  const bgColor = window.getComputedStyle(element).backgroundColor
  
  // If transparent, check parent
  if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
    if (element.parentElement) {
      return isBackgroundDark(element.parentElement)
    }
    return true // Default to dark
  }
  
  // Extract RGB values
  const rgb = bgColor.match(/\d+/g)
  if (!rgb || rgb.length < 3) return true
  
  // Calculate relative luminance
  const r = parseInt(rgb[0])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2])
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  // Return true if dark (luminance < 0.5)
  return luminance < 0.5
}

onMounted(() => {
  // Check if mobile
  isMobile.value = window.innerWidth <= 1024 || 'ontouchstart' in window

  if (isMobile.value) return

  // Update cursor color based on background
  const updateCursorColor = () => {
    // Get element under cursor using current cursor position
    const elementUnderCursor = document.elementFromPoint(cursorDotX, cursorDotY)
    if (!elementUnderCursor) return
    
    // Check if menu is open by looking for active menu overlay
    const menuOverlay = document.querySelector('.menu-overlay.active')
    const isMenuOpen = menuOverlay !== null
    
    const isDark = isBackgroundDark(elementUnderCursor)
    
    // Update cursor color based on background
    if (cursorRef.value && cursorDotRef.value) {
      // Force white cursor if menu is open or on dark background
      if (isDark || isMenuOpen) {
        // White cursor on dark background or when menu is open
        cursorRef.value.style.borderColor = 'white'
        cursorDotRef.value.style.backgroundColor = 'white'
      } else {
        // Black cursor on light background
        cursorRef.value.style.borderColor = 'black'
        cursorDotRef.value.style.backgroundColor = 'black'
      }
    }
  }

  // Mouse move handler - just update position
  const handleMouseMove = (e) => {
    cursorDotX = e.clientX
    cursorDotY = e.clientY
  }

  document.addEventListener('mousemove', handleMouseMove)

  // Use requestAnimationFrame for smooth 60fps animation and color detection
  const animate = () => {
    // Smooth follow with lerp
    cursorX += (cursorDotX - cursorX) * 0.15
    cursorY += (cursorDotY - cursorY) * 0.15

    // Update cursor position
    if (cursorRef.value) {
      cursorRef.value.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`
    }
    
    // Update dot position (instant follow)
    if (cursorDotRef.value) {
      cursorDotRef.value.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px) translate(-50%, -50%)`
    }

    // Check background color every frame to handle dynamic changes (like menu opening)
    updateCursorColor()

    requestAnimationFrame(animate)
  }

  animate()

  // Interactive elements cursor effects
  const setupInteractiveElements = () => {
    const interactiveSelectors = 'a, button, .project-card, input, textarea, select'
    const elements = document.querySelectorAll(interactiveSelectors)

    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorRef.value) {
          cursorRef.value.style.width = '80px'
          cursorRef.value.style.height = '80px'
        }
        if (cursorDotRef.value) {
          cursorDotRef.value.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px) translate(-50%, -50%) scale(0)`
        }
      })

      el.addEventListener('mouseleave', () => {
        if (cursorRef.value) {
          cursorRef.value.style.width = '40px'
          cursorRef.value.style.height = '40px'
        }
        if (cursorDotRef.value) {
          cursorDotRef.value.style.transform = `translate(${cursorDotX}px, ${cursorDotY}px) translate(-50%, -50%) scale(1)`
        }
      })
    })
  }

  // Initial setup
  setupInteractiveElements()

  // Re-setup on dynamic content changes with debounce
  let timeoutId
  const observer = new MutationObserver(() => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(setupInteractiveElements, 100)
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Cursor hide on mouse leave
  document.addEventListener('mouseleave', () => {
    if (cursorRef.value) cursorRef.value.style.opacity = '0'
    if (cursorDotRef.value) cursorDotRef.value.style.opacity = '0'
  })

  document.addEventListener('mouseenter', () => {
    if (cursorRef.value) cursorRef.value.style.opacity = '1'
    if (cursorDotRef.value) cursorDotRef.value.style.opacity = '1'
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    observer.disconnect()
    clearTimeout(timeoutId)
  })
})
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid white;
  border-radius: 50%;
  pointer-events: none;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease, border-color 0.2s ease;
  will-change: transform;
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.2s ease;
  will-change: transform;
}

@media (max-width: 1024px) {
  .custom-cursor {
    display: none;
  }
}
</style>
