import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liam Collins | The Stunt Runner" },
      { name: "description", content: "UK stunt performer and athlete Liam Collins — performances, events and bookings." },
      { property: "og:title", content: "Liam Collins | The Stunt Runner" },
      { property: "og:description", content: "Elite athleticism. Daring performances. Unforgettable live entertainment." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The real site is static HTML in public/stuntrunner (GitHub Pages ready).
function Index() {
  useEffect(() => {
    window.location.replace("/stuntrunner/index.html");
  }, []);
  return null;
}
