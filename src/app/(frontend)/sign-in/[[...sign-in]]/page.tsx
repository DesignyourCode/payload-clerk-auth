import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="pt-24 pb-24">
      <div className="container flex items-center justify-center mb-16">
        <SignIn />
      </div>
    </div>
  )
}
