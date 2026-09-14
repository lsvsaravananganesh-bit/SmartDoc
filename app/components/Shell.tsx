"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  ["Dashboard", "/"], ["Upload Data", "/upload"], ["Templates", "/templates"],
  ["Documents", "/documents"], ["Email Campaigns", "/campaigns"], ["History", "/history"],
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="app">
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">Smart<span>Doc</span><button className="mobileMenu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">☰</button></div>
      <nav className="nav">{nav.map(([label, href]) => <a className={pathname === href ? "active" : ""} key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
      <div className="sideBottom">Automation workspace<br/>v0.2 production foundation</div>
    </aside>
    <main className="main">{children}</main>
  </div>;
}
