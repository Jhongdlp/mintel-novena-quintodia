import type { Metadata } from "next";
import "./globals.css";
import { clsx } from "clsx";

export const metadata: Metadata = {
  title: "Presentation Slides",
  description: "Animated slides presentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={clsx("antialiased min-h-screen bg-background text-foreground")} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
