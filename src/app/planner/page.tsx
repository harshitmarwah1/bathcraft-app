"use client";

import { useEffect } from "react";
import { WizardShell } from "@/components/shell/WizardShell";
import { ProgressBar } from "@/components/shell/ProgressBar";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useSession } from "@/lib/auth/use-session";
import { useProjectStore } from "@/lib/store/project-store";
import { useI18n } from "@/lib/i18n/provider";

export default function PlannerPage() {
  const { user, ready } = useSession();
  const { t } = useI18n();
  const project = useProjectStore((s) => s.project);
  const loadOrCreate = useProjectStore((s) => s.loadOrCreate);

  useEffect(() => {
    if (ready && user && !project) void loadOrCreate(user.id);
  }, [ready, user, project, loadOrCreate]);

  return (
    <WizardShell subtitle={t.appSub}>
      <ProgressBar badge={t.stepBadge} step={1} total={6} />
      <div style={{ padding: "0 16px" }}>
        <section
          style={{
            background: "var(--color-surface-lowest)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid var(--color-card-border)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "var(--color-primary-tint)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcon name="architecture" size={30} color="var(--color-primary-accent)" />
          </div>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)" }}>
            {project ? project.room.name : "Let's design your bathroom"}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: "var(--color-on-surface-variant)",
              maxWidth: 300,
            }}
          >
            {project
              ? "Your project is ready. The Step 1 planner is being wired up next."
              : "Setting up your workspace…"}
          </p>
        </section>
      </div>
    </WizardShell>
  );
}
