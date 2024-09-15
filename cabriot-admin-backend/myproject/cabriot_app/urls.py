
from django.urls import path
# from .views import CusisineViewSet, DietaryViewSet, KitechenViewSet, MealChoiceViewSet, MenuViewSet, DishInfoViewSet,MealInfoViewSet, StateCityViewSet, CorporateMealPlanViewSet
from django.conf.urls.static import static
from django.conf import settings
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns=[
          path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
          path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
         
         path("admin-login/", AdminLoginView.as_view(), name='login'),

         path("item-data/", ItemViewSet.as_view({
            "post":"postItem",
            "get": "getItem",
         }) ),

         path("item-data/<int:pk>", ItemViewSet.as_view({
            "delete":"deleteItem",
            }) ),

         path("item-data/section/<int:section_id>", ItemViewSet.as_view({
              "get": "itemBySection",
         }) ),
         
         # path("meal/", MealViewSet.as_view({
         #    "get": "getMeal"
         # })),
         # path("section/", SectionViewSet.as_view({
         #    "get": "getSection"
         # })),

         path("main-data/", MainViewSet.as_view({
            "post" : "postMain"
         })),

]