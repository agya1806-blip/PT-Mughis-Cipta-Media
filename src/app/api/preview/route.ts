import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return new Response("Missing url parameter", { status: 400 })
  }

  const decodedUrl = decodeURIComponent(url)

  const safeUrl = decodedUrl
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  const html = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PDF Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; background: #1a1a1a; }
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
  }
  .viewer-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 8px 16px;
    background: #2a2a2a;
    color: #ccc;
    font-size: 14px;
    -webkit-user-select: none;
    user-select: none;
  }
  .toolbar button {
    background: none;
    border: 1px solid #555;
    color: #ccc;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: default;
    font-size: 13px;
  }
  .toolbar button:active { background: #444; }
  .toolbar span { color: #888; font-size: 12px; }
  iframe { flex: 1; width: 100%; border: none; }
  .watermark {
    position: fixed;
    bottom: 8px;
    right: 12px;
    color: rgba(255,255,255,0.15);
    font-size: 11px;
    pointer-events: none;
    z-index: 999;
  }
  @media print { body { display: none !important; } }
</style>
</head>
<body>
<div class="viewer-container">
  <div class="toolbar">
    <span>Preview</span>
    <span>|</span>
    <span>Hak cipta PT Mughis Cipta Media</span>
  </div>
  <iframe src="${safeUrl}#toolbar=0&amp;navpanes=0&amp;scrollbar=1&amp;view=FitH" allow="fullscreen" sandbox="allow-scripts allow-same-origin"></iframe>
</div>
<div class="watermark">&copy; PT Mughis Cipta Media</div>
<script>
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
      e.preventDefault();
    }
  });
</script>
</body>
</html>`

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": "default-src 'self'; frame-src *; script-src 'unsafe-inline'; style-src 'unsafe-inline'",
    },
  })
}
