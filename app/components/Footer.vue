<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; {{ currentYear }} {{ footer.copyrightText }}</p>
      <div class="social-links">
        <a v-for="social in footer.socialLinks" :key="social.name" :href="social.url" target="_blank" rel="noopener">
          {{ social.name }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { footer } = useIdentity()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  padding: 3rem 2rem;
  background: var(--gray);
  color: var(--white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.social-links {
  display: flex;
  gap: 2rem;
}

.social-links a {
  color: var(--white);
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.social-links a:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
