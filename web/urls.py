from django.urls import path

from .views import base_views

app_name = 'web'

urlpatterns = [
    # base
    path('', base_views.index, name='index'),
    path('dashboard/', base_views.dashboard, name='dashboard'),
]
