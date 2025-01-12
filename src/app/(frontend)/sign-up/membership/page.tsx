import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import PageClient from './page.client'

export default async function MembershipPage() {
  const payload = await getPayload({ config: configPromise })
  const { docs: tiers } = await payload.find({
    collection: 'tiers',
    sort: 'createdAt',
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container flex flex-col items-center justify-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Membership</h1>
        <p className="text-xl mb-8">Choose your membership tier</p>

        <PageClient tiers={tiers} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Membership`,
  }
}
