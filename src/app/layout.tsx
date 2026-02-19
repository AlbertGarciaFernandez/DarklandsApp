import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Darklands Backend",
    description: "API for Darklands Festival",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
