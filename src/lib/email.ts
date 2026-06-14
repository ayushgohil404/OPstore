import { createServerFn } from '@tanstack/react-start'
import nodemailer from 'nodemailer'

const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

export const sendEmail = async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Gmail API credentials not configured. Skipping email:', subject)
    return
  }
  const transporter = getTransporter()
  await transporter.sendMail({
    from: '"OPStore" <' + process.env.EMAIL_USER + '>',
    to,
    subject,
    html
  })
}

// The server function will only execute on the server, safely accessing env vars.
export const sendWelcomeEmail = createServerFn({ method: 'POST' })
  .validator((data: { email: string; firstName: string }) => data)
  .handler(async ({ data }) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Gmail API credentials not configured. Skipping welcome email for:', data.email)
      return { success: false, error: 'Not configured' }
    }

    try {
      const transporter = getTransporter()
      await transporter.sendMail({
        from: '"OPStore" <' + process.env.EMAIL_USER + '>',
        to: data.email,
        subject: 'Welcome to OPStore Luxury',
        html: `
          <h1>Welcome to OPStore, ${data.firstName}!</h1>
          <p>We are thrilled to have you join our exclusive community.</p>
          <p>Explore the latest drops and curated collections today.</p>
        `
      })
      return { success: true }
    } catch (e) {
      console.error('Failed to send welcome email:', e)
      return { success: false, error: 'Failed to send' }
    }
  })

export const sendOtpEmail = createServerFn({ method: 'POST' })
  .validator((data: { email: string; otp: string; type: 'verify' | 'reset' }) => data)
  .handler(async ({ data }) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Gmail API credentials not configured. Skipping OTP email for:', data.email)
      return { success: false, error: 'Not configured' }
    }

    const title = data.type === 'verify' ? 'Verify your OPStore Account' : 'Reset your OPStore Password'
    const message = data.type === 'verify' 
      ? 'Use the following 6-digit code to verify your new account. This code expires in 15 minutes.'
      : 'Use the following 6-digit code to reset your password. This code expires in 15 minutes.'

    try {
      const transporter = getTransporter()
      await transporter.sendMail({
        from: '"OPStore Security" <' + process.env.EMAIL_USER + '>',
        to: data.email,
        subject: title,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #111;">${title}</h1>
            <p style="color: #555; font-size: 16px;">${message}</p>
            <div style="background-color: #f4f4f5; padding: 20px; text-align: center; border-radius: 12px; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111;">${data.otp}</span>
            </div>
            <p style="color: #888; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `
      })
      return { success: true }
    } catch (e) {
      console.error('Failed to send OTP email:', e)
      return { success: false, error: 'Failed to send' }
    }
  })

export const sendOrderConfirmationEmail = createServerFn({ method: 'POST' })
  .validator((data: { email: string; orderId: string; total: number }) => data)
  .handler(async ({ data }) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('Gmail API credentials not configured. Skipping order email for:', data.email)
      return { success: false, error: 'Not configured' }
    }

    try {
      const transporter = getTransporter()
      await transporter.sendMail({
        from: '"OPStore Orders" <' + process.env.EMAIL_USER + '>',
        to: data.email,
        subject: `Order Confirmation ${data.orderId}`,
        html: `
          <h1>Thank you for your order!</h1>
          <p>Your order <strong>${data.orderId}</strong> has been received.</p>
          <p>Total amount: $${data.total.toFixed(2)}</p>
          <p>We will notify you when it ships.</p>
        `
      })
      return { success: true }
    } catch (e) {
      console.error('Failed to send order email:', e)
      return { success: false, error: 'Failed to send' }
    }
  })
