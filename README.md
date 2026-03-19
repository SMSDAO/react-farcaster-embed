# ✦ Neo Flash Glow — Farcaster Production App

> **Full-stack, production-ready Farcaster application** built on Next.js 16 (App Router), featuring a "Neo Flash Glow" neon UI, Web3 wallet integration via RainbowKit + wagmi, role-based access control, Farcaster profile/timeline sync, Airdrop Checker, and one-click Vercel deployment.

This repository contains two packages:

| Package | Purpose |
|---|---|
| **Root** (`react-farcaster-embed`) | React component library — embed Farcaster casts in any React/Next.js app |
| **`web/`** | Full production Next.js 16 web application |

---

## 📸 Screenshots

### Landing Page
```
╔══════════════════════════════════════════════════════════════╗
║  ✦ Neo Flash Glow                        [Login] [Get Started]║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║    ✦ Production-Ready Farcaster Platform                     ║
║                                                              ║
║        The Future of                                         ║
║    ╔══════════════════════╗                                   ║
║    ║  Farcaster Apps  🌈  ║  ← animated gradient neon text   ║
║    ╚══════════════════════╝                                   ║
║                                                              ║
║         [🚀 Launch App]   [Sign In]                          ║
║                                                              ║
║  ┌────────────┐ ┌────────────┐ ┌────────────┐               ║
║  │📡 Timeline │ │💼 Wallet   │ │🪂 Airdrop  │               ║
║  │View casts  │ │RainbowKit  │ │Multi-chain │               ║
║  └────────────┘ └────────────┘ └────────────┘               ║
║  ┌────────────┐ ┌────────────┐ ┌────────────┐               ║
║  │👤 Profile  │ │⚡ Automate │ │🔐 RBAC     │               ║
║  │Sync Fcast  │ │1-click sync│ │Admin/Dev   │               ║
║  └────────────┘ └────────────┘ └────────────┘               ║
╚══════════════════════════════════════════════════════════════╝
```

### Login Page
```
╔═══════════════════════════════╗
║           ✦                   ║
║       Welcome Back            ║
║    Sign in to Neo Flash Glow  ║
║                               ║
║  ┌─ Demo Admin Credentials ─┐ ║
║  │ admin@admin.com           │ ║
║  │ admin123                  │ ║
║  └───────────────────────────┘ ║
║                               ║
║  Email: [_________________]   ║
║  Pass:  [_________________]   ║
║                               ║
║  [        Sign In           ] ║
║                               ║
║  No account? Create one →    ║
╚═══════════════════════════════╝
```

### Dashboard (Admin view)
```
╔══════════════════════════════════════════════════════╗
║  ✦  Dashboard  Timeline  Airdrop  Admin  [Wallet]   ║
╠══════════════════════════════════════════════════════╣
║  ┌────────────────────────────────────────────────┐  ║
║  │  A  Admin · admin@admin.com · 👑 Admin         │  ║
║  │     [Connect Wallet ▼]                         │  ║
║  └────────────────────────────────────────────────┘  ║
║                                                      ║
║  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐        ║
║  │  142  │  │   8   │  │  24   │  │  17   │        ║
║  │ Casts │  │Synced │  │Checks │  │Recasts│        ║
║  └───────┘  └───────┘  └───────┘  └───────┘        ║
║                                                      ║
║  ⚠️ Admin Notice — change default password!         ║
╚══════════════════════════════════════════════════════╝
```

### Admin Panel
```
╔══════════════════════════════════════════════════════╗
║  ⚙️ Admin Panel                                     ║
╠══════════════════════════════════════════════════════╣
║  [👥 Users] [⚙️ Settings] [📋 Logs]                ║
║                                                      ║
║  User         │ Role      │ Status  │ Actions       ║
║  ─────────────┼───────────┼─────────┼───────────── ║
║  Admin        │ 👑 admin  │ ● active│ [Edit]       ║
║  Alice Dev    │ 💻 dev    │ ● active│ [Edit][Del]  ║
║  Bob User     │ 👤 user   │ ● active│ [Edit][Del]  ║
║  Charlie      │ 👤 user   │ ● susp. │ [Edit][Del]  ║
╚══════════════════════════════════════════════════════╝
```

