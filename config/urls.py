
from django.urls import path
from web.views import base_views
from common import views

urlpatterns = [
    path('', views.login, name=''),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout, name='logout/'),
    path('asset/', base_views.assetweb, name='asset'),
    path('updateform/', views.updateform, name='updateform'),
    path('update/', views.update, name='update'),
    path('dashboard/', base_views.dashboard, name='dashboard'),
]