import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kanban-app0.vercel.app/"),

  title: {
    default: "TaskFlow | Modern Kanban Board",
    template: "%s | TaskFlow",
  },

  description:
    "TaskFlow is a modern Kanban board for organizing tasks, managing projects, and boosting productivity. Developed by Ahmed Talaat.",

  keywords: [
    "Kanban",
    "Task Management",
    "Project Management",
    "Productivity",
    "TaskFlow",
    "React",
    "Next.js",
    "TypeScript",
    "Ahmed Talaat",
  ],

  authors: [
    {
      name: "Ahmed Talaat",
    },
  ],

  creator: "Ahmed Talaat",
  publisher: "Ahmed Talaat",

  applicationName: "TaskFlow",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "TaskFlow | Modern Kanban Board",
    description:
      "Organize your work efficiently with TaskFlow, a modern Kanban board built with Next.js and TypeScript by Ahmed Talaat.",
    url: "https://kanban-app0.vercel.app/",
    siteName: "TaskFlow",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://kanban-app0.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow - Modern Kanban Board",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TaskFlow | Modern Kanban Board",
    description:
      "A clean and responsive Kanban board for task management. Developed by Ahmed Talaat.",
    images: ["https://kanban-app0.vercel.app/og-image.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  category: "Productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
