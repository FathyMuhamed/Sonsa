const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.cartItems);
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: 'auto',
        shipping_option: [
          { shipping: "shr_1LBBmELaBVPlybDlprmGAQiE" },
          { shipping: "shr_1LBBpgLaBVPlybDlSKgR207T" },
        ],
        line_items: req.body.cartItems.map(item => {
          const img = item.image[0].asset._ref;
          console.log(img);
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
