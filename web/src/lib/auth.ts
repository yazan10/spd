export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "yaz@#spd";
export const COST_PER_DEVICE = 4; // كريدت لكل جهاز
export const PRICE_PER_CREDIT = 1; // دولار لكل كريدت

export function isValidAdminPassword(pw: string) {
  return pw === ADMIN_PASSWORD;
}

export function getAuthFromHeaders(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  const xAdmin = req.headers.get("x-admin-password");
  if (xAdmin) return xAdmin;
  return null;
}
