"use client";
import { ComingSoon } from "@/components/shell/ComingSoon";
import { useI18n } from "@/lib/i18n/provider";
export default function DocsPage() {
  const { t } = useI18n();
  return <ComingSoon title={t.navDocs} icon="folder_shared" subtitle="Your project briefs and shared documents — coming soon." />;
}
