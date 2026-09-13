"use client";
import { ComingSoon } from "@/components/shell/ComingSoon";
import { useI18n } from "@/lib/i18n/provider";
export default function BathroomsPage() {
  const { t } = useI18n();
  return <ComingSoon title={t.navBathrooms} icon="bathtub" subtitle="Your saved bathroom projects will live here." />;
}
