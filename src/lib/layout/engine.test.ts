import { describe, it, expect } from "vitest";
import { generateLayout } from "./engine";
import type { FixtureChoice, Room, PlacedFixture } from "@/lib/types";

/** A comfortable default room (102" x 72" x 108") with a front-wall door. */
function comfortableRoom(overrides: Partial<Room> = {}): Room {
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

const defaultFixtures: FixtureChoice[] = [
  { type: "wc", placement: "back", variant: "floorMounted" },
  { type: "vanity", placement: "right", variant: "countertop" },
  { type: "shower", placement: "walkIn", variant: "handheld" },
  { type: "almirah", placement: "underVanity", variant: "mirrorCabinet" },
];

function boxesOverlap(a: PlacedFixture, b: PlacedFixture): boolean {
  return (
    a.x < b.x + b.widthInches &&
    a.x + a.widthInches > b.x &&
    a.y < b.y + b.depthInches &&
    a.y + a.depthInches > b.y
  );
}

const EPS = 0.01;

describe("generateLayout", () => {
  it("places every requested fixture", () => {
    const plan = generateLayout(comfortableRoom(), defaultFixtures);
    expect(plan.fixtures).toHaveLength(defaultFixtures.length);
    for (const f of defaultFixtures) {
      expect(plan.fixtures.some((p) => p.type === f.type)).toBe(true);
    }
  });

  it("keeps every fixture inside the room bounds", () => {
    const room = comfortableRoom();
    const plan = generateLayout(room, defaultFixtures);
    for (const p of plan.fixtures) {
      expect(p.x).toBeGreaterThanOrEqual(-EPS);
      expect(p.y).toBeGreaterThanOrEqual(-EPS);
      expect(p.x + p.widthInches).toBeLessThanOrEqual(room.lengthInches + EPS);
      expect(p.y + p.depthInches).toBeLessThanOrEqual(room.widthInches + EPS);
    }
  });

  it("gives every fixture a positive footprint", () => {
    const plan = generateLayout(comfortableRoom(), defaultFixtures);
    for (const p of plan.fixtures) {
      expect(p.widthInches).toBeGreaterThan(0);
      expect(p.depthInches).toBeGreaterThan(0);
    }
  });

  it("snaps the WC to its chosen wall", () => {
    const room = comfortableRoom();
    const plan = generateLayout(room, defaultFixtures);
    const wc = plan.fixtures.find((p) => p.type === "wc")!;
    // placement 'back' → touches the back wall (y === 0)
    expect(wc.y).toBeLessThanOrEqual(EPS);
  });

  it("snaps the vanity to its chosen wall", () => {
    const room = comfortableRoom();
    const plan = generateLayout(room, defaultFixtures);
    const vanity = plan.fixtures.find((p) => p.type === "vanity")!;
    // placement 'right' → touches the right wall (x + width === length)
    expect(vanity.x + vanity.widthInches).toBeGreaterThanOrEqual(room.lengthInches - EPS);
  });

  it("does not overlap any two fixtures", () => {
    const plan = generateLayout(comfortableRoom(), defaultFixtures);
    const f = plan.fixtures;
    for (let i = 0; i < f.length; i++) {
      for (let j = i + 1; j < f.length; j++) {
        expect(boxesOverlap(f[i], f[j])).toBe(false);
      }
    }
  });

  it("keeps the door opening clear of fixtures", () => {
    const room = comfortableRoom();
    const plan = generateLayout(room, defaultFixtures);
    const d = room.door; // front wall
    const doorZone: PlacedFixture = {
      type: "wc",
      x: d.offsetInches - d.widthInches / 2,
      y: room.widthInches - d.widthInches,
      widthInches: d.widthInches,
      depthInches: d.widthInches,
      rotation: 0,
    };
    for (const p of plan.fixtures) {
      expect(boxesOverlap(p, doorZone)).toBe(false);
    }
  });

  it("assigns a wall-appropriate rotation (multiple of 90)", () => {
    const plan = generateLayout(comfortableRoom(), defaultFixtures);
    for (const p of plan.fixtures) {
      expect(p.rotation % 90).toBe(0);
    }
  });

  it("is deterministic for the same input", () => {
    const a = generateLayout(comfortableRoom(), defaultFixtures);
    const b = generateLayout(comfortableRoom(), defaultFixtures);
    expect(a).toEqual(b);
  });

  it("names the archetype it used", () => {
    const plan = generateLayout(comfortableRoom(), defaultFixtures);
    expect(typeof plan.archetype).toBe("string");
    expect(plan.archetype.length).toBeGreaterThan(0);
  });

  it("warns when the room is too small to fit the fixtures", () => {
    const tiny = comfortableRoom({ lengthInches: 48, widthInches: 36 });
    const plan = generateLayout(tiny, defaultFixtures);
    expect(plan.warnings.length).toBeGreaterThan(0);
    expect(plan.warnings.some((w) => w.severity === "error")).toBe(true);
  });

  it("has no error warnings for a comfortable room with just WC + vanity", () => {
    const plan = generateLayout(comfortableRoom(), [
      { type: "wc", placement: "back", variant: "floorMounted" },
      { type: "vanity", placement: "right", variant: "countertop" },
    ]);
    expect(plan.warnings.some((w) => w.severity === "error")).toBe(false);
  });

  it("warns about tight WC front clearance in a shallow room", () => {
    // width 40" leaves < 18" in front of a 28"-deep WC on the back wall
    const shallow = comfortableRoom({ widthInches: 40 });
    const plan = generateLayout(shallow, [
      { type: "wc", placement: "back", variant: "floorMounted" },
    ]);
    expect(plan.warnings.some((w) => w.fixture === "wc" && w.code === "front-clearance")).toBe(true);
  });
});
