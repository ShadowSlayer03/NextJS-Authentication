import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const varela = Varela_Round({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextAuth | Authentication made ez with Next JS",
  description:
    "An application to get in touch with client and server side rendering and authentication with Next JS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={varela.className}>
        <Providers>
          <main className="dark text-foreground bg-background">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
