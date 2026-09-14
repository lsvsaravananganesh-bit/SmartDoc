# SmartDoc

SmartDoc is a document automation workspace for turning structured spreadsheet data into personalized documents, PDFs, email campaigns and delivery history.

## Product flow

**Upload data → Validate → Build template → Merge fields → Generate documents → Send campaign → Track events**

## Current implementation

- Next.js 16 App Router + React 19 + TypeScript
- Responsive dashboard and workflow navigation
- CSV upload with client-side parsing and preview
- Template merge engine using `{{field}}` variables
- Document preview API
- Supabase browser/server clients using the current SSR pattern
- Supabase schema for templates, datasets, documents, campaigns and email events
- Row Level Security policies scoped to the authenticated owner
- Supabase email/password sign-in page
- Health API endpoint
- Production environment template

## Routes

- `/` — dashboard
- `/upload` — upload and validate data
- `/templates` — template builder
- `/documents` — generated document review
- `/campaigns` — email campaign workflow
- `/history` — automation history
- `/auth/sign-in` — Supabase email/password sign-in
- `/api/health` — service health
- `/api/preview` — merge-template preview API

## Supabase setup

The database schema is in `supabase/schema.sql` and has also been applied to the connected Supabase project. The tables use RLS and owner-based policies.

Create `.env.local` from `.env.example` and provide:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
AI_API_KEY=
EMAIL_API_KEY=
EMAIL_FROM=
```

Never commit secrets or a service/secret key to the browser. Supabase's current Next.js guidance uses `@supabase/ssr` for cookie-based sessions and publishable keys for client applications.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Next production integrations

1. Excel `.xlsx/.xls` parsing worker
2. AI template and email generation
3. Server-side PDF generation and Supabase Storage
4. Transactional email provider and webhook ingestion
5. Campaign queue/retry system
6. Auth-protected application routes and middleware/proxy session refresh
7. Analytics dashboard from `email_events`
