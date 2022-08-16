from django.contrib import admin
from django.urls import path, include

from web.views import base_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('web/', include('web.urls')),
    path('common/', include('common.urls')),
    path('', base_views.index, name='index'),  # '/' 에 해당되는 path
    path('question/list/', base_views.list, name='list'),  # '/' 에 해당되는 path
]
