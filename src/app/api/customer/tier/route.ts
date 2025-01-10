import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  try {
    const { userId } = getAuth(request)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { tierId } = await request.json()
    if (!tierId) {
      return NextResponse.json({ error: 'Tier ID required' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    await payload.update({
      collection: 'customers',
      where: {
        uid: userId,
      },
      data: {
        tier: tierId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user tier:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
