"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/provider";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

const ITEMS = [
  { key: "navBathrooms", icon: "bathtub", href: "/bathrooms" },
  { key: "navPlanner", icon: "architecture", href: "/planner" },
  { key: "navGuides", icon: "menu_book", href: "/guides" },
  { key: "navDocs", icon: "folder_shared", href: "/docs" },
] as const;

export function BottomNav() {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <nav
      style={{
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        height: 64,
        alignItems: "center",
        background: "var(--color-surface-lowest)",
        borderTop: "1px solid var(--color-surface-high)",
        padding: "0 4px",
      }}
    >
      {ITEMS.map((item) => {
        const active = pathname.startsWith(item.href);
        const color = active ? "var(--color-primary-accent)" : "var(--color-on-surface-variant)";
        return (
          <Link
            key={item.key}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              color,
              fontWeight: active ? 700 : 600,
              textDecoration: "none",
            }}
          >
            <MaterialIcon name={item.icon} size={22} color={color} />
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 600 }}>{t[item.key]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
