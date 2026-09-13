"use client";

import { useRouter } from "next/navigation";
import { WizardShell } from "@/components/shell/WizardShell";
import { ProgressBar } from "@/components/shell/ProgressBar";
import { StepFooterCta } from "@/components/planner/StepFooterCta";
import { NameSection } from "@/components/planner/NameSection";
import { DimensionsSection } from "@/components/planner/DimensionsSection";
import { DoorWindowSection } from "@/components/planner/DoorWindowSection";
import { FixturesSection } from "@/components/planner/FixturesSection";
import { FootprintPreview } from "@/components/planner/FootprintPreview";
import { useI18n } from "@/lib/i18n/provider";
import { useEnsureProject } from "@/lib/store/use-ensure-project";

export default function SpaceStepPage() {
  const { t } = useI18n();
  const router = useRouter();
  const { ready } = useEnsureProject();

  return (
    <WizardShell
      subtitle={t.appSub}
      footer={
        <StepFooterCta
          label={t.s1CtaText}
          subLabel={t.s1CtaSub}
          onClick={() => router.push("/planner/style")}
          disabled={!ready}
        />
      }
    >
      <ProgressBar badge={t.stepBadge} step={1} total={6} />
      {ready ? (
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 16 }}>
          <NameSection />
          <DimensionsSection />
          <DoorWindowSection />
          <FixturesSection />
          <FootprintPreview />
        </div>
      ) : (
        <div style={{ padding: "40px 16px", textAlign: "center", color: "var(--color-on-surface-variant)", fontSize: 13 }}>
          Loading…
        </div>
      )}
    </WizardShell>
  );
}
