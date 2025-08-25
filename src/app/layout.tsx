import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import PageTransition from "../component/page-transition";
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
    <html lang="en">
      <body className={`${leagueSpartan.variable} font-sans antialiased`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
