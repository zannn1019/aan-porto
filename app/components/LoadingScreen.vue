<template>
  <transition name="loader-fade">
    <div v-if="isLoading" class="loader-container">
      <!-- Progress bar at top -->
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>

      <!-- Main loader content -->
      <div class="loader-content">
        <!-- Logo/Name Animation -->
        <div class="loader-logo">
          <div class="logo-icon">
            <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
              <rect
                x="2"
                y="2"
                width="12"
                height="12"
                stroke="currentColor"
                stroke-width="2"
                class="logo-rect logo-rect-1"
              />
              <rect
                x="18"
                y="2"
                width="12"
                height="12"
                fill="currentColor"
                class="logo-rect logo-rect-2"
              />
              <rect
                x="2"
                y="18"
                width="12"
                height="12"
                fill="currentColor"
                class="logo-rect logo-rect-3"
              />
              <rect
                x="18"
                y="18"
                width="12"
                height="12"
                stroke="currentColor"
                stroke-width="2"
                class="logo-rect logo-rect-4"
              />
            </svg>
          </div>
          <h1 class="loader-name">
            {{ personal.firstName }} {{ personal.lastName }}
          </h1>
          <p class="loader-title">{{ personal.title }}</p>
        </div>

        <!-- Counter -->
        <div class="loader-counter">
          <span class="counter-number">{{ displayProgress }}</span>
          <span class="counter-percent">%</span>
        </div>

        <!-- Loading text -->
        <div class="loader-text">
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
          <span class="loading-dot">.</span>
        </div>
      </div>

      <!-- Decorative circles -->
      <div class="loader-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const { personal } = useIdentity();

const emit = defineEmits(["loaded"]);

const isLoading = ref(true);
const progress = ref(0);
const displayProgress = ref(0);

const updateProgress = () => {
  const duration = 1000; // Total loading time in ms
  const interval = 16; // Update every 16ms (60fps)
  const steps = duration / interval;
  const increment = 100 / steps;

  const timer = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(timer);
      // Small delay before hiding
      setTimeout(() => {
        isLoading.value = false;
        // Enable scrolling
        document.body.style.overflow = "";
        // Emit loaded event
        emit("loaded");
      }, 500);
    } else {
      progress.value += increment;
      // Smooth counter animation with easing
      displayProgress.value = Math.floor(progress.value);
    }
  }, interval);
};

onMounted(() => {
  // Disable scrolling during loading
  document.body.style.overflow = "hidden";

  // Start progress animation
  setTimeout(() => {
    updateProgress();
  }, 300);
});
</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

/* Progress bar at top */
.progress-bar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  position: relative;
}

.progress-bar::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6));
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Main content */
.loader-content {
  position: relative;
  z-index: 2;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo */
.loader-logo {
  margin-bottom: 3rem;
}

.logo-icon {
  display: inline-block;
  margin-bottom: 2rem;
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

.logo-icon svg {
  color: white;
}

.logo-rect {
  animation: logoRectFade 2s ease-in-out infinite;
}

.logo-rect-1 {
  animation-delay: 0s;
}

.logo-rect-2 {
  animation-delay: 0.2s;
}

.logo-rect-3 {
  animation-delay: 0.4s;
}

.logo-rect-4 {
  animation-delay: 0.6s;
}

@keyframes logoRectFade {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.loader-name {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: white;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #999 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.loader-title {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  font-weight: 500;
}

/* Counter */
.loader-counter {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.counter-number {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  color: white;
  line-height: 1;
  font-family: "Courier New", monospace;
  letter-spacing: -0.05em;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
}

.counter-percent {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Courier New", monospace;
}

/* Loading text */
.loader-text {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.loading-dot {
  font-size: 2rem;
  color: white;
  animation: dotPulse 1.4s infinite;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%,
  80%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  40% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Decorative circles */
.loader-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.circle {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 10%;
  animation: circleFloat 8s ease-in-out infinite;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 15%;
  left: 15%;
  animation: circleFloat 6s ease-in-out infinite reverse;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 10%;
  animation: circleFloat 10s ease-in-out infinite;
}

@keyframes circleFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(20px, -20px) scale(1.1);
    opacity: 0.1;
  }
}

/* Fade out transition - Bottom to Top slide */
.loader-fade-enter-active {
  transition: opacity 0.3s ease;
}

.loader-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.loader-fade-enter-from {
  opacity: 0;
}

.loader-fade-leave-to {
  opacity: 1;
  transform: translateY(-100%);
}

/* Responsive */
@media (max-width: 768px) {
  .loader-name {
    font-size: 2rem;
  }

  .counter-number {
    font-size: 5rem;
  }

  .counter-percent {
    font-size: 2.5rem;
  }

  .circle-1 {
    width: 150px;
    height: 150px;
  }

  .circle-2 {
    width: 100px;
    height: 100px;
  }

  .circle-3 {
    width: 80px;
    height: 80px;
  }
}
</style>
