/* =========================================================
   SITE CONFIG — edit this file to update core content.
   ========================================================= */
window.SITE_CONFIG = {
  // Production domain (used for canonical URL). e.g. "https://thestuntrunner.co.uk/"
  siteUrl: "",

  hero: {
    // Owner-supplied local video, e.g. "assets/video/hero.mp4". Leave "" to use the poster only.
    // Desktop: landscape clip, stretched full-bleed behind the fire artwork.
    videoMp4: "/__l5e/assets-v1/41daea99-b48f-4bd8-b5da-8330e6f3babb/liam-hero-wide.mp4",
    videoWebm: "/__l5e/assets-v1/80cf5f12-c0f1-4345-a9f1-1e0f160c790e/liam-hero-wide.webm",
    // Phones: portrait clip (framed, not stretched).
    videoMobileMp4: "/__l5e/assets-v1/dec104a5-a6f8-44af-b533-591533c56c63/liam-hero-h264.mp4",
    videoMobileWebm: "/__l5e/assets-v1/28b87336-9617-4d2c-a293-38de193001e5/liam-hero.webm",
    poster: "assets/hero-poster-placeholder.jpg",
    // The fire artwork is intentionally retained over the moving footage.
    posterIsPlaceholder: false,
    // 0 = video only, 1 = fire image only. Used once video is playing.
    overlayOpacity: 0.75,
    // Reference only: background playback needs a downloaded MP4, not a TikTok page URL.
    // Desktop clip below; the phone clip is https://www.tiktok.com/@thestuntrunner/video/7371185942926724385
    sourcePage: "https://www.tiktok.com/@thestuntrunner/video/7369744905289223457",
    // CSS object-position focal point for cropping, e.g. "50% 30%"
    focalPoint: "50% 50%",
  },

  // Genuine photos of Liam. Leave src "" to show a clearly labelled placeholder.
  about: {
    photo: { src: "", alt: "Liam Collins, The Stunt Runner" },
    vanPhoto: { src: "", alt: "Liam's van on the road" },
  },

  socials: [
    { name: "Instagram", url: "https://www.instagram.com/THESTUNTRUNNER/", label: "Follow The Stunt Runner on Instagram" },
    { name: "TikTok", url: "https://www.tiktok.com/@thestuntrunner", label: "Follow The Stunt Runner on TikTok" },
    { name: "Facebook", url: "https://www.facebook.com/thestuntrunner?locale=en_GB", label: "Follow The Stunt Runner on Facebook" },
  ],

  // Three YouTube videos linked from Liam's Instagram profile.
  // Paste the full YouTube URL (watch, youtu.be or shorts). Leave "" until confirmed.
  youtube: [
    { title: "Video slot 1", url: "" },
    { title: "Video slot 2", url: "" },
    { title: "Video slot 3", url: "" },
  ],

  contact: {
    endpoint: "https://skryia.com/API/Forms/submit.php",
    fallbackEmail: "liamcollins0@gmail.com",
  },
};
