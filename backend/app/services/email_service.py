import smtplib
from email.message import EmailMessage
from app.core.config import settings

def send_verification_email(to_email: str, token: str):
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        print("Warning: SMTP_USER or SMTP_PASSWORD not set. Skipping verification email.")
        return False
        
    verification_link = f"{settings.FRONTEND_URL}/verify-email.html?token={token}"
    
    msg = EmailMessage()
    msg['Subject'] = 'Verify your FitTrack CUET Email'
    msg['From'] = settings.SMTP_USER
    msg['To'] = to_email
    
    html_content = f"""
    <html>
      <body>
        <h2>Welcome to FitTrack CUET!</h2>
        <p>Please click the link below to verify your email address and activate your account:</p>
        <p><a href="{verification_link}" style="padding: 10px 15px; background-color: #ff3333; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
        <p>Alternatively, you can copy and paste this URL into your browser:</p>
        <p>{verification_link}</p>
        <p>This link will expire in 24 hours.</p>
      </body>
    </html>
    """
    
    msg.set_content("Please enable HTML to view this email.")
    msg.add_alternative(html_content, subtype='html')
    
    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Error sending email logic: {str(e)}")
        return False
