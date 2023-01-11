from pprint import pprint

import requests
from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from web.model.dashboard_function import DashboardData
from web.model.dashboard_function import AssetData
from django.views.decorators.csrf import csrf_exempt
from common.menu import MenuSetting
import json
import math
menuListDB = MenuSetting()

with open("setting.json", encoding="UTF-8") as f:
    SETTING = json.loads(f.read())
Customer = SETTING['PROJECT']['CUSTOMER']
WorldUse = SETTING['PROJECT']['MAP']['World']
KoreaUse = SETTING['PROJECT']['MAP']['Korea']
AreaUse = SETTING['PROJECT']['MAP']['Area']['use']
AreaType = SETTING['PROJECT']['MAP']['Area']['type']
def index(request) :
    returnData = {'menuList': menuListDB}
    return render(request, 'web/index.html', returnData)

def dashboard(request):
    res_data={}
    if not 'sessionid' in request.session :
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else :
        DCDL = DashboardData()
        if Customer == 'NC':
            dashboardType = 'web/dashboard_NC_banner.html'
            MapUse = {"WorldUse": WorldUse, "KoreaUse": KoreaUse, "AreaUse": AreaUse, "AreaType": AreaType}


            # NC버전
            server_barChartData = DCDL["server_BChartDataList"]

            # service_donutChartData
            DiskChartDataList = DCDL["usageChartDataList"]["DiskChartDataList"]
            service_donutChartData = DCDL["service_donutChartData"]
            CpuChartDataList =  DCDL["usageChartDataList"]["CpuChartDataList"]
            MemoryChartDataList =  DCDL["usageChartDataList"]["MemoryChartDataList"]


            os_donutChartData = DCDL["os_donutChartData"]
            chartData = {'DiskChartDataList': DiskChartDataList, 'donutChartDataList' : service_donutChartData, 'MemoryChartDataList': MemoryChartDataList, 'CpuChartDataList':CpuChartDataList,
                        'os_donutChartData': os_donutChartData ,'server_barChartDataList' : server_barChartData}

            returnData = {'menuList': menuListDB, 'chartData' : chartData, 'Customer' : Customer, 'MapUse' : MapUse}
        else:
            dashboardType = 'web/dashboard.html'
            barChartData = DCDL["barChartData"]
            lineChartData = DCDL["lineChartData"]
            pieChartData = DCDL["pieChartData"]
            bannerData = DCDL["bannerData"]
            minidonutData = DCDL['MiniDonutChart']
            alarmData = DCDL["alarmListData"]
            AssociationData = DCDL["AssociationDataList"]
            WorldMapData = DCDL["WorldMapDataList"]
            TotalTopData = DCDL['TotalTopDataList']
            TotalData = DCDL["TotalDataList"]
            donutChartData = DCDL["donutChartDataList"]
            MapUse = {"WorldUse": WorldUse, "KoreaUse": KoreaUse, "AreaUse": AreaUse, "AreaType": AreaType}
            chartData = {'barChartDataList': barChartData, 'minidonutData' : minidonutData ,'lineChartDataList' : lineChartData, 'pieChartDataList': pieChartData, 'bannerDataList': bannerData, 'alarmDataList': alarmData, 'AssociationDataList' : AssociationData,
                        'TotalTopDataList': TotalTopData, 'TotalDataList': TotalData, 'WorldMapDataList': WorldMapData, 'donutChartDataList' : donutChartData}
            returnData = {'menuList': menuListDB, 'chartData' : chartData, 'Customer' : Customer, 'MapUse' : MapUse}
        return render(request, dashboardType, returnData)



def assetweb(request):
    res_data={}
    if not 'sessionid' in request.session :
        res_data['error'] = '먼저 로그인을 해주세요.'
        return render(request, 'common/login.html', res_data)
    else :
        Data = AssetData('Count', '')
        returnData = { 'menuList': menuListDB, 'data' : Data}
        return render(request, 'web/asset.html', returnData)

def assetDetailweb(request):
    swv=request.GET.get('swv')
    Data = AssetData('SWL', swv)
    returnData = { 'menuList': menuListDB , 'data' : Data}
    return render(request, 'web/asset_detail.html', returnData)

@csrf_exempt
def assetDetailweb_paging(request):
    swv=request.GET.get('swv')
    count = request.GET.get('count')
    draw = int(request.POST.get('draw'))
    start = int(request.POST.get('start'))
    length = int(request.POST.get('length'))
    search = request.POST.get('search[value]')
    page = math.ceil(start/length) + 1
    data = [swv, str(length), str(page), str(search)]
    
    Data = AssetData('SWV', data)
        
    returnData = { 'data': Data,
        'draw': draw,
        'recordsTotal': count,
        'recordsFiltered': Data['count'],
        }
    return JsonResponse(returnData)

def report(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report.html', returnData)

def reportdaily(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report_daily.html', returnData)

def reportmonthly(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report_monthly.html', returnData)

def reportannual(request):
    returnData = { 'menuList': menuListDB}
    return render(request, 'web/report_annual.html', returnData)

def ncBanner(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'web/dashboard_NC_banner.html', returnData)

def customizing(request):
    returnData = { 'menuList': menuListDB }
    return render(request, 'web/customizing.html', returnData)

############################ 팝업 ############################################
def osVersion_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/osVersion_moreInfo.html', returnData)

def serverBandBy_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/serverBandBy_moreInfo.html', returnData)

def runningService_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/runningService_moreInfo.html', returnData)

def memory_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/memory_moreInfo.html', returnData)

def cpu_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/cpu_moreInfo.html', returnData)

def disk_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/disk_moreInfo.html', returnData)

def physicalServer_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/physicalServer_moreInfo.html', returnData)

def gpuServer_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/gpuServer_moreInfo.html', returnData)

def alarmCase_moreInfo(request):
    returnData = {'menuList': menuListDB}
    return render(request, 'popup/alarmCase_moreInfo.html', returnData)