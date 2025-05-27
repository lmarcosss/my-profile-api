export function parseCorsOrigin(origin?: string) {
  if (!origin) {
    return [];
  }

  return origin.split(",").map((o) => o.trim());
}
