<template>
  <div class="home-page">
    <Navigation />
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup>
const { gsap } = useGsap()
const { personal, hero, seo, contact } = useIdentity()
const { projects } = useProject()

// SEO Meta Tags using data from identity.json
const siteUrl = seo.siteUrl
const siteTitle = `${personal.fullName} - ${personal.title}`
const siteDescription = personal.description
const ogImage = `${siteUrl}${seo.ogImage}`
const keywords = seo.keywords.join(', ')

// Get all social URLs for structured data
const socialUrls = [
  ...contact.social.map(s => s.url).filter(url => url && url !== '#')
]

useHead({
  title: siteTitle,
  meta: [
    // Primary Meta Tags
    { name: 'description', content: siteDescription },
    { name: 'author', content: personal.fullName },
    { name: 'keywords', content: keywords },
    
    // Open Graph / Facebook
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:title', content: siteTitle },
    { property: 'og:description', content: siteDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:site_name', content: seo.siteName },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:title', content: siteTitle },
    { name: 'twitter:description', content: siteDescription },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:creator', content: seo.twitterHandle },
    
    // Additional Meta Tags
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'English' },
    { name: 'revisit-after', content: '7 days' },
    { name: 'theme-color', content: seo.themeColor },
    { name: 'msapplication-TileColor', content: seo.themeColor },
  ],
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  ],
  script: [
    // JSON-LD Structured Data for Person
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personal.fullName,
        jobTitle: personal.title,
        email: personal.email,
        url: siteUrl,
        description: personal.description,
        knowsAbout: ['Nuxt.js', 'Vue.js', 'Laravel', 'PHP', 'DevOps', 'CI/CD', 'Web Development', 'RESTful APIs', 'MySQL', 'PostgreSQL'],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: contact.education.school
        },
        sameAs: socialUrls
      })
    },
    // JSON-LD Structured Data for Portfolio Website
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: seo.siteName,
        url: siteUrl,
        description: siteDescription,
        author: {
          '@type': 'Person',
          name: personal.fullName
        },
        inLanguage: 'en-US'
      })
    },
    // JSON-LD Structured Data for Professional Service
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: `${personal.fullName} - Web Development Services`,
        description: personal.description,
        url: siteUrl,
        email: personal.email,
        areaServed: 'Worldwide',
        serviceType: ['Web Development', 'Frontend Development', 'Backend Development', 'Full Stack Development', 'API Development']
      })
    }
  ]
})

onMounted(() => {
  // Page load animation
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
