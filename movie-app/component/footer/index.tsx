import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black/95 text-gray-400 md:p-20 mt-auto">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
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
            <p className="text-sm">
              Your ultimate destination for movies and TV shows.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies" className="hover:text-white transition">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="hover:text-white transition">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link href="/upcoming" className="hover:text-white transition">
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} DelyteTech. All rights reserved.
          </p>
          <p className="mt-2">Powered by TMDB</p>
        </div>
      </div>
    </footer>
  );
}
