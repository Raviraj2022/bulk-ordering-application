from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, CabriotItems, MealItem




class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect credentials')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined']
        fields = ['id', 'username', 'email', 'role']  


class CabriotItemInfoSerializer(serializers.ModelSerializer):
    # section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())
    # meal = serializers.PrimaryKeyRelatedField(queryset=Meal.objects.all())
    class Meta:
        model = CabriotItems
        fields = '__all__'


class MealSerializer(serializers.ModelSerializer):
    # meal_qty = serializers.JSONField() 
    class Meta:
        model = MealItem
        fields = '__all__' 

    def create(self, validated_data):
        meal_qty = validated_data.pop('meal_qty')
        main_date = validated_data.pop('main_date')
        meal_availability_status = validated_data.pop('meal_availability_status')
        
        for meal in meal_qty:
            Meal.objects.create(
                dish=meal['dish'],
                quantity=meal['quantity'],
                meal_type=meal['meal_type'],
                main_date=main_date,
                meal_availability_status=meal_availability_status
            )
        return validated_data           