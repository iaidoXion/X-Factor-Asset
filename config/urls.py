
from django.urls import path
from web.views import base_views
from common import views

urlpatterns = [
    path('', views.login, name=''),
    path('login/', views.login, name='login'),
    path('dashboard/', base_views.dashboard, name='dashboard'),
    path('signup/', views.signup, name='signup'),
    path('dashboard/logout/', views.logout, name='logout'),
    path('asset/', base_views.assetweb, name='asset'),
    path('updateform/', views.updateform, name='updateform'),
    path('update/', views.update, name='update'),
]