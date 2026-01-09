export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    // Validate the form data
    const { name, email, projectType, message } = body;

    if (!name || !email || !projectType || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing required fields",
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid email address",
        });
    }

    try {
        // Option 1: Using Resend (recommended)
        // Uncomment and install: npm install resend
        /*
            const resend = new Resend(process.env.RESEND_API_KEY)
            
            await resend.emails.send({
              from: 'Portfolio Contact <onboarding@resend.dev>',
              to: 'fauzanguci1019@gmail.com',
              subject: `New Contact Form Submission from ${name}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
              `
            })
            */

        // Option 2: Using EmailJS (client-side alternative)
        // Option 3: Using Nodemailer with SMTP
        // Uncomment and install: npm install nodemailer
        /*
            const nodemailer = require('nodemailer')
            
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
              }
            })
        
            await transporter.sendMail({
              from: process.env.SMTP_EMAIL,
              to: 'fauzanguci1019@gmail.com',
              subject: `New Contact Form: ${name}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              `
            })
            */

        // Option 4: Using FormSubmit.co (No backend needed)
        // Just POST to https://formsubmit.co/your@email.com

        // Option 5: Using Web3Forms (Simple and free)
        const response = await $fetch<{ success: boolean; message?: string }>(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: {
                    access_key: config.web3formsAccessKey,
                    name,
                    email,
                    subject: `New Portfolio Contact: ${projectType}`,
                    message: `
Project Type: ${projectType}

Message:
${message}
        `,
                },
            }
        );

        if (!response.success) {
            throw new Error("Email service error");
        }

        return {
            success: true,
            message: "Email sent successfully!",
        };
    } catch (error) {
        console.error("Email error:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to send email",
        });
    }
});
