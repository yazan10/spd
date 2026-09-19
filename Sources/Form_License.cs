using System;
using System.Diagnostics;
using System.Drawing;
using System.Windows.Forms;
using iReverse_UniSPD_FRP.My;

namespace iReverseCustomUI
{
    public partial class Form_License : Form
    {
        public Form_License()
        {
            InitializeComponent();
        }

        public static void ShowLicenseBlocked(string serial)
        {
            var frm = new Form_License();
            frm.lblSerialValue.Text = serial;
            frm.lblHashValue.Text = MyLicense.GetHashedSerial();
            frm.ShowDialog();
        }

        private void btnCopySerial_Click(object sender, EventArgs e)
        {
            try
            {
                Clipboard.SetText(lblSerialValue.Text);
                MessageBox.Show("تم نسخ السيريال: " + lblSerialValue.Text, "yaz SPD", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch { }
        }

        private void btnCopyHash_Click(object sender, EventArgs e)
        {
            try
            {
                Clipboard.SetText(lblHashValue.Text);
                MessageBox.Show("تم نسخ الهاش: " + lblHashValue.Text, "yaz SPD", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch { }
        }

        private void btnTelegram_Click(object sender, EventArgs e)
        {
            try { Process.Start(MyLicense.TelegramUrl); } catch { }
            try { Process.Start(new ProcessStartInfo(MyLicense.TelegramUrl) { UseShellExecute = true }); } catch { }
        }

        private void linkTelegram_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            try { Process.Start(MyLicense.TelegramUrl); } catch { }
            try { Process.Start(new ProcessStartInfo(MyLicense.TelegramUrl) { UseShellExecute = true }); } catch { }
        }

        private void btnClose_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
