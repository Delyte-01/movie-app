import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/component/navigation";
import { MobileNavigation } from "@/component/navigation/mobile-navigation";
import { MovieProvider } from "@/hooks/use-context";
import { Footer } from "@/component/footer";

export const metadata: Metadata = {
  title: "CineMax ",
  description:
    " Discover, Watch, and Enjoy Movies and TV Shows with CineMax - Your Ultimate Movie Companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MovieProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pb-16 md:pb-0">{children}</main>
            <MobileNavigation />
          </div>
          <Footer />
        </MovieProvider>
      </body>
    </html>
  );
}
