# Bartender API quick test (run with dev server: npm run dev)

## Chat API
Uses `message` + `history` (not `messages`):
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"hello","history":[]}'
```
If you see ANTHROPIC_API_KEY error, add it to .env.local and restart.

## D-ID API (create stream)
```bash
curl -X POST http://localhost:3000/api/d-id \
  -H "Content-Type: application/json" \
  -d '{"action":"create"}'
```
Paste the full response if debugging avatar.
