'use client'
import type { Tier } from '@/payload-types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export default function PageClient({ tiers }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { userId } = useAuth()

  const handleContinue = async () => {
    if (!selectedTier || !userId) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/customer/tier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tierId: selectedTier }),
      })

      if (!response.ok) {
        throw new Error('Failed to update tier')
      }

      router.push('/dashboard')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to update membership tier')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-8">
        {tiers.map((tier: Tier) => (
          <div
            key={tier.id}
            className={`border rounded-lg p-6 cursor-pointer transition-all text-center ${
              selectedTier === tier.id
                ? 'border-blue-500 shadow-lg scale-105'
                : 'shadow-sm hover:shadow-md'
            }`}
            onClick={() => setSelectedTier(tier.id)}
          >
            <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
            <p className="text-gray-600 mb-4">{tier.description}</p>
            {tier.price === 0 ? (
              <p className="text-3xl font-bold mb-4">Free</p>
            ) : (
              <p className="text-3xl font-bold mb-4">
                £{tier.price.toLocaleString()}/{tier.billingPeriod === 'yearly' ? 'yr' : 'mo'}
              </p>
            )}
            <ul className="space-y-2">
              {tier.features.map((featureItem: Feature) => (
                <li key={featureItem.id} className="text-center">
                  <span className="mr-2">✓</span>
                  {featureItem.feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full">
        {selectedTier && (
          <button
            onClick={handleContinue}
            disabled={isLoading}
            className={`mt-8 px-8 py-3 bg-blue-500 text-white rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        )}
      </div>
    </>
  )
}
