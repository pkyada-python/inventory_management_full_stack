import os
import requests
from app.core.config import settings

# Note: To use this service, you need a WhatsApp API provider like Twilio, Meta Cloud API, or UltraMsg.
# For demonstration, we'll use a placeholder logic.


def send_whatsapp_message(to_number: str, message: str):
    """
    Sends a WhatsApp message to a specific number.
    This function currently logs the message.
    To enable actual sending, integrate with a real provider.
    """
    print(f"--- WHATSAPP NOTIFICATION ---")
    print(f"TO: {to_number}")
    print(f"MESSAGE: {message}")
    print(f"-----------------------------")

    # Example integration with UltraMsg (uncomment to use)
    # url = "https://api.ultramsg.com/your_instance/messages/chat"
    # payload = {
    #     "token": "your_token",
    #     "to": to_number,
    #     "body": message
    # }
    # headers = {'content-type': 'application/x-www-form-urlencoded'}
    # response = requests.request("POST", url, data=payload, headers=headers)
    # return response.json()


def notify_inquiry_via_whatsapp(data: dict):
    admin_number = os.getenv(
        "ADMIN_WHATSAPP_NUMBER", "917487853898"
    )  # Default or from .env

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
        f"Best Regards,\n"
        f"Admin Team"
    )

    # Send to Admin
    send_whatsapp_message(admin_number, admin_message)

    # Send to User
    user_number = data.get("phone")
    if user_number:
        # Ensure it has country code if needed
        # user_number = "91" + user_number if len(user_number) == 10 else user_number
        send_whatsapp_message(user_number, user_message)
