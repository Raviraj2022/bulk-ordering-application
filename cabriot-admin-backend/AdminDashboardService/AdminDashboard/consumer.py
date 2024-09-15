import pika
import json
from celery import shared_task

def callback(ch, method, properties, body):
    try:
        user_data = json.loads(body)
        user_id = user_data.get('id')
        username = user_data.get('username')
        email = user_data.get('email')
        role = user_data.get('role')
        print(f"Received user ID: {user_id}, Username: {username}, Email: {email}, Role: {role}")
    except json.JSONDecodeError:
        print("Failed to decode JSON from message body")
    except KeyError as e:
        print(f"Missing expected key: {e}")

@shared_task
def run_consumer():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='my_queue')
    channel.basic_consume(queue='my_queue', on_message_callback=callback, auto_ack=True)
    print("Consumer ready to consume RabbitMQ")
    channel.start_consuming()
