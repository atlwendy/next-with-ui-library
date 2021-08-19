const withTM = require("next-transpile-modules");
const path = require("path")
const withUI = require("./with-ui");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    return withUI(config, {});
  }
};

module.exports = withTM([
  path.join(process.cwd(), "node_modules/@tuftandneedle/ui"),
  path.join(process.cwd(), "node_modules/@tuftandneedle/ui-tokens"),
])(nextConfig);
