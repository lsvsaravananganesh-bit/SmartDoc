"use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignIn() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMessage(error.message);
    window.location.href = "/";
  }

  return <main style={{minHeight:"100vh",display:"grid",placeItems:"center",padding:24}}><form onSubmit={submit} className="card" style={{width:"100%",maxWidth:420}}><div className="brand" style={{padding:"0 0 20px",color:"#111827"}}>Smart<span>Doc</span></div><h1 className="title">Welcome back</h1><p className="muted">Sign in to manage your automations.</p><label className="label">Email</label><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} /><label className="label">Password</label><input className="input" type="password" required value={password} onChange={e=>setPassword(e.target.value)} />{message&&<p className="error">{message}</p>}<button className="btn primary" disabled={loading} style={{width:"100%"}}>{loading?"Signing in…":"Sign in"}</button><p className="muted" style={{fontSize:12,marginTop:16}}>Supabase Auth handles the session securely.</p></form></main>;
}
