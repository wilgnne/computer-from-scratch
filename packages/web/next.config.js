const BACKEND_URL = process.env.BACKEND_URL || "";

module.exports = {
  assetPrefix: BACKEND_URL,
  basePath: BACKEND_URL,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
