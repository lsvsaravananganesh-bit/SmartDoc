import type { Row } from "./types";

export function mergeTemplate(template: string, row: Row) {
  return template.replace(/{{\s*([^}]+?)\s*}}/g, (_, key: string) => row[key.trim()] ?? "");
}

export function extractFields(template: string) {
  return Array.from(template.matchAll(/{{\s*([^}]+?)\s*}}/g)).map((m) => m[1].trim()).filter((v, i, a) => a.indexOf(v) === i);
}
