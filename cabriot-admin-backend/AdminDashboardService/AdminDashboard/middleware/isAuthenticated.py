# your_app/middleware.py
import json
import jwt
import pika
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.models import User

class IsAuthenticatedMiddleware:
    def __init__(self, get_response):
        # print(self)
        self.get_response = get_response
        self.connection = None
        self.channel = None

    def __call__(self, request):
        print(request, "Rvi")
        auth_header = request.headers.get("Authorization")
        if auth_header:
            try:
                token = auth_header.split(" ")[1]
                decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_data.get("user_id")
                if user_id:
                    try:
                        user = User.objects.get(id=user_id)
                        request.user = user

                        # Publish user data to RabbitMQ
                        self.publish_user_data(user)

                    except User.DoesNotExist:
                        return JsonResponse({"message": "User does not exist"}, status=401)
                else:
                    return JsonResponse({"message": "Invalid token"}, status=401)
            except jwt.ExpiredSignatureError:
                return JsonResponse({"message": "Token has expired"}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({"message": "Invalid token"}, status=401)
        else:
            return JsonResponse({"message": "Token is missing"}, status=401)

        response = self.get_response(request)
        return response

    def publish_user_data(self, user):
        if not self.connection or self.connection.is_closed:
            self.connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        if not self.channel or self.channel.is_closed:
            self.channel = self.connection.channel()
            self.channel.queue_declare(queue='user_data_queue')

        message = json.dumps({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            # Add more fields as needed
        })
        self.channel.basic_publish(
            exchange='',
            routing_key='user_data_queue',
            body=message
        )

    def __del__(self):
        if self.channel and not self.channel.is_closed:
            self.channel.close()
        if self.connection and not self.connection.is_closed:
            self.connection.close()
