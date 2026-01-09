# Identity Composable Guide

## Overview

All components now use the centralized `useIdentity()` composable to retrieve data from `identity.json`. This makes it easy to update content across your entire portfolio by editing a single JSON file.

## Files Modified

### 1. **Created: `composables/useIdentity.ts`**

This composable imports and exports data from `identity.json`:

- `personal` - Personal information (name, email, title, description)
- `branding` - Logo and branding elements
- `hero` - Hero section content
- `about` - About section content
- `contact` - Contact section content
- `navigation` - Navigation menu items and social links
- `footer` - Footer content

### 2. **Updated Components**

#### **Navigation.vue**

- Uses `branding.logoText` for logo text
- Uses `navigation.menuItems` for menu navigation
- Uses `navigation.menuSocial` for social links in menu
- Uses `personal.email` for contact info in menu footer

#### **HeroSection.vue**

- Uses `personal.firstName` and `personal.lastName` for title
- Uses `hero.label` for role label
- Uses `hero.description` for description text
- Uses `hero.ctaButtonText` for button text
- Uses `hero.stats` for experience statistics
- Still uses `projects` from `useProject()` for project count

#### **AboutSection.vue**

- Uses `about.sectionNumber` and `about.sectionLabel` for section header
- Uses `about.highlights` for highlighted keywords in statement
- Uses `about.imagePlaceholderLabels` for image text
- Uses `about.expertise` for expertise title and description
- Uses `about.skills` array for technical skills with levels
- Uses `about.experience` array for experience metrics
- Still uses `projects` from `useProject()` for project count

#### **ContactSection.vue**

- Uses `contact.sectionNumber` and `contact.sectionLabel` for section header
- Uses `contact.title.lines` for title text
- Uses `contact.email` for email address
- Uses `contact.education` for education details
- Uses `contact.social` for social media links
- Uses `contact.certifications` for certification list
- Uses `contact.form.projectTypes` for form dropdown options
- Uses `contact.form.submitButtonText` for submit button

#### **Footer.vue**

- Uses `footer.copyrightText` for copyright text
- Uses `footer.socialLinks` for social media links

## How to Update Content

### Dynamic Data from project.json
Some data fields can be left empty (`""`) to be dynamically calculated from other sources:

**Major Projects Count**: In `identity.json`, the experience section has a "Major Projects" entry with an empty number:
```json
{
  "experience": [
    {
      "number": "",
      "label": "Major Projects"
    }
  ]
}
```

The `AboutSection.vue` component automatically fills this with the count from `project.json`:
- When you add/remove projects in `project.json`, the count updates automatically
- The component uses a computed property to merge static data with dynamic project count

### Update Personal Information

Edit `app/data/identity.json`:

```json
{
  "personal": {
    "firstName": "YOUR_FIRST_NAME",
    "lastName": "YOUR_LAST_NAME",
    "email": "your.email@example.com"
  }
}
```

### Update Skills

```json
{
  "about": {
    "skills": [
      {
        "name": "New Skill",
        "level": 90
      }
    ]
  }
}
```

### Update Navigation Menu

```json
{
  "navigation": {
    "menuItems": [
      {
        "name": "New Page",
        "path": "/new-page"
      }
    ]
  }
}
```

### Add Social Links

```json
{
  "contact": {
    "social": [
      {
        "name": "Your Platform",
        "url": "https://your-url.com"
      }
    ]
  }
}
```

## Benefits

✅ **Single Source of Truth** - All content in one place  
✅ **Easy Updates** - Change data without touching component code  
✅ **Type Safety** - TypeScript composable ensures type consistency  
✅ **Maintainable** - Cleaner component code focused on presentation  
✅ **Scalable** - Easy to add new data fields as needed

## Next Steps

1. Update actual URLs for social media links in `identity.json`
2. Add real certification details
3. Update skill levels as you gain more experience
4. Keep experience metrics current
5. Consider adding more fields like:
   - Resume/CV download link
   - Profile image URL
   - Additional contact methods
   - Languages spoken
   - Availability status

## Note

Project data is still managed separately in `app/data/project.json` and accessed via the `useProject()` composable, as requested.
