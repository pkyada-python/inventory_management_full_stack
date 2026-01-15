import os
import requests
from app.core.config import settings

# Note: To use this service, you need a WhatsApp API provider like Twilio, Meta Cloud API, or UltraMsg.
# For demonstration, we'll use a placeholder logic.


def send_whatsapp_message(to_number: str, message: str):
    """
    Sends a WhatsApp message to a specific number.
    Uses UltraMsg API if credentials are provided in .env,
    otherwise logs the message to the console.
    """
    token = settings.ULTRAMSG_TOKEN
    instance_id = settings.ULTRAMSG_INSTANCE_ID

    if token and instance_id:
        url = f"https://api.ultramsg.com/{instance_id}/messages/chat"
        payload = {"token": token, "to": to_number, "body": message}
        headers = {"content-type": "application/x-www-form-urlencoded"}
        try:
            response = requests.request("POST", url, data=payload, headers=headers)
            print(f"WhatsApp API Response: {response.json()}")
            return response.json()
        except Exception as e:
            print(f"WhatsApp API Error: {e}")
            return None
    else:
        print(f"--- WHATSAPP NOTIFICATION (MOCK) ---")
        print(f"TO: {to_number}")
        print(f"MESSAGE: {message}")
        print(f"------------------------------------")
        print(
            "Tip: Add ULTRAMSG_TOKEN and ULTRAMSG_INSTANCE_ID to .env for real sending."
        )
        return None


def notify_inquiry_via_whatsapp(data: dict):
    admin_number = settings.ADMIN_WHATSAPP_NUMBER  # Default or from .env

    admin_message = (
        f"🔔 *New Inquiry Received!*\n\n"
        f"👤 *Name:* {data.get('name')}\n"
        f"📧 *Email:* {data.get('email')}\n"
        f"📞 *Phone:* {data.get('phone')}\n"
        f"📦 *Product:* {data.get('product')}\n"
        f"🔢 *Quantity:* {data.get('quantity')}\n"
        f"💬 *Message:* {data.get('message')}\n\n"
        f"Check admin panel for details."
    )

    user_message = (
        f"Hello *{data.get('name')}*,\n\n"
        f"Thank you for your inquiry for *{data.get('product')}*.\n\n"
        f"*Details:*\n"
        f"📦 Product: {data.get('product')}\n"
        f"🔢 Quantity: {data.get('quantity')}\n"
        f"💬 Your Message: {data.get('message')}\n\n"
        f"Our team has received your request. *Admin will reply you shortly.*\n\n"
        f"You can also chat with us directly: https://wa.me/{admin_number}\n\n"
        f"Best Regards,\n"
        f"Admin Team"
    )

    # Send to Admin
    send_whatsapp_message(admin_number, admin_message)

    # Send to User
    user_number = data.get("phone")
    if user_number:
        # Ensure it has country code if needed (assuming India 91 as default based on project context)
        user_number = "91" + user_number if len(user_number) == 10 else user_number
        send_whatsapp_message(user_number, user_message)
