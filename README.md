# ez-google

**Agent-friendly Google Workspace tools.** Simple Python scripts for Gmail, Calendar, Drive, Docs, Sheets, Slides, Contacts, and Chat.

Built for AI agents with zero credential management - users just click a link and paste back a token. No API keys, no OAuth setup, no client secrets.

## Install

### Claude Code

```bash
claude plugin install --url https://github.com/araa47/ez-google
```

### ClawHub

```bash
npx clawhub@latest install ez-google
```

### Other Agents (Cursor, OpenClaw, etc.)

Copy the `skills/ez-google` folder into your agent's skills directory.

---

## Why This Exists

**The Problem:** Every MCP server, extension, and AI agent skill that accesses Google APIs requires OAuth setup:

- Create a Google Cloud project
- Configure OAuth consent screens
- Enable multiple APIs
- Generate credentials
- Manage client secrets

**The Solution:** A hosted OAuth worker at [ezagentauth.com](https://ezagentauth.com) handles all the complexity. Users just click "Sign in with Google" and get a token.

## Security

| Concern | How it's handled |
|---------|------------------|
| **Your Google password** | Never seen by us. You authenticate directly with Google. |
| **OAuth tokens** | Displayed once in your browser, never stored on our servers. |
| **What we can access** | Nothing. The token goes to your agent, not to us. |
| **Token scope** | You see exactly what permissions are requested before authorizing. |
| **Revocation** | Revoke anytime at [myaccount.google.com/permissions](https://myaccount.google.com/permissions) |

**Architecture:** Cloudflare Worker (stateless, no database), OAuth credentials as encrypted secrets, token displayed client-side only, fully open source.

---

## Issues & Contributing

Found a bug or have a feature request? [Open an issue](https://github.com/araa47/ez-google/issues) or submit a PR!

**Repository:** [github.com/araa47/ez-google](https://github.com/araa47/ez-google)
