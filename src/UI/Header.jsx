// src/components/Header.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Utility for conditional classNames if you're using shadcn setup
import Logo from "./Logo";

const navItems = [
  { name: "Feed", path: "feed" },
  { name: "Dashboard", path: "dashboard" },
];

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-border shadow-sm"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-1 flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <nav className="flex gap-6 text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "hover:text-primary underline transition-colors",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
