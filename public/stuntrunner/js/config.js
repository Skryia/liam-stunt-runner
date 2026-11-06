/* =========================================================
   SITE CONFIG — edit this file to update core content.
   ========================================================= */
window.SITE_CONFIG = {
  // Production domain (used for canonical URL). e.g. "https://thestuntrunner.co.uk/"
  siteUrl: "",

  hero: {
    // Owner-supplied local video, e.g. "assets/video/hero.mp4". Leave "" to use the poster only.
    // Desktop: landscape clip, stretched full-bleed behind the fire artwork.
    videoMp4: "assets/video/liam-hero-wide.mp4",
    videoWebm: "assets/video/liam-hero-wide.webm",
    // Phones: portrait clip (framed, not stretched).
    videoMobileMp4: "assets/video/liam-hero-h264.mp4",
    videoMobileWebm: "assets/video/liam-hero.webm",
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
    photo: { src: "assets/liam.jpg", alt: "Liam Collins, The Stunt Runner" },
    vanPhoto: { src: "assets/van-life.jpg", alt: "Liam's van on the road" },
  },

  socials: [
    { name: "Instagram", url: "https://www.instagram.com/THESTUNTRUNNER/", label: "Follow The Stunt Runner on Instagram" },
    { name: "TikTok", url: "https://www.tiktok.com/@thestuntrunner", label: "Follow The Stunt Runner on TikTok" },
    { name: "Facebook", url: "https://www.facebook.com/thestuntrunner?locale=en_GB", label: "Follow The Stunt Runner on Facebook" },
  ],

  // Three YouTube videos linked from Liam's Instagram profile.
  // Paste the full YouTube URL (watch, youtu.be or shorts). Leave "" until confirmed.
  youtube: [
    { title: "Semi-final BGT 2009", url: "https://www.youtube.com/watch?v=J0QR8LoyWeg" },
    { title: "The Final Hurdle", url: "https://www.youtube.com/watch?v=2AaqLlC1aF4" },
    { title: "Sports Dopers Secrets", url: "https://www.youtube.com/watch?v=wJRPxmTuxoI" },
  ],

  contact: {
    endpoint: "https://skryia.com/API/Forms/submit.php",
    // Where enquiries are delivered.
    recipientEmail: "liamcollins0@gmail.com",
    fallbackEmail: "liamcollins0@gmail.com",
  },
};
