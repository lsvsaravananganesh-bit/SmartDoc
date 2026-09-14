# SmartDoc

SmartDoc is a Next.js starter for automating the workflow **Excel/CSV → personalized documents → PDFs → email → tracking**.

## Current starter
- Responsive dashboard
- Upload workflow with file selection
- Template builder with merge fields
- Document generation review screen
- Email campaign screen
- History screen
- Clean component structure ready for backend integrations

## Run locally

Requires Node.js 20.9+ for the current Next.js App Router setup.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Planned production integrations
1. Supabase Auth + PostgreSQL + Storage
2. Spreadsheet parsing and server-side validation
3. AI template/email generation
4. PDF rendering service
5. Transactional email provider
6. Campaign/job tracking and audit logs

Do not commit secrets. Copy `.env.example` to `.env.local` and add provider keys as integrations are implemented.
