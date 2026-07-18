<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Deployment

- **Production branch**: `main` (push dari sini memicu Vercel deploy)
- **Fallback branch**: `feature/production-ready` (disync dengan main)
- **Branch kerja aktif**: `feature/core-pages`
- Build: `npm run build` (Compiled + TypeScript + Static Pages)
- Semua branch deployment harus di-sync sebelum deploy
