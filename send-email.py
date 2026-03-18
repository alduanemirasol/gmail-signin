import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SENDER_EMAIL    = "your_email@gmail.com"       # Your Gmail address
SENDER_PASSWORD = "your_app_password_here"     # Gmail App Password (NOT your login password)
                                               # Generate at: https://myaccount.google.com/apppasswords
RECIPIENT_EMAIL = "recipient@example.com"      # Who receives the email
SUBJECT         = "Security alert – new sign-in on Windows"

# Path to the HTML file (adjust if needed)
HTML_FILE = os.path.join(os.path.dirname(__file__), "check-activity.html")

with open(HTML_FILE, "r", encoding="utf-8") as f:
    html_content = f.read()

msg = MIMEMultipart("alternative")
msg["Subject"] = SUBJECT
msg["From"]    = SENDER_EMAIL
msg["To"]      = RECIPIENT_EMAIL

# Plain-text fallback
plain_text = (
    "A new sign-in on Windows\n\n"
    "We noticed a new sign-in to your Google Account on a Windows device.\n"
    "If this was you, you don't need to do anything.\n"
    "If not, visit: https://myaccount.google.com/notifications\n"
)

msg.attach(MIMEText(plain_text, "plain"))
msg.attach(MIMEText(html_content, "html"))
try:
    print(f"Connecting to smtp.gmail.com:587 ...")
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECIPIENT_EMAIL, msg.as_string())
    print(f"✅  Email sent successfully to {RECIPIENT_EMAIL}")

except smtplib.SMTPAuthenticationError:
    print("❌  Authentication failed.")
    print("    Make sure you are using a Gmail App Password, not your account password.")
    print("    Generate one at: https://myaccount.google.com/apppasswords")

except smtplib.SMTPException as e:
    print(f"❌  SMTP error: {e}")

except FileNotFoundError:
    print(f"❌  HTML file not found: {HTML_FILE}")
    print("    Make sure 'google_signin_email.html' is in the same folder as this script.")