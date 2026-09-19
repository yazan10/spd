namespace iReverseCustomUI
{
    partial class Form_License
    {
        private System.ComponentModel.IContainer components = null;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        private void InitializeComponent()
        {
            this.panelTop = new System.Windows.Forms.Panel();
            this.lblTitle = new System.Windows.Forms.Label();
            this.lblSubtitle = new System.Windows.Forms.Label();
            this.panelBody = new System.Windows.Forms.Panel();
            this.lblBlocked = new System.Windows.Forms.Label();
            this.lblInfo = new System.Windows.Forms.Label();
            this.lblSerial = new System.Windows.Forms.Label();
            this.lblSerialValue = new System.Windows.Forms.Label();
            this.btnCopySerial = new System.Windows.Forms.Button();
            this.lblHash = new System.Windows.Forms.Label();
            this.lblHashValue = new System.Windows.Forms.Label();
            this.btnCopyHash = new System.Windows.Forms.Button();
            this.lblDistributor = new System.Windows.Forms.Label();
            this.linkTelegram = new System.Windows.Forms.LinkLabel();
            this.btnTelegram = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.panelTop.SuspendLayout();
            this.panelBody.SuspendLayout();
            this.SuspendLayout();
            // 
            // panelTop
            // 
            this.panelTop.BackColor = System.Drawing.Color.FromArgb(192, 0, 0);
            this.panelTop.Controls.Add(this.lblTitle);
            this.panelTop.Controls.Add(this.lblSubtitle);
            this.panelTop.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelTop.Location = new System.Drawing.Point(0, 0);
            this.panelTop.Name = "panelTop";
            this.panelTop.Size = new System.Drawing.Size(520, 70);
            this.panelTop.TabIndex = 0;
            // 
            // lblTitle
            // 
            this.lblTitle.AutoSize = true;
            this.lblTitle.Font = new System.Drawing.Font("Segoe UI", 14F, System.Drawing.FontStyle.Bold);
            this.lblTitle.ForeColor = System.Drawing.Color.White;
            this.lblTitle.Location = new System.Drawing.Point(12, 12);
            this.lblTitle.Name = "lblTitle";
            this.lblTitle.Size = new System.Drawing.Size(220, 25);
            this.lblTitle.TabIndex = 0;
            this.lblTitle.Text = "⛔ الجهاز غير مسجل";
            // 
            // lblSubtitle
            // 
            this.lblSubtitle.AutoSize = true;
            this.lblSubtitle.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.lblSubtitle.ForeColor = System.Drawing.Color.White;
            this.lblSubtitle.Location = new System.Drawing.Point(14, 42);
            this.lblSubtitle.Name = "lblSubtitle";
            this.lblSubtitle.Size = new System.Drawing.Size(285, 15);
            this.lblSubtitle.TabIndex = 1;
            this.lblSubtitle.Text = "yaz SPD - نظام الحماية | يرجى تسجيل السيريال عبر الموزع";
            // 
            // panelBody
            // 
            this.panelBody.BackColor = System.Drawing.Color.White;
            this.panelBody.Controls.Add(this.lblBlocked);
            this.panelBody.Controls.Add(this.lblInfo);
            this.panelBody.Controls.Add(this.lblSerial);
            this.panelBody.Controls.Add(this.lblSerialValue);
            this.panelBody.Controls.Add(this.btnCopySerial);
            this.panelBody.Controls.Add(this.lblHash);
            this.panelBody.Controls.Add(this.lblHashValue);
            this.panelBody.Controls.Add(this.btnCopyHash);
            this.panelBody.Controls.Add(this.lblDistributor);
            this.panelBody.Controls.Add(this.linkTelegram);
            this.panelBody.Controls.Add(this.btnTelegram);
            this.panelBody.Controls.Add(this.btnClose);
            this.panelBody.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelBody.Location = new System.Drawing.Point(0, 70);
            this.panelBody.Name = "panelBody";
            this.panelBody.Size = new System.Drawing.Size(520, 295);
            this.panelBody.TabIndex = 1;
            // 
            // lblBlocked
            // 
            this.lblBlocked.AutoSize = true;
            this.lblBlocked.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.lblBlocked.ForeColor = System.Drawing.Color.FromArgb(192, 0, 0);
            this.lblBlocked.Location = new System.Drawing.Point(17, 15);
            this.lblBlocked.Name = "lblBlocked";
            this.lblBlocked.Size = new System.Drawing.Size(312, 19);
            this.lblBlocked.TabIndex = 0;
            this.lblBlocked.Text = "الأداة لا تعمل - السيريال غير مسجل في السيرفر";
            // 
            // lblInfo
            // 
            this.lblInfo.Font = new System.Drawing.Font("Segoe UI", 8.5F);
            this.lblInfo.ForeColor = System.Drawing.Color.Gray;
            this.lblInfo.Location = new System.Drawing.Point(17, 40);
            this.lblInfo.Name = "lblInfo";
            this.lblInfo.Size = new System.Drawing.Size(485, 35);
            this.lblInfo.TabIndex = 1;
            this.lblInfo.Text = "تم قراءة سيريال جهازك بنجاح، لكنه غير موجود في قاعدة البيانات. يرجى إرسال السيريال أدناه إلى الموزع لتفعيل الأداة.";
            // 
            // lblSerial
            // 
            this.lblSerial.AutoSize = true;
            this.lblSerial.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold);
            this.lblSerial.Location = new System.Drawing.Point(17, 85);
            this.lblSerial.Name = "lblSerial";
            this.lblSerial.Size = new System.Drawing.Size(58, 15);
            this.lblSerial.TabIndex = 2;
            this.lblSerial.Text = "السيريال :";
            // 
            // lblSerialValue
            // 
            this.lblSerialValue.BackColor = System.Drawing.Color.FromArgb(240, 240, 240);
            this.lblSerialValue.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblSerialValue.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Bold);
            this.lblSerialValue.Location = new System.Drawing.Point(80, 82);
            this.lblSerialValue.Name = "lblSerialValue";
            this.lblSerialValue.Size = new System.Drawing.Size(310, 23);
            this.lblSerialValue.TabIndex = 3;
            this.lblSerialValue.Text = "UNKNOWN-SERIAL";
            this.lblSerialValue.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // btnCopySerial
            // 
            this.btnCopySerial.BackColor = System.Drawing.Color.White;
            this.btnCopySerial.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCopySerial.Font = new System.Drawing.Font("Segoe UI", 8F);
            this.btnCopySerial.Location = new System.Drawing.Point(396, 82);
            this.btnCopySerial.Name = "btnCopySerial";
            this.btnCopySerial.Size = new System.Drawing.Size(60, 23);
            this.btnCopySerial.TabIndex = 4;
            this.btnCopySerial.Text = "نسخ";
            this.btnCopySerial.UseVisualStyleBackColor = false;
            this.btnCopySerial.Click += new System.EventHandler(this.btnCopySerial_Click);
            // 
            // lblHash
            // 
            this.lblHash.AutoSize = true;
            this.lblHash.Font = new System.Drawing.Font("Segoe UI", 9F, System.Drawing.FontStyle.Bold);
            this.lblHash.Location = new System.Drawing.Point(17, 115);
            this.lblHash.Name = "lblHash";
            this.lblHash.Size = new System.Drawing.Size(51, 15);
            this.lblHash.TabIndex = 5;
            this.lblHash.Text = "الكود :";
            // 
            // lblHashValue
            // 
            this.lblHashValue.BackColor = System.Drawing.Color.FromArgb(240, 240, 240);
            this.lblHashValue.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lblHashValue.Font = new System.Drawing.Font("Consolas", 9F, System.Drawing.FontStyle.Bold);
            this.lblHashValue.Location = new System.Drawing.Point(80, 112);
            this.lblHashValue.Name = "lblHashValue";
            this.lblHashValue.Size = new System.Drawing.Size(310, 23);
            this.lblHashValue.TabIndex = 6;
            this.lblHashValue.Text = "HASH";
            this.lblHashValue.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // btnCopyHash
            // 
            this.btnCopyHash.BackColor = System.Drawing.Color.White;
            this.btnCopyHash.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnCopyHash.Font = new System.Drawing.Font("Segoe UI", 8F);
            this.btnCopyHash.Location = new System.Drawing.Point(396, 112);
            this.btnCopyHash.Name = "btnCopyHash";
            this.btnCopyHash.Size = new System.Drawing.Size(60, 23);
            this.btnCopyHash.TabIndex = 7;
            this.btnCopyHash.Text = "نسخ";
            this.btnCopyHash.UseVisualStyleBackColor = false;
            this.btnCopyHash.Click += new System.EventHandler(this.btnCopyHash_Click);
            // 
            // lblDistributor
            // 
            this.lblDistributor.AutoSize = true;
            this.lblDistributor.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.lblDistributor.ForeColor = System.Drawing.Color.FromArgb(0, 120, 215);
            this.lblDistributor.Location = new System.Drawing.Point(17, 155);
            this.lblDistributor.Name = "lblDistributor";
            this.lblDistributor.Size = new System.Drawing.Size(203, 19);
            this.lblDistributor.TabIndex = 8;
            this.lblDistributor.Text = "يرجى تسجيل السيريال عبر الموزع";
            // 
            // linkTelegram
            // 
            this.linkTelegram.AutoSize = true;
            this.linkTelegram.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.linkTelegram.LinkColor = System.Drawing.Color.FromArgb(0, 136, 204);
            this.linkTelegram.Location = new System.Drawing.Point(17, 180);
            this.linkTelegram.Name = "linkTelegram";
            this.linkTelegram.Size = new System.Drawing.Size(195, 19);
            this.linkTelegram.TabIndex = 9;
            this.linkTelegram.TabStop = true;
            this.linkTelegram.Text = "✈️ https://t.me/YAZsalaq";
            this.linkTelegram.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.linkTelegram_LinkClicked);
            // 
            // btnTelegram
            // 
            this.btnTelegram.BackColor = System.Drawing.Color.FromArgb(0, 136, 204);
            this.btnTelegram.FlatAppearance.BorderSize = 0;
            this.btnTelegram.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnTelegram.Font = new System.Drawing.Font("Segoe UI", 10F, System.Drawing.FontStyle.Bold);
            this.btnTelegram.ForeColor = System.Drawing.Color.White;
            this.btnTelegram.Location = new System.Drawing.Point(17, 215);
            this.btnTelegram.Name = "btnTelegram";
            this.btnTelegram.Size = new System.Drawing.Size(360, 35);
            this.btnTelegram.TabIndex = 10;
            this.btnTelegram.Text = "✈️ تواصل عبر تيليجرام - @YAZsalaq";
            this.btnTelegram.UseVisualStyleBackColor = false;
            this.btnTelegram.Click += new System.EventHandler(this.btnTelegram_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.Gray;
            this.btnClose.FlatAppearance.BorderSize = 0;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btnClose.Font = new System.Drawing.Font("Segoe UI", 9F);
            this.btnClose.ForeColor = System.Drawing.Color.White;
            this.btnClose.Location = new System.Drawing.Point(390, 215);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(110, 35);
            this.btnClose.TabIndex = 11;
            this.btnClose.Text = "إغلاق";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // Form_License
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.White;
            this.ClientSize = new System.Drawing.Size(520, 365);
            this.Controls.Add(this.panelBody);
            this.Controls.Add(this.panelTop);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "Form_License";
            this.ShowInTaskbar = false;
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "yaz SPD - التفعيل مطلوب";
            this.TopMost = true;
            this.panelTop.ResumeLayout(false);
            this.panelTop.PerformLayout();
            this.panelBody.ResumeLayout(false);
            this.panelBody.PerformLayout();
            this.ResumeLayout(false);
        }

        #endregion

        private System.Windows.Forms.Panel panelTop;
        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Label lblSubtitle;
        private System.Windows.Forms.Panel panelBody;
        private System.Windows.Forms.Label lblBlocked;
        private System.Windows.Forms.Label lblInfo;
        private System.Windows.Forms.Label lblSerial;
        private System.Windows.Forms.Label lblSerialValue;
        private System.Windows.Forms.Button btnCopySerial;
        private System.Windows.Forms.Label lblHash;
        private System.Windows.Forms.Label lblHashValue;
        private System.Windows.Forms.Button btnCopyHash;
        private System.Windows.Forms.Label lblDistributor;
        private System.Windows.Forms.LinkLabel linkTelegram;
        private System.Windows.Forms.Button btnTelegram;
        private System.Windows.Forms.Button btnClose;
    }
}
