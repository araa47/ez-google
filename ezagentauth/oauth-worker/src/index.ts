/**
 * ezagentauth - OAuth Worker for ez-google
 *
 * Hosts OAuth credentials so users don't need their own Google Cloud project.
 * Flow: User clicks login -> Google OAuth -> Gets token to copy -> Share with agent
 */

interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/presentations",
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/chat.spaces.readonly",
  "https://www.googleapis.com/auth/chat.messages",
].join(" ");

function getRedirectUri(request: Request): string {
  const url = new URL(request.url);
  return `${url.origin}/callback`;
}

// Homepage
function homePage(): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ez-google - Google Workspace for AI Agents</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
    }
    h1 {
      font-size: 48px;
      margin: 0 0 16px;
      color: #fff;
    }
    .tagline {
      font-size: 20px;
      color: #888;
      margin-bottom: 48px;
      line-height: 1.5;
    }
    .highlight {
      color: #4ade80;
    }
    .section {
      margin-bottom: 48px;
    }
    h2 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #666;
      margin: 0 0 16px;
    }
    .features {
      display: grid;
      gap: 16px;
    }
    .feature {
      background: #141414;
      border: 1px solid #262626;
      border-radius: 12px;
      padding: 20px;
    }
    .feature-title {
      font-weight: 600;
      color: #fff;
      margin-bottom: 8px;
    }
    .feature-desc {
      color: #888;
      font-size: 14px;
      line-height: 1.5;
    }
    .services {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .service {
      background: #1a1a1a;
      border: 1px solid #333;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 13px;
      color: #ccc;
    }
    .cta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 48px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      transition: all 0.2s;
    }
    .btn-primary {
      background: #4ade80;
      color: #0a0a0a;
    }
    .btn-primary:hover {
      background: #22c55e;
    }
    .btn-secondary {
      background: #262626;
      color: #fff;
      border: 1px solid #333;
    }
    .btn-secondary:hover {
      background: #333;
    }
    .btn svg {
      width: 18px;
      height: 18px;
    }
    .code {
      background: #141414;
      border: 1px solid #262626;
      border-radius: 8px;
      padding: 16px 20px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 13px;
      color: #4ade80;
      overflow-x: auto;
    }
    .footer {
      margin-top: 64px;
      padding-top: 32px;
      border-top: 1px solid #262626;
      color: #666;
      font-size: 13px;
    }
    .footer a {
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>ez-google</h1>
    <p class="tagline">
      Agent-friendly Google Workspace tools.<br>
      No API keys. No MCP servers. Just simple Python scripts.
    </p>

    <div class="section">
      <h2>Install</h2>
      <div class="code" style="margin-bottom: 12px;">
        <span style="color: #888;"># Claude Code</span><br>
        /plugin marketplace add araa47/ez-google<br>
        /plugin install ez-google@ez-google
      </div>
      <div class="code" style="margin-bottom: 12px;">
        <span style="color: #888;"># ClawHub</span><br>
        npx clawhub@latest install ez-google
      </div>
      <p style="color: #666; font-size: 13px; margin-top: 8px;">Or copy the <code>ez-google/skills/ez-google</code> folder into your agent's skills directory.</p>
    </div>

    <div class="section">
      <h2>How auth works</h2>
      <div class="features">
        <div class="feature">
          <div class="feature-title">1. Agent sends you a link</div>
          <div class="feature-desc">Your agent runs <code>auth.py login</code> and shares this website link with you.</div>
        </div>
        <div class="feature">
          <div class="feature-title">2. You sign in & copy token</div>
          <div class="feature-desc">Click the link, sign in with Google, and copy the token shown.</div>
        </div>
        <div class="feature">
          <div class="feature-title">3. Share token with agent</div>
          <div class="feature-desc">Paste the token back to your agent. Done! Your agent can now access Gmail, Calendar, Drive, and more.</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Supported services</h2>
      <div class="services">
        <span class="service">Gmail</span>
        <span class="service">Calendar</span>
        <span class="service">Drive</span>
        <span class="service">Docs</span>
        <span class="service">Sheets</span>
        <span class="service">Slides</span>
        <span class="service">Contacts</span>
        <span class="service">Chat</span>
      </div>
    </div>

    <div class="section">
      <h2>Example</h2>
      <div class="code">
        uv run gmail.py list -n 5  # List last 5 emails<br>
        uv run gcal.py list today  # Today's events<br>
        uv run drive.py search "quarterly report"
      </div>
    </div>

    <div class="cta">
      <a href="https://github.com/araa47/ez-google" class="btn btn-primary" target="_blank">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        View on GitHub
      </a>
    </div>

    <div class="footer">
      <p>Open source at <a href="https://github.com/araa47/ez-google">github.com/araa47/ez-google</a></p>
      <p style="margin-top: 12px;"><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

// Auth page (before Google redirect)
function authPage(): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sign in - ez-google</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #141414;
      border: 1px solid #262626;
      border-radius: 16px;
      padding: 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
    }
    h1 {
      margin: 0 0 10px;
      color: #fff;
      font-size: 24px;
    }
    .subtitle {
      color: #888;
      margin-bottom: 30px;
      line-height: 1.5;
    }
    .login-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      background: #4285f4;
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
      transition: background 0.2s;
    }
    .login-btn:hover {
      background: #3367d6;
    }
    .login-btn svg {
      width: 20px;
      height: 20px;
    }
    .permissions {
      margin-top: 30px;
      text-align: left;
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 20px;
    }
    .permissions h3 {
      margin: 0 0 12px;
      font-size: 14px;
      color: #ccc;
    }
    .permissions ul {
      margin: 0;
      padding-left: 20px;
      color: #888;
      font-size: 13px;
      line-height: 1.8;
    }
    .back {
      margin-top: 24px;
    }
    .back a {
      color: #666;
      font-size: 13px;
      text-decoration: none;
    }
    .back a:hover {
      color: #888;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Connect Google Workspace</h1>
    <p class="subtitle">Sign in to grant access to your Gmail, Calendar, Drive, and more.</p>

    <a href="/login" class="login-btn">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      Sign in with Google
    </a>

    <div class="permissions">
      <h3>This will request access to:</h3>
      <ul>
        <li>Gmail (read & send emails)</li>
        <li>Google Calendar (read & write events)</li>
        <li>Google Drive (manage files)</li>
        <li>Google Docs, Sheets, Slides</li>
        <li>Google Contacts (read only)</li>
        <li>Google Chat (spaces & messages)</li>
      </ul>
    </div>

    <div class="back">
      <a href="/">&larr; Back to home</a>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

// Redirect to Google OAuth
function loginRedirect(request: Request, env: Env): Response {
  const redirectUri = getRedirectUri(request);

  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: SCOPES,
    access_type: "offline",
    prompt: "consent",
  });

  return Response.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
    302
  );
}

