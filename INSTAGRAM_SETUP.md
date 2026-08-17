# Instagram homepage feed setup

The homepage social section loads the latest four posts from the official
Instagram API. If Meta is unavailable or the access token expires, the images
already configured in Sanity remain visible as a fallback.

The Instagram account must be a Professional account. Create a Meta developer
application, connect the Instagram account, and generate an access token with
permission to read the account's media.

Configure these server-only environment variables on Vercel or any future
Node.js hosting provider:

```env
INSTAGRAM_ACCESS_TOKEN=your_long_lived_instagram_access_token
INSTAGRAM_USER_ID=me
INSTAGRAM_GRAPH_BASE_URL=https://graph.instagram.com
```

Never prefix the access token with `NEXT_PUBLIC_` and never commit it to Git.
After changing the token, redeploy or restart the application.
