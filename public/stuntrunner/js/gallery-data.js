/* =========================================================
   GALLERY DATA — the main performance showcase.
   Each item:
     id          unique string
     type        "image" | "video"
     orientation "portrait" | "landscape" | "square"
     title       short caption
     src         local file, e.g. "assets/gallery/flip.jpg" or "assets/gallery/run.mp4"
     poster      thumbnail image (required for videos)
     alt         descriptive alt text
     category    "Performances" | "Athletics" | "Behind the scenes"
     platform    "Instagram" | "TikTok" | "Facebook" | "" (where it was originally posted)
     postUrl     link to the original social post (optional)
     featured    true to show larger
     placeholder true ONLY for development placeholders — remove these when real media arrives
   Never hotlink temporary social CDN URLs — download and save files locally.
   ========================================================= */
window.GALLERY_ITEMS = [
  { id: "ph-1", type: "video", orientation: "portrait", title: "Placeholder — performance video", src: "", poster: "", alt: "Placeholder slot for a performance video", category: "Performances", platform: "Instagram", postUrl: "", featured: true, placeholder: true },
  { id: "ph-2", type: "image", orientation: "landscape", title: "Placeholder — live show photo", src: "", poster: "", alt: "Placeholder slot for a live show photo", category: "Performances", platform: "", postUrl: "", placeholder: true },
  { id: "ph-3", type: "image", orientation: "square", title: "Placeholder — hurdles action", src: "", poster: "", alt: "Placeholder slot for an athletics photo", category: "Athletics", platform: "", postUrl: "", placeholder: true },
  { id: "ph-4", type: "video", orientation: "portrait", title: "Placeholder — TikTok clip", src: "", poster: "", alt: "Placeholder slot for a TikTok video", category: "Performances", platform: "TikTok", postUrl: "", placeholder: true },
  { id: "ph-5", type: "image", orientation: "landscape", title: "Placeholder — van life", src: "", poster: "", alt: "Placeholder slot for a behind-the-scenes photo", category: "Behind the scenes", platform: "", postUrl: "", placeholder: true },
  { id: "ph-6", type: "image", orientation: "square", title: "Placeholder — close-up action", src: "", poster: "", alt: "Placeholder slot for a close-up action photo", category: "Athletics", platform: "", postUrl: "", placeholder: true },
];
