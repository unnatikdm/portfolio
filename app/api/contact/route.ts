import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
  subject: z.string().optional(),
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
  // Add these options to handle self-signed certificates
  tls: {
    rejectUnauthorized: false
  }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Send email to you
    const mailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: 'unnatikadam50a@gmail.com', // Replace with your actual email
      subject: `New Contact Form Message from ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #a855f7; padding-bottom: 10px;">
            New Message from Portfolio Contact Form
          </h2>
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Subject:</strong> ${validatedData.subject || 'No subject'}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${validatedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Sent on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.SMTP_USER || 'your-email@gmail.com',
      to: validatedData.email,
      subject: 'Thank you for contacting Unnati Kadam',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #a855f7; padding-bottom: 10px;">
            Thank you for reaching out!
          </h2>
          <div style="margin: 20px 0;">
            <p>Hi ${validatedData.name},</p>
            <p>Thank you for contacting me through my portfolio. I have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,</p>
            <p><strong>Unnati Kadam</strong></p>
            <p>Junior ML | Data Analyst</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    try {
      // Send email to you
      await transporter.sendMail(mailOptions);
      
      // Send confirmation to user
      await transporter.sendMail(confirmationMailOptions);

      console.log('Contact form submission:', {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || 'No subject',
        message: validatedData.message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      
      // Fallback: Just log the submission and return success (for development)
      console.log('Contact form submission (fallback):', {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || 'No subject',
        message: validatedData.message,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
      { status: 500 }
    );
  }
}
