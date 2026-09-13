"use client";

import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/shell/WizardShell";
import { ProgressBar } from "@/components/shell/ProgressBar";
import { StepFooterCta } from "@/components/planner/StepFooterCta";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { useI18n } from "@/lib/i18n/provider";

export default function EstimateStepPage() {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <WizardShell
      subtitle="Step 5: Materials & Estimate"
      footer={
        <StepFooterCta
          label={t.s4CtaText}
          subLabel="Coming soon"
          onClick={() => {}}
          onBack={() => router.push("/planner/plan")}
          backLabel={t.backCta}
          disabled
        />
      }
    >
      <ProgressBar badge="Step 5 of 6 • Materials" step={5} total={6} icon="receipt_long" />
      <div style={{ padding: "48px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: "var(--color-primary-tint)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <MaterialIcon name="receipt_long" size={32} color="var(--color-primary-accent)" />
        </div>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)" }}>
          Step 5 — the estimate engine
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-on-surface-variant)", maxWidth: 300 }}>
          Bill of materials + ₹ cost + time estimate is the next milestone (M4).
        </p>
      </div>
    </WizardShell>
  );
}
