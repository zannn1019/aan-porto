# SEO Deployment Checklist

## Before Deployment

- [ ] Create OG image (1200x630px) and save as `public/og-image.jpg`
- [ ] Create favicon and save as `public/favicon.ico`
- [ ] Create apple-touch-icon and save as `public/apple-touch-icon.png` (180x180px)
- [ ] Update `siteUrl` in `app/data/identity.json` with your actual domain
- [ ] Update Twitter handle in `app/data/identity.json` if different
- [ ] Review and update keywords in `app/data/identity.json`
- [ ] Test build locally: `npm run build`
- [ ] Test preview locally: `npm run preview`

## After Deployment

### Day 1

- [ ] Update sitemap.xml with current date
- [ ] Test all social meta tags:
  - [ ] Facebook Sharing Debugger
  - [ ] Twitter Card Validator
  - [ ] LinkedIn post preview
- [ ] Test structured data with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test mobile responsiveness
- [ ] Run Google PageSpeed Insights

### Week 1

- [ ] Monitor Google Search Console for indexing status
- [ ] Check for any crawl errors
- [ ] Verify all pages are indexed
- [ ] Share website on social media platforms

### Monthly

- [ ] Update sitemap.xml if content changed
- [ ] Check Google Search Console performance
- [ ] Review and update keywords if needed
- [ ] Add new projects to maintain freshness
- [ ] Check backlinks
- [ ] Monitor page speed

## Tools & Resources

### Testing

- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-validator.twitter.com/
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
- Meta Tags Checker: https://metatags.io/

### Performance

- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

### Search Console

- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

### Image Creation

- Canva (OG Images): https://www.canva.com/
- Favicon Generator: https://favicon.io/
- Real Favicon Generator: https://realfavicongenerator.net/

## Quick Fixes

### If meta tags don't show on social media:

1. Clear cache on social platform debugger
2. Wait 24 hours for cache to expire
3. Check image is accessible (CORS, size, format)

### If not appearing in search:

1. Check robots.txt allows indexing
2. Verify sitemap is accessible
3. Check Google Search Console for errors
4. Wait 2-4 weeks for full indexing

### If structured data errors:

1. Run through Schema Validator
2. Check JSON formatting
3. Verify all required fields are present
4. Test with Google Rich Results Test
