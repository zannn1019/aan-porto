# Email Setup Instructions

## Quick Start (Recommended: Web3Forms - FREE)

Web3Forms is the easiest and completely free solution. No credit card required!

### 1. Get Your Access Key

1. Go to https://web3forms.com/
2. Click "Create Access Key"
3. Enter your email: `fauzanguci1019@gmail.com`
4. Copy the access key you receive

### 2. Add to Environment Variables

Create a `.env` file in your project root:

```env
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### 3. That's it!

Deploy your site and the contact form will work immediately!

---

## Alternative Email Solutions

### Option 1: Web3Forms (Currently Configured - FREE ✅)

- **Pros**: Free, no setup, instant
- **Cons**: None
- **Setup**: Just add access key to `.env`
- **Website**: https://web3forms.com/

### Option 2: Resend (Modern & Developer-Friendly)

- **Pros**: 3,000 emails/month free, professional
- **Cons**: Requires domain verification
- **Setup**:

  ```bash
  npm install resend
  ```

  Add to `.env`:

  ```env
  RESEND_API_KEY=re_123456789
  ```

  Uncomment the Resend code in `server/api/contact.post.ts`

- **Website**: https://resend.com/

### Option 3: Gmail SMTP with Nodemailer

- **Pros**: Free, uses your Gmail
- **Cons**: Less secure, Gmail may block
- **Setup**:

  ```bash
  npm install nodemailer
  ```

  Enable "App Passwords" in Gmail:

  1. Go to Google Account settings
  2. Security → 2-Step Verification → App passwords
  3. Generate password for "Mail"

  Add to `.env`:

  ```env
  SMTP_EMAIL=fauzanguci1019@gmail.com
  SMTP_PASSWORD=your_app_password_here
  ```

  Uncomment the Nodemailer code in `server/api/contact.post.ts`

### Option 4: FormSubmit.co (No Backend)

- **Pros**: No API keys, instant setup
- **Cons**: Less control, captcha on first use
- **Setup**: Just change form action:
  ```html
  <form
    action="https://formsubmit.co/fauzanguci1019@gmail.com"
    method="POST"
  ></form>
  ```
- **Website**: https://formsubmit.co/

### Option 5: EmailJS (Client-Side)

- **Pros**: Works on static sites
- **Cons**: API keys exposed in frontend
- **Setup**: https://www.emailjs.com/
- **Free**: 200 emails/month

---

## Environment Variables Template

Create `.env` file in project root:

```env
# Web3Forms (Recommended - Currently Active)
WEB3FORMS_ACCESS_KEY=your_key_here

# OR use Resend
# RESEND_API_KEY=re_xxxxx

# OR use SMTP
# SMTP_EMAIL=fauzanguci1019@gmail.com
# SMTP_PASSWORD=your_app_password
```

## Deployment

### For Vercel/Netlify

Add environment variables in your hosting dashboard:

- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment

### For Other Hosts

Make sure `.env` file is uploaded or environment variables are set in your hosting control panel.

---

## Testing

1. **Local Testing**:

   ```bash
   npm run dev
   ```

   Fill out the contact form and submit

2. **Check Email**:
   You should receive an email at `fauzanguci1019@gmail.com`

3. **Check Console**:
   Open browser console to see any errors

---

## Email Template

You'll receive emails in this format:

```
Subject: New Portfolio Contact: Web Development

From: John Doe <john@example.com>

Project Type: Web Development

Message:
I would like to discuss a potential project...
```

---

## Customization

To change the email template, edit `server/api/contact.post.ts`:

```javascript
subject: `New Portfolio Contact: ${projectType}`,
message: `
Project Type: ${projectType}

Message:
${message}
`
```

---

## Troubleshooting

### "Failed to send email"

- Check your API key is correct in `.env`
- Check `.env` is in project root
- Restart dev server after adding `.env`
- Check network tab in browser for API errors

### Not receiving emails

- Check spam folder
- Verify email address in Web3Forms dashboard
- Check Web3Forms logs for delivery status

### Environment variable not found

- Make sure `.env` is in project root (not in `app/` or `server/`)
- Restart server after creating `.env`
- For production, add to hosting dashboard

---

## Security Notes

1. **Never commit `.env` to Git**

   - Already added to `.gitignore`

2. **Use different keys for dev/production**

   - Use separate Web3Forms access keys

3. **Rate limiting**
   - Consider adding rate limiting for production
   - Web3Forms has built-in spam protection

---

## Support

- Web3Forms: https://web3forms.com/docs
- Resend: https://resend.com/docs
- Issues: Check browser console and server logs
