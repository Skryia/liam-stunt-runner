# The Stunt Runner — static website

Plain HTML/CSS/JS. No build step, no server. Upload the contents of this folder to a GitHub Pages repo (root or `/docs`) — `index.html` is the homepage. Page paths are relative; the preview videos use Lovable-hosted asset URLs (see below for GitHub Pages).

```
index.html
css/styles.css
js/config.js         ← hero, about photos, socials, YouTube links, form endpoint, domain
js/gallery-data.js   ← performance gallery items
js/events-data.js    ← upcoming appearances (live data — currently empty)
js/main.js           ← site logic (no need to edit)
assets/              ← put images/videos here
```

## Hero video with fire overlay
1. Save files e.g. `assets/video/hero.mp4` (H.264, ~1080p, 10–20s, < 8 MB), optional `hero.webm` and a smaller `hero-mobile.mp4`, plus `assets/hero-poster.jpg`.
2. In `js/config.js` → `hero`, set `videoMp4`, `videoWebm` and `videoMobileMp4`. Keep `poster` pointing to the current fire artwork and `posterIsPlaceholder: false`.
3. Adjust `focalPoint` (e.g. `"50% 30%"`) to control cropping.
The current fire artwork floats over the video at 55% opacity (`overlayOpacity: 0.55`). Increase this value for more fire, or decrease it for clearer footage. The artwork stays fully opaque before playback, if playback fails, and for reduced-motion or data-saving visitors. Pausing keeps the blended still frame.
The selected TikTok clip is now connected, silent and looping, in MP4 and WebM formats. Its source is recorded in `hero.sourcePage`. Portrait footage is shown without cropping, positioned on the right on desktop and centred on phones.
For GitHub Pages, download both videos from the `url` fields in `assets/video/*.asset.json` using the Lovable preview origin, save as `assets/video/hero.mp4` and `assets/video/hero.webm`, and update `videoMp4` and `videoWebm` to those relative paths. The `/__l5e/` URLs only work on Lovable. A TikTok page URL cannot be used as an HTML video source. Do not use expiring TikTok media URLs in the configuration.

## About photos
`js/config.js` → `about.photo.src` and `about.vanPhoto.src` (e.g. `assets/liam.jpg`).

## Gallery
Edit `js/gallery-data.js`. Delete the `placeholder: true` items and add real ones (fields documented at the top of the file). Download media and save it locally — do not hotlink Instagram/TikTok CDN URLs. Filters only appear for categories that have items.

## Add events
Edit `js/events-data.js` and add objects to `window.EVENTS` (format shown in the file). Times are UK local (Europe/London, BST handled automatically). Use `"2027-05-14"` for all-day events. Past events disappear from the list automatically. Use `status: "cancelled"` to show a cancellation (no booking button).

## YouTube links
`js/config.js` → `youtube`: paste the three full URLs and titles. Players load only when clicked, via youtube-nocookie.com.

## Domain
Set `siteUrl` in `js/config.js` for the canonical URL. Update `og:image` in `index.html` to an absolute URL once a real image exists.

## Contact form
POSTs URL-encoded to `https://skryia.com/API/Forms/submit.php` with `_sendto`, `skryia_email`, `_subject` plus the visitor's fields. **Before launch confirm:**
- the endpoint returns CORS headers allowing the deployed domain (e.g. `Access-Control-Allow-Origin: https://yourdomain`), otherwise the browser blocks it and visitors see the error + email fallback;
- the response format — adjust `isSuccessfulResponse()` in `js/main.js` accordingly.
No test submissions have been sent.

## Still needed from Liam
- Original sign/logo (wordmark here is a recreation, not his logo)
- Performance photos/videos with captions and post links
- The three exact YouTube URLs
- Confirmed upcoming event details
- Contact API response contract + CORS confirmation for the live domain
