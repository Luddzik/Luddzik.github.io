import type React from "react"

/**
 * React 18 doesn't know the `inert` attribute — its types reject it and a
 * boolean `true` is dropped. An empty string passes straight through to the DOM,
 * and omitting the key removes it again.
 */
export const inert = (on: boolean) =>
  (on ? { inert: "" } : {}) as unknown as React.HTMLAttributes<HTMLElement>
