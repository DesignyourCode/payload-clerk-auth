# Payload Website Template

This project is using the official [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website).

The goal here is to implement Clerk authentication with user profiles and a protected dashboard without customising the core website template so it is easily comparable. All changes are to be documented in this readme below:

- [x] Updated readme
- [x] Add `.nvmrc` file for consitent Node version setting
- [x] Created a frontend `/dashboard` area
- [x] Add Clerk provider and middleware to protect dashboard
- [x] Add Clerk sign up/in routes
- [x] Create a customer collection
- [x] Create and push user data into the customer collection on registration
- [x] Create membership tiers
- [ ] Create a collection for content that is protected based on the users tier
- [ ] Create a Stripe flow for recurring payments based on the membership tier settings
- [ ] Create area in dashboard to show selected membership tier information with change option

## Example ENV

```
# Added by Payload

# jdbc:
DATABASE_URL=postgresql://xxx:@localhost:5432/payload-clerk-auth

DATABASE_URI=${DATABASE_URL}
# Used to encrypt JWT tokens
PAYLOAD_SECRET=xxxxxxxxx
# Used to configure CORS, format links and more. No trailing slash
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=xxx_xxxxx

```

## Documentation

### Adding Clerk

In order to add Clerk, we can just follow the standard Clerk integration for NextJS and adjust the `middleware.ts` file as necessary. In our case, we are protecting the `/dashboard` route.

#### Setting up Clerk webhook

We want to make sure that when a user is created we store their data as a custom in the system so we can save their choices later down the line. In our case we can use a Clerk webhook and hit an endpoint that will handle this logic.

We have an endpoint called `/api/create-customer` which will do the heavy lifting for this flow.

Create a webhook is created in Clerk (using the following guide: https://clerk.com/blog/webhooks-getting-started) and you have the public URL added to the webhook you can then test and check the webhook works. Once this is confirmed as working, you can register within the application and ensure you as a user is added as a customer (tier is defaulted to a free tier).

In order for Clerk webhook to access your local I am using Pinggy to expose my local to a public URL: https://pinggy.io/docs/ but NGROK etc would also work:

- Run `ssh -p 443 -R0:localhost:3000 a.pinggy.io`
- Add the URL provided as the webhook URL above `<url>/api/create-customer`

> Note: Keep in mind, Pinggy has a 1 hour time-out unless you opt for a paid tier, so you would need to update the webhook URL when restarting this URL timesout

Clerk sign up should redirect the user to the tiers selection page. This makes a call to an API endpoint which updates the user to the correct tier. This is the part where you would add a payment gateway

### Protecting Content
