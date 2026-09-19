import fs from "fs";
import path from "path";

export interface License {
  serial: string;
  hash?: string;
  device?: string;
  addedAt: string;
  creditsUsed: number;
  addedBy?: string;
}

export interface CreditsData {
  balance: number;
  totalAdded: number;
  totalUsed: number;
  history: { type: "add" | "deduct"; amount: number; reason: string; at: string }[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const LICENSES_FILE = path.join(DATA_DIR, "licenses.json");
const CREDITS_FILE = path.join(DATA_DIR, "credits.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(file: string, fallback: T): T {
  try {
    ensureDataDir();
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(file: string, data: T) {
  ensureDataDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

// Licenses
export function getLicenses(): License[] {
  return readJson<License[]>(LICENSES_FILE, []);
}

export function saveLicenses(list: License[]) {
  writeJson(LICENSES_FILE, list);
}

export function isSerialLicensed(serial: string, hash?: string): boolean {
  const list = getLicenses();
  const s = serial.trim().toUpperCase();
  const h = hash?.trim().toUpperCase();
  return list.some(
    (l) => l.serial.toUpperCase() === s || (h && l.hash?.toUpperCase() === h) || l.serial.toUpperCase() === h
  );
}

export function addLicense(lic: License): { ok: boolean; error?: string } {
  const list = getLicenses();
  const exists = list.some((l) => l.serial.toUpperCase() === lic.serial.toUpperCase());
  if (exists) return { ok: false, error: "السيريال مسجل مسبقاً" };
  list.push(lic);
  saveLicenses(list);
  return { ok: true };
}

export function removeLicense(serial: string): boolean {
  const list = getLicenses();
  const idx = list.findIndex((l) => l.serial.toUpperCase() === serial.toUpperCase());
  if (idx === -1) return false;
  list.splice(idx, 1);
  saveLicenses(list);
  return true;
}

// Credits
const DEFAULT_CREDITS: CreditsData = {
  balance: 100,
  totalAdded: 100,
  totalUsed: 0,
  history: [{ type: "add", amount: 100, reason: "رصيد إفتتاحي", at: new Date().toISOString() }],
};

export function getCredits(): CreditsData {
  return readJson<CreditsData>(CREDITS_FILE, DEFAULT_CREDITS);
}

export function saveCredits(data: CreditsData) {
  writeJson(CREDITS_FILE, data);
}

export function deductCredits(amount: number, reason: string): { ok: boolean; error?: string; data?: CreditsData } {
  const c = getCredits();
  if (c.balance < amount) return { ok: false, error: `رصيد غير كافي. المطلوب ${amount} كريدت، المتاح ${c.balance}` };
  c.balance -= amount;
  c.totalUsed += amount;
  c.history.push({ type: "deduct", amount, reason, at: new Date().toISOString() });
  saveCredits(c);
  return { ok: true, data: c };
}

export function addCredits(amount: number, reason: string): CreditsData {
  const c = getCredits();
  c.balance += amount;
  c.totalAdded += amount;
  c.history.push({ type: "add", amount, reason, at: new Date().toISOString() });
  saveCredits(c);
  return c;
}
