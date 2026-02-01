# ezgoogle

Simple Google Workspace tools for AI agents. No MCP servers, just Python scripts.

**Website:** [ezagentauth.com](https://ezagentauth.com)


## Why This Exists

**The Problem:** Every MCP server, extension, and AI agent skill that accesses Google APIs requires OAuth setup. This means:

- Create a Google Cloud project
- Configure OAuth consent screens
- Enable multiple APIs
- Generate credentials
- Manage client secrets

This is painful for normal users and even worse for AI agents trying to help them through it.

**The Solution:** A hosted OAuth worker that handles all the complexity. Users just click "Sign in with Google" and get a token to share with their agent.

## Security

**Is this safe?** Yes. Here's why:

| Concern | How it's handled |
|---------|------------------|
| **Your Google password** | Never seen by us. You authenticate directly with Google. |
| **OAuth tokens** | Displayed once in your browser, never stored on our servers. You control who you share it with. |
| **What we can access** | Nothing. The token goes to your agent, not to us. |
| **Token scope** | You see exactly what permissions are requested before authorizing. |
| **Revocation** | Revoke anytime at [myaccount.google.com/permissions](https://myaccount.google.com/permissions) |

**Architecture:**
- Cloudflare Worker = stateless, no database, no storage
- OAuth credentials stored as Cloudflare secrets (encrypted, never in code)
- Token displayed client-side only, then you close the page
- **Open source** - Audit the code yourself

## Philosophy

- **No MCP servers** - Just direct API calls with Python/httpx
- **Simple auth** - OAuth via hosted worker (no credentials to manage)
- **Agent-readable** - SKILL.md files are instructions for AI agents
- **Portable** - Works with any agent that can run shell commands



## Quick Start

- `npx clawhub@latest install ez-google`

or copy the `ez-google` folder into your agent's skills directory. That's it - your agent will handle the rest.

Works with Claude Code, Cursor, OpenClaw, and any agent that can run shell commands.

**Coming soon:**
- `claude code install ez-google` and similar one-liner installs
