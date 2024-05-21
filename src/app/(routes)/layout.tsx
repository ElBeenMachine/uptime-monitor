import type { Metadata } from "next";

import "./globals.css";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Uptime Monitor",
    description: "This is my uptime monitor",
};

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en-gb">
            <body>{children}</body>
        </html>
    );
}
