import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabase } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {

  const body = await req.text()
  const sig = headers().get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object as Stripe.Checkout.Session

    const amount = session.amount_total! / 100
    const studentSlug = session.metadata?.studentSlug

    await supabase.from("donations").insert({
      amount,
      student_slug: studentSlug
    })
  }

  return NextResponse.json({ received: true })
}