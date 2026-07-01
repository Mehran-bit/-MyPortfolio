import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mehran Ali — Full-Stack Developer Portfolio" },
      { name: "description", content: "Mehran Ali — full-stack developer building modern web experiences with React, TypeScript, Node.js, and more. Available for hire." },
      { property: "og:title", content: "Mehran Ali — Full-Stack Developer" },
      { property: "og:description", content: "Portfolio of Mehran Ali — React, TypeScript, Node.js, and modern web craft." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
