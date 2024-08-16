// SidebarComponents.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useSidebar } from "./SidebarComponents";
import { cn } from "@/lib/utils"; // Adjust the import path as needed

export const Sidebar = ({ children }) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      <motion.div
        className="hidden md:flex flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] flex-shrink-0"
        animate={{ width: open ? "300px" : "60px" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </motion.div>
      <div className="flex md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full">
        <IconMenu2 className="text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(!open)} />
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col"
            >
              <IconX className="absolute right-10 top-10 text-neutral-800 dark:text-neutral-200" onClick={() => setOpen(false)} />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({ link }) => {
  const { open } = useSidebar();

  return (
    <Link href={link.href} className="flex items-center gap-2 py-2">
      {link.icon}
      <motion.span
        animate={{ display: open ? "inline-block" : "none", opacity: open ? 1 : 0 }}
        className="text-neutral-700 dark:text-neutral-200 text-sm transition duration-150"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
