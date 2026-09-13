import { describe, it, expect } from "vitest";
import { generateEstimate } from "./engine";
import type { AddOnType, FixtureChoice, Room, StyleChoice } from "@/lib/types";

function room(overrides: Partial<Room> = {}): Room {
  return {
    name: "Test",
    preset: "master",
    lengthInches: 102,
    widthInches: 72,
    heightInches: 108,
    door: { wall: "front", offsetInches: 36, widthInches: 32 },
    window: { wall: "back", offsetInches: 60, widthInches: 36 },
    ...overrides,
  };
}

function style(overrides: Partial<StyleChoice> = {}): StyleChoice {
  return { architecture: "modern", costTier: "goodQuality", budgetInr: 150000, ...overrides };
}

const fixtures: FixtureChoice[] = [
  { type: "wc", placement: "back", variant: "floorMounted" },
  { type: "vanity", placement: "right", variant: "countertop" },
  { type: "shower", placement: "walkIn", variant: "handheld" },
  { type: "almirah", placement: "underVanity", variant: "mirrorCabinet" },
];

const addOns: AddOnType[] = ["geyser", "exhaustFan"];

describe("generateEstimate", () => {
  it("returns a non-empty bill of materials", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    expect(est.bom.length).toBeGreaterThan(0);
  });

  it("includes a line for every fixture and every add-on", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    for (const f of fixtures) {
      expect(est.bom.some((l) => l.key === `fixture:${f.type}`)).toBe(true);
    }
    for (const a of addOns) {
      expect(est.bom.some((l) => l.key === `addon:${a}`)).toBe(true);
    }
  });

  it("includes tiles, cement, badarpur and plumbing lines", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    const keys = est.bom.map((l) => l.key);
    expect(keys).toContain("tiles");
    expect(keys).toContain("cement");
    expect(keys).toContain("badarpur");
    expect(keys).toContain("pipe-supply");
  });

  it("computes each line total as quantity × unit cost", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    for (const l of est.bom) {
      expect(l.quantity).toBeGreaterThan(0);
      expect(l.unitCostInr).toBeGreaterThanOrEqual(0);
      expect(l.totalInr).toBe(Math.round(l.quantity * l.unitCostInr));
    }
  });

  it("sets material cost to the sum of all line totals", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    const sum = est.bom.reduce((s, l) => s + l.totalInr, 0);
    expect(est.materialCostInr).toBe(sum);
  });

  it("sets total cost to material plus labour", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    expect(est.totalCostInr).toBe(est.materialCostInr + est.labourCostInr);
    expect(est.labourCostInr).toBeGreaterThan(0);
  });

  it("estimates a positive whole number of days", () => {
    const est = generateEstimate(room(), style(), fixtures, addOns);
    expect(est.timeDays).toBeGreaterThan(0);
    expect(Number.isInteger(est.timeDays)).toBe(true);
  });

  it("costs more at a higher tier for the same inputs", () => {
    const budget = generateEstimate(room(), style({ costTier: "budget" }), fixtures, addOns);
    const top = generateEstimate(room(), style({ costTier: "topOfLine" }), fixtures, addOns);
    expect(top.totalCostInr).toBeGreaterThan(budget.totalCostInr);
  });

  it("costs more with more add-ons", () => {
    const few = generateEstimate(room(), style(), fixtures, ["geyser"]);
    const many = generateEstimate(room(), style(), fixtures, ["geyser", "exhaustFan", "towelRail", "healthFaucet"]);
    expect(many.totalCostInr).toBeGreaterThan(few.totalCostInr);
  });

  it("needs more tiles in a bigger room", () => {
    const small = generateEstimate(room({ lengthInches: 72, widthInches: 60 }), style(), fixtures, addOns);
    const big = generateEstimate(room({ lengthInches: 144, widthInches: 108 }), style(), fixtures, addOns);
    const smallTiles = small.bom.find((l) => l.key === "tiles")!;
    const bigTiles = big.bom.find((l) => l.key === "tiles")!;
    expect(bigTiles.quantity).toBeGreaterThan(smallTiles.quantity);
  });

  it("is deterministic for the same input", () => {
    const a = generateEstimate(room(), style(), fixtures, addOns);
    const b = generateEstimate(room(), style(), fixtures, addOns);
    expect(a).toEqual(b);
  });
});
