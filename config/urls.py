
from django.urls import path
from web.views import base_views
from common import views

urlpatterns = [
    path('', views.login, name=''),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout, name='logout/'),
    path('asset/', base_views.assetweb, name='asset'),
    path('asset_detail/', base_views.assetDetailweb, name='asset_detail'),
    path('asset_detail/paging', base_views.assetDetailweb_paging, name='asset_detail_paging'),
    path('report/', base_views.report, name='report'),
    path('updateform/', views.updateform, name='updateform'),
    path('update/', views.update, name='update'),
    path('dashboard/', base_views.dashboard, name='dashboard'),
    path('reportdaily/', base_views.reportdaily, name='reportdaily'),
    path('reportmonthly/', base_views.reportmonthly, name='reportmonthly'),
    path('reportannual/', base_views.reportannual, name='reportannual'),
    path('NC_banner/', base_views.ncBanner, name='NC_banner'),
    path('customizing/', base_views.customizing, name='customizing'),
    ############################ 팝업 ############################################
    path('osVersion_moreInfo/', base_views.osVersion_moreInfo, name='osVersion_moreInfo'),
    path('serverBandBy_moreInfo/', base_views.serverBandBy_moreInfo, name='serverBandBy_moreInfo'),
    path('runningService_moreInfo/', base_views.runningService_moreInfo, name='runningService_moreInfo'),
    path('memory_moreInfo/', base_views.memory_moreInfo, name='memory_moreInfo'),
    path('cpu_moreInfo/', base_views.cpu_moreInfo, name='cpu_moreInfo'),
    path('disk_moreInfo/', base_views.disk_moreInfo, name='disk_moreInfo'),
    path('physicalServer_moreInfo/', base_views.physicalServer_moreInfo, name='physicalServer_moreInfo'),
    path('gpuServer_moreInfo/', base_views.gpuServer_moreInfo, name='gpuServer_moreInfo'),
    path('alarmCase_moreInfo/', base_views.alarmCase_moreInfo, name='alarmCase_moreInfo'),
]