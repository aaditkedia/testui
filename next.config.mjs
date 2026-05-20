/** @type {import('next').NextConfig} */

// Deployed to GitHub Pages at https://aaditkedia.github.io/testui/
// so production assets/routes need the /testui base path. Local dev stays at root.
const isProd = process.env.NODE_ENV === "production";
const repo = "testui";

const nextConfig = {
  output: "export", // static HTML export -> ./out, served by GitHub Pages
  reactStrictMode: true,
  trailingSlash: true, // emit /route/index.html so Pages serves clean URLs
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true, // no image optimizer on static hosting
  },
};

export default nextConfig;
