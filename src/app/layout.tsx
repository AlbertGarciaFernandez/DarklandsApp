import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/web/AppProviders";

const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Darklands Festival",
    description: "Official Darklands Festival Schedule and Backend",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${oswald.variable} ${inter.variable} antialiased font-inter`}>
                <AppProviders>
                    {children}
                </AppProviders>
            </body>
        </html>
    );
}
