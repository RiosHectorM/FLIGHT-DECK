import { loadStripe, RedirectToCheckoutOptions } from '@stripe/stripe-js';

export default async function checkout({
  lineItems,
}: {
  lineItems: any[];
}): Promise<void> {
  let stripePromise: Promise<any> | null = null;

  const getStripe = (): Promise<any> => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY!); // Agregar '!' para indicar que no es nulo
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  const checkoutOptions: RedirectToCheckoutOptions = {
    mode: 'payment',
    lineItems,
    successUrl: `http://localhost:3000/home?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `http://localhost:3000/membership`,
  };

  await stripe.redirectToCheckout(checkoutOptions);
}
