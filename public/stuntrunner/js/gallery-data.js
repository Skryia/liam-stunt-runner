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
  { id: "performance-reel", type: "video", orientation: "portrait", title: "Performance video", src: "assets/video/performance-reel.mp4", poster: "assets/gallery/performance-reel-poster.jpg", alt: "Liam performing a stunt show", category: "Performances", platform: "Instagram", postUrl: "https://www.instagram.com/reel/Da7h5SeOyn8/", featured: true },
  { id: "live-show", type: "image", orientation: "landscape", title: "Live show", src: "assets/gallery/live.jpg", poster: "", alt: "Liam performing at a live show", category: "Performances", platform: "Instagram", postUrl: "https://www.instagram.com/p/DWg1r_6DQYE/" },
  { id: "hurdles", type: "image", orientation: "landscape", title: "Hurdles action", src: "assets/gallery/hurdles.jpg", poster: "", alt: "Liam clearing hurdles", category: "Athletics", platform: "Instagram", postUrl: "https://www.instagram.com/p/DeHcG7sDUQj/" },
  { id: "tiktok-clip", type: "video", orientation: "portrait", title: "TikTok clip", src: "assets/video/tiktok-clip.mp4", poster: "assets/gallery/tiktok-clip-poster.jpg", alt: "Liam stunt clip from TikTok", category: "Performances", platform: "TikTok", postUrl: "https://www.tiktok.com/@thestuntrunner/video/7371131613402369313" },
  { id: "van-life", type: "video", orientation: "landscape", title: "Van life", src: "assets/video/van-life.mp4", poster: "assets/gallery/van-life-poster.jpg", alt: "Life on the road in Liam's van", category: "Behind the scenes", platform: "Instagram", postUrl: "https://www.instagram.com/reel/DIW_pKMqeiL/" },
  { id: "close-up", type: "image", orientation: "landscape", title: "Close-up action", src: "assets/gallery/close.jpg", poster: "", alt: "Close-up of Liam mid-stunt", category: "Athletics", platform: "Instagram", postUrl: "https://www.instagram.com/p/DWjCquAjZhY/" },
];
