/**
 * BathCraft domain model — the shared vocabulary for the whole app.
 * All physical measurements are stored in INCHES internally; unit display
 * (imperial/metric) is a presentation concern handled at the edges.
 */

export type Language = "en" | "hi";
export type Theme = "light" | "dark";
export type Unit = "imperial" | "metric";

/** The four walls of a rectangular room, from the plan's point of view. */
export type Wall = "back" | "front" | "left" | "right";

/** Placement targets a fixture can snap to. */
export type Placement = Wall | "nearEntry" | "underVanity" | "dryCorner" | "wallRecess";

export type RoomPreset = "master" | "guest" | "kids" | "powder";

export type FixtureType = "wc" | "vanity" | "shower" | "almirah";

export type ArchitectureStyle = "modern" | "traditional" | "minimal" | "luxury";

/** Cost tiers offered to the homeowner (Step 2). */
export type CostTier = "budget" | "costEffective" | "goodQuality" | "topOfLine";

/** A door or window on a given wall, positioned by its centre offset (inches)
 *  from that wall's starting corner, with an opening width. */
export interface Opening {
  wall: Wall;
  offsetInches: number;
  widthInches: number;
}

export interface Room {
  name: string;
  preset: RoomPreset | null;
  lengthInches: number;
  widthInches: number;
  heightInches: number;
  door: Opening;
  window: Opening | null;
}

/** A fixture the homeowner wants, plus their placement preference. */
export interface FixtureChoice {
  type: FixtureType;
  placement: Placement;
}

export interface StyleChoice {
  architecture: ArchitectureStyle;
  costTier: CostTier;
  budgetInr: number;
}

/** Output of the layout engine: a fixture positioned in room-inch coordinates.
 *  Origin (0,0) is the back-left corner; x runs along length, y along width. */
export interface PlacedFixture {
  type: FixtureType;
  x: number;
  y: number;
  widthInches: number;
  depthInches: number;
  /** rotation in degrees, clockwise */
  rotation: number;
}

export interface ClearanceWarning {
  fixture: FixtureType;
  code: string;
  message: string;
  severity: "warning" | "error";
}

export interface GeneratedPlan {
  fixtures: PlacedFixture[];
  warnings: ClearanceWarning[];
  archetype: string;
}

/** A single line in the bill of materials. */
export interface BomLine {
  key: string;
  label: string;
  quantity: number;
  unit: string;
  unitCostInr: number;
  totalInr: number;
}

export interface Estimate {
  bom: BomLine[];
  materialCostInr: number;
  labourCostInr: number;
  totalCostInr: number;
  timeDays: number;
}

export type ProjectRole = "owner" | "expert";

export interface ProjectMember {
  userId: string;
  role: ProjectRole;
}

export type ProjectStatus = "draft" | "planned" | "shared";

export interface Project {
  id: string;
  ownerId: string;
  members: ProjectMember[];
  status: ProjectStatus;
  room: Room;
  style: StyleChoice;
  fixtures: FixtureChoice[];
  plan: GeneratedPlan | null;
  estimate: Estimate | null;
  createdAt: string;
  updatedAt: string;
}
