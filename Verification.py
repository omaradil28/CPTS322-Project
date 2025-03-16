import random
import smtplib
from email.message import EmailMessage

def verification(to):
    otp = ""
    for i in range(6):
        otp += str(random.randint(0,9))

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()

    from_mail = 'classrespond.verify@gmail.com'
    server.login(from_mail, 'xjko ebmg yrqz cxjs')

    msg = EmailMessage()
    msg['Subject'] = "Class Respond Verification"
    msg['From'] = from_mail
    msg['To'] = to
    msg.set_content("Your verification code is " + otp)

    server.send_message(msg)

    print("Email Sent")

    server.quit()

    return otp
