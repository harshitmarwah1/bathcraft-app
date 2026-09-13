"use client";

import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/shell/WizardShell";
import { ProgressBar } from "@/components/shell/ProgressBar";
import { StepFooterCta } from "@/components/planner/StepFooterCta";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useI18n } from "@/lib/i18n/provider";

export default function PlanStepPage() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <WizardShell
      subtitle="Step 4: Generate 2D Plan"
      footer={
        <StepFooterCta
          label={t.s3CtaText}
          subLabel="Coming soon"
          onClick={() => {}}
          onBack={() => router.push("/planner/fixtures")}
          backLabel={t.backCta}
          disabled
        />
      }
    >
      <ProgressBar badge="Step 4 of 6 • 2D Plan" step={4} total={6} icon="draw" />
      <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: "var(--color-primary-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MaterialIcon name="architecture" size={32} color="var(--color-primary-accent)" />
        </div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)" }}>
          Step 4 — the layout engine
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-on-surface-variant)", maxWidth: 300 }}>
          The rule-based 2D layout engine + generated floor plan is the next milestone (M3).
        </p>
      </div>
    </WizardShell>
  );
}
