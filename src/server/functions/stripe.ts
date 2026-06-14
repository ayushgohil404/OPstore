import { createServerFn } from '@tanstack/react-start'
import Stripe from 'stripe'

// Note: Stripe will throw if key is missing, so we safely handle it.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2023-10-16' as any }) : null

export const createPaymentIntent = createServerFn({ method: 'POST' })
  .validator((amount: number) => amount)
  .handler(async ({ data: amount }) => {
    if (!stripe) {
      throw new Error('Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env file.')
    }

    try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amounts in cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      })

      return {
        clientSecret: paymentIntent.client_secret,
      }
    } catch (error: any) {
      throw new Error(`Stripe Error: ${error.message}`)
    }
  })
