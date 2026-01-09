# GSAP Nuxt.js Project Refactoring

## Summary of Changes

I've successfully refactored your React code into a proper Nuxt.js 3 + Vue 3 application with GSAP animations.

## File Structure

```
gsap-nuxt/
├── app/
│   ├── app.vue                      # Main app layout
│   ├── pages/
│   │   └── index.vue                # Home page
│   ├── components/
│   │   ├── Navigation.vue           # Navigation with menu animation
│   │   ├── HeroSection.vue          # Hero with GSAP animations
│   │   ├── AboutSection.vue         # About with scroll-triggered animations
│   │   ├── ProjectsSection.vue      # Projects with stagger animations
│   │   ├── ContactSection.vue       # Contact with scroll animations
│   │   └── Footer.vue               # Simple footer
│   ├── composables/
│   │   └── useGsap.ts               # GSAP composable utility
│   └── plugins/
│       └── gsap.client.ts           # GSAP plugin with ScrollTrigger
```

## Key Features Implemented

### 1. GSAP Plugin (`plugins/gsap.client.ts`)
- Registers GSAP and ScrollTrigger globally
- Available via `useNuxtApp()` in all components
- Properly configured for client-side only

### 2. GSAP Composable (`composables/useGsap.ts`)
Provides reusable animation utilities:
- `animateOnScroll()` - Scroll-triggered animations
- `fadeIn()` - Simple fade animations
- `slideIn()` - Directional slide animations
- `staggerAnimation()` - Stagger effects for multiple elements

### 3. Component Examples

#### Navigation Component
- Menu toggle with GSAP stagger animation
- Animated menu items on open
- Mix-blend-mode for contrast effect

#### HeroSection Component
- Title animation with delay
- Subtitle fade-in
- Infinite scroll indicator animation
- Uses direct GSAP access from composable

#### AboutSection Component
- Scroll-triggered animations using `animateOnScroll()`
- Responsive design
- Clean, minimal layout

#### ProjectsSection Component
- Grid layout with stagger animation
- Scroll-triggered card animations
- Hover effects with CSS transitions
- Dynamic project data

#### ContactSection Component
- Scroll-triggered content reveal
- Call-to-action button with hover effects
- Black background theme

## How to Use GSAP in Your Components

### Method 1: Using the Composable (Recommended)
```vue
<script setup>
const { animateOnScroll, gsap } = useGsap()

onMounted(() => {
  animateOnScroll(element.value, {
    y: 80,
    duration: 1
  })
})
</script>
```

### Method 2: Direct Plugin Access
```vue
<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

onMounted(() => {
  $gsap.from(element.value, {
    scrollTrigger: {
      trigger: element.value,
      start: 'top 80%'
    },
    opacity: 0,
    y: 100
  })
})
</script>
```

### Method 3: Using Composable Utilities
```vue
<script setup>
const { fadeIn, slideIn, staggerAnimation } = useGsap()

onMounted(() => {
  // Fade in
  fadeIn(element.value, { duration: 1.5 })
  
  // Slide from left
  slideIn(element.value, 'left', { delay: 0.3 })
  
  // Stagger multiple elements
  staggerAnimation('.card', { stagger: 0.2 })
})
</script>
```

## Animation Patterns Used

### 1. Page Load Animations
- Fade in on mount
- Delayed entrance animations
- Sequential reveals

### 2. Scroll Triggers
- Elements animate when 80% in viewport
- Smooth transitions
- One-time animations

### 3. Stagger Effects
- Menu items stagger on open
- Project cards stagger on scroll
- Creates rhythm and flow

### 4. Continuous Animations
- Scroll indicator loop
- Infinite repeat animations
- Smooth easing

## Best Practices Implemented

1. **Cleanup**: All GSAP animations are automatically cleaned up by Vue's lifecycle
2. **Performance**: Using `transform` and `opacity` for hardware acceleration
3. **Responsiveness**: Media queries for mobile devices
4. **Accessibility**: Semantic HTML and proper contrast
5. **Composability**: Reusable animation utilities via composable

## Next Steps

1. **Add More Animations**: Explore GSAP's advanced features:
   - Horizontal scroll galleries
   - Parallax effects
   - Timeline animations
   - SVG animations

2. **Optimize Performance**:
   - Use `will-change` CSS property
   - Implement lazy loading for images
   - Add loading states

3. **Enhance UX**:
   - Add page transitions
   - Implement custom cursor
   - Add magnetic button effects

4. **Expand Functionality**:
   - Connect to a CMS
   - Add dark mode
   - Implement form validation

## Running the Project

```bash
# Install dependencies (if needed)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)

---

Created: October 19, 2025
