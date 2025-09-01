import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import PageTransition from "../components/page-transition";
import "./styles.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Invex",
  description: "An inventory management system",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/* Global theme toggle available on all pages */}
          <div className="fixed top-2.5 right-4 z-50">
            <ThemeToggle />
          </div>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
