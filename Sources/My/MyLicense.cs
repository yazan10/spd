using System;
using System.Management;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Newtonsoft.Json;

namespace iReverse_UniSPD_FRP.My
{
    internal static class MyLicense
    {
        // يتم تغيير هذا الرابط بعد نشر موقع Vercel - ضع رابط مشروع اليوزر هنا
        public static string ApiBase = "https://yaz-spd.vercel.app";
        public static string CheckEndpoint = "/api/check-serial";
        public static string TelegramUrl = "https://t.me/YAZsalaq";

        private static string _cachedSerial = null;

        public static string GetMachineSerial()
        {
            if (!string.IsNullOrEmpty(_cachedSerial))
                return _cachedSerial;

            string serial = "";
            try
            {
                // المحاولة 1: BIOS Serial
                serial = QueryWmi("Win32_BIOS", "SerialNumber");
                if (string.IsNullOrWhiteSpace(serial) || serial.ToLower().Contains("default") || serial == "0")
                    serial = QueryWmi("Win32_BaseBoard", "SerialNumber");
                if (string.IsNullOrWhiteSpace(serial) || serial.ToLower().Contains("default") || serial == "0")
                    serial = QueryWmi("Win32_Processor", "ProcessorId");
                if (string.IsNullOrWhiteSpace(serial) || serial.ToLower().Contains("default") || serial == "0")
                    serial = QueryWmi("Win32_DiskDrive", "SerialNumber");
                
                serial = serial.Trim().Replace(" ", "").ToUpper();
                
                if (string.IsNullOrWhiteSpace(serial))
                    serial = Environment.MachineName.ToUpper() + "_" + Environment.UserName.ToUpper();

                // تشفير خفيف لتثبيت الطول (اختياري - نحتفظ بالأصلي للعرض)
                _cachedSerial = serial;
            }
            catch
            {
                serial = Environment.MachineName.ToUpper();
                _cachedSerial = serial;
            }
            return _cachedSerial;
        }

        private static string QueryWmi(string wmiClass, string property)
        {
            try
            {
                using (var searcher = new ManagementObjectSearcher($"SELECT {property} FROM {wmiClass}"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        var val = obj[property]?.ToString();
                        if (!string.IsNullOrWhiteSpace(val))
                            return val;
                    }
                }
            }
            catch { }
            return "";
        }

        public static string GetHashedSerial()
        {
            string serial = GetMachineSerial();
            using (SHA256 sha = SHA256.Create())
            {
                byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(serial));
                return BitConverter.ToString(hash).Replace("-", "").Substring(0, 16).ToUpper();
            }
        }

        // سيريال الهاتف المقروء عبر BSL (Chip UID) - هو المطلوب حسب طلب المستخدم
        public static string GetPhoneSerial()
        {
            try { return iReverse_UniSPD_FRP.UniSPD.uni.PhoneSerial?.Trim().ToUpper() ?? ""; } catch { return ""; }
        }

        public static string GetPhoneHashedSerial()
        {
            string serial = GetPhoneSerial();
            if (string.IsNullOrEmpty(serial)) serial = GetMachineSerial();
            using (SHA256 sha = SHA256.Create())
            {
                byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(serial));
                return BitConverter.ToString(hash).Replace("-", "").Substring(0, 16).ToUpper();
            }
        }

        public static async Task<bool> IsLicensedAsync()
        {
            string serial = GetMachineSerial();
            string hashed = GetHashedSerial();
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(8);
                    var payload = new { serial = serial, hash = hashed };
                    string json = JsonConvert.SerializeObject(payload);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    string url = ApiBase.TrimEnd('/') + CheckEndpoint;
                    var response = await client.PostAsync(url, content);
                    if (!response.IsSuccessStatusCode)
                        return false;
                    string respStr = await response.Content.ReadAsStringAsync();
                    var obj = JsonConvert.DeserializeObject<dynamic>(respStr);
                    // API يرجع { valid: true/false }
                    if (obj.valid == true)
                        return true;
                    if (obj.isLicensed == true)
                        return true;
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("License check failed: " + ex.Message);
                // في حال فشل الاتصال بالسيرفر - نعتبر غير مرخص لمنع التجاوز، لكن يمكن تغيير السلوك
                return false;
            }
        }

        // للتوافق مع نسخة GET
        public static async Task<bool> IsLicensedGetAsync()
        {
            string serial = GetMachineSerial();
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(8);
                    string url = ApiBase.TrimEnd('/') + CheckEndpoint + "?serial=" + Uri.EscapeDataString(serial) + "&hash=" + Uri.EscapeDataString(GetHashedSerial());
                    var response = await client.GetAsync(url);
                    if (!response.IsSuccessStatusCode) return false;
                    string respStr = await response.Content.ReadAsStringAsync();
                    var obj = JsonConvert.DeserializeObject<dynamic>(respStr);
                    if (obj.valid == true) return true;
                    return false;
                }
            }
            catch { return false; }
        }

        // فحص ترخيص سيريال الهاتف (المطلوب حالياً) - يتحقق من سيريال الهاتف المقروء عبر BSL
        public static async Task<bool> IsPhoneLicensedAsync(string phoneSerial = null)
        {
            string serial = phoneSerial ?? GetPhoneSerial();
            if (string.IsNullOrEmpty(serial)) serial = GetMachineSerial(); // fallback للاختبار بدون جهاز
            string hashed = GetPhoneHashedSerial();
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(8);
                    var payload = new { serial = serial, hash = hashed };
                    string json = JsonConvert.SerializeObject(payload);
                    var content = new StringContent(json, Encoding.UTF8, "application/json");
                    string url = ApiBase.TrimEnd('/') + CheckEndpoint;
                    var response = await client.PostAsync(url, content);
                    if (!response.IsSuccessStatusCode) return false;
                    string respStr = await response.Content.ReadAsStringAsync();
                    var obj = JsonConvert.DeserializeObject<dynamic>(respStr);
                    if (obj.valid == true) return true;
                    if (obj.isLicensed == true) return true;
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Phone License check failed: " + ex.Message);
                return false;
            }
        }

        public static async Task<bool> IsPhoneLicensedGetAsync(string phoneSerial = null)
        {
            string serial = phoneSerial ?? GetPhoneSerial();
            if (string.IsNullOrEmpty(serial)) serial = GetMachineSerial();
            try
            {
                using (var client = new HttpClient())
                {
                    client.Timeout = TimeSpan.FromSeconds(8);
                    string url = ApiBase.TrimEnd('/') + CheckEndpoint + "?serial=" + Uri.EscapeDataString(serial) + "&hash=" + Uri.EscapeDataString(GetPhoneHashedSerial());
                    var response = await client.GetAsync(url);
                    if (!response.IsSuccessStatusCode) return false;
                    string respStr = await response.Content.ReadAsStringAsync();
                    var obj = JsonConvert.DeserializeObject<dynamic>(respStr);
                    if (obj.valid == true) return true;
                    return false;
                }
            }
            catch { return false; }
        }
    }
}