### Airdrop Checker
```
╔══════════════════════════════════════════════════════╗
║  🪂 Airdrop Checker                                  ║
╠══════════════════════════════════════════════════════╣
║  ✓ Connected: 0x1234...abcd                          ║
║                                                      ║
║  [0x1234...abcd________________] [  Check  ]         ║
║                                                      ║
║  ┌──────────────────────────────────────────────┐   ║
║  │ 🟣 DEGEN Token · Base     ✓ Eligible 1000    │   ║
║  │ 🔵 ARB Token  · Arbitrum  ✓ Eligible  500    │   ║
║  │ 🔴 OP Token   · Optimism  ✗ Not Eligible     │   ║
║  │ 🦄 UNI Token  · Ethereum  ✗ Not Eligible     │   ║
║  └──────────────────────────────────────────────┘   ║
╚══════════════════════════════════════════════════════╝
```

---

## ✨ Features

### Application
- [x] **Neo Flash Glow UI** — neon cyan/purple/pink glow effects, animated scanline, grid background
- [x] **Landing Page** — hero section, feature grid, stats counter
- [x] **Login Page** — JWT auth, demo credentials display
- [x] **Signup Page** — registration with User / Developer role selection
- [x] **Dashboard** — role-aware stats, quick-action cards, wallet status
- [x] **Route Protection** — Next.js middleware-based auth guard

### Authentication & RBAC
- [x] JWT tokens via `jose` in httpOnly cookies (7-day TTL)
- [x] Three roles: **Admin**, **Developer**, **User**
- [x] Default admin: `admin@admin.com` / `admin123`
- [x] Middleware blocks protected routes for unauthenticated users
- [x] Admin-only route (`/admin`) redirects non-admins to dashboard

### Farcaster
- [x] **Timeline Feed** — cast cards with like/recast/reply UI
- [x] **Cast Embedding** — embed by username + hash (uses `react-farcaster-embed`)
- [x] **Profile Sync** — fetch followers, following, cast count for any username
- [x] **One-Click Automation** — auto-sync, auto-like, auto-recast toggles

### Web3
- [x] **RainbowKit** wallet modal (MetaMask, Coinbase, WalletConnect, etc.)
- [x] **wagmi v2 + viem v2** — type-safe multi-chain support
- [x] **Chains**: Ethereum, Polygon, Optimism, Arbitrum, Base
- [x] Connected wallet address shown in navbar and profile

### Airdrop Checker
- [x] Manual address input or auto-fill from connected wallet
- [x] Eligibility results for DEGEN, ARB, OP, UNI, and more
- [x] Active airdrops listing with deadlines

### Admin Panel
- [x] User management table (view, edit roles, suspend/remove)
- [x] System settings form
- [x] Activity log viewer

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v3 (custom neon theme) |
| Auth | JWT (`jose`) + httpOnly cookies |
| Web3 | RainbowKit 2 + wagmi 2 + viem 2 |
| State | `@tanstack/react-query` v5 |
| TypeScript | v5 |
| Deploy | Vercel |
| Farcaster embeds | `react-farcaster-embed` (this repo root) |

---

## 🚀 Quick Start

