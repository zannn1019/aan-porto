<template>
  <transition name="loader-fade">
    <div v-if="isLoading" class="loader-container">
      <!-- Animated background gradient -->
      <div class="loader-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>

      <!-- Progress bar at top with glow -->
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }">
          <div class="progress-glow"></div>
        </div>
      </div>

      <!-- Main loader content -->
      <div class="loader-content">
        <!-- Animated logo with particles -->
        <div class="loader-logo">
          <div class="logo-wrapper">
            <div class="logo-icon">
              <svg width="100" height="100" viewBox="0 0 32 32" fill="none">
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
            <!-- Particle effects around logo -->
            <div class="particles">
              <div
                v-for="i in 12"
                :key="i"
                class="particle"
                :style="{ '--i': i }"
              ></div>
            </div>
          </div>

          <div class="name-wrapper">
            <h1 class="loader-name">
              <span
                class="name-letter"
                v-for="(letter, index) in nameLetters"
                :key="index"
                :style="{ '--delay': index * 0.05 + 's' }"
              >
                {{ letter === " " ? "\u00A0" : letter }}
              </span>
            </h1>
            <div class="title-container">
              <p class="loader-title">{{ personal.title }}</p>
              <div class="title-underline"></div>
            </div>
          </div>
        </div>

        <!-- 3D-style counter with perspective -->
        <div class="loader-counter">
          <div class="counter-wrapper">
            <span class="counter-number">{{ displayProgress }}</span>
            <span class="counter-percent">%</span>
          </div>
          <div class="counter-shadow"></div>
        </div>

        <!-- Loading status text -->
        <div class="loader-status">
          <div class="status-text">{{ loadingStatus }}</div>
          <div class="status-dots">
            <span
              class="dot"
              v-for="i in 3"
              :key="i"
              :style="{ '--i': i }"
            ></span>
          </div>
        </div>
      </div>

      <!-- Corner decorations -->
      <div class="corner-decoration top-left"></div>
      <div class="corner-decoration top-right"></div>
      <div class="corner-decoration bottom-left"></div>
      <div class="corner-decoration bottom-right"></div>
    </div>
  </transition>
</template>

<script setup>
const { personal } = useIdentity();

const emit = defineEmits(["loaded"]);

const isLoading = ref(true);
const progress = ref(0);
const displayProgress = ref(0);
const loadingStatus = ref("Initializing");

const nameLetters = computed(() => {
  return `${personal.firstName} ${personal.lastName}`.split("");
});

const statuses = [
  "Initializing",
  "Loading Assets",
  "Preparing Experience",
  "Almost Ready",
  "Welcome",
];

const updateProgress = () => {
  const duration = 3000;
  const interval = 16;
  const steps = duration / interval;
  const increment = 100 / steps;

  const timer = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(timer);
      loadingStatus.value = "Welcome";
      setTimeout(() => {
        isLoading.value = false;
        document.body.style.overflow = "";
        // Emit loaded event
        emit("loaded");
      }, 800);
    } else {
      progress.value += increment;
      displayProgress.value = Math.floor(progress.value);

      // Update status based on progress
      if (progress.value < 25) {
        loadingStatus.value = statuses[0];
      } else if (progress.value < 50) {
        loadingStatus.value = statuses[1];
      } else if (progress.value < 75) {
        loadingStatus.value = statuses[2];
      } else if (progress.value < 100) {
        loadingStatus.value = statuses[3];
      }
    }
  }, interval);
};

onMounted(() => {
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    updateProgress();
  }, 500);
});
</script>

<style scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

/* Animated background */
.loader-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  );
  top: -10%;
  right: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(200, 200, 200, 0.2) 0%,
    transparent 70%
  );
  bottom: -10%;
  left: -5%;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(150, 150, 150, 0.25) 0%,
    transparent 70%
  );
  top: 40%;
  left: 40%;
  animation-delay: -14s;
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

/* Enhanced progress bar */
.progress-bar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  overflow: visible;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0.8) 100%
  );
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
}

.progress-glow {
  position: absolute;
  right: 0;
  top: -10px;
  width: 20px;
  height: 24px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 70%
  );
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Main content */
.loader-content {
  position: relative;
  z-index: 2;
  text-align: center;
  animation: contentFadeIn 1s ease-out;
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo with particles */
.loader-logo {
  margin-bottom: 4rem;
}

.logo-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 2.5rem;
}

