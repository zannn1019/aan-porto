<template>
  <div class="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
    <CustomCursor />
    
    <div class="z-10 text-center px-4">
      <h1 class="text-[150px] font-bold leading-none opacity-10 select-none">
        {{ error.statusCode }}
      </h1>
      <div class="mt-[-50px]">
        <h2 class="text-4xl font-bold mb-4">Page Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button 
          @click="handleError"
          class="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-medium hover:scale-105 transition-transform duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-64 h-64 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError({ redirect: '/' })
}

useHead({
  title: `Page Not Found - Ahmad Fauzan`,
})
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
</style>
