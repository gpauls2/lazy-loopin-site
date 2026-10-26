LAZY LOOPIN — COMPLETE RESTORE + AUTO DISCOVERY

1. BACK UP your existing project first.
2. Copy app/layout.tsx, app/page.tsx, app/globals.css, components/Library.tsx,
   data/videos.ts, and lib/getLibraryVideos.ts into your existing project.
   Create the lib folder if needed.
3. KEEP your existing public/content (all your videos and covers).
   KEEP your existing public/branding images.
4. Your office background must be at public/Office(6).png
   (or change the CSS background-image URL).
5. Keep your favicon at app/favicon.ico, OR put it at public/favicon.ico
   (this package's layout.tsx references /favicon.ico).
6. If not installed, run: npm install lucide-react
7. Run: npm run dev

For a new video, add a folder under public/content:
  public/content/My New Video/My New Video.png
  public/content/My New Video/result.mp4
Optional files:
  public/content/My New Video/category.txt    (Watchlists, Movie Breakdowns, or Original Stories)
  public/content/My New Video/tiktok.txt      (paste TikTok video URL or numeric ID)
No code changes needed for new folders. Refresh the site.
If a MOV fails to play, convert to MP4 (H.264 + AAC).

IMPORTANT: The scanner reads the server's local public/content directory.
New folders must be committed/deployed to update a live site on Vercel.
Large video files may require separate video hosting later.

This package does NOT contain your personal video files, covers, office image,
or favicon. It preserves them by leaving your public folder alone.
