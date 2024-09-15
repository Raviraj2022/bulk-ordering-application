from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login as auth_login
from .serializer import LoginSerializer, UserSerializer, CabriotItemInfoSerializer, MealSerializer
from rest_framework import viewsets
from .models import CabriotItems, MealItem
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt



@method_decorator(csrf_exempt, name='dispatch')
class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        # print(serializer)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data  
        if user.is_staff:
            auth_login(request, user)  # Start session
            token = RefreshToken.for_user(user)

            # Serialize the user data
            user_data = UserSerializer(user).data
            # print(user_data)
            # Publish user data to RabbitMQ
            # publish_message(json.dumps(user_data))
            return Response({
                'status': 200,
                'msg': 'Admin login successful',
                'user': user_data,
                'token': str(token.access_token),
                'refresh_token': str(token),
            })
        else:
            return Response({'status': 403, 'msg': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

class ItemViewSet(viewsets.ViewSet):
    queryset = CabriotItems.objects.all()
    serializer_class = CabriotItemInfoSerializer
    permission_classes = [AllowAny]

    def postItem(self, request):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def getItem(self, request):
        items = self.queryset
        serializer = self.serializer_class(items, many=True)
        return Response(serializer.data)

    def deleteItem(self, request, pk=None):
        try:
            item = CabriotItems.objects.get(pk=pk)
        except CabriotItems.DoesNotExist:
            return Response({"error": "Company not found"}, status=status.HTTP_404_NOT_FOUND)
        
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def getSingleItem(self, request, pk=None):
        try:
             item = self.queryset.filter(pk=pk)
            #  print(branch)
             serializer = self.serializer_class(item, many=True)
            #  print(serializer)
             return Response(serializer.data)
        except self.queryset.model.DoesNotExist:
             return Response({'error': 'branch not found'}, status=404)

    # def itemByMeal(self, request, meal_id=None):
    #     # meal_id = request.queryset.filter('meal_id')
    #     meals = self.queryset.filter(meal_id=meal_id)
    #     serializer = self.serializer_class(meals, many=True)
    #     return Response(serializer.data)
    
    
    # def itemBySection(self, request, section_id=None):
    #     # section_id = request.queryset.filter('section_id')
    #     sections = self.queryset.filter(section_id=section_id)
    #     serializer = self.serializer_class(sections, many=True)
    #     return Response(serializer.data)

    
class MainViewSet(viewsets.ModelViewSet):
    queryset = MealItem.objects.all()
    serializer_class = MealSerializer
    permission_classes = [AllowAny]

    def postMain(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)