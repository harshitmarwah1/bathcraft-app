import type { Room, StyleChoice, FixtureChoice } from "@/lib/types";

/** Default room — mirrors the Stitch export's initial state (102" x 72" x 108"). */
export function defaultRoom(): Room {
  return {
    name: "Master Ensuite",
    preset: "master",
    lengthInches: 102,
    widthInches: 72,
    heightInches: 108,
    door: { wall: "front", offsetInches: 36, widthInches: 32 },
    window: { wall: "back", offsetInches: 60, widthInches: 36 },
  };
}

export function defaultStyle(): StyleChoice {
  return {
    architecture: "modern",
    costTier: "goodQuality",
    budgetInr: 150000,
  };
}

export function defaultFixtures(): FixtureChoice[] {
  return [
    { type: "wc", placement: "back" },
    { type: "vanity", placement: "right" },
    { type: "shower", placement: "walkIn" },
    { type: "almirah", placement: "underVanity" },
  ];
}

/** Dimension bounds (inches) — from the export's adjustDim clamps. */
export const DIM_BOUNDS = {
  length: { min: 48, max: 240, step: 6 },
  width: { min: 36, max: 180, step: 6 },
  height: { min: 84, max: 144, step: 6 },
} as const;
