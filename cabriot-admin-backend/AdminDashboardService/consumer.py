import pika



def callback(ch, method, properties, body):
    print(ch, method, properties, body)


connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()
channel.queue_declare(queue='my_queue')
channel.basic_consume(queue='my_queue', on_message_callback=callback, auto_ack=True)

print("Consumer ready to consume RabbitMQ")
channel.start_consuming()
 