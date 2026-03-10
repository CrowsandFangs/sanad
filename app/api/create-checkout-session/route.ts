import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, studentSlug } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Montant invalide" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Don pour ${studentSlug}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?slug=${studentSlug}&amount=${amount}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/students`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Erreur serveur Stripe" },
      { status: 500 }
    );
  }
}