```bash
git clone https://github.com/SMSDAO/react-farcaster-embed.git
cd react-farcaster-embed/web

npm install
cp .env.local.example .env.local   # edit with your secrets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and log in with `admin@admin.com` / `admin123`.

### Build for Production

```bash
npm run build
npm start
```

---

## ▲ One-Click Vercel Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SMSDAO/react-farcaster-embed&root-directory=web)

Set these environment variables in Vercel:

| Variable | Description |
|---|---|
| `NEXTAUTH_SECRET` | JWT signing secret (32+ chars) — `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | Your deployment URL (`https://your-app.vercel.app`) |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | From [cloud.walletconnect.com](https://cloud.walletconnect.com) |

---

## 🔐 Authentication & Roles

### Default Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@admin.com` | `admin123` |

> ⚠️ Change the default password in production. The current user store is in-memory — replace with a real database for production.

### Role Permissions

| Feature | User | Developer | Admin |
|---|---|---|---|
| Dashboard / Timeline / Airdrop / Profile | ✅ | ✅ | ✅ |
| Developer API tools | ❌ | ✅ | ✅ |
| Admin Panel (user management, settings, logs) | ❌ | ❌ | ✅ |

---

## ⚡ One-Click Automation Sync

From the **Profile** page, enable automation workflows:

| Feature | Description |
|---|---|
| **Auto-Sync Timeline** | Pull new casts every 30 minutes |
| **Auto-Like Similar** | Like casts matching configured keywords |
| **Auto-Recast Follows** | Recast from followed channels automatically |

Wire these to your Farcaster hub integration (Neynar API recommended) for live operation.

---

## 👨‍💻 Developer Guide

### Project Structure

```
react-farcaster-embed/
├── src/                          # Library source
│   ├── components/               # CastEmbed, icons, images, videos
│   ├── client/                   # Client-side variant
│   ├── api.ts / types.ts         # API + TypeScript types
│   └── styles.css                # Default embed styles
│
└── web/                          # Next.js application
    ├── app/
    │   ├── (auth)/               # login/, signup/ (no navbar)
    │   ├── (dashboard)/          # dashboard/, timeline/, airdrop/, profile/, admin/
    │   ├── api/auth/             # login, logout, me, register routes
    │   ├── layout.tsx            # Root layout + Providers
    │   ├── page.tsx              # Landing page
    │   ├── globals.css           # Neo Flash Glow base CSS
    │   └── providers.tsx         # wagmi + RainbowKit + AuthProvider
    ├── components/Navbar.tsx     # Top navbar with wallet button
    ├── lib/
    │   ├── auth.ts               # JWT helpers, user store, RBAC
    │   ├── auth-context.tsx      # React auth context + useAuth hook
    │   └── wagmi.ts              # wagmi chain config
    ├── proxy.ts                  # Route protection proxy (Next.js 16)
    ├── tailwind.config.ts        # Neo glow theme
    └── vercel.json               # Vercel deployment config
```

### Adding a New Protected Page

```tsx
// web/app/(dashboard)/my-page/page.tsx
'use client'
import { useAuth } from '@/lib/auth-context'

export default function MyPage() {
  const { user } = useAuth()
  return <div>Hello {user?.name}</div>
}
```

Add a link in `web/components/Navbar.tsx`.

### Adding a Protected API Route

```ts
// web/app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth-token')?.value
  const user = token ? await verifyToken(token) : null
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ data: 'Hello ' + user.name })
}
```

### Connecting a Real Database

```bash
cd web
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
```

Update `web/lib/auth.ts` to use Prisma instead of the in-memory arrays. Hash passwords with `bcrypt` or `argon2`.

### Customizing the Glow Theme

Edit `web/tailwind.config.ts` (`neon` colors + `boxShadow`) and `web/app/globals.css` (`.neo-card`, `.neo-btn-primary`, etc.).

### WalletConnect Setup

1. Create project at [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Set `projectId` in `web/lib/wagmi.ts` or use env var `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

---

## 👤 User Guide

1. **Register** at `/signup` — choose User or Developer role
2. **Login** at `/login` (or use admin credentials above)
3. **Connect Wallet** — click the wallet button in the top navbar
4. **Timeline** — browse Farcaster casts, embed by username + hash
5. **Profile** — sync your Farcaster profile data, enable automation
6. **Airdrop Checker** — enter wallet address or use connected wallet, click Check
7. **Admin** (admin only) — manage users, view logs, update settings

---

## 🔧 Environment Variables

```env
# web/.env.local

NEXTAUTH_SECRET=your-secret-min-32-chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_WC_PROJECT_ID
```

---

## 📦 Library Usage (react-farcaster-embed)

The root package is a standalone React library for embedding Farcaster casts.

### Install

```bash
npm i react-farcaster-embed
```

### Server Components (Next.js App Router)

```jsx
import { FarcasterEmbed } from "react-farcaster-embed";
import "react-farcaster-embed/dist/styles.css";

<FarcasterEmbed url="https://warpcast.com/pugson/0x4294c797" />
<FarcasterEmbed username="dwr" hash="0x48d47343" />
```

### Client Components

```jsx
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";
<FarcasterEmbed url="https://warpcast.com/pugson/0x4294c797" />
```

### Options

```jsx
// Custom API proxy endpoint
<FarcasterEmbed options={{ customEndpoint: "https://your-proxy.xyz/api/casts" }} url="..." />

// Suppress errors for deleted casts
<FarcasterEmbed options={{ silentError: true }} url="..." />

// Pass your own cast data (e.g. from Neynar)
<FarcasterEmbed castData={myCastData} />
```

---

## 🤝 Contributing

1. Fork → branch → make changes
2. `cd web && npm run build` — must pass
3. Open a Pull Request

---

## 📄 License

- **react-farcaster-embed** library — [The Unlicense](LICENSE.md)
- **web/ application** — MIT

---

*Built with ❤️ by [SMSDAO](https://github.com/SMSDAO) · Powered by Next.js, RainbowKit, Farcaster*
