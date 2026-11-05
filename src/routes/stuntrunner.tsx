import { createFileRoute } from "@tanstack/react-router";
import html from "../../public/stuntrunner/index.html?raw";

// Hosting rewrites /stuntrunner/index.html to /stuntrunner, so serve the static page here.
// The <base> tag keeps the page's relative css/js/assets paths pointing at /stuntrunner/.
const page = html.includes("<base ")
  ? html
  : html.replace(/<head([^>]*)>/i, '<head$1>\n  <base href="/stuntrunner/">');

export const Route = createFileRoute("/stuntrunner")({
  server: {
    handlers: {
      GET: () =>
        new Response(page, { headers: { "content-type": "text/html; charset=utf-8" } }),
    },
  },
});
