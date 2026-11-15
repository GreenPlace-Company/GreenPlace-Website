import { SITE_NAME } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Green Place",
    description:
      "Green Place Solutions Company drop-ships portable power stations, solar home-backup kits, and EV home chargers. Mission: a greener world.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FBF6",
    theme_color: "#0B3A38",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
