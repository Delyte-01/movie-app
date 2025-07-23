import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/component/navigation";
import { MobileNavigation } from "@/component/navigation/mobile-navigation";
import { MovieProvider } from "@/hooks/use-context";
import { Footer } from "@/component/footer";
import SmoothScroll from "@/component/lenis-smooth-scroll";

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
        <SmoothScroll>
          <MovieProvider>
            <div className="min-h-screen w-full bg-[#fefcff] relative">
              <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
              />

              <Navigation />
              <main className="pb-16 md:pb-0 ">{children}</main>
              <MobileNavigation />
            </div>
            <Footer />
          </MovieProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
