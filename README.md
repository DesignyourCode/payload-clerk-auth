# Payload Website Template

This project is using the official [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website).

The goal here is to implement Clerk authentication with user profiles and a protected dashboard without customising the core website template so it is easily comparable. All changes are to be documented in this readme below:

- [x] Updated readme
- [x] Added `.nvmrc` file for consitent Node version setting
- [x] Created a frontend `/dashboard` area
- [x] Add Clerk provider and middleware to protect dashboard
- [ ] Create a customer collection
- [ ] Create and push user data into the customer collection on registration
- [ ] Create customer tiers
- [ ] Create a collection for content that is protected based on the users tier

## Documentation

#### Adding Clerk

In order to add Clerk, we can just follow the standard Clerk integration for NextJS and adjust the `middleware.ts` file as necessary. In our case, we are protecting the `/dashboard` route.
