import type { Metadata } from 'next/types'

export default async function Page() {
  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Dashboard</h1>
          <p>This will be a protected area by Clerk</p>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Dashboard`,
  }
}