// Handle OAuth callback
async function handleCallback(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return errorPage(`Google OAuth error: ${error}`);
  }

  if (!code) {
    return errorPage("No authorization code received");
  }

  // Exchange code for tokens
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: getRedirectUri(request),
    }),
  });

  if (!tokenResponse.ok) {
    const err = await tokenResponse.text();
    return errorPage(`Token exchange failed: ${err}`);
  }

  const tokens = await tokenResponse.json() as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
  };

  if (!tokens.refresh_token) {
    return errorPage("No refresh token received. Try revoking access at https://myaccount.google.com/permissions and try again.");
  }

  // Create the credential bundle that auth.py can use
  const credentials = {
    token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    token_uri: "https://oauth2.googleapis.com/token",
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    scopes: SCOPES.split(" "),
  };

  // Base64 encode for easy copy-paste
  const tokenString = btoa(JSON.stringify(credentials));

  return successPage(tokenString);
}

function successPage(token: string): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Success - ez-google</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #141414;
      border: 1px solid #262626;
      border-radius: 16px;
      padding: 40px;
      max-width: 600px;
      width: 100%;
    }
    .success-icon {
      width: 64px;
      height: 64px;
      background: #4ade80;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .success-icon svg {
      width: 32px;
      height: 32px;
      fill: #0a0a0a;
    }
    h1 {
      margin: 0 0 10px;
      color: #fff;
      font-size: 24px;
      text-align: center;
    }
    .subtitle {
      color: #888;
      margin-bottom: 24px;
      text-align: center;
    }
    .step {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .step-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .step-num {
      background: #4ade80;
      color: #0a0a0a;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }
    .step-title {
      font-weight: 600;
      color: #fff;
    }
    .token-box {
      background: #0a0a0a;
      border: 1px solid #333;
      color: #4ade80;
      padding: 16px;
      border-radius: 8px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 11px;
      word-break: break-all;
      max-height: 120px;
      overflow-y: auto;
      position: relative;
    }
    .copy-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: #4ade80;
      color: #0a0a0a;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    }
    .copy-btn:hover {
      background: #22c55e;
    }
    .copy-btn.copied {
      background: #fff;
    }
    .step-desc {
      margin: 0 0 12px;
      color: #888;
      font-size: 14px;
    }
    .command {
      background: #0a0a0a;
      border: 1px solid #333;
      color: #e5e5e5;
      padding: 12px 16px;
      border-radius: 8px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 13px;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="success-icon">
      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    </div>
    <h1>You're connected!</h1>
    <p class="subtitle">Copy the token below and share it with your AI agent.</p>

    <div class="step">
      <div class="step-header">
        <span class="step-num">1</span>
        <span class="step-title">Copy this token</span>
      </div>
      <div class="token-box" style="position: relative;">
        <button class="copy-btn" onclick="copyToken()">Copy</button>
        <span id="token">${token}</span>
      </div>
    </div>

    <div class="step">
      <div class="step-header">
        <span class="step-num">2</span>
        <span class="step-title">Share with your agent</span>
      </div>
      <p class="step-desc">
        Paste the token to your agent, or run this command:
      </p>
      <div class="command">
        uv run auth.py save "&lt;paste-token-here&gt;"
      </div>
    </div>

    <div class="step">
      <div class="step-header">
        <span class="step-num">3</span>
        <span class="step-title">Done!</span>
      </div>
      <p class="step-desc" style="margin-bottom: 0;">
        Your agent can now access Gmail, Calendar, Drive, Docs, Sheets, and more.
      </p>
    </div>
  </div>

  <script>
    function copyToken() {
      const token = document.getElementById('token').textContent;
      navigator.clipboard.writeText(token).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

// Privacy Policy
function privacyPage(): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Privacy Policy - ez-google</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
    }
    h1 {
      color: #fff;
      margin-bottom: 8px;
    }
    .updated {
      color: #666;
      font-size: 14px;
      margin-bottom: 32px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin-top: 32px;
    }
    p, li {
      color: #aaa;
    }
    .highlight {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .highlight p {
      margin: 0;
      color: #4ade80;
      font-weight: 500;
    }
    a {
      color: #4ade80;
    }
    .back {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #262626;
    }
    .back a {
      color: #666;
      text-decoration: none;
    }
    .back a:hover {
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Privacy Policy</h1>
    <p class="updated">Last updated: February 2025</p>

    <div class="highlight">
      <p>We do not collect, store, or have access to any of your data. Period.</p>
    </div>

    <h2>What happens when you sign in</h2>
    <p>When you click "Sign in with Google":</p>
    <ol>
      <li>You are redirected to Google's servers (not ours)</li>
      <li>You authenticate directly with Google</li>
      <li>Google sends a token back to your browser</li>
      <li>The token is displayed on screen for you to copy</li>
      <li>You close the page</li>
    </ol>

    <h2>What we store</h2>
    <p><strong>Nothing.</strong> This service runs on Cloudflare Workers, which is stateless. There is no database, no logs of your tokens, no analytics tracking you.</p>

    <h2>What we can access</h2>
    <p><strong>Nothing.</strong> Your OAuth token is displayed in your browser and never sent to any server we control. We cannot see it, store it, or use it.</p>

    <h2>Your token</h2>
    <p>The token you receive grants access to your Google account (with the scopes you approved). You choose who to share it with. You can revoke access anytime at <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>.</p>

    <h2>Open source</h2>
    <p>This entire service is open source. You can audit the code at <a href="https://github.com/araa47/ez-google">github.com/araa47/ez-google</a>.</p>

    <h2>Contact</h2>
    <p>Questions? Open an issue on GitHub.</p>

    <div class="back">
      <a href="/">&larr; Back to home</a>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

// Terms of Service
function termsPage(): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Terms of Service - ez-google</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
    }
    h1 {
      color: #fff;
      margin-bottom: 8px;
    }
    .updated {
      color: #666;
      font-size: 14px;
      margin-bottom: 32px;
    }
    h2 {
      color: #fff;
      font-size: 20px;
      margin-top: 32px;
    }
    p, li {
      color: #aaa;
    }
    .highlight {
      background: #1a1a1a;
      border: 1px solid #333;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .highlight p {
      margin: 0;
      color: #4ade80;
      font-weight: 500;
    }
    a {
      color: #4ade80;
    }
    .back {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #262626;
    }
    .back a {
      color: #666;
      text-decoration: none;
    }
    .back a:hover {
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Terms of Service</h1>
    <p class="updated">Last updated: February 2025</p>

    <div class="highlight">
      <p>This is a free, open-source tool. Use it at your own discretion.</p>
    </div>

    <h2>What this service does</h2>
    <p>ezagentauth.com provides a simple way to authenticate with Google and obtain an OAuth token for use with AI agents. We host the OAuth credentials so you don't have to set up your own Google Cloud project.</p>

    <h2>No warranty</h2>
    <p>This service is provided "as is" without warranty of any kind. We make no guarantees about uptime, availability, or fitness for any particular purpose.</p>

    <h2>Your responsibility</h2>
    <p>You are responsible for:</p>
    <ul>
      <li>Keeping your OAuth token secure</li>
      <li>Understanding what access you're granting when you share your token</li>
      <li>Revoking access if you no longer want an agent to have access</li>
    </ul>

    <h2>We don't store your data</h2>
    <p>As described in our <a href="/privacy">Privacy Policy</a>, we do not collect, store, or have access to your tokens or any data from your Google account.</p>

    <h2>Open source</h2>
    <p>This service is open source under the MIT license. You can run your own instance if you prefer. See <a href="https://github.com/araa47/ez-google">github.com/araa47/ez-google</a>.</p>

    <h2>Changes</h2>
    <p>We may update these terms. Continued use of the service constitutes acceptance of any changes.</p>

    <div class="back">
      <a href="/">&larr; Back to home</a>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}

function errorPage(message: string): Response {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Error - ez-google</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #141414;
      border: 1px solid #262626;
      border-radius: 16px;
      padding: 40px;
      max-width: 480px;
      width: 100%;
      text-align: center;
    }
    .error-icon {
      width: 64px;
      height: 64px;
      background: #ef4444;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 32px;
      color: white;
      font-weight: bold;
    }
    h1 {
      margin: 0 0 10px;
      color: #fff;
      font-size: 24px;
    }
    .message {
      color: #888;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .retry-btn {
      display: inline-block;
      background: #4ade80;
      color: #0a0a0a;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
    }
    .retry-btn:hover {
      background: #22c55e;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="error-icon">!</div>
    <h1>Something went wrong</h1>
    <p class="message">${message}</p>
    <a href="/auth" class="retry-btn">Try Again</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 400,
    headers: { "Content-Type": "text/html" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Static pages that don't need OAuth credentials
    const staticPages = ["/", "/privacy", "/terms"];
    
    // Check required env vars (except for static pages)
    if (!staticPages.includes(url.pathname) && (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET)) {
      return new Response("Server misconfigured: missing OAuth credentials", {
        status: 500,
      });
    }

    switch (url.pathname) {
      case "/":
        return homePage();
      case "/privacy":
        return privacyPage();
      case "/terms":
        return termsPage();
      case "/auth":
        return authPage();
      case "/login":
        return loginRedirect(request, env);
      case "/callback":
        return handleCallback(request, env);
      default:
        return Response.redirect(url.origin, 302);
    }
  },
};
