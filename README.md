# Lazy Loopin — Cinematic Video Library

A Next.js cinematic creator portfolio with Netflix-style browsing, search, category filters, local video playback, and TikTok links.

## Start in VS Code

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Content folder naming

The app uses URL-safe title slugs to avoid filesystem issues with punctuation and spaces.

```
public/
  content/
    final-interview-2026/
      final-interview-2026-cover.jpg
      result.mp4
    top-5-thai-rom-coms/
      top-5-thai-rom-coms-cover.jpg
      result.mp4
```

All 15 video entries and TikTok IDs are already in `data/videos.ts`. Create a folder for each slug listed there. Cover images use `<slug>-cover.jpg`; video files use `result.mp4`. The Final Interview entry uses your provided reference cover automatically until you change it.

If a local video is missing, the player shows a TikTok fallback link. If a cover is missing, a branded placeholder appears.

If you prefer PNG covers, edit `coverPath` in `data/videos.ts` to end with `.png`.

## Deploy

Create a GitHub repository, commit these files, then import it into Vercel. Do not upload videos you don't own or have permission to host. Large video files may be better stored on a streaming service or object storage instead of Git.
