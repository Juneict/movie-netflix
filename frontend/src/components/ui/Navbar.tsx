"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "home" },
    { href: "/", label: "tv" },
    { href: "/", label: "movies" },
    { href: "/", label: "new&Popular" },
    { href: "/", label: "myList" }
  ];

  return (
    <nav
      className={`fixed w-full z-50 py-4 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-t from-transparent to-black/80'
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <svg className="w-20 h-6" viewBox="0 0 1024 276.742">
              <path
                d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
                fill="#d81f26"
              />
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-5">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className="hover:text-gray-200 transition"
              >
                {t(link.label)}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <button className="hover:text-gray-300 transition">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-gray-300 transition">
            <Bell className="w-5 h-5" />
          </button>
          {/* <LanguageSwitcher /> */}
          <div className="relative group">
            <button className="flex items-center gap-2 hover:text-gray-300 transition">
              <Image 
                src="/Netflix-avatar.png" 
                alt="Profile" 
                width={28} 
                height={28}
                className="rounded"
              />
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden block hover:text-gray-300 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-black bg-opacity-95 flex flex-col gap-5 p-8 text-white animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-lg hover:text-gray-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t(link.label)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}