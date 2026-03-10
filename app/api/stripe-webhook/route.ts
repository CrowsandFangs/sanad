import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabase } from "@/lib/supabase"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {

  const body = await req.text()

  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook error:", err)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object as Stripe.Checkout.Session

    const amount = session.amount_total ? session.amount_total / 100 : 0
    const studentSlug = session.metadata?.studentSlug

    if (studentSlug) {
      await supabase.from("donations").insert({
        amount,
        student_slug: studentSlug
      })
    }
  }

  return NextResponse.json({ received: true })
}