/**
 * Single source of Next config.
 *
 * There used to be two files — `next.config.js` and `next.config.mjs`. Next
 * loads `.js` first and silently ignores the rest, so everything in the `.mjs`
 * one was inert: `output: "export"` happened to live in the `.js` file, which is
 * why builds worked, while both "ignore errors" escape hatches did nothing.
 * They are merged here and `next.config.js` is deleted. Do not add a second one.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* GitHub Pages serves the statically exported /out directory. */
  output: "export",

  images: {
    /* No image optimisation server exists in a static export. */
    unoptimized: true,
  },

  /*
   * Type and lint errors fail the build on purpose.
   *
   * The old `.mjs` file set `ignoreBuildErrors` and `ignoreDuringBuilds` to
   * true, but since that file was never loaded, errors have always failed the
   * build in practice — and the repo is clean under both today. Keeping it
   * strict means a broken push fails in CI rather than silently deploying a
   * broken site. If a deadline ever needs the escape hatch, flip these to true.
   */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
