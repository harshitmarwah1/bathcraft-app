import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BathCraft — Bathroom Planner",
    short_name: "BathCraft",
    description:
      "Plan, visualise and estimate your bathroom renovation — a scaled 2D plan plus a material and cost estimate.",
    start_url: "/planner",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f8f9ff",
    theme_color: "#006194",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
