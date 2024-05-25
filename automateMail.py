import smtplib
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime


userCredential = {
  "type": "service_account",
  "project_id": "dsa-remainder",
  "private_key_id": "a0d959b3b4356f6945ab66a793cefe2134600dac",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDUs7AuWyNPcU2I\n/0Ohvs5tz58KpfTx+g/rha6of5GRFGCqdfeEJNwQWdFAh6RZ71WHgebaCd2FuG5b\n1qipyBY70h5fe+3Ab+AQWDDeZlbZw7N22ootvcZgbNG/iEEMs18mU9lsDFWt3/AL\nqtH2G5XrN7AhkZ4ITuU8lS5eM/ltQiSX0YxkpYT1b3WGVVztoxgGwDMcjXVa68Mb\nmSzFciWHicbKD/8k0P4Mz2RTWmT5PTz6b8W6ohuaR2PKrZOFOmNLHsTA4gR7+Puo\n+d1O3Uy+ZzOVh+JW0mtcsFIazrcU6m934nhqRLMxFWOhlR9DtnbuvtSuFUhGebAU\nJXpjRv/jAgMBAAECggEAIIVvfPb5rs4vwQWT1/7Y3diuhC3xsK8U5g7k2zsot5pP\nrrXQvXH2pRgGiCufyRHF7a0X7eMvl/V7XNa0/RiXBa3PxQupbhCXnV15Q1fkaZv5\ngZpSduya5egIKJUdqmJ2kYv6egG8y+lUcNmSYWMVs1wqtZySdsoRVLJT35q/b/aI\nWYZ045e3bYLoCIaR7SZ9j/tYgRqd5lXu/ZWsMcK/goTP6vzKzd+FBTYywDdpMBSE\n8KbRA0kaWSeDlUoCn40UnAviPT4G7Tpvh/TSDofEbL6FtVJkrFGBPi4Y0ixDjDVb\nM8uMEsg0bgMuEyNbMo3k2EH0w0YQegXOA/zVDHBBAQKBgQD/cg5LWQ40Y4pYOUGX\nVP3U2Kyn2fsXU6aW9tfDHyamCicr+rYi+pMVgi8cjYhuwuamEJ1gdnDVX0iylz7B\nAQYfNMH43S4eOYvEx0QNfte4lBicUGzO5zG+EbfXSpT/Yfvv9s8GOyn1ZaTYhGWD\nwEbpPhdshWEiW7w3RMXKzllPgQKBgQDVKeGCabhdZ/8DyNnEJ9t3N8LrP+c0KjUI\n5kpmArzdZcmezyDkp8+NUPeSDB/QOg8HZaamGs9ouxRN1SDecza5Fe6+w1f0yjAv\nrPYmYs7w7yf1jgRulPLkrAtm/V3gDYTa2gYNvwbMy1sdaTtEDmOnqPgUHfgsAx9w\nb4NKWE3BYwKBgGKI3Hq0H4aV3wepDmQRpNg1vGQC8ZhN7DTPgusBWSczQ2jzjM5x\nWcsyLHoXHkmbZN0qC4rqJRwpZSF+tfY9Lt9aungE2YVPLVr6goWyKARLHDMv0sj8\n5XMr4n5pho/8e/JUggclS0odqzjZ2U65HKFcEi0KRi26tR+cp69TaaABAoGALlsJ\nO38aJNX00zHeiZXRWD+8F8Sx1tpG5kSOcVivEcaM7ghFMvR7YlP1QsF4OaQmmIk2\nkHDMIg5s//AVUcrkX6OxY7K/cfB2Qifu77IVJrgbjH7x38psd+YiJKd8vrix55X6\nMwsTw32FtwOna8llSpSoPle2HHwhXiYh+wzw+9kCgYEAuFAFwtjGyjye52XnnvRw\nciC0iCssr8VzaQ+Rt+vrhUdJ3gaxYFsFyps5OEWNDxPmN3aPgPdx3o70bRt40AYa\neoEV15CC0umZeN5LKalg3bDqh8Mv4l7N2FHskkFO8mHVUNZp8iabfwLtR/aLv6Vg\nJVrJ11Sdpq9dEjFgEwHedf0=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-yh1cp@dsa-remainder.iam.gserviceaccount.com",
  "client_id": "113009347624229524131",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yh1cp%40dsa-remainder.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
cred = credentials.Certificate(userCredential)
firebase_admin.initialize_app(cred)
db = firestore.client()

def fetch_collection_data(collection_name):
    try:
        docs = db.collection(collection_name).get()
        users = []
        for doc in docs:
            users.append(doc.to_dict())
        return users
    except Exception as e:
        print(f"Error fetching data: {e}")

users = fetch_collection_data('users')

def sendMailToUser(receiver_email,recipientName,qusLink):
    email = "zummsg@gmail.com"
    subject= "Daily DSA Reminder: Time for Your Daily Question!"
    message = f"""
Hi {recipientName},\nJust a quick reminder to tackle your daily DSA question. Here's today's problem:\n{qusLink}\nConsistency is key! Keep up the great work.\nRegards,\nORRIN"""
    
    text = f"Subject: {subject}\n\n{message}"
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login(email,"xjibxrvjzckrwoue")
    server.sendmail(email,receiver_email,text)
    print("Email has been send to",receiver_email)

dsa_questions = fetch_collection_data('questions')
dsa_questions = dsa_questions[0]["list"]

def updateQusFirebase(question,id):
    try:
        # Get today's date
        today_date = datetime.today().strftime('%Y-%m-%d')

        # Retrieve the current document
        doc_ref = db.collection('userQuestions').document(id)
        doc = doc_ref.get()

        # Get the existing array of questions or initialize it if it doesn't exist
        questions_array = doc.get('questions') if doc.exists else []

        obj = {
            "date":today_date,
            "category":question["category"],
            "difficulty":question["difficulty"],
            "link":question["link"]
        }

        # Append the new question to the array
        questions_array.append(obj)

        # Update the document with the new array
        doc_ref.set({'questions': questions_array})
    except Exception as e:
        print("Error updating Firestore:", e)

def getRandomQuestion(category,difficulty):
    result = []
    if(category[0]=="All"):
        for qus in dsa_questions:
            if(qus["difficulty"]==difficulty):
                    result.append(qus)
    else:
        for qus in dsa_questions:
            if(qus["difficulty"]==difficulty):
                    for cat in category:
                        if(cat==qus["category"]):
                            result.append(qus)
    return result[random.randint(0, len(result) - 1)]

for user in users:
    if (user["isSubscribed"]==True):
        question= getRandomQuestion(user["category"],user["difficulty"])
        updateQusFirebase(question,user["id"])
        sendMailToUser(user["email"], user["name"], question["link"])
