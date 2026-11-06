import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const SITE_DIR = path.resolve(process.cwd(), "public/stuntrunner");

function siteConfig() {
  // config.js is a browser script: window.SITE_CONFIG = { ... }
  const source = readFileSync(path.join(SITE_DIR, "js/config.js"), "utf8");
  new Function(source).call(window);
  return (window as unknown as { SITE_CONFIG: { contact: Record<string, string> } }).SITE_CONFIG;
}

// Enquiries must land in Liam's inbox, not the form service's old address.
describe("Contact form recipient", () => {
  it("sends enquiries to liamcollins0@gmail.com", () => {
    expect(siteConfig().contact.recipientEmail).toBe("liamcollins0@gmail.com");
  });

  it("posts that address as the form recipient", () => {
    const main = readFileSync(path.join(SITE_DIR, "js/main.js"), "utf8");

    expect(main).toContain("_sendto: recipient");
    expect(main).not.toContain("skryia.one@gmail.com");
  });
});
