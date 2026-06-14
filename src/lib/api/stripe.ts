import { createPaymentIntent as createPaymentIntentFn } from '../../server/functions/stripe'

export interface StripeAdapter {
  createPaymentIntent: (amount: number) => Promise<{ clientSecret: string }>
}

export const stripeApi: StripeAdapter = {
  createPaymentIntent: async (amount) => {
    return await createPaymentIntentFn({ data: amount })
  }
}
