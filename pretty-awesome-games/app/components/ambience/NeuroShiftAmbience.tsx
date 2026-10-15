"use client"

import type React from "react"
import SmokeField from "./SmokeField"
import type { AmbienceProps } from "./types"

/**
 * NeuroShift: neon-lit smoke rolling through the alien city — lavender, teal
 * and magenta pulled from the key art's sky and the squad's lights. Drawn
 * behind the characters, never over them.
 */
const NeuroShiftAmbience: React.FC<AmbienceProps> = (props) => (
  <SmokeField {...props} tints={["#c2acff", "#8fd6ee", "#e6a6e0"]} strength={1.5} density={1.3} />
)

export default NeuroShiftAmbience
