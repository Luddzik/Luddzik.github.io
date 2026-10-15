import type React from "react"
import NeuroShiftAmbience from "./NeuroShiftAmbience"
import type { AmbienceProps } from "./types"

/**
 * Each game gets its own background animation — that's a studio rule, not an
 * accident. A game names its ambience in `lib/games.ts` (`ambience: "<key>"`)
 * and the component lives in this folder. New game, new file, new entry here;
 * reuse an engine like `SmokeField` underneath if it fits, but tune or build
 * something that belongs to that game's world.
 *
 * Every ambience sits *behind* the characters (world → ambience → characters →
 * scrim → text), honours `active`/`paused`, and renders nothing under reduced
 * motion.
 */
export const AMBIENCE: Record<string, React.ComponentType<AmbienceProps>> = {
  neuroshift: NeuroShiftAmbience,
}

export type { AmbienceProps }
