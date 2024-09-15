import pika



def publish_message(message):
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='my_queue')
    channel.basic_publish(exchange="", routing_key='my_queue', body=message,)

    # channel.close()
    connection.close()