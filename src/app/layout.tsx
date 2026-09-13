import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers";
import { themeInitScript } from "@/lib/theme/provider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BathCraft — Plan your bathroom",
  description:
    "Design, visualise and estimate your bathroom renovation. Turn inch-tape measurements into a scaled 2D plan plus a material and cost estimate you and your contractor agree on.",
  manifest: "/manifest.webmanifest",
  applicationName: "BathCraft",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BathCraft",
  },
};

export const viewport: Viewport = {
  themeColor: "#006194",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        {/* Set the theme before hydration to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Material Symbols Outlined — icon font used throughout the app. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
