import type { DocumentRecord, Row, Template } from "./types";

export const demoRows: Row[] = [
  { name: "Aarav Sharma", email: "aarav@example.com", company: "TechNova", role: "Frontend Intern", date: "14 Sep 2026" },
  { name: "Priya Reddy", email: "priya@example.com", company: "CloudWorks", role: "Data Intern", date: "14 Sep 2026" },
  { name: "Rahul Kumar", email: "rahul@example.com", company: "InnoLabs", role: "Embedded Intern", date: "14 Sep 2026" },
  { name: "Sneha Patel", email: "sneha@example.com", company: "NextGen", role: "AI Intern", date: "14 Sep 2026" },
];

export const defaultTemplate: Template = {
  id: "tpl-internship",
  name: "Internship Certificate",
  subject: "Your Internship Certificate",
  content: "Certificate of Internship\n\nThis is to certify that {{name}} has successfully completed an internship at {{company}} as a {{role}}.\n\nWe appreciate the contribution and wish them success in future endeavors.\n\nDate: {{date}}\n\nAuthorized by\nSmartDoc Organization",
  createdAt: "14 Sep 2026",
};

export const demoDocuments: DocumentRecord[] = demoRows.map((row, i) => ({
  id: `doc-${i + 1}`,
  recipient: row.name,
  email: row.email,
  template: defaultTemplate.name,
  status: "Generated",
  createdAt: "14 Sep 2026",
}));
