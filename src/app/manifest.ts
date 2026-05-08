import type { MetadataRoute } from "next";
import { company } from "@/lib/site-content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.legalName,
    short_name: company.shortName,
    description: company.taglineKo,
    start_url: "/",
    scope: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" }],
  };
}
