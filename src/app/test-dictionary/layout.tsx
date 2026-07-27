import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function TestDictionaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={jetbrainsMono.variable}>{children}</div>;
}
