import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// Webhook signing secret from Clerk Dashboard
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

export async function POST(req: Request) {
  // Verify the webhook signature
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Verify webhook signature
  const wh = new Webhook(CLERK_WEBHOOK_SECRET || '')
  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id || '',
      'svix-timestamp': svix_timestamp || '',
      'svix-signature': svix_signature || '',
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data
    const payload = await getPayload({ config: configPromise })

    try {
      // Check if customer already exists
      const existingCustomer = await payload.find({
        collection: 'customers',
        where: {
          uid: {
            equals: id,
          },
        },
      })

      if (existingCustomer.docs.length > 0) {
        return new Response('Customer already exists', { status: 409 })
      }

      // Get free tier first
      const { docs: freeTiers } = await payload.find({
        collection: 'tiers',
        where: {
          price: { equals: 0 },
        },
      })

      if (!freeTiers.length) {
        console.warn('No free tier found')
      }

      // Create new customer if doesn't exist
      await payload.create({
        collection: 'customers',
        data: {
          uid: id,
          first_name: first_name || '',
          last_name: last_name || '',
          email: email_addresses[0]?.email_address,
          tier: freeTiers.length ? freeTiers[0].id : undefined,
        },
      })

      return new Response('Customer created successfully', {
        status: 200,
      })
    } catch (error) {
      console.error('Error creating customer:', error)
      return new Response('Error creating customer', {
        status: 500,
      })
    }
  }

  return new Response('Webhook received', {
    status: 200,
  })
}
