"use client"

import type React from "react"
import SmokeField from "./SmokeField"
import type { AmbienceProps } from "./types"

/**
 * NeuroShift: thin neon-lit fog drifting left to right through the alien city —
 * lavender, teal and magenta from the key art. Light enough that the city stays
 * visible. Drawn behind the characters, never over them.
 */
const NeuroShiftAmbience: React.FC<AmbienceProps> = (props) => (
  <SmokeField
    {...props}
    tints={["#c2acff", "#8fd6ee", "#e6a6e0"]}
    strength={0.45}
    density={1.6}
    wind={22}
  />
)

export default NeuroShiftAmbience
