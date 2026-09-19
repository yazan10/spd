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
const TMP_DATA_DIR = path.join("/tmp", "yaz-spd-data");
const LICENSES_FILE = path.join(DATA_DIR, "licenses.json");
const CREDITS_FILE = path.join(DATA_DIR, "credits.json");
const TMP_LICENSES_FILE = path.join(TMP_DATA_DIR, "licenses.json");
const TMP_CREDITS_FILE = path.join(TMP_DATA_DIR, "credits.json");

// In-memory fallback for Vercel (read-only fs)
let memLicenses: License[] | null = null;
let memCredits: CreditsData | null = null;
const IS_VERCEL = !!process.env.VERCEL;

function ensureDataDir(dir: string) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return true;
  } catch { return false; }
}

function readJson<T>(file: string, tmpFile: string, fallback: T, isCredit = false): T {
  // On Vercel, use memory + /tmp
  if (IS_VERCEL) {
    if (isCredit && memCredits) return memCredits as unknown as T;
    if (!isCredit && memLicenses) return memLicenses as unknown as T;
    // try tmp first
    try {
      if (fs.existsSync(tmpFile)) {
        const raw = fs.readFileSync(tmpFile, "utf-8");
        const parsed = JSON.parse(raw) as T;
        if (isCredit) memCredits = parsed as unknown as CreditsData;
        else memLicenses = parsed as unknown as License[];
        return parsed;
      }
    } catch {}
    // try reading original data dir (read-only, but read may succeed)
    try {
      if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, "utf-8");
        const parsed = JSON.parse(raw) as T;
        if (isCredit) memCredits = parsed as unknown as CreditsData;
        else memLicenses = parsed as unknown as License[];
        // also copy to tmp
        ensureDataDir(TMP_DATA_DIR);
        try { fs.writeFileSync(tmpFile, JSON.stringify(parsed, null, 2)); } catch {}
        return parsed;
      }
    } catch {}
    // fallback and init memory
    if (isCredit) memCredits = fallback as unknown as CreditsData;
    else memLicenses = fallback as unknown as License[];
    // try write to tmp
    ensureDataDir(TMP_DATA_DIR);
    try { fs.writeFileSync(tmpFile, JSON.stringify(fallback, null, 2)); } catch {}
    return fallback;
  }

  // Local dev: use DATA_DIR
  try {
    ensureDataDir(DATA_DIR);
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

function writeJson<T>(file: string, tmpFile: string, data: T, isCredit = false) {
  if (IS_VERCEL) {
    if (isCredit) memCredits = data as unknown as CreditsData;
    else memLicenses = data as unknown as License[];
    ensureDataDir(TMP_DATA_DIR);
    try { fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), "utf-8"); return; } catch {}
    // ignore error - memory is enough for ephemeral
    return;
  }
  try {
    ensureDataDir(DATA_DIR);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    // fallback to tmp
    ensureDataDir(TMP_DATA_DIR);
    try { fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2)); } catch {}
    if (isCredit) memCredits = data as unknown as CreditsData;
    else memLicenses = data as unknown as License[];
  }
}

// Licenses
export function getLicenses(): License[] {
  return readJson<License[]>(LICENSES_FILE, TMP_LICENSES_FILE, [], false);
}

export function saveLicenses(list: License[]) {
  writeJson(LICENSES_FILE, TMP_LICENSES_FILE, list, false);
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
  return readJson<CreditsData>(CREDITS_FILE, TMP_CREDITS_FILE, DEFAULT_CREDITS, true);
}

export function saveCredits(data: CreditsData) {
  writeJson(CREDITS_FILE, TMP_CREDITS_FILE, data, true);
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
