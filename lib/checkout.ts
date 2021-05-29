import { loadStripe } from "@stripe/stripe-js"

const env = process.env.NEXT_PUBLIC_STRIPE_API_KEY
assert(env)
const stripePromise = loadStripe(env)

function assert(condition: any): asserts condition is string {
  if (!condition) {
    throw Error(`Expected "${condition}" to be matched`)
  }
}

export const checkout = async ({ lineItems }: any) => {
  const stripe = await stripePromise
  await stripe?.redirectToCheckout({
    mode: "payment",
    // @ts-ignore
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
    lineItems,
  })
}
