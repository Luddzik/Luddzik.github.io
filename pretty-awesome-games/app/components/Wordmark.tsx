import type React from "react"

interface WordmarkProps {
  className?: string
  /** Rendered width in CSS px or any CSS length. Height follows the 291:60 ratio. */
  width?: number | string
  title?: string
}

/**
 * The ISKRA wordmark, drawn as paths so it needs no font and inherits
 * `currentColor`. The I is broken by the same diagonal as the home page's
 * slashes and the favicon — that cut is the mark. Same geometry as
 * `public/brand/wordmark.svg`; keep the two in step.
 */
const Wordmark: React.FC<WordmarkProps> = ({ className, width = 150, title }) => (
  <svg
    className={className}
    viewBox="0 0 291 60"
    width={width}
    fill="currentColor"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    style={{ height: "auto", display: "block" }}
  >
    <path
      fillRule="evenodd"
      d="M0 0h12v24L0 32z M0 39l12-8v29H0z M30 0h44v10H42v15h27l8 8v19l-8 8H28V49h37V35H39l-9-8z M94 0h12v27L132 0h15l-28 29 30 31h-16l-27-28v28H94z M164 0h36l12 12v16l-10 10 16 22h-15l-16-22h-11v22h-12z M176 10v18h20l4-4V14l-4-4z M253 0h13l25 60h-13l-6-15h-27l-6 15h-13z M249 35h19l-9-23z"
    />
  </svg>
)

export default Wordmark
