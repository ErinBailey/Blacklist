
Blacklist Service Tech Spec:
# Overview 
   Create a service that determines if an IP is on a blacklist. Update the blacklist in the quickest and most efficient way with no human interaction. 
# Goals 
# Non Goals
# Lifecycle of the service
  - Outside service (such as login) makes a request to my Blacklist service
  - Blacklist service strips IP address from outside service (How?)
  - Blacklist service checks if IP pulled from the request is on the blacklist from github to determine if the IP is valid or not.
# Tech Stack
  - Node.js
  - Express.js for routing
  - Auth0 or Heroku for hosting
  - Postgres if a DB is needed
  - React if a front end is needed
# Implementation / Approach
  - Use a github webhook to trigger an event change to the github IP list repo and receive a payload with the changes. [Explain why a webhook would work best. i.e mention time and how important that is]
  - Populate the blacklist with the new IPs
# References
  - https://manage.auth0.com/#/anomaly
  - https://auth0.com/docs/anomaly-detection#brute-force-protection

# Unknowns
  - How to read the IP address from the request 
  - What other meta data should I provide if the request is invalid?
  - What should I return if the IP is valid?
  - What should I return if the IP is invalid?
  - Will I need a DB?
    - Initially I thought No, not in this implementation. A DB might be a good backup in case github is inaccessible, but I don't consider it necessary for MVP
    - HOWEVER the service will have to reference the list within the app to determine if it's valid so maybe a DB will be a good call after all. Either that or some kind of cached key value?
  - Will I need a front end to hit this service? What other service would be hitting it within this scope?
  - Will I need to integrate any other auth0 tools or APIs? Such as Login?
# Risks
  - Time and efficiency of the webhook.
  - Making sure the customer doesn't see anything happening behind the curtain to dampen their Auth0 experience, while also protecting them
  - Security of the webhook. Data of blacklisted IPs being leaked could mean bad actors know what is a good IP to spoof
  - What happens if github goes down and the user is trying to login? Find a way to fail elegantly. Should I store updated IPs in a database as a backup? This is a decent possibility but seems like a future feature. (DB would also fix this)
  - If I use a DB, I need to make sure to only update it at the appropriate time. Make sure data is maintained if something goes down so it's not overwritten with bad/empty data. i.e fail elegantly
