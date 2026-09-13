"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/shell/WizardShell";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { StepCard } from "@/components/ui/StepCard";
import { useI18n } from "@/lib/i18n/provider";
import { useSession } from "@/lib/auth/use-session";
import { useProjectStore } from "@/lib/store/project-store";
import { getProjectStore } from "@/lib/db";
import { areaSqft, formatInr } from "@/lib/units";
import type { Project } from "@/lib/types";

export default function BathroomsPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { user, ready } = useSession();
  const hydrate = useProjectStore((s) => s.hydrate);
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    if (!ready || !user) return;
    getProjectStore()
      .list(user.id)
      .then((list) => setProjects(list.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))));
  }, [ready, user]);

  function open(p: Project) {
    hydrate(p);
    router.push("/planner/space");
  }

  return (
    <WizardShell subtitle={t.myProjectsTitle}>
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)" }}>
          {t.myProjectsTitle}
        </h1>

        {projects && projects.length > 0 ? (
          projects.map((p) => (
            <button
              key={p.id}
              onClick={() => open(p)}
              style={{
                textAlign: "left",
                background: "var(--color-surface-lowest)",
                border: "1px solid var(--color-card-border)",
                borderRadius: 16,
                padding: 14,
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--color-primary-tint)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MaterialIcon name="bathtub" size={22} color="var(--color-primary-accent)" />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: "var(--color-on-surface)" }}>{p.room.name}</span>
                <span style={{ fontSize: 11.5, color: "var(--color-on-surface-variant)" }}>
                  {areaSqft(p.room.lengthInches, p.room.widthInches)} sq.ft
                  {p.estimate ? ` · ${formatInr(p.estimate.totalCostInr)}` : ""}
                </span>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 12, fontWeight: 700, color: "var(--color-primary-accent)", flexShrink: 0 }}>
                {t.openProject}
                <MaterialIcon name="chevron_right" size={16} color="var(--color-primary-accent)" />
              </span>
            </button>
          ))
        ) : (
          <StepCard style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "var(--color-primary-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <MaterialIcon name="bathtub" size={28} color="var(--color-primary-accent)" />
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-on-surface-variant)", maxWidth: 260 }}>
              {projects === null ? "…" : t.myProjectsEmpty}
            </p>
            <button
              onClick={() => router.push("/planner/space")}
              style={{
                height: 44,
                padding: "0 20px",
                borderRadius: 12,
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {t.startPlanner}
            </button>
          </StepCard>
        )}
      </div>
    </WizardShell>
  );
}
