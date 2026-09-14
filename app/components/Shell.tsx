"use client";
import { useState } from "react";

const nav=[['Dashboard','/'],['Upload Data','/upload'],['Templates','/templates'],['Documents','/documents'],['Email Campaigns','/campaigns'],['History','/history']];

export default function Shell({children}:{children:React.ReactNode}){
 const [open,setOpen]=useState(false);
 return <div className="app"><aside className="sidebar"><div className="brand">Smart<span>Doc</span></div><nav className="nav">{nav.map(([label,href],i)=><a className={i===0?'active':''} key={href} href={href}>{label}</a>)}</nav><div className="sideBottom">Automation workspace<br/>v0.1 starter</div></aside><main className="main">{children}</main></div>
}
