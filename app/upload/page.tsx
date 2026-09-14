"use client";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import Shell from "../components/Shell";
import type { Row } from "@/lib/types";

function parseCsv(text: string): Row[] {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = lines[0].split(",").map((x) => x.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((x) => x.trim().replace(/^"|"$/g, ""));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

async function parseSpreadsheet(file: File): Promise<Row[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!firstSheet) return [];
  return XLSX.utils.sheet_to_json<Row>(firstSheet, { defval: "" });
}

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const columns = useMemo(() => Object.keys(rows[0] ?? {}), [rows]);

  async function handleFile(next: File | null) {
    setFile(next); setError(""); setRows([]);
    if (!next) return;
    if (next.size > 10 * 1024 * 1024) return setError("File is larger than the 10 MB starter limit.");
    setLoading(true);
    try {
      const lower = next.name.toLowerCase();
      const parsed = lower.endsWith(".csv") ? parseCsv(await next.text()) : await parseSpreadsheet(next);
      if (!parsed.length) throw new Error("No data rows were found in the first sheet.");
      setRows(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read this spreadsheet.");
    } finally {
      setLoading(false);
    }
  }

  return <Shell><div className="top"><div><div className="eyebrow">Step 1 of 4</div><h1 className="title">Upload data</h1><div className="muted">Upload a CSV or Excel spreadsheet, preview the records, then personalize every document.</div></div></div>
    <section className="card"><div className="drop"><h2>{file ? file.name : "Drop your spreadsheet here"}</h2><p className="muted">Supported: .csv, .xlsx, .xls · Maximum 10 MB</p><input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => handleFile(e.target.files?.[0] || null)} />{loading && <p className="muted">Reading spreadsheet…</p>}{error && <p className="error">{error}</p>}</div>
      {rows.length > 0 && <div className="preview"><div className="previewHeader"><b>{rows.length} rows detected</b><span className="badge">Validated</span></div><div className="tableWrap"><table className="table"><thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.slice(0, 8).map((row, i) => <tr key={i}>{columns.map(c => <td key={c}>{String(row[c] ?? "")}</td>)}</tr>)}</tbody></table></div></div>}
      <div className="actions" style={{marginTop:18}}><a className="btn secondary" href="/">Cancel</a><a className="btn primary" href="/templates">Continue to templates →</a></div>
    </section>
    <div className="layout2"><section className="card"><h3 className="sectionTitle">Validation</h3><p className="muted">SmartDoc checks required fields, blank recipients, duplicate emails and malformed addresses before a campaign is sent.</p></section><section className="card"><h3 className="sectionTitle">Recommended columns</h3><p><span className="badge">name</span> <span className="badge">email</span> <span className="badge">company</span> <span className="badge">role</span></p></section></div>
  </Shell>;
}
