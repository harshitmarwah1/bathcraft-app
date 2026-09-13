"use client";

import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/shell/WizardShell";
import { ProgressBar } from "@/components/shell/ProgressBar";
import { StepFooterCta } from "@/components/planner/StepFooterCta";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useI18n } from "@/lib/i18n/provider";

export default function FixturesStepPage() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <WizardShell
      subtitle="Step 3: Fixtures & Placement"
      footer={
        <StepFooterCta
          label={t.s2CtaText}
          subLabel="Coming soon"
          onClick={() => {}}
          onBack={() => router.push("/planner/style")}
          backLabel={t.backCta}
          disabled
        />
      }
    >
      <ProgressBar badge="Step 3 of 6 • Fixtures" step={3} total={6} icon="grid_view" />
      <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: "var(--color-primary-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MaterialIcon name="construction" size={32} color="var(--color-primary-accent)" />
        </div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)" }}>
          Step 3 — coming next
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-on-surface-variant)", maxWidth: 280 }}>
          Fixtures &amp; Placement (deeper element choices) is the next milestone (M2).
        </p>
      </div>
    </WizardShell>
  );
}
