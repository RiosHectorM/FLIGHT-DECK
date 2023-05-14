import { loadStripe, RedirectToCheckoutOptions } from '@stripe/stripe-js';

export default async function checkout({
  lineItems,
}: {
  lineItems: any[];
}): Promise<void> {
  let stripePromise: Promise<any> | null = null;

  const getStripe = (): Promise<any> => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY!);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  const checkoutOptions: RedirectToCheckoutOptions = {
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.origin}/membership/Success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/membership`,
  };

  await stripe?.redirectToCheckout(checkoutOptions);
}
