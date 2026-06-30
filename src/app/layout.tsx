import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Tanima Garg | Data Analyst & BI Specialist | Ottawa",
  description:
    "Portfolio of Tanima Garg — Data Analyst with 2+ years building SQL/Python reporting pipelines, Power BI & Tableau dashboards, and KPI frameworks. MEng ECE, University of Ottawa. Open to relocation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${kanit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
