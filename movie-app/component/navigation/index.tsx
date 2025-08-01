"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, Search, User, Film } from "lucide-react";
import Image from "next/image";
import SearchBar from "../search-bar";
import { UserDropdown } from "../user-dropdown";


export function Navigation() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/discover/tv", label: "Tv Series" },
    { href: "/discover/movie", label: "Movies" },
  ];

  return (
    <nav className="sticky px-3 md:px-10 lg:px-16 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Film className="h-8 w-8 text-primary" /> */}
          <Image
            src="https://res.cloudinary.com/dk5mfu099/image/upload/v1752484058/Tv_icon_logo_design_vector_image_on_VectorStock_kfhdp4.jpg"
            alt="CineMax Logo"
            width={50}
            height={40}
            className="rounded-lg object-cover h-8 w-8"
          />

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
                <SearchBar />
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

          <Link href="/search-page" className="md:hidden">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* user */}

          <Link href="/">
            <Button variant="ghost" size="icon">
              <UserDropdown />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
