/** What every game's background animation receives. */
export interface AmbienceProps {
  /** Only the visible scene runs; everything else is stopped, not just hidden. */
  active: boolean
  /** The viewer's "Pause background" choice. Freezes the last frame in place. */
  paused?: boolean
  className?: string
}
