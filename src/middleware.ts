import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPrivateRoute = createRouteMatcher(['/dashboard(.*)', '/api/customer/tier'])

export default clerkMiddleware(async (auth, request) => {
  if (isPrivateRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
