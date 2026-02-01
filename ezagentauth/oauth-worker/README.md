# ezagentauth

Cloudflare Worker that hosts Google OAuth for [ez-google](https://github.com/araa47/ez-google).

Live at: **https://ezagentauth.com**

See the [main README](../../README.md) for why this exists and security details.

## Deploy Your Own

### 1. Google OAuth Setup

1. [Google Cloud Console](https://console.cloud.google.com/) → Create project
2. [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent):
   - External or Internal
   - App name: "ezagentauth" (or yours)
   - Add all scopes (Calendar, Drive, Docs, Sheets, Slides, Gmail, Contacts, Chat)
3. Enable APIs:
   ```bash
   gcloud services enable calendar-json.googleapis.com drive.googleapis.com \
     docs.googleapis.com sheets.googleapis.com slides.googleapis.com \
     gmail.googleapis.com people.googleapis.com chat.googleapis.com
   ```
4. **Credentials** → Create OAuth client ID → Web application
5. Redirect URI: `https://your-domain.com/callback`
6. Save Client ID and Client Secret

### 2. Deploy

```bash
# Install (npm or bun)
npm install      # or: bun install

# Login to Cloudflare
npx wrangler login

# Set secrets
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET

# Deploy
npm run deploy   # or: bun run deploy
```

## Local Dev

```bash
echo "GOOGLE_CLIENT_ID=xxx" > .dev.vars
echo "GOOGLE_CLIENT_SECRET=xxx" >> .dev.vars
npm run dev      # or: bun run dev
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (links to GitHub) |
| `/auth` | Auth page (sign in button) |
| `/login` | Redirects to Google OAuth |
| `/callback` | Handles OAuth callback, shows token |