.logo-icon {
  display: inline-block;
  animation: logoRotate 4s ease-in-out infinite;
  transform-style: preserve-3d;
}

@keyframes logoRotate {
  0%,
  100% {
    transform: rotateY(0deg) rotateX(0deg);
  }
  50% {
    transform: rotateY(180deg) rotateX(10deg);
  }
}

.logo-icon svg {
  color: white;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
}

.logo-rect {
  animation: rectPulse 2s ease-in-out infinite;
}

.logo-rect-1 {
  animation-delay: 0s;
}
.logo-rect-2 {
  animation-delay: 0.25s;
}
.logo-rect-3 {
  animation-delay: 0.5s;
}
.logo-rect-4 {
  animation-delay: 0.75s;
}

@keyframes rectPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

/* Particles */
.particles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  opacity: 0;
  animation: particleFloat 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.2s);
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
      translateY(0) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
      translateY(-60px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
      translateY(-120px) scale(0);
  }
}

/* Name animation */
.name-wrapper {
  overflow: hidden;
}

.loader-name {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  color: white;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.name-letter {
  display: inline-block;
  animation: letterDrop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
  transform: translateY(-100px) rotateX(-90deg);
  animation-delay: var(--delay);
}

@keyframes letterDrop {
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

.title-container {
  position: relative;
  display: inline-block;
}

.loader-title {
  font-size: 0.875rem;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.title-underline {
  height: 2px;
  background: linear-gradient(90deg, transparent, white, transparent);
  animation: underlineExpand 1.5s ease-out 0.5s forwards;
  transform: scaleX(0);
}

@keyframes underlineExpand {
  to {
    transform: scaleX(1);
  }
}

/* 3D Counter */
.loader-counter {
  margin-bottom: 3rem;
  perspective: 1000px;
}

.counter-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
  transform-style: preserve-3d;
  animation: counterFloat 3s ease-in-out infinite;
}

@keyframes counterFloat {
  0%,
  100% {
    transform: translateZ(0px) rotateX(0deg);
  }
  50% {
    transform: translateZ(20px) rotateX(5deg);
  }
}

.counter-number {
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 900;
  color: white;
  line-height: 1;
  font-family: "Courier New", monospace;
  letter-spacing: -0.05em;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.5), 0 10px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(180deg, #fff 0%, #ccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.counter-percent {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  font-family: "Courier New", monospace;
}

.counter-shadow {
  margin-top: 1rem;
  height: 10px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.3) 0%, transparent 70%);
  filter: blur(10px);
  animation: shadowPulse 3s ease-in-out infinite;
}

@keyframes shadowPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
}

/* Status */
.loader-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.status-text {
  font-size: 1rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  font-weight: 500;
  animation: textFade 0.5s ease-in-out;
}

@keyframes textFade {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-dots {
  display: flex;
  gap: 0.75rem;
}

.dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.2s);
}

@keyframes dotBounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Corner decorations */
.corner-decoration {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.top-left {
  top: 2rem;
  left: 2rem;
  border-right: none;
  border-bottom: none;
  animation: cornerGrow 1s ease-out 0.5s forwards;
  transform: scale(0);
  transform-origin: top left;
}

.top-right {
  top: 2rem;
  right: 2rem;
  border-left: none;
  border-bottom: none;
  animation: cornerGrow 1s ease-out 0.6s forwards;
  transform: scale(0);
  transform-origin: top right;
}

.bottom-left {
  bottom: 2rem;
  left: 2rem;
  border-right: none;
  border-top: none;
  animation: cornerGrow 1s ease-out 0.7s forwards;
  transform: scale(0);
  transform-origin: bottom left;
}

.bottom-right {
  bottom: 2rem;
  right: 2rem;
  border-left: none;
  border-top: none;
  animation: cornerGrow 1s ease-out 0.8s forwards;
  transform: scale(0);
  transform-origin: bottom right;
}

@keyframes cornerGrow {
  to {
    transform: scale(1);
  }
}

/* Fade transition - Bottom to Top slide */
.loader-fade-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.loader-fade-leave-to {
  opacity: 1;
  transform: translateY(-100%);
}

/* Responsive */
@media (max-width: 768px) {
  .gradient-orb {
    filter: blur(60px);
  }

  .orb-1,
  .orb-2 {
    width: 300px;
    height: 300px;
  }

  .orb-3 {
    width: 200px;
    height: 200px;
  }

  .corner-decoration {
    width: 60px;
    height: 60px;
  }

  .particles {
    display: none;
  }
}
</style>
