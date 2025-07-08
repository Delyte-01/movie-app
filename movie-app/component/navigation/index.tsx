"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Search, User, Film } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navigation() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/discover", label: "Discover" },
    { href: "/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="sticky px-3 md:px-10 lg:px-16 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Film className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            CineMax
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block">
            {isSearchOpen ? (
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search movies..."
                  className="w-64"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Link href="/search" className="md:hidden">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* <ThemeToggle /> */}

          <Link href="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
