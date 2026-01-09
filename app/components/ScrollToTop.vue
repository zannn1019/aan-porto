<template>
  <Transition name="fade">
    <button 
      v-show="isVisible" 
      class="scroll-to-top" 
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  </Transition>
</template>

<script setup>
const isVisible = ref(false)

const checkScroll = () => {
  isVisible.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: white;
  color: black;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.scroll-to-top:hover {
  transform: translateY(-5px);
  background: #f0f0f0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